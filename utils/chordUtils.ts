import { NOTES } from "@/constants";
import { Note, Chord } from "@/types";
import * as Tone from "tone";

export const getChordNotes = (
  rootNote: number,
  pattern: number[],
): string[] => {
  const notesInPattern: number[] = [];
  let currentNote = rootNote;

  notesInPattern.push(currentNote);

  for (let i = 0; i < pattern.length - 1; i++) {
    currentNote += pattern[i + 1];
    while (currentNote > 12) {
      currentNote -= 12;
    }
    notesInPattern.push(currentNote);
  }

  return notesInPattern.map(
    (noteNum) =>
      NOTES.find((note) => parseInt(note.alias) === noteNum)?.name || "",
  );
};

export const playChord = async (
  instrument: Tone.Sampler | Tone.Synth | Tone.PolySynth | null,
  chordNotes: string[],
) => {
  await Tone.start();

  if (instrument) {
    chordNotes.forEach((note) => {
      const standardNoteName = note.replace("♯", "#");
      const noteWithOctave = `${standardNoteName}4`;
      instrument.triggerAttackRelease(noteWithOctave, "0.5");
    });
  }
};

export const isFavoriteChord = (
  favorites: Array<{ rootNote: Note; chord: Chord }>,
  rootNote: Note,
  chord: Chord,
) => {
  return favorites.some(
    (fc) => fc.rootNote.name === rootNote.name && fc.chord.name === chord.name,
  );
};
