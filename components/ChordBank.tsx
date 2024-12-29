"use client";

import React, { useState } from "react";
import ChordList from "@/components/ChordList";
import ChordDetail from "@/components/ChordDetail";
import { Chord } from "@/types";
import { CHORD_DATA } from "@/constants/constants";

const ChordBank: React.FC = () => {
  const [selectedChord, setSelectedChord] = useState<Chord | null>(null);

  const handleSelectChord = (chordName: string) => {
    const chord = CHORD_DATA.find((c) => c.name === chordName);
    setSelectedChord(chord || null);
  };

  return (
    <div className="p-8 font-mono">
      <h1 className="text-2xl font-bold mb-4">Chord Bank</h1>
      <ChordList chords={CHORD_DATA} onSelectChord={handleSelectChord} />
      {selectedChord && <ChordDetail chord={selectedChord} />}
    </div>
  );
};

export default ChordBank;
