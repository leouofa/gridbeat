"use client";

import React from "react";
import ChordList from "@/components/ChordBank/ChordList";
import ChordDetail from "@/components/ChordBank/ChordDetail";
import { CHORDS } from "@/constants";
import { usePreferences } from "@/contexts/PreferencesContext";

const DEFAULT_CHORD = "Major";

const ChordBank: React.FC = () => {
  const { preferences, updatePreferences } = usePreferences();

  // Get the active chord based on preferences
  const selectedChord =
    CHORDS.find((c) => c.name === preferences.activeChordName) ||
    CHORDS.find((c) => c.name === DEFAULT_CHORD)!;

  const handleSelectChord = (chordName: string) => {
    updatePreferences({ activeChordName: chordName });
  };

  return (
    <>
      <div className="fixed top-[56px] left-0 right-0 bg-zinc-800 border-b border-zinc-800 z-40">
        <div className="p-3 font-mono">
          <ChordList
            chords={CHORDS}
            onSelectChord={handleSelectChord}
            selectedChordName={selectedChord.name}
          />
        </div>
      </div>
      <div className="mt-20">
        <ChordDetail chord={selectedChord} />
      </div>
    </>
  );
};

export default ChordBank;
