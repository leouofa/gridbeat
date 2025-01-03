"use client";

import React from "react";
import { NOTES } from "@/constants";
import { Note, Interval, SynthType } from "@/types";
import { getNoteHighlight } from "@/utils/NoteHighlighter";
import { usePreferences } from "@/contexts/PreferencesContext";
import { useInstrument } from "@/hooks/useInstrument";
import * as Tone from "tone";
import LoadingSpinner from "@/components/LoadingSpinner";

interface GuitarStringProps {
  startNote: Note;
  pattern?: Interval;
  rootNote?: number;
  frets: number;
  onPlay: (note: Note, octave: number) => void;
  stringOctave: number;
}

const GuitarString: React.FC<GuitarStringProps> = ({
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
              // Calculate the actual octave based on fret position
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

interface GuitarProps {
  pattern?: Interval;
  rootNote?: number;
  synthType?: SynthType;
}

const Guitar: React.FC<GuitarProps> = ({
  pattern,
  rootNote,
  synthType: propsSynthType = undefined,
}) => {
  const { preferences } = usePreferences();
  const activeSynthType = propsSynthType ?? preferences.synthType;
  const { instrument, isLoading } = useInstrument(activeSynthType);

  // Early return if guitar is not in visible instruments
  if (!preferences.visibleInstruments.includes("guitar")) {
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

  // Standard guitar tuning with corresponding octaves
  const standardTuning = [
    { note: NOTES[4], octave: 4 }, // High E
    { note: NOTES[9], octave: 3 }, // A
    { note: NOTES[2], octave: 3 }, // D
    { note: NOTES[7], octave: 2 }, // G
    { note: NOTES[11], octave: 2 }, // B
    { note: NOTES[4], octave: 2 }, // Low E
  ];

  return (
    <div className="w-fit overflow-x-auto p-4">
      <div className="border rounded">
        {/* Fret numbers */}
        <div className="flex h-8 border-b border-gray-300">
          <div className="w-12 flex items-center justify-center border-r border-gray-400"></div>
          {[...Array(preferences.guitarFrets)].map((_, index) => {
            const fretNumber = index + 1;
            const isBoldFret = [3, 5, 7, 9, 12].includes(fretNumber);

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

        {/* Guitar strings */}
        {standardTuning.map(({ note, octave }, index) => (
          <GuitarString
            key={index}
            startNote={note}
            pattern={pattern}
            rootNote={rootNote}
            frets={preferences.guitarFrets}
            onPlay={playNote}
            stringOctave={octave}
          />
        ))}
      </div>
    </div>
  );
};

export default Guitar;
