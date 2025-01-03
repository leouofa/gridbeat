export type GridWidth = 2 | 3 | 4 | 5 | 8;
export type OctaveLength = 1 | 2 | 3 | 4;
export type Instrument = "guitar" | "ukulele" | "grid" | "piano";
export type GuitarFrets = 3 | 5 | 7 | 9 | 12;
export type UkuleleFrets = 3 | 5 | 7 | 9 | 12;
export type SynthType = "basic" | "piano" | "poly";

export interface Preferences {
  gridWidth: GridWidth;
  octaves: OctaveLength;
  visibleInstruments: Instrument[];
  guitarFrets: GuitarFrets;
  ukuleleFrets: UkuleleFrets;
  activeChordName: string;
  synthType: SynthType;
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
