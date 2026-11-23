import { NOTES, CHORDS, SCALES } from "@/constants";
import {
  Note,
  Chord,
  Interval,
  Instrument,
  GridWidth,
  GuitarFrets,
  UkuleleFrets,
  OctaveLength,
  PushLayout,
  PushMode,
  ScaleName,
  GridInstrumentShape,
  FretboardInstrumentShape,
  KeyboardInstrumentShape,
  ChordShapeRequest,
  ChordShapeResponse,
  GridPosition,
  FretboardPosition,
  KeyboardPosition,
  StringTuning,
} from "@/types";
import {
  buildLaunchpadGrid,
  buildPushGrid,
  getCellPitch,
  PushGridOptions,
} from "@/utils/gridUtils";
import { getChordNotes } from "@/utils/chordUtils";

export const GUITAR_TUNING: StringTuning[] = [
  { string: 1, note: "E", octave: 4 }, // High E (NOTES[4])
  { string: 2, note: "B", octave: 3 }, // B (NOTES[11])
  { string: 3, note: "G", octave: 3 }, // G (NOTES[7])
  { string: 4, note: "D", octave: 3 }, // D (NOTES[2])
  { string: 5, note: "A", octave: 2 }, // A (NOTES[9])
  { string: 6, note: "E", octave: 2 }, // Low E (NOTES[4])
];

export const UKULELE_TUNING: StringTuning[] = [
  { string: 1, note: "G", octave: 4 }, // G (NOTES[7])
  { string: 2, note: "C", octave: 4 }, // C (NOTES[0])
  { string: 3, note: "E", octave: 4 }, // E (NOTES[4])
  { string: 4, note: "A", octave: 3 }, // A (NOTES[9])
];

export const resolveRootNote = (input: string | number): Note | undefined => {
  if (typeof input === "number") {
    return NOTES.find((note) => parseInt(note.alias, 10) === input);
  }

  const str = input.trim();
  const numeric = parseInt(str, 10);
  if (!isNaN(numeric) && numeric >= 1 && numeric <= 12 && String(numeric) === str) {
    return NOTES.find((note) => parseInt(note.alias, 10) === numeric);
  }

  // Normalize accidental characters
  const normalized = str
    .replace(/#/g, "♯")
    .replace(/b/g, "♭")
    .toLowerCase();

  return NOTES.find((note) => {
    const nameMatch = note.name.toLowerCase() === normalized;
    const altMatch = note.altName && note.altName.toLowerCase() === normalized;
    return nameMatch || altMatch;
  });
};

export const resolveChord = (
  input: string | number[] | Interval,
): Chord | undefined => {
  if (Array.isArray(input)) {
    if (input.length < 3) return undefined;
    if (input.some((n) => typeof n !== "number" || isNaN(n))) return undefined;
    return {
      name: "Custom",
      pattern: input as Interval,
      description: "Custom chord pattern",
    };
  }

  if (typeof input !== "string") return undefined;

  const trimmed = input.trim();

  // Direct case-insensitive match on name
  const exactMatch = CHORDS.find(
    (c) => c.name.toLowerCase() === trimmed.toLowerCase(),
  );
  if (exactMatch) return exactMatch;

  // Common aliases
  const aliasLower = trimmed.toLowerCase();
  switch (aliasLower) {
    case "maj":
    case "major":
      return CHORDS.find((c) => c.name === "Major");
    case "m":
    case "min":
    case "minor":
      return CHORDS.find((c) => c.name === "Minor");
    case "dim":
    case "diminished":
      return CHORDS.find((c) => c.name === "Diminished");
    case "aug":
    case "augmented":
      return CHORDS.find((c) => c.name === "Augmented");
    case "sus":
    case "sus4":
    case "sustained":
      return CHORDS.find((c) => c.name === "Sustained");
    case "sus2":
    case "sustained2":
      return CHORDS.find((c) => c.name === "Sustained2");
    case "6":
    case "6th":
      return CHORDS.find((c) => c.name === "6th");
    case "7":
    case "7th":
    case "dom7":
      return CHORDS.find((c) => c.name === "7th");
    case "maj7":
    case "major7":
      return CHORDS.find((c) => c.name === "Maj7");
    case "9":
    case "9th":
      return CHORDS.find((c) => c.name === "9");
    case "5":
    case "power":
      return CHORDS.find((c) => c.name === "5");
    default:
      return undefined;
  }
};

export const getNotesInChord = (
  rootNote: Note,
  pattern: Interval,
): { noteValues: number[]; rootValue: number } => {
  const rootValue = parseInt(rootNote.alias, 10);
  const noteValues: number[] = [rootValue];
  let currentNote = rootValue;

  for (let i = 0; i < pattern.length - 1; i++) {
    currentNote += pattern[i + 1];
    while (currentNote > 12) {
      currentNote -= 12;
    }
    noteValues.push(currentNote);
  }

  return { noteValues, rootValue };
};

export const calculateLaunchpadShape = (
  rootNote: Note,
  chord: Chord,
  width: GridWidth = 8,
): GridInstrumentShape => {
  const grid = buildLaunchpadGrid(width);
  const { noteValues, rootValue } = getNotesInChord(rootNote, chord.pattern);
  const activePositions: GridPosition[] = [];

  for (let row = 0; row < grid.length; row++) {
    for (let column = 0; column < grid[row].length; column++) {
      const cell = grid[row][column];
      const cellValue = parseInt(cell.note.alias, 10);
      if (noteValues.includes(cellValue)) {
        activePositions.push({
          row,
          column,
          note: cell.note.name,
          pitch: getCellPitch(cell),
          isRoot: cellValue === rootValue,
        });
      }
    }
  }

  return {
    instrument: "launchpad",
    type: "grid",
    dimensions: {
      rows: 8,
      columns: 8,
      gridWidth: width,
    },
    activePositions,
  };
};

export const calculatePushShape = (
  rootNote: Note,
  chord: Chord,
  options?: {
    pushMode?: PushMode;
    pushLayout?: PushLayout;
    scale?: ScaleName;
    scaleRootNote?: number;
  },
): GridInstrumentShape => {
  const pushMode = options?.pushMode ?? "chromatic";
  const pushLayout = options?.pushLayout ?? "4ths";
  const scale = options?.scale
    ? SCALES.find((s) => s.name === options.scale)
    : undefined;
  const rootNoteNumber = parseInt(rootNote.alias, 10);

  const pushOptions: PushGridOptions = {
    pushMode,
    pushLayout,
    rootNote: rootNoteNumber,
    scaleRootNote: options?.scaleRootNote,
    scale,
    pattern: chord.pattern,
  };

  const grid = buildPushGrid(pushOptions);
  const { noteValues, rootValue } = getNotesInChord(rootNote, chord.pattern);
  const activePositions: GridPosition[] = [];

  for (let row = 0; row < grid.length; row++) {
    for (let column = 0; column < grid[row].length; column++) {
      const cell = grid[row][column];
      const cellValue = parseInt(cell.note.alias, 10);
      if (noteValues.includes(cellValue)) {
        activePositions.push({
          row,
          column,
          note: cell.note.name,
          pitch: getCellPitch(cell),
          isRoot: cellValue === rootValue,
        });
      }
    }
  }

  return {
    instrument: "push",
    type: "grid",
    dimensions: {
      rows: 8,
      columns: 8,
    },
    config: {
      pushMode,
      pushLayout,
      scale: options?.scale,
      scaleRootNote: options?.scaleRootNote,
    },
    activePositions,
  };
};

export const calculateGuitarShape = (
  rootNote: Note,
  chord: Chord,
  frets: GuitarFrets = 12,
): FretboardInstrumentShape => {
  const { noteValues, rootValue } = getNotesInChord(rootNote, chord.pattern);
  const activePositions: FretboardPosition[] = [];

  GUITAR_TUNING.forEach((tuning) => {
    const startNoteIndex = NOTES.findIndex((n) => n.name === tuning.note);
    for (let fret = 0; fret <= frets; fret++) {
      const noteIndex = (startNoteIndex + fret) % 12;
      const note = NOTES[noteIndex];
      const noteValue = parseInt(note.alias, 10);

      if (noteValues.includes(noteValue)) {
        const octaveShift = Math.floor((fret + startNoteIndex) / 12);
        const octave = tuning.octave + octaveShift;
        const standardNoteName = note.name.replace("♯", "#");
        activePositions.push({
          string: tuning.string,
          fret,
          note: note.name,
          pitch: `${standardNoteName}${octave}`,
          isRoot: noteValue === rootValue,
        });
      }
    }
  });

  return {
    instrument: "guitar",
    type: "fretboard",
    frets,
    tuning: GUITAR_TUNING,
    activePositions,
  };
};

export const calculateUkuleleShape = (
  rootNote: Note,
  chord: Chord,
  frets: UkuleleFrets = 12,
): FretboardInstrumentShape => {
  const { noteValues, rootValue } = getNotesInChord(rootNote, chord.pattern);
  const activePositions: FretboardPosition[] = [];

  UKULELE_TUNING.forEach((tuning) => {
    const startNoteIndex = NOTES.findIndex((n) => n.name === tuning.note);
    for (let fret = 0; fret <= frets; fret++) {
      const noteIndex = (startNoteIndex + fret) % 12;
      const note = NOTES[noteIndex];
      const noteValue = parseInt(note.alias, 10);

      if (noteValues.includes(noteValue)) {
        const octaveShift = Math.floor((fret + startNoteIndex) / 12);
        const octave = tuning.octave + octaveShift;
        const standardNoteName = note.name.replace("♯", "#");
        activePositions.push({
          string: tuning.string,
          fret,
          note: note.name,
          pitch: `${standardNoteName}${octave}`,
          isRoot: noteValue === rootValue,
        });
      }
    }
  });

  return {
    instrument: "ukulele",
    type: "fretboard",
    frets,
    tuning: UKULELE_TUNING,
    activePositions,
  };
};

export const calculatePianoShape = (
  rootNote: Note,
  chord: Chord,
  octaves: OctaveLength = 2,
): KeyboardInstrumentShape => {
  const { noteValues, rootValue } = getNotesInChord(rootNote, chord.pattern);
  const activePositions: KeyboardPosition[] = [];

  let keyIndex = 0;
  for (let octave = 0; octave < octaves; octave++) {
    for (let n = 0; n < NOTES.length; n++) {
      const note = NOTES[n];
      const noteValue = parseInt(note.alias, 10);
      if (noteValues.includes(noteValue)) {
        const standardNoteName = note.name.replace("♯", "#");
        activePositions.push({
          keyIndex,
          octave,
          note: note.name,
          pitch: `${standardNoteName}${octave + 2}`,
          isRoot: noteValue === rootValue,
          isBlack: !note.natural,
        });
      }
      keyIndex++;
    }
  }

  // Final C key for the last octave
  const finalC = NOTES[0];
  const finalCValue = parseInt(finalC.alias, 10);
  if (noteValues.includes(finalCValue)) {
    activePositions.push({
      keyIndex,
      octave: octaves,
      note: finalC.name,
      pitch: `C${octaves + 2}`,
      isRoot: finalCValue === rootValue,
      isBlack: false,
    });
  }

  return {
    instrument: "piano",
    type: "keyboard",
    octaves,
    totalKeys: octaves * 12 + 1,
    activePositions,
  };
};

const ALL_INSTRUMENTS: Instrument[] = [
  "launchpad",
  "push",
  "guitar",
  "ukulele",
  "piano",
];

export const getChordShapes = (
  request: ChordShapeRequest,
): ChordShapeResponse => {
  const rootNote = resolveRootNote(request.root);
  if (!rootNote) {
    throw new Error(`Invalid root note: "${request.root}"`);
  }

  const chord = resolveChord(request.chord);
  if (!chord) {
    throw new Error(
      `Invalid chord: "${Array.isArray(request.chord) ? JSON.stringify(request.chord) : request.chord}"`,
    );
  }

  const rootNumber = parseInt(rootNote.alias, 10);
  const chordNotes = getChordNotes(rootNumber, chord.pattern);

  const targetInstruments =
    request.instruments && request.instruments.length > 0
      ? request.instruments
      : ALL_INSTRUMENTS;

  const shapes: ChordShapeResponse["shapes"] = {};
  const config = request.config;

  for (const inst of targetInstruments) {
    switch (inst) {
      case "launchpad":
        shapes.launchpad = calculateLaunchpadShape(
          rootNote,
          chord,
          config?.gridWidth,
        );
        break;
      case "push":
        shapes.push = calculatePushShape(rootNote, chord, {
          pushMode: config?.pushMode,
          pushLayout: config?.pushLayout,
          scale: config?.scale,
          scaleRootNote: config?.scaleRootNote,
        });
        break;
      case "guitar":
        shapes.guitar = calculateGuitarShape(
          rootNote,
          chord,
          config?.guitarFrets,
        );
        break;
      case "ukulele":
        shapes.ukulele = calculateUkuleleShape(
          rootNote,
          chord,
          config?.ukuleleFrets,
        );
        break;
      case "piano":
        shapes.piano = calculatePianoShape(
          rootNote,
          chord,
          config?.octaves,
        );
        break;
    }
  }

  return {
    root: rootNote,
    chord,
    chordNotes,
    shapes,
  };
};
