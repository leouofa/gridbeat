"use client";

import React, { useState, useEffect } from "react";
import ChordList from "@/components/ChordBank/ChordList";
import ChordDetail from "@/components/ChordBank/ChordDetail";
import { Chord } from "@/types";
import { CHORDS } from "@/constants";

const STORAGE_KEY = "selectedChordName";
const DEFAULT_CHORD = "Major";

const ChordBank: React.FC = () => {
  const [selectedChord, setSelectedChord] = useState<Chord | null>(() => {
    // Try to get stored chord first, fallback to default chord
    if (typeof window !== "undefined") {
      const storedChordName =
        localStorage.getItem(STORAGE_KEY) || DEFAULT_CHORD;
      return (
        CHORDS.find((c) => c.name === storedChordName) ||
        CHORDS.find((c) => c.name === DEFAULT_CHORD)!
      );
    }
    return CHORDS.find((c) => c.name === DEFAULT_CHORD)!;
  });

  const handleSelectChord = (chordName: string) => {
    const chord = CHORDS.find((c) => c.name === chordName);
    setSelectedChord(chord || null);
    localStorage.setItem(STORAGE_KEY, chordName);
  };

  // Handle initial setup when component mounts
  useEffect(() => {
    if (!selectedChord) {
      const defaultChord = CHORDS.find((c) => c.name === DEFAULT_CHORD)!;
      setSelectedChord(defaultChord);
      localStorage.setItem(STORAGE_KEY, DEFAULT_CHORD);
    }
  }, []);

  return (
    <>
      <div className="fixed top-[56px] left-0 right-0 bg-zinc-800 border-b border-zinc-800 z-40">
        <div className="p-3 font-mono">
          <ChordList
            chords={CHORDS}
            onSelectChord={handleSelectChord}
            selectedChordName={selectedChord?.name || null}
          />
        </div>
      </div>
      <div className="mt-20">
        {selectedChord && <ChordDetail chord={selectedChord} />}
      </div>
    </>
  );
};

export default ChordBank;
