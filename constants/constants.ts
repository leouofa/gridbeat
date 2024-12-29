import { Chord } from "@/types";

export const CHORD_DATA: Chord[] = [
  { name: "Major", pattern: [1, 4, 3] },
  { name: "Minor", pattern: [1, 3, 4] },
  { name: "Diminished", pattern: [1, 3, 3] },
  { name: "Augmented", pattern: [1, 4, 4] },
  { name: "Sustained", pattern: [1, 5, 2] },
  { name: "Sustained2", pattern: [1, 2, 5] },
  { name: "6th", pattern: [1, 4, 3, 2] },
  { name: "7th", pattern: [1, 4, 3, 3] },
  { name: "Maj7", pattern: [1, 4, 3, 4] },
  { name: "9", pattern: [1, 4, 3, 3, 4] },
  { name: "5", pattern: [1, 7, 5] },
];
