export type GridWidth = 2 | 3 | 4 | 5 | 8;
export type PushLayout = "4ths" | "3rds" | "sequent";
export type PushMode = "chromatic" | "inKey";
export type OctaveLength = 1 | 2 | 3 | 4;
export type Instrument = "guitar" | "ukulele" | "launchpad" | "push" | "piano";
export type GuitarFrets = 3 | 5 | 7 | 9 | 12;
export type UkuleleFrets = 3 | 5 | 7 | 9 | 12;
export type SynthType = "piano" | "poly";

export interface Preferences {
  gridWidth: GridWidth;
  pushLayout: PushLayout;
  pushMode: PushMode;
  octaves: OctaveLength;
  visibleInstruments: Instrument[];
  guitarFrets: GuitarFrets;
  ukuleleFrets: UkuleleFrets;
  activeChordName: string;
  synthType: SynthType;
  favoriteChords: FavoriteChord[];
}

export interface FavoriteChord {
  rootNote: Note;
  chord: Chord;
}

export type PreferencesContextType = {
  preferences: Preferences;
  updatePreferences: (newPreferences: Partial<Preferences>) => void;
};

/**
 * Describes an Interval which is an array that must contain at least 3 numbers
 */
export type Interval = [number, number, number, ...number[]];

/**
 * Describes a chord with a name and a pattern of intervals.
 */
export interface Chord {
  name: string;
  pattern: Interval;
  description: string;
}

export interface Note {
  name: string;
  altName?: string;
  alias: string;
  natural: boolean;
  color: string;
  textColor: string;
}

type ScaleInterval = 1 | 2 | 3; // 1 = half step, 2 = whole step, 3 = augmented second

export interface Scale {
  name: ScaleName; // You could create a union type of allowed scale names
  pattern: ScaleInterval[];
  description: string;
  category?: ScaleCategory;
  noteCount: 5 | 6 | 7 | 8 | 9; // Different scales have different numbers of notes
}

type ScaleCategory = "Western";
export type ScaleName = "Major" | "Minor";

export interface GridPosition {
  row: number;
  column: number;
  note: string;
  pitch: string;
  isRoot: boolean;
}

export interface FretboardPosition {
  string: number;
  fret: number;
  note: string;
  pitch: string;
  isRoot: boolean;
}

export interface KeyboardPosition {
  keyIndex: number;
  octave: number;
  note: string;
  pitch: string;
  isRoot: boolean;
  isBlack: boolean;
}

export interface GridInstrumentShape {
  instrument: "launchpad" | "push";
  type: "grid";
  dimensions: {
    rows: number;
    columns: number;
    gridWidth?: number;
  };
  config?: {
    pushMode?: PushMode;
    pushLayout?: PushLayout;
    scale?: ScaleName;
    scaleRootNote?: number;
  };
  activePositions: GridPosition[];
}

export interface StringTuning {
  string: number;
  note: string;
  octave: number;
}

export interface FretboardInstrumentShape {
  instrument: "guitar" | "ukulele";
  type: "fretboard";
  frets: number;
  tuning: StringTuning[];
  activePositions: FretboardPosition[];
}

export interface KeyboardInstrumentShape {
  instrument: "piano";
  type: "keyboard";
  octaves: number;
  totalKeys: number;
  activePositions: KeyboardPosition[];
}

export type InstrumentShape =
  | GridInstrumentShape
  | FretboardInstrumentShape
  | KeyboardInstrumentShape;

export interface ChordShapeRequestConfig {
  gridWidth?: GridWidth;
  pushMode?: PushMode;
  pushLayout?: PushLayout;
  scale?: ScaleName;
  scaleRootNote?: number;
  guitarFrets?: GuitarFrets;
  ukuleleFrets?: UkuleleFrets;
  octaves?: OctaveLength;
}

export interface ChordShapeRequest {
  root: string | number;
  chord: string | number[];
  instruments?: Instrument[];
  config?: ChordShapeRequestConfig;
}

export interface ChordShapeResponse {
  root: Note;
  chord: Chord;
  chordNotes: string[];
  shapes: Partial<Record<Instrument, InstrumentShape>>;
}
