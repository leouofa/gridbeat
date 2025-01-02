import React from "react";
import { Chord } from "@/types";
import ChordButton from "@/components/ChordBank/ChordButton";

interface ChordListProps {
  chords: Chord[];
  onSelectChord: (chordName: string) => void;
  selectedChordName: string | null; // Add this prop
}

const ChordList: React.FC<ChordListProps> = ({
  chords,
  onSelectChord,
  selectedChordName,
}) => {
  return (
    <div>
      <ul className="flex space-x-4">
        {chords.map((chord) => (
          <li key={chord.name}>
            <ChordButton
              name={chord.name}
              onClick={() => onSelectChord(chord.name)}
              isActive={selectedChordName === chord.name} // Pass isActive prop
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChordList;
