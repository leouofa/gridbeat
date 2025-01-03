"use client";

import React from "react";
import { NOTES } from "@/constants";
import { Note, Interval, SynthType } from "@/types";
import { getNoteHighlight } from "@/utils/NoteHighlighter";
import { usePreferences } from "@/contexts/PreferencesContext";
import { useInstrument } from "@/hooks/useInstrument";
import * as Tone from "tone";
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

  // Get highlight styling if pattern and rootNote are provided
  const highlight =
    pattern && rootNote !== undefined
      ? getNoteHighlight(note, pattern, rootNote)
      : { opacity: 1 };

  return (
    <div
      className={`
        ${isBlack ? "bg-black h-32 w-8 -mx-4 z-10 pl-1 pt-16" : `bg-white h-48 w-12 pl-5 pt-36 `}
        relative border border-gray-800 font-mono cursor-pointer select-none hover:saturate-150 active:saturate-200
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
  synthType: propsSynthType = undefined,
}) => {
  const { preferences } = usePreferences();
  const activeSynthType = propsSynthType ?? preferences.synthType;
  const { instrument, isLoading } = useInstrument(activeSynthType);

  // Early return if piano is not in visible instruments
  if (!preferences.visibleInstruments.includes("piano")) {
    return null;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const playNote = async (note: Note, octave: number) => {
    await Tone.start();

    if (instrument) {
      const standardNoteName = note.name.replace("♯", "#");
      const noteWithOctave = `${standardNoteName}${octave}`;
      instrument.triggerAttackRelease(noteWithOctave, "8n");
    }
  };

  const createKeys = () => {
    const keys = [];
    const octaves = preferences.octaves;

    for (let octave = 0; octave < octaves; octave++) {
      NOTES.forEach((note) => {
        keys.push({ note, octave });
      });
    }

    // Add the final C key for the last octave
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
