import { Note } from "@/types";
import { NOTES } from "@/constants";

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

export const buildGrid = (width: number): Note[][] => {
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
