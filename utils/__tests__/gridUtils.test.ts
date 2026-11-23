import { describe, it, expect } from "vitest";
import {
  buildPushGrid,
  buildLaunchpadGrid,
  getPushChromaticRowStep,
  getPushInKeyRowStep,
} from "../gridUtils";
import { SCALES } from "@/constants";

describe("Ableton Push Grid Layouts & Nomenclature", () => {
  const cMajor = SCALES.find((s) => s.name === "Major")!;
  const cRootNote = 1; // 1-based index for C

  describe("Step increments", () => {
    it("should return correct chromatic row steps", () => {
      expect(getPushChromaticRowStep("4ths")).toBe(5);
      expect(getPushChromaticRowStep("3rds")).toBe(4); // Major 3rd
      expect(getPushChromaticRowStep("sequent")).toBe(8);
    });

    it("should return correct in-key row steps", () => {
      expect(getPushInKeyRowStep("4ths", 7)).toBe(3);
      expect(getPushInKeyRowStep("3rds", 7)).toBe(2);
      expect(getPushInKeyRowStep("sequent", 7)).toBe(7); // 1 full octave per row
    });
  });

  describe("C Major - 1st column from bottom going up (col 0, rows 0..3)", () => {
    it("In Key Thirds: should be C, E, G, B", () => {
      const grid = buildPushGrid({
        pushMode: "inKey",
        pushLayout: "3rds",
        scale: cMajor,
        scaleRootNote: cRootNote,
      });

      const col0Notes = [0, 1, 2, 3].map((r) => grid[r][0].note.name);
      expect(col0Notes).toEqual(["C", "E", "G", "B"]);
    });

    it("In Key Fourths: should be C, F, B, E", () => {
      const grid = buildPushGrid({
        pushMode: "inKey",
        pushLayout: "4ths",
        scale: cMajor,
        scaleRootNote: cRootNote,
      });

      const col0Notes = [0, 1, 2, 3].map((r) => grid[r][0].note.name);
      expect(col0Notes).toEqual(["C", "F", "B", "E"]);
    });

    it("In Key Sequential: should be C, C, C, C (each pad goes up by 1 octave)", () => {
      const grid = buildPushGrid({
        pushMode: "inKey",
        pushLayout: "sequent",
        scale: cMajor,
        scaleRootNote: cRootNote,
      });

      const col0Notes = [0, 1, 2, 3].map((r) => grid[r][0].note.name);
      expect(col0Notes).toEqual(["C", "C", "C", "C"]);

      // Verify each pad going up in col 0 ascends by 12 semitones (1 octave)
      const col0Semitones = [0, 1, 2, 3].map((r) => grid[r][0].absoluteSemitones);
      expect(col0Semitones).toEqual([0, 12, 24, 36]);
    });

    it("Chromatic Thirds: should be C, E, G♯, C", () => {
      const grid = buildPushGrid({
        pushMode: "chromatic",
        pushLayout: "3rds",
        rootNote: cRootNote,
      });

      const col0Notes = [0, 1, 2, 3].map((r) => grid[r][0].note.name);
      expect(col0Notes).toEqual(["C", "E", "G♯", "C"]);
    });

    it("Chromatic Fourths: should be C, F, A♯, D♯", () => {
      const grid = buildPushGrid({
        pushMode: "chromatic",
        pushLayout: "4ths",
        rootNote: cRootNote,
      });

      const col0Notes = [0, 1, 2, 3].map((r) => grid[r][0].note.name);
      expect(col0Notes).toEqual(["C", "F", "A♯", "D♯"]);
    });

    it("Chromatic Sequential: should be C, G♯, E, C", () => {
      const grid = buildPushGrid({
        pushMode: "chromatic",
        pushLayout: "sequent",
        rootNote: cRootNote,
      });

      const col0Notes = [0, 1, 2, 3].map((r) => grid[r][0].note.name);
      expect(col0Notes).toEqual(["C", "G♯", "E", "C"]);
    });
  });

  describe("Push Root Anchoring & Scale Inference", () => {
    it("should anchor to chord root in chromatic mode (e.g., D = note 3)", () => {
      const grid = buildPushGrid({
        pushMode: "chromatic",
        pushLayout: "4ths",
        rootNote: 3, // D
      });

      // Bottom-left pad (row 0, col 0) should be D
      expect(grid[0][0].note.name).toBe("D");
      // Row 1, col 0 in 4ths (+5 semitones) should be G
      expect(grid[1][0].note.name).toBe("G");
    });

    it("should infer Minor scale when chord has minor third pattern", () => {
      const grid = buildPushGrid({
        pushMode: "inKey",
        pushLayout: "3rds",
        rootNote: 10, // A
        pattern: [1, 3, 4], // Minor triad
      });

      // A Minor scale: A, B, C, D, E, F, G
      // Row 0 col 0: A
      expect(grid[0][0].note.name).toBe("A");
      // In 3rds (+2 degrees): Row 1 col 0 should be C (not C#)
      expect(grid[1][0].note.name).toBe("C");
    });
  });

  describe("Novation Launchpad Grid Layouts", () => {
    it("width 8 (Sequential) should start on C and advance 8 semitones per row", () => {
      const grid = buildLaunchpadGrid(8);
      expect(grid[0][0].note.name).toBe("C");
      expect(grid[1][0].note.name).toBe("G♯"); // 0 + 8 = 8 -> G#
      expect(grid[2][0].note.name).toBe("E");  // 8 + 8 = 16 = 4 -> E
    });

    it("width 5 (5 Finger) should advance 5 semitones per row", () => {
      const grid = buildLaunchpadGrid(5);
      expect(grid[0][0].note.name).toBe("C");
      expect(grid[1][0].note.name).toBe("F");  // 0 + 5 = 5 -> F
      expect(grid[2][0].note.name).toBe("A♯"); // 5 + 5 = 10 -> A#
    });

    it("width 4 (4 Finger) should advance 4 semitones per row", () => {
      const grid = buildLaunchpadGrid(4);
      expect(grid[0][0].note.name).toBe("C");
      expect(grid[1][0].note.name).toBe("E");  // 0 + 4 = 4 -> E
      expect(grid[2][0].note.name).toBe("G♯"); // 4 + 4 = 8 -> G#
    });
  });
});
