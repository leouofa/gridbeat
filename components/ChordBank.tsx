"use client";

import React, { useState } from "react";
import ChordList from "@/components/ChordBank/ChordList";
import ChordDetail from "@/components/ChordBank/ChordDetail";
import { Chord } from "@/types";
import { CHORDS } from "@/constants";

const ChordBank: React.FC = () => {
  const [selectedChord, setSelectedChord] = useState<Chord | null>(null);

  const handleSelectChord = (chordName: string) => {
    const chord = CHORDS.find((c) => c.name === chordName);
    setSelectedChord(chord || null);
  };

  return (
    <div className="p-8 font-mono">
      <ChordList chords={CHORDS} onSelectChord={handleSelectChord} />
      {selectedChord && <ChordDetail chord={selectedChord} />}
    </div>
  );
};

export default ChordBank;
