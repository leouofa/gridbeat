"use client";

import React from "react";
import { NOTES } from "@/constants";
import { Note, Interval, SynthType } from "@/types";
import { getNoteHighlight } from "@/utils/NoteHighlighter";
import { usePreferences } from "@/contexts/PreferencesContext";
import { useNotePlayer } from "@/hooks/useNotePlayer";
import LoadingSpinner from "@/components/LoadingSpinner";

interface PianoKeyProps {
  note: Note;
  octave: number;
  pattern?: Interval;
  rootNote?: number;
  onPlay: (note: Note, octave: number) => void;
}

const PianoKey: React.FC<PianoKeyProps> = ({
  note,
  octave,
  pattern,
  rootNote,
  onPlay,
}) => {
  const isBlack = !note.natural;

  const highlight =
    pattern && rootNote !== undefined
      ? getNoteHighlight(note, pattern, rootNote)
      : { opacity: 1 };

  return (
    <div
      className={`
        ${isBlack ? "bg-black h-32 w-8 -mx-4 z-10 pl-1 pt-16" : `bg-white h-48 w-12 pl-5 pt-36 `}
        relative border border-gray-800 font-mono cursor-pointer select-none hover:saturate-[2.5] active:saturate-[3.0]
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
      onClick={() => onPlay(note, octave + 2)}
    >
      {note.name}
    </div>
  );
};

interface PianoKeyboardProps {
  pattern?: Interval;
  rootNote?: number;
  synthType?: SynthType;
}

const PianoKeyboard: React.FC<PianoKeyboardProps> = ({
  pattern,
  rootNote,
  synthType,
}) => {
  const { preferences } = usePreferences();
  const { playNote, isLoading, isVisible } = useNotePlayer("piano", synthType);

  if (!isVisible) return null;
  if (isLoading) return <LoadingSpinner />;

  const createKeys = () => {
    const keys = [];
    const octaves = preferences.octaves;

    for (let octave = 0; octave < octaves; octave++) {
      NOTES.forEach((note) => {
        keys.push({ note, octave });
      });
    }

    keys.push({ note: NOTES[0], octave: octaves });
    return keys;
  };

  const keys = createKeys();

  return (
    <div className="overflow-x-auto m-1">
      <div className="flex relative min-w-fit">
        {keys.map((key, index) => (
          <PianoKey
            key={index}
            note={key.note}
            octave={key.octave}
            pattern={pattern}
            rootNote={rootNote}
            onPlay={playNote}
          />
        ))}
      </div>
    </div>
  );
};

export default PianoKeyboard;
