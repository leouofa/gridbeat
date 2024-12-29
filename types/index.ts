/**
 * Describes a chord with a name and a pattern of intervals.
 */
export interface Chord {
  name: string;
  pattern: [number, number, number, ...number[]];
}

export interface Preferences {
  gridWidth: number;
}
