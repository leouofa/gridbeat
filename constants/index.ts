import { Chord, Note } from "@/types";

export const CHORDS: Chord[] = [
  {
    name: "Major",
    pattern: [1, 4, 3],
    description:
      "A bright and happy-sounding chord made up of a root, major third, and perfect fifth.",
  },
  {
    name: "Minor",
    pattern: [1, 3, 4],
    description:
      "A somber or emotional chord created by a root, minor third, and perfect fifth.",
  },
  {
    name: "Diminished",
    pattern: [1, 3, 3],
    description:
      "A tense and unresolved chord formed with a root, minor third, and diminished fifth.",
  },
  {
    name: "Augmented",
    pattern: [1, 4, 4],
    description:
      "A dissonant and otherworldly chord consisting of a root, major third, and augmented fifth.",
  },
  {
    name: "Sustained",
    pattern: [1, 5, 2],
    description:
      "A chord that replaces the third with a perfect fourth for an open, unresolved sound.",
  },
  {
    name: "Sustained2",
    pattern: [1, 2, 5],
    description:
      "A variation of the sustained chord that replaces the third with a major second.",
  },
  {
    name: "6th",
    pattern: [1, 4, 3, 2],
    description:
      "A warm and jazzy chord adding a major sixth to the major triad.",
  },
  {
    name: "7th",
    pattern: [1, 4, 3, 3],
    description:
      "A dominant chord with a root, major third, perfect fifth, and minor seventh, creating tension.",
  },
  {
    name: "Maj7",
    pattern: [1, 4, 3, 4],
    description:
      "A smooth and jazzy chord made of a root, major third, perfect fifth, and major seventh.",
  },
  {
    name: "9",
    pattern: [1, 4, 3, 3, 4],
    description:
      "A colorful chord that extends a 7th chord by adding a major ninth.",
  },
  {
    name: "5",
    pattern: [1, 7, 5],
    description:
      "A power chord made up of only the root and perfect fifth, often used in rock music.",
  },
];
export const NOTES: Note[] = [
  {
    name: "C",
    alias: "1",
    natural: true,
    color: "#de43dd",
    textColor: "white",
  },
  {
    name: "C♯",
    altName: "D♭",
    alias: "2",
    natural: false,
    color: "#2bfda6",
    textColor: "black",
  },
  {
    name: "D",
    alias: "3",
    natural: true,
    color: "#acef39",
    textColor: "black",
  },
  {
    name: "D♯",
    altName: "E♭",
    alias: "4",
    natural: false,
    color: "#2ecc35",
    textColor: "black",
  },
  {
    name: "E",
    alias: "5",
    natural: true,
    color: "#95fee8",
    textColor: "black",
  },
  {
    name: "F",
    altName: "G♭",
    alias: "6",
    natural: true,
    color: "#2dd9d8",
    textColor: "black",
  },
  {
    name: "F♯",
    alias: "7",
    natural: false,
    color: "#2ca8d3",
    textColor: "white",
  },
  {
    name: "G",
    alias: "8",
    natural: true,
    color: "#4d56fb",
    textColor: "white",
  },
  {
    name: "G♯",
    altName: "A♭",
    alias: "9",
    natural: false,
    color: "#a37dfc",
    textColor: "white",
  },
  {
    name: "A",
    alias: "10",
    natural: true,
    color: "#9b3ce9",
    textColor: "white",
  },
  {
    name: "A♯",
    altName: "B♭",
    alias: "11",
    natural: false,
    color: "#f3f136",
    textColor: "black",
  },
  {
    name: "B",
    alias: "12",
    natural: true,
    color: "#e97b25",
    textColor: "black",
  },
];
