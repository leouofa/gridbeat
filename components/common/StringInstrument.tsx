import React from "react";
import { Note, Interval } from "@/types";
import { NOTES } from "@/constants";
import { getNoteHighlight } from "@/utils/NoteHighlighter";

interface StringProps {
  startNote: Note;
  pattern?: Interval;
  rootNote?: number;
  frets: number;
  onPlay: (note: Note, octave: number) => void;
  stringOctave: number;
}

export const InstrumentString: React.FC<StringProps> = ({
  startNote,
  pattern,
  rootNote,
  frets,
  onPlay,
  stringOctave,
}) => {
  const getFretNotes = () => {
    const fretNotes = [];
    const currentNoteIndex = NOTES.findIndex(
      (note) => note.name === startNote.name,
    );

    for (let fret = 0; fret <= frets; fret++) {
      const noteIndex = (currentNoteIndex + fret) % 12;
      fretNotes.push(NOTES[noteIndex]);
    }
    return fretNotes;
  };

  const fretNotes = getFretNotes();
  const currentNoteIndex = NOTES.findIndex(
    (note) => note.name === startNote.name,
  );

  return (
    <div className="flex h-8 border-b border-gray-300">
      {fretNotes.map((note, index) => {
        const highlight =
          pattern && rootNote !== undefined
            ? getNoteHighlight(note, pattern, rootNote)
            : { opacity: 1 };

        return (
          <div
            key={index}
            className={`
              flex items-center justify-center cursor-pointer
              hover:saturate-[2.5] active:saturate-[3.0]
              select-none
              ${index === 0 ? "w-12 border-r border-gray-400" : "w-16 border-r border-gray-400"}
            `}
            style={{
              backgroundColor: note.color,
              color: note.textColor,
              ...highlight,
            }}
            onClick={() => {
              const octaveShift = Math.floor((index + currentNoteIndex) / 12);
              onPlay(note, stringOctave + octaveShift);
            }}
          >
            {note.name}
          </div>
        );
      })}
    </div>
  );
};
