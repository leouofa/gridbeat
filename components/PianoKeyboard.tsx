"use client";

import React from "react";
import { NOTES } from "@/constants";
import { Note, Interval } from "@/types";
import { getNoteHighlight } from "@/utils/NoteHighlighter";
import { usePreferences } from "@/contexts/PreferencesContext";

interface PianoKeyProps {
  note: Note;
  octave: number;
  pattern?: Interval;
  rootNote?: number;
}

const PianoKey: React.FC<PianoKeyProps> = ({
  note,
  octave,
  pattern,
  rootNote,
}) => {
  const isBlack = !note.natural;

  // Get highlight styling if pattern and rootNote are provided
  const highlight =
    pattern && rootNote !== undefined
      ? getNoteHighlight(note, pattern, rootNote)
      : { opacity: 1 };

  return (
    <div
      className={`
        ${isBlack ? "bg-black h-32 w-8 -mx-4 z-10 pl-1 pt-16" : `bg-white h-48 w-12 pl-5 pt-36 `}
        relative border border-gray-800 font-mono
      `}
      data-note={`${note.name}${octave}`}
      style={{
        background: isBlack
          ? `linear-gradient(to bottom, black 0%, black 30%, ${note.color} 30%, ${note.color} 100%)`
          : note.color,
        color: note.textColor,
        opacity: isBlack ? "" : highlight.opacity,
        filter: highlight.filter,
      }}
    >
      {note.name}
    </div>
  );
};

interface PianoKeyboardProps {
  pattern?: Interval;
  rootNote?: number;
}

const PianoKeyboard: React.FC<PianoKeyboardProps> = ({ pattern, rootNote }) => {
  const { preferences } = usePreferences();

  // Early return if piano is not in visible instruments
  if (!preferences.visibleInstruments.includes("piano")) {
    return null;
  }

  const createKeys = () => {
    const keys = [];
    const octaves = preferences.octaves;

    for (let octave = 0; octave < octaves; octave++) {
      NOTES.forEach((note) => {
        keys.push({ note, octave });
      });
    }

    // Add the final C key for the last octave
    keys.push({ note: NOTES[0], octave: 2 });

    return keys;
  };

  const keys = createKeys();

  return (
    <div className="w-full overflow-x-auto p-4">
      <div className="flex relative">
        {keys.map((key, index) => (
          <PianoKey
            key={index}
            note={key.note}
            octave={key.octave}
            pattern={pattern}
            rootNote={rootNote}
          />
        ))}
      </div>
    </div>
  );
};

export default PianoKeyboard;
