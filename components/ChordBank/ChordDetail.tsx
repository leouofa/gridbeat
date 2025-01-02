import React from "react";
import { Chord } from "@/types";
import { NOTES } from "@/constants";
import Grid from "@/components/Grid";
import PianoKeyboard from "@/components/PianoKeyboard";
import Guitar from "@/components/Guitar";
import Ukulele from "@/components/Ukulele";

interface ChordDetailProps {
  chord: Chord;
}

const ChordDetail: React.FC<ChordDetailProps> = ({ chord }) => {
  return (
    <div className="p-4 border rounded shadow-lg">
      <h2 className="text-xl font-semibold mb-2">Chord Type</h2>
      <p className="mb-1">
        <strong>Name:</strong> {chord.name}
      </p>
      <p>
        <strong>Pattern:</strong> {chord.pattern.join(" - ")}
      </p>
      <br />
      <br />

      {NOTES.map((note, index) => (
        <div key={index}>
          <h2 className="font-mono">{note.name}</h2>
          <br />
          <div className="flex flex-wrap gap-4">
            <div className="flex-shrink-0">
              <Grid pattern={chord.pattern} rootNote={parseInt(note.alias)} />
            </div>
            <div className="flex-grow">
              <PianoKeyboard
                pattern={chord.pattern}
                rootNote={parseInt(note.alias)}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex-shrink-0">
              <Guitar pattern={chord.pattern} rootNote={parseInt(note.alias)} />
            </div>
            <div className="flex-shrink-0">
              <Ukulele
                pattern={chord.pattern}
                rootNote={parseInt(note.alias)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChordDetail;
