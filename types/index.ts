export type GridWidth = 2 | 3 | 4 | 5 | 8;
export type OctaveLength = 1 | 2 | 3 | 4;
export type Instrument = "guitar" | "ukulele" | "grid" | "piano";
export type GuitarFrets = 3 | 5 | 7 | 9 | 12;
export type UkuleleFrets = 3 | 5 | 7 | 9 | 12;
export type SynthType = "piano" | "poly";

export interface Preferences {
  gridWidth: GridWidth;
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
type ScaleName = "Major" | "Minor";
