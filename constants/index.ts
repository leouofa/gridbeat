import { Chord, Note, Scale } from "@/types";

export const SCALES: Scale[] = [
  {
    name: "Major",
    pattern: [2, 2, 1, 2, 2, 2, 1],
    description:
      "The foundation of Western music, characterized by its bright and stable sound.",
    category: "Western",
    noteCount: 7,
  },
  {
    name: "Minor",
    pattern: [2, 1, 2, 2, 1, 2, 2],
    description:
      "The natural minor scale, often used to convey melancholy or darkness.",
    category: "Western",
    noteCount: 7,
  },
  {
    name: "Dorian",
    pattern: [2, 1, 2, 2, 2, 1, 2],
    description:
      "A minor mode with a raised 6th, common in folk and jazz music.",
    category: "Western",
    noteCount: 7,
  },
  {
    name: "Phrygian",
    pattern: [1, 2, 2, 2, 1, 2, 2],
    description:
      "A minor mode with a distinctive Spanish/Middle Eastern flavor.",
    category: "Western",
    noteCount: 7,
  },
  {
    name: "Mixolydian",
    pattern: [2, 2, 1, 2, 2, 1, 2],
    description: "A major mode with a lowered 7th, common in blues and rock.",
    category: "Western",
    noteCount: 7,
  },
  {
    name: "Melodic Minor",
    pattern: [2, 1, 2, 2, 2, 2, 1],
    description: "A minor scale with raised 6th and 7th degrees ascending.",
    category: "Jazz",
    noteCount: 7,
  },
  {
    name: "Harmonic Minor",
    pattern: [2, 1, 2, 2, 1, 3, 1],
    description: "A minor scale with a raised 7th, creating an exotic sound.",
    category: "Western",
    noteCount: 7,
  },
  {
    name: "BeBop",
    pattern: [2, 2, 1, 2, 2, 1, 1, 1],
    description: "A major scale with an added chromatic passing tone.",
    category: "Jazz",
    noteCount: 8,
  },
  {
    name: "Blues Scale",
    pattern: [3, 2, 1, 1, 3, 2],
    description: "A minor pentatonic scale with an added diminished 5th.",
    category: "Blues",
    noteCount: 6,
  },
  {
    name: "Minor Pentatonic",
    pattern: [3, 2, 2, 3, 2],
    description: "A five-note scale commonly used in blues and rock music.",
    category: "Blues",
    noteCount: 5,
  },
  {
    name: "Hungarian Minor",
    pattern: [2, 1, 3, 1, 1, 3, 1],
    description: "An exotic scale with two augmented seconds.",
    category: "World",
    noteCount: 7,
  },
  {
    name: "Ukrainian Dorian Mode",
    pattern: [2, 1, 3, 1, 2, 1, 2],
    description: "A unique modal scale with raised 4th and lowered 7th.",
    category: "World",
    noteCount: 7,
  },
  {
    name: "Marva",
    pattern: [1, 3, 2, 1, 2, 2, 1],
    description: "An Indian raga scale with raised 4th and 6th degrees.",
    category: "World",
    noteCount: 7,
  },
  {
    name: "Todi",
    pattern: [1, 2, 3, 1, 2, 2, 1],
    description: "An Indian raga scale with complex emotional qualities.",
    category: "World",
    noteCount: 7,
  },
  {
    name: "Whole Tone Scale",
    pattern: [2, 2, 2, 2, 2, 2],
    description: "A symmetrical scale made up entirely of whole steps.",
    category: "Exotic",
    noteCount: 6,
  },
  {
    name: "Hirajoshi",
    pattern: [2, 1, 2, 2, 1, 2, 2], // Breaking down the 4s into 2+2
    description:
      "A Japanese pentatonic scale with a distinctive oriental sound.",
    category: "World",
    noteCount: 5,
  },
];

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
