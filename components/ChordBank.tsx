"use client";

import React, { useState } from "react";
import ChordList from "@/components/ChordBank/ChordList";
import ChordDetail from "@/components/ChordBank/ChordDetail";
import { Chord } from "@/types";
import { CHORDS } from "@/constants";
import { usePreferences } from "@/contexts/PreferencesContext";

const ChordBank: React.FC = () => {
  const [selectedChord, setSelectedChord] = useState<Chord | null>(null);

  const { preferences } = usePreferences();

  const handleSelectChord = (chordName: string) => {
    const chord = CHORDS.find((c) => c.name === chordName);
    setSelectedChord(chord || null);
  };

  return (
    <div className="p-8 font-mono">
      <h1 className="text-2xl font-bold mb-4">Chord Bank</h1>
      <p>Current grid width: {preferences.gridWidth}</p>
      <ChordList chords={CHORDS} onSelectChord={handleSelectChord} />
      {selectedChord && <ChordDetail chord={selectedChord} />}
    </div>
  );
};

export default ChordBank;
