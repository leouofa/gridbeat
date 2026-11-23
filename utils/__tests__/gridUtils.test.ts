import { describe, it, expect } from "vitest";
import {
  buildPushGrid,
  buildLaunchpadGrid,
  getPushChromaticRowStep,
  getPushInKeyRowStep,
  getCellPitch,
} from "../gridUtils";
import { NOTES, SCALES, CHORDS } from "@/constants";
import { Note } from "@/types";
import { getNoteHighlight } from "@/utils/NoteHighlighter";
import { migratePreferences, defaultPreferences } from "@/contexts/PreferencesContext";

/**
 * Exact reference implementation from `main:components/Grid.tsx`
 * to guarantee 100% bit-for-bit parity across all 64 cells.
 */
function buildMainBranchGrid(width: number): Note[][] {
  const normalizePosition = (position: number): number => {
    let normalized = position % 12;
    if (normalized < 0) normalized += 12;
    return normalized;
  };

  const fillGrid = (gridWithNumbers: number[][]): Note[][] => {
    return gridWithNumbers.map((row) =>
      row.map((position) => {
        const normalizedPos = normalizePosition(position);
        return NOTES[normalizedPos];
      }),
    );
  };

  const buildEight = (): Note[][] => {
    const grid: number[][] = [];
    for (let row = 0; row < 8; row++) {
      const gridRow: number[] = [];
      for (let column = 0; column < 8; column++) {
        if (row === 0) {
          gridRow.push(normalizePosition(column));
        } else {
          const previousNote =
            column === 0 ? grid[row - 1][7] : gridRow[column - 1];
          const newPosition = normalizePosition(
            previousNote === 11 ? 0 : previousNote + 1,
          );
          gridRow.push(newPosition);
        }
      }
      grid.push(gridRow);
    }
    return fillGrid(grid);
  };

  const buildWithOverlap = (noteStepback: number): Note[][] => {
    const grid: number[][] = [];
    for (let row = 0; row < 8; row++) {
      const gridRow: number[] = [];
      for (let column = 0; column < 8; column++) {
        if (row === 0) {
          gridRow.push(normalizePosition(column));
        } else {
          let newPosition: number;
          if (column === 0) {
            const previousNote = grid[row - 1][7];
            newPosition = normalizePosition(previousNote - noteStepback);
          } else {
            const previousNote = gridRow[column - 1];
            newPosition = normalizePosition(
              previousNote === 11 ? 0 : previousNote + 1,
            );
          }
          gridRow.push(newPosition);
        }
      }
      grid.push(gridRow);
    }
    return fillGrid(grid);
  };

  switch (width) {
    case 8:
      return buildEight();
    case 2:
      return buildWithOverlap(5);
    case 3:
      return buildWithOverlap(4);
    case 4:
      return buildWithOverlap(3);
    case 5:
      return buildWithOverlap(2);
    default:
      return buildEight();
  }
}

describe("Novation Launchpad - Differential Parity with `main`", () => {
  const supportedWidths = [8, 5, 4, 3, 2];

  supportedWidths.forEach((width) => {
    it(`width ${width} must match main's 64-cell note grid exactly`, () => {
      const expectedGrid = buildMainBranchGrid(width);
      const actualGrid = buildLaunchpadGrid(width);

      expect(actualGrid.length).toBe(8);
      for (let row = 0; row < 8; row++) {
        expect(actualGrid[row].length).toBe(8);
        for (let col = 0; col < 8; col++) {
          const expectedNote = expectedGrid[row][col];
          const actualCell = actualGrid[row][col];

          expect(actualCell.note.name).toBe(expectedNote.name);
          expect(actualCell.note.alias).toBe(expectedNote.alias);
          expect(actualCell.note.color).toBe(expectedNote.color);
          expect(actualCell.note.textColor).toBe(expectedNote.textColor);
          expect(actualCell.note.natural).toBe(expectedNote.natural);
        }
      }
    });
  });

  it("default fallback width must match main's default (width 8)", () => {
    const expectedGrid = buildMainBranchGrid(999);
    const actualGrid = buildLaunchpadGrid(999 as any);

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        expect(actualGrid[row][col].note.name).toBe(expectedGrid[row][col].name);
      }
    }
  });

  describe("Overlap Invariants", () => {
    const overlapWidths = [
      { width: 5, overlapCount: 3 }, // 8 - 5 = 3 pads overlap
      { width: 4, overlapCount: 4 }, // 8 - 4 = 4 pads overlap
      { width: 3, overlapCount: 5 }, // 8 - 3 = 5 pads overlap
      { width: 2, overlapCount: 6 }, // 8 - 2 = 6 pads overlap
    ];

    overlapWidths.forEach(({ width, overlapCount }) => {
      it(`width ${width} overlaps exactly ${overlapCount} pads between row r and row r+1 with identical pitch`, () => {
        const grid = buildLaunchpadGrid(width);

        for (let row = 0; row < 7; row++) {
          for (let i = 0; i < overlapCount; i++) {
            const rowEndCell = grid[row][width + i];
            const nextRowStartCell = grid[row + 1][i];

            // Same note
            expect(rowEndCell.note.name).toBe(nextRowStartCell.note.name);
            // Same absolute semitone
            expect(rowEndCell.absoluteSemitones).toBe(nextRowStartCell.absoluteSemitones);
            // Same pitch string
            expect(getCellPitch(rowEndCell)).toBe(getCellPitch(nextRowStartCell));
          }
        }
      });
    });
  });

  describe("Pitch & Octave Calculations (`getCellPitch`)", () => {
    it("sequential width 8 should produce correct ascending pitches across octave boundaries", () => {
      const grid = buildLaunchpadGrid(8);

      // Row 0, col 0 is C2 (semitone 0)
      expect(getCellPitch(grid[0][0])).toBe("C2");
      // Row 0, col 7 is G2 (semitone 7)
      expect(getCellPitch(grid[0][7])).toBe("G2");
      // Row 1, col 3 is B2 (semitone 11)
      expect(getCellPitch(grid[1][3])).toBe("B2");
      // Row 1, col 4 is C3 (semitone 12 - crosses octave boundary)
      expect(getCellPitch(grid[1][4])).toBe("C3");
      // Top-right pad (Row 7, col 7: 7*8 + 7 = 63 semitones -> C2 + 5 octaves + 3 semitones = D#7)
      expect(getCellPitch(grid[7][7])).toBe("D#7");
    });
  });

  describe("Note Highlighting on Launchpad (`getNoteHighlight`)", () => {
    it("should highlight root note and chord tones with full opacity, dim non-chord tones", () => {
      const cMajorChord = CHORDS.find((c) => c.name === "Major")!;
      const rootNoteNumber = 1; // C

      // C (root)
      const rootHighlight = getNoteHighlight(NOTES[0], cMajorChord.pattern, rootNoteNumber);
      expect(rootHighlight.opacity).toBe(1);
      expect(rootHighlight.filter).toBeUndefined();

      // E (chord tone - Major 3rd)
      const eHighlight = getNoteHighlight(NOTES[4], cMajorChord.pattern, rootNoteNumber);
      expect(eHighlight.opacity).toBe(1);
      expect(eHighlight.filter).toBeUndefined();

      // G (chord tone - 5th)
      const gHighlight = getNoteHighlight(NOTES[7], cMajorChord.pattern, rootNoteNumber);
      expect(gHighlight.opacity).toBe(1);
      expect(gHighlight.filter).toBeUndefined();

      // D (non-chord tone)
      const dHighlight = getNoteHighlight(NOTES[2], cMajorChord.pattern, rootNoteNumber);
      expect(dHighlight.opacity).toBe(0.8);
      expect(dHighlight.filter).toBe("grayscale(100%) brightness(15%)");
    });
  });

  describe("Legacy `localStorage` Migration from `main`", () => {
    it("should migrate legacy 'grid' instrument to 'launchpad' while preserving user settings", () => {
      const legacyPreferences = {
        gridWidth: 4,
        octaves: 3,
        visibleInstruments: ["piano", "grid", "guitar"],
        guitarFrets: 7,
        ukuleleFrets: 5,
        activeChordName: "Minor",
        synthType: "poly",
        favoriteChords: [],
      };

      const migrated = migratePreferences(legacyPreferences);

      expect(migrated.visibleInstruments).toEqual(["piano", "launchpad", "guitar"]);
      expect(migrated.gridWidth).toBe(4);
      expect(migrated.octaves).toBe(3);
      expect(migrated.guitarFrets).toBe(7);
      expect(migrated.activeChordName).toBe("Minor");
      expect(migrated.synthType).toBe("poly");
      // Defaults filled in for new Push preferences
      expect(migrated.pushLayout).toBe("4ths");
      expect(migrated.pushMode).toBe("chromatic");
    });

    it("should fallback to defaults on empty/invalid stored preferences", () => {
      const migrated = migratePreferences({});
      expect(migrated).toEqual(defaultPreferences);
    });
  });
});

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
});
