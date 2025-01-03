"use client";

import React from "react";
import { NOTES } from "@/constants";
import { Interval, SynthType } from "@/types";
import { usePreferences } from "@/contexts/PreferencesContext";
import { useNotePlayer } from "@/hooks/useNotePlayer";
import { InstrumentString } from "./common/StringInstrument";
import LoadingSpinner from "@/components/LoadingSpinner";

interface UkuleleProps {
  pattern?: Interval;
  rootNote?: number;
  synthType?: SynthType;
}

const Ukulele: React.FC<UkuleleProps> = ({ pattern, rootNote, synthType }) => {
  const { preferences } = usePreferences();
  const { playNote, isLoading, isVisible } = useNotePlayer(
    "ukulele",
    synthType,
  );

  if (!isVisible) return null;
  if (isLoading) return <LoadingSpinner />;

  // Standard ukulele tuning with corresponding octaves
  const standardTuning = [
    { note: NOTES[7], octave: 4 }, // G
    { note: NOTES[0], octave: 4 }, // C
    { note: NOTES[4], octave: 4 }, // E
    { note: NOTES[9], octave: 3 }, // A
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
        {standardTuning.map(({ note, octave }, index) => (
          <InstrumentString
            key={index}
            startNote={note}
            pattern={pattern}
            rootNote={rootNote}
            frets={preferences.ukuleleFrets}
            onPlay={playNote}
            stringOctave={octave}
          />
        ))}
      </div>
    </div>
  );
};

export default Ukulele;
