"use client";

import React from "react";
import { Note, Interval } from "@/types";
import { NOTES } from "@/constants";
import { usePreferences } from "@/contexts/PreferencesContext";
import { getNoteHighlight } from "@/utils/NoteHighlighter";

interface GridProps {
  pattern?: Interval;
  rootNote?: number;
}

const Grid: React.FC<GridProps> = ({ pattern, rootNote }) => {
  const { preferences } = usePreferences();

  // Early return if grid is not in visible instruments
  if (!preferences.visibleInstruments.includes("grid")) {
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
    const width = preferences.gridWidth;

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
    <div className="p-4">
      {grid.reverse().map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((note, columnIndex) => {
            // Only get highlight if both pattern and rootNote are provided
            const highlight =
              pattern && rootNote !== undefined
                ? getNoteHighlight(note, pattern, rootNote)
                : {};

            return (
              <div
                key={`${rowIndex}-${columnIndex}`}
                className="w-12 h-12 flex items-center justify-center m-1 rounded"
                style={{
                  backgroundColor: note.color,
                  color: note.textColor,
                  ...highlight,
                }}
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
