import { Chord, Note } from "@/types";

export const CHORDS: Chord[] = [
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
