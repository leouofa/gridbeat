import React from "react";
import { Chord } from "@/types";
import ChordButton from "@/components/ChordBank/ChordButton";

interface ChordListProps {
  chords: Chord[];
  onSelectChord: (chordName: string) => void;
}

const ChordList: React.FC<ChordListProps> = ({ chords, onSelectChord }) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Available Chords</h2>
      <ul className="flex space-x-4">
        {chords.map((chord) => (
          <li key={chord.name}>
            <ChordButton
              name={chord.name}
              onClick={() => onSelectChord(chord.name)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChordList;
