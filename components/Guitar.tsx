"use client";

import React from "react";
import { Interval, SynthType } from "@/types";
import { NOTES } from "@/constants";
import { useNotePlayer } from "@/hooks/useNotePlayer";
import { usePreferences } from "@/contexts/PreferencesContext";
import { InstrumentString } from "./common/StringInstrument";
import LoadingSpinner from "@/components/LoadingSpinner";

interface GuitarProps {
  pattern?: Interval;
  rootNote?: number;
  synthType?: SynthType;
}

const Guitar: React.FC<GuitarProps> = ({ pattern, rootNote, synthType }) => {
  const { preferences } = usePreferences();
  const { playNote, isLoading, isVisible } = useNotePlayer("guitar", synthType);

  if (!isVisible) return null;
  if (isLoading) return <LoadingSpinner />;

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

        {standardTuning.map(({ note, octave }, index) => (
          <InstrumentString
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
