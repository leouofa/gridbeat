"use client";

import React from "react";
import { NOTES } from "@/constants";
import { Note, Interval } from "@/types";
import { getNoteHighlight } from "@/utils/NoteHighlighter";
import { usePreferences } from "@/contexts/PreferencesContext";

interface UkuleleStringProps {
  startNote: Note;
  pattern?: Interval;
  rootNote?: number;
  frets: number;
}

const UkuleleString: React.FC<UkuleleStringProps> = ({
  startNote,
  pattern,
  rootNote,
  frets,
}) => {
  // Generate frets for each string based on preferences
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
              flex items-center justify-center
              ${index === 0 ? "w-12 border-r border-gray-400" : "w-16 border-r border-gray-400"}
            `}
            style={{
              backgroundColor: note.color,
              color: note.textColor,
              ...highlight,
            }}
          >
            {note.name}
          </div>
        );
      })}
    </div>
  );
};

interface UkuleleProps {
  pattern?: Interval;
  rootNote?: number;
}

const Ukulele: React.FC<UkuleleProps> = ({ pattern, rootNote }) => {
  const { preferences } = usePreferences();

  // Early return if ukulele is not in visible instruments
  if (!preferences.visibleInstruments.includes("ukulele")) {
    return null;
  }

  // Standard ukulele tuning (from highest to lowest string)
  const standardTuning = [
    NOTES[7], // G
    NOTES[0], // C
    NOTES[4], // E
    NOTES[9], // A
  ];

  return (
    <div className="w-fit overflow-x-auto p-4">
      <div className="border rounded">
        {/* Fret numbers */}
        <div className="flex h-8 border-b border-gray-300">
          <div className="w-12 flex items-center justify-center border-r border-gray-400"></div>
          {[...Array(preferences.ukuleleFrets)].map((_, index) => {
            const fretNumber = index + 1;
            const isBoldFret = [3, 5, 7, 10, 12].includes(fretNumber);

            return (
              <div
                key={index}
                className={`
                  w-16 flex items-center justify-center border-r border-gray-400
                  ${isBoldFret ? "bg-gray-500 text-white" : ""}
                `}
              >
                {fretNumber}
              </div>
            );
          })}
        </div>

        {/* Ukulele strings */}
        {standardTuning.map((note, index) => (
          <UkuleleString
            key={index}
            startNote={note}
            pattern={pattern}
            rootNote={rootNote}
            frets={preferences.ukuleleFrets}
          />
        ))}
      </div>
    </div>
  );
};

export default Ukulele;
