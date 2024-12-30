import { Note, Interval } from "@/types";

export const getNoteHighlight = (
  note: Note,
  pattern: Interval,
  rootNote: number,
): { opacity: number; filter?: string } => {
  // Convert note alias to number for comparison
  const noteValue = parseInt(note.alias);

  // Calculate the actual notes in the pattern
  const notesInPattern: number[] = [];
  let currentNote = rootNote;

  // First note is the root
  notesInPattern.push(currentNote);

  // Add each interval to get the next note
  for (let i = 0; i < pattern.length - 1; i++) {
    currentNote += pattern[i + 1];
    // Normalize to 1-12 range
    while (currentNote > 12) {
      currentNote -= 12;
    }
    notesInPattern.push(currentNote);
  }

  // Check if note is root
  if (noteValue === rootNote) {
    return {
      opacity: 1,
      filter: undefined,
    };
  }

  // Check if note is part of the pattern
  if (notesInPattern.includes(noteValue)) {
    return {
      opacity: 0.8,
      filter: undefined,
    };
  }

  // Note is not part of the chord
  return {
    opacity: 0.3,
    filter: "grayscale(100%)",
  };
};
