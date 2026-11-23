import { describe, it, expect } from "vitest";
import {
  resolveRootNote,
  resolveChord,
  calculateLaunchpadShape,
  calculatePushShape,
  calculateGuitarShape,
  calculateUkuleleShape,
  calculatePianoShape,
  getChordShapes,
} from "@/utils/chordShapeUtils";

describe("chordShapeUtils", () => {
  describe("resolveRootNote", () => {
    it("should resolve natural notes by name", () => {
      expect(resolveRootNote("C")?.name).toBe("C");
      expect(resolveRootNote("g")?.name).toBe("G");
      expect(resolveRootNote("A")?.alias).toBe("10");
    });

    it("should resolve sharp and flat notes with standard accidentals", () => {
      expect(resolveRootNote("C#")?.name).toBe("C♯");
      expect(resolveRootNote("Db")?.name).toBe("C♯");
      expect(resolveRootNote("F#")?.name).toBe("F♯");
      expect(resolveRootNote("Bb")?.name).toBe("A♯");
    });

    it("should resolve notes by number or alias string", () => {
      expect(resolveRootNote(1)?.name).toBe("C");
      expect(resolveRootNote("1")?.name).toBe("C");
      expect(resolveRootNote(12)?.name).toBe("B");
      expect(resolveRootNote("12")?.name).toBe("B");
    });

    it("should return undefined for invalid root note inputs", () => {
      expect(resolveRootNote("H")).toBeUndefined();
      expect(resolveRootNote(0)).toBeUndefined();
      expect(resolveRootNote(13)).toBeUndefined();
      expect(resolveRootNote("xyz")).toBeUndefined();
    });
  });

  describe("resolveChord", () => {
    it("should resolve standard chords by exact or lowercase name", () => {
      expect(resolveChord("Major")?.pattern).toEqual([1, 4, 3]);
      expect(resolveChord("minor")?.pattern).toEqual([1, 3, 4]);
      expect(resolveChord("7th")?.pattern).toEqual([1, 4, 3, 3]);
      expect(resolveChord("Maj7")?.pattern).toEqual([1, 4, 3, 4]);
    });

    it("should resolve chord aliases", () => {
      expect(resolveChord("min")?.name).toBe("Minor");
      expect(resolveChord("m")?.name).toBe("Minor");
      expect(resolveChord("dim")?.name).toBe("Diminished");
      expect(resolveChord("sus")?.name).toBe("Sustained");
      expect(resolveChord("power")?.name).toBe("5");
    });

    it("should accept custom interval pattern arrays", () => {
      const custom = resolveChord([1, 4, 3, 2]);
      expect(custom?.name).toBe("Custom");
      expect(custom?.pattern).toEqual([1, 4, 3, 2]);
    });

    it("should return undefined for invalid chord inputs", () => {
      expect(resolveChord("NonExistent")).toBeUndefined();
      expect(resolveChord([1, 2])).toBeUndefined();
      expect(resolveChord([])).toBeUndefined();
    });
  });

  describe("calculateLaunchpadShape", () => {
    const rootC = resolveRootNote("C")!;
    const chordMajor = resolveChord("Major")!;

    it("should compute active positions for C Major on 8x8 launchpad", () => {
      const shape = calculateLaunchpadShape(rootC, chordMajor, 8);
      expect(shape.instrument).toBe("launchpad");
      expect(shape.dimensions.gridWidth).toBe(8);
      expect(shape.activePositions.length).toBeGreaterThan(0);

      // All active positions must be C, E, or G
      shape.activePositions.forEach((pos) => {
        expect(["C", "E", "G"]).toContain(pos.note);
        if (pos.note === "C") {
          expect(pos.isRoot).toBe(true);
        } else {
          expect(pos.isRoot).toBe(false);
        }
      });

      // Bottom-left cell (0, 0) is C in width 8
      const cell00 = shape.activePositions.find(
        (p) => p.row === 0 && p.column === 0,
      );
      expect(cell00).toBeDefined();
      expect(cell00?.note).toBe("C");
      expect(cell00?.pitch).toBe("C2");
      expect(cell00?.isRoot).toBe(true);
    });

    it("should support alternate widths (e.g. 4)", () => {
      const shape = calculateLaunchpadShape(rootC, chordMajor, 4);
      expect(shape.dimensions.gridWidth).toBe(4);
      expect(shape.activePositions.length).toBeGreaterThan(0);
    });
  });

  describe("calculatePushShape", () => {
    const rootC = resolveRootNote("C")!;
    const chordMajor = resolveChord("Major")!;

    it("should compute Push chromatic 4ths shape", () => {
      const shape = calculatePushShape(rootC, chordMajor, {
        pushMode: "chromatic",
        pushLayout: "4ths",
      });

      expect(shape.instrument).toBe("push");
      expect(shape.config?.pushMode).toBe("chromatic");
      expect(shape.config?.pushLayout).toBe("4ths");

      // Verify bottom-left cell (0, 0)
      const cell00 = shape.activePositions.find(
        (p) => p.row === 0 && p.column === 0,
      );
      expect(cell00).toBeDefined();
      expect(cell00?.note).toBe("C");
      expect(cell00?.isRoot).toBe(true);
    });

    it("should compute Push inKey 3rds shape", () => {
      const shape = calculatePushShape(rootC, chordMajor, {
        pushMode: "inKey",
        pushLayout: "3rds",
      });

      expect(shape.config?.pushMode).toBe("inKey");
      expect(shape.config?.pushLayout).toBe("3rds");
      expect(shape.activePositions.length).toBeGreaterThan(0);
    });
  });

  describe("calculateGuitarShape", () => {
    const rootC = resolveRootNote("C")!;
    const chordMajor = resolveChord("Major")!;

    it("should calculate active frets and correct pitches for 6 guitar strings", () => {
      const shape = calculateGuitarShape(rootC, chordMajor, 12);

      expect(shape.instrument).toBe("guitar");
      expect(shape.frets).toBe(12);
      expect(shape.tuning.length).toBe(6);

      // Verify open strings:
      // High E (string 1, fret 0): E4 (part of C major)
      const highE = shape.activePositions.find(
        (p) => p.string === 1 && p.fret === 0,
      );
      expect(highE).toBeDefined();
      expect(highE?.note).toBe("E");
      expect(highE?.pitch).toBe("E4");
      expect(highE?.isRoot).toBe(false);

      // String 2 (B), fret 1: C4 (root)
      const bStringC = shape.activePositions.find(
        (p) => p.string === 2 && p.fret === 1,
      );
      expect(bStringC).toBeDefined();
      expect(bStringC?.note).toBe("C");
      expect(bStringC?.pitch).toBe("C4");
      expect(bStringC?.isRoot).toBe(true);

      // String 5 (A), fret 3: C3 (root)
      const aStringC = shape.activePositions.find(
        (p) => p.string === 5 && p.fret === 3,
      );
      expect(aStringC).toBeDefined();
      expect(aStringC?.note).toBe("C");
      expect(aStringC?.pitch).toBe("C3");
      expect(aStringC?.isRoot).toBe(true);
    });
  });

  describe("calculateUkuleleShape", () => {
    const rootC = resolveRootNote("C")!;
    const chordMajor = resolveChord("Major")!;

    it("should calculate active frets for 4 ukulele strings", () => {
      const shape = calculateUkuleleShape(rootC, chordMajor, 12);

      expect(shape.instrument).toBe("ukulele");
      expect(shape.frets).toBe(12);
      expect(shape.tuning.length).toBe(4);

      // String 2 (C), fret 0: C4 (root)
      const openC = shape.activePositions.find(
        (p) => p.string === 2 && p.fret === 0,
      );
      expect(openC).toBeDefined();
      expect(openC?.note).toBe("C");
      expect(openC?.pitch).toBe("C4");
      expect(openC?.isRoot).toBe(true);

      // String 4 (A), fret 3: C4 (root)
      const aStringFret3 = shape.activePositions.find(
        (p) => p.string === 4 && p.fret === 3,
      );
      expect(aStringFret3).toBeDefined();
      expect(aStringFret3?.note).toBe("C");
      expect(aStringFret3?.pitch).toBe("C4");
      expect(aStringFret3?.isRoot).toBe(true);
    });
  });

  describe("calculatePianoShape", () => {
    const rootC = resolveRootNote("C")!;
    const chordMajor = resolveChord("Major")!;

    it("should calculate active keys across piano octaves", () => {
      const shape = calculatePianoShape(rootC, chordMajor, 2);

      expect(shape.instrument).toBe("piano");
      expect(shape.octaves).toBe(2);
      expect(shape.totalKeys).toBe(25); // 2 * 12 + 1 final C

      // Root C2
      const firstKey = shape.activePositions.find((p) => p.keyIndex === 0);
      expect(firstKey).toBeDefined();
      expect(firstKey?.note).toBe("C");
      expect(firstKey?.pitch).toBe("C2");
      expect(firstKey?.isRoot).toBe(true);
      expect(firstKey?.isBlack).toBe(false);

      // Final C (key 24)
      const lastKey = shape.activePositions.find((p) => p.keyIndex === 24);
      expect(lastKey).toBeDefined();
      expect(lastKey?.note).toBe("C");
      expect(lastKey?.pitch).toBe("C4");
      expect(lastKey?.isRoot).toBe(true);
      expect(lastKey?.isBlack).toBe(false);
    });
  });

  describe("getChordShapes", () => {
    it("should return shapes for all 5 instruments by default", () => {
      const response = getChordShapes({
        root: "C",
        chord: "Major",
      });

      expect(response.root.name).toBe("C");
      expect(response.chord.name).toBe("Major");
      expect(response.chordNotes).toEqual(["C", "E", "G"]);
      expect(Object.keys(response.shapes)).toEqual([
        "launchpad",
        "push",
        "guitar",
        "ukulele",
        "piano",
      ]);
    });

    it("should filter by requested instruments", () => {
      const response = getChordShapes({
        root: "A",
        chord: "Minor",
        instruments: ["guitar", "piano"],
      });

      expect(response.chordNotes).toEqual(["A", "C", "E"]);
      expect(Object.keys(response.shapes)).toEqual(["guitar", "piano"]);
      expect(response.shapes.launchpad).toBeUndefined();
    });

    it("should throw error for invalid root note or chord", () => {
      expect(() =>
        getChordShapes({ root: "Invalid", chord: "Major" }),
      ).toThrow('Invalid root note: "Invalid"');

      expect(() =>
        getChordShapes({ root: "C", chord: "InvalidChord" }),
      ).toThrow('Invalid chord: "InvalidChord"');
    });
  });
});
