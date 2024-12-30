import React from "react";
import { Chord } from "@/types";
import { NOTES } from "@/constants";

interface ChordDetailProps {
  chord: Chord;
}

const ChordDetail: React.FC<ChordDetailProps> = ({ chord }) => {
  return (
    <div className="p-4 border rounded shadow-lg">
      <h2 className="text-xl font-semibold mb-2">Selected Chord</h2>
      {NOTES.map((note, index) => (
        <div key={index}>
          <h2 className="font-mono">{note.name}</h2>
        </div>
      ))}
      <p className="mb-1">
        <strong>Name:</strong> {chord.name}
      </p>
      <p>
        <strong>Pattern:</strong> {chord.pattern.join(" - ")}
      </p>
    </div>
  );
};

export default ChordDetail;
