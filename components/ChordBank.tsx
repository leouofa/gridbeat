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
    <>
      <div className="fixed top-[56px] left-0 right-0 bg-zinc-800 border-b border-zinc-800 z-40">
        <div className="p-3 font-mono">
          <ChordList chords={CHORDS} onSelectChord={handleSelectChord} />
        </div>
      </div>
      <div className="mt-20">
        {selectedChord && <ChordDetail chord={selectedChord} />}
      </div>
    </>
  );
};

export default ChordBank;
