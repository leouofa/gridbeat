import { Note, Interval, Scale, PushLayout, PushMode } from "@/types";
import { NOTES, SCALES } from "@/constants";

export interface GridCell {
  note: Note;
  absoluteSemitones: number;
}

export const normalizePosition = (position: number): number => {
  let normalized = position % 12;
  if (normalized < 0) normalized += 12;
  return normalized;
};

export const getPushChromaticRowStep = (layout: PushLayout): number => {
  switch (layout) {
    case "4ths":
      return 5;
    case "3rds":
      return 4; // Major third: C -> E -> G# -> C
    case "sequent":
      return 8;
  }
};

export const getPushInKeyRowStep = (
  layout: PushLayout,
  scaleLength: number = 7,
): number => {
  switch (layout) {
    case "4ths":
      return 3;
    case "3rds":
      return 2;
    case "sequent":
      return scaleLength; // 1 full octave per row: C1 -> C2 -> C3 -> C4
  }
};

export const resolveActiveScale = (
  scale?: Scale,
  pattern?: Interval,
): Scale => {
  if (scale) return scale;
  // Infer Minor scale for chords with a minor 3rd (e.g., Minor, Diminished), otherwise Major
  const isMinorQuality = pattern && pattern[1] === 3;
  const targetName = isMinorQuality ? "Minor" : "Major";
  return SCALES.find((s) => s.name === targetName) ?? SCALES[0];
};

export const getScaleDegreeSemitones = (activeScale: Scale): number[] => {
  const offsets: number[] = [0];
  let acc = 0;
  for (let i = 0; i < activeScale.pattern.length - 1; i++) {
    acc += activeScale.pattern[i];
    offsets.push(acc);
  }
  return offsets;
};

export const buildLaunchpadGrid = (width: number = 8): GridCell[][] => {
  const rowStep = [2, 3, 4, 5, 8].includes(width) ? width : 8;
  const grid: GridCell[][] = [];

  for (let row = 0; row < 8; row++) {
    const gridRow: GridCell[] = [];
    for (let column = 0; column < 8; column++) {
      const absoluteSemitones = row * rowStep + column;
      const note = NOTES[normalizePosition(absoluteSemitones)];
      gridRow.push({ note, absoluteSemitones });
    }
    grid.push(gridRow);
  }

  return grid;
};

export interface PushGridOptions {
  pushMode: PushMode;
  pushLayout: PushLayout;
  rootNote?: number;
  scaleRootNote?: number;
  scale?: Scale;
  pattern?: Interval;
}

export const buildPushGrid = (options: PushGridOptions): GridCell[][] => {
  const {
    pushMode,
    pushLayout,
    rootNote,
    scaleRootNote,
    scale,
    pattern,
  } = options;

  const anchorNoteNumber = scaleRootNote ?? rootNote ?? 1;
  const anchorIndex = normalizePosition(anchorNoteNumber - 1);
  const grid: GridCell[][] = [];

  if (pushMode === "inKey") {
    const activeScale = resolveActiveScale(scale, pattern);
    const degreeOffsets = getScaleDegreeSemitones(activeScale);
    const scaleLen = degreeOffsets.length;
    const rowDegreeStep = getPushInKeyRowStep(pushLayout, scaleLen);

    for (let row = 0; row < 8; row++) {
      const gridRow: GridCell[] = [];
      for (let column = 0; column < 8; column++) {
        const degreeIndex = row * rowDegreeStep + column;
        const octaveSemitones = Math.floor(degreeIndex / scaleLen) * 12;
        const degreeSemitones = degreeOffsets[degreeIndex % scaleLen];
        const absoluteSemitones =
          anchorIndex + octaveSemitones + degreeSemitones;
        const note = NOTES[normalizePosition(absoluteSemitones)];
        gridRow.push({ note, absoluteSemitones });
      }
      grid.push(gridRow);
    }
  } else {
    const rowStep = getPushChromaticRowStep(pushLayout);

    for (let row = 0; row < 8; row++) {
      const gridRow: GridCell[] = [];
      for (let column = 0; column < 8; column++) {
        const absoluteSemitones = anchorIndex + row * rowStep + column;
        const note = NOTES[normalizePosition(absoluteSemitones)];
        gridRow.push({ note, absoluteSemitones });
      }
      grid.push(gridRow);
    }
  }

  return grid;
};
