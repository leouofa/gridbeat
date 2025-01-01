"use client";

import React from "react";
import { NOTES } from "@/constants";
import { Note, Interval } from "@/types";
import { getNoteHighlight } from "@/utils/NoteHighlighter";
import { usePreferences } from "@/contexts/PreferencesContext";

interface GuitarStringProps {
  startNote: Note;
  pattern?: Interval;
  rootNote?: number;
  frets: number;
}

const GuitarString: React.FC<GuitarStringProps> = ({
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

interface GuitarProps {
  pattern?: Interval;
  rootNote?: number;
}

const Guitar: React.FC<GuitarProps> = ({ pattern, rootNote }) => {
  const { preferences } = usePreferences();

  // Early return if guitar is not in visible instruments
  if (!preferences.visibleInstruments.includes("guitar")) {
    return null;
  }

  // Standard guitar tuning (from highest to lowest string)
  const standardTuning = [
    NOTES[4], // E
    NOTES[11], // B
    NOTES[7], // G
    NOTES[2], // D
    NOTES[9], // A
    NOTES[4], // E
  ];

  return (
    <div className="w-fit overflow-x-auto p-4">
      <div className="border rounded">
        {/* Fret numbers */}
        <div className="flex h-8 border-b border-gray-300">
          <div className="w-12 flex items-center justify-center border-r border-gray-400"></div>
          {[...Array(preferences.guitarFrets)].map((_, index) => (
            <div
              key={index}
              className="w-16 flex items-center justify-center border-r border-gray-400"
            >
              {index + 1}
            </div>
          ))}
        </div>

        {/* Guitar strings */}
        {standardTuning.map((note, index) => (
          <GuitarString
            key={index}
            startNote={note}
            pattern={pattern}
            rootNote={rootNote}
            frets={preferences.guitarFrets}
          />
        ))}
      </div>
    </div>
  );
};

export default Guitar;
