import { useNotePlayer } from "@/hooks/useNotePlayer";
import { Note, SynthType } from "@/types";

export const useGridNotePlayer = (synthType?: SynthType) => {
  const {
    playNote: basePlayNote,
    isLoading,
    isVisible,
  } = useNotePlayer("grid", synthType);

  const playGridNote = async (
    note: Note,
    rowIndex: number,
    columnIndex: number,
  ) => {
    const actualRowIndex = 7 - rowIndex;
    const position = actualRowIndex * 8 + columnIndex;

    let octave = 1;
    let notePosition = 0;

    for (let i = 0; i < position; i++) {
      if (notePosition === 12) {
        notePosition = 0;
      }
      if (notePosition === 0) {
        octave++;
      }
      notePosition++;
    }

    basePlayNote(note, octave);
  };

  return {
    playNote: playGridNote,
    isLoading,
    isVisible,
  };
};
