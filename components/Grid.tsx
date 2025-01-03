"use client";

import React, { useEffect, useState } from "react";
import { Note, Interval } from "@/types";
import { NOTES } from "@/constants";
import { usePreferences } from "@/contexts/PreferencesContext";
import { getNoteHighlight } from "@/utils/NoteHighlighter";
import * as Tone from "tone";

interface GridProps {
  pattern?: Interval;
  rootNote?: number;
  props?: {
    visible?: boolean;
    width?: number;
  };
}

const Grid: React.FC<GridProps> = ({ pattern, rootNote, props }) => {
  const { preferences } = usePreferences();
  const [synth, setSynth] = useState<Tone.Synth | null>(null);

  useEffect(() => {
    const newSynth = new Tone.Synth().toDestination();
    setSynth(newSynth);

    return () => {
      newSynth.dispose();
    };
  }, []);

  const playNote = async (
    note: Note,
    rowIndex: number,
    columnIndex: number,
  ) => {
    await Tone.start();

    if (synth) {
      // Since the grid is rendered in reverse, we need to flip the row index
      const actualRowIndex = 7 - rowIndex;
      const position = actualRowIndex * 8 + columnIndex;

      // Start from octave 1
      let octave = 1;
      let notePosition = 0;

      for (let i = 0; i < position; i++) {
        if (notePosition === 12) {
          notePosition = 0;
        }
        if (notePosition === 0) {
          // We've hit a C
          octave++;
        }
        notePosition++;
      }

      const standardNoteName = note.name.replace("♯", "#");
      const noteWithOctave = `${standardNoteName}${octave}`;
      synth.triggerAttackRelease(noteWithOctave, "8n");
    }
  };

  // Use props.visible if provided, otherwise check preferences
  const isVisible =
    props?.visible ?? preferences.visibleInstruments.includes("grid");

  // Early return if grid should not be visible
  if (!isVisible) {
    return null;
  }

  // Helper function to normalize note position
  const normalizePosition = (position: number): number => {
    // Handle negative numbers and numbers larger than 11
    let normalized = position % 12;
    if (normalized < 0) normalized += 12;
    return normalized;
  };

  const buildGrid = (): Note[][] => {
    // Use props.width if provided, otherwise use preferences width
    const width = props?.width ?? preferences.gridWidth;

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

  const fillGrid = (gridWithNumbers: number[][]): Note[][] => {
    return gridWithNumbers.map((row) =>
      row.map((position) => {
        const normalizedPos = normalizePosition(position);
        return NOTES[normalizedPos];
      }),
    );
  };

  const grid = buildGrid();

  return (
    <div>
      {grid.reverse().map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((note, columnIndex) => {
            const highlight =
              pattern && rootNote !== undefined
                ? getNoteHighlight(note, pattern, rootNote)
                : {};

            return (
              <div
                key={`${rowIndex}-${columnIndex}`}
                className="w-12 h-12 flex items-center justify-center m-1 rounded border-2 border-gray-800 dark:border-gray-200 cursor-pointer hover:opacity-80 active:opacity-60 select-none"
                style={{
                  backgroundColor: note.color,
                  color: note.textColor,
                  ...highlight,
                }}
                onClick={() => playNote(note, rowIndex, columnIndex)}
              >
                {note.name}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Grid;
