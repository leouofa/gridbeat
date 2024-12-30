export type GridWidth = 2 | 3 | 4 | 5 | 8;

export interface Preferences {
  gridWidth: GridWidth;
}

export type PreferencesContextType = {
  preferences: Preferences;
  updatePreferences: (newPreferences: Partial<Preferences>) => void;
};

/**
 * Describes a chord with a name and a pattern of intervals.
 */
export interface Chord {
  name: string;
  pattern: [number, number, number, ...number[]];
}

export interface Note {
  name: string;
  altName?: string;
  alias: string;
  natural: boolean;
  color: string;
  textColor: string;
}
