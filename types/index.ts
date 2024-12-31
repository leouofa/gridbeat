export type GridWidth = 2 | 3 | 4 | 5 | 8;
export type OctaveLength = 1 | 2 | 3 | 4;

export interface Preferences {
  gridWidth: GridWidth;
  octaves: OctaveLength;
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
}

export interface Note {
  name: string;
  altName?: string;
  alias: string;
  natural: boolean;
  color: string;
  textColor: string;
}
