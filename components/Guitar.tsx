"use client";

import React from "react";
import { NOTES } from "@/constants";
import { Note, Interval } from "@/types";
import { getNoteHighlight } from "@/utils/NoteHighlighter";

interface GuitarStringProps {
  startNote: Note;
  pattern?: Interval;
  rootNote?: number;
}

const GuitarString: React.FC<GuitarStringProps> = ({
  startNote,
  pattern,
  rootNote,
}) => {
  // Generate 12 frets for each string
  const getFretNotes = () => {
    const frets = [];
    const currentNoteIndex = NOTES.findIndex(
      (note) => note.name === startNote.name,
    );

    for (let fret = 0; fret <= 12; fret++) {
      const noteIndex = (currentNoteIndex + fret) % 12;
      frets.push(NOTES[noteIndex]);
    }
    return frets;
  };

  const frets = getFretNotes();

  return (
    <div className="flex h-8 border-b border-gray-300">
      {frets.map((note, index) => {
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
          {[...Array(12)].map((_, index) => (
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
          />
        ))}
      </div>
    </div>
  );
};

export default Guitar;
