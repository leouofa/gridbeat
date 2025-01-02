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
        <div key={index} className="mb-8">
          <h2 className="font-mono mb-4">{note.name}</h2>
          <div className="flex flex-wrap gap-4">
            {/* Left side: Piano with Guitar/Ukulele underneath */}
            <div className="flex-shrink-0 flex flex-col gap-4 max-w-full">
              {" "}
              {/* Added max-w-full */}
              <div className="overflow-x-auto">
                <PianoKeyboard
                  pattern={chord.pattern}
                  rootNote={parseInt(note.alias)}
                />
              </div>
              {/* Changed to a scrollable container */}
              <div className="flex flex-wrap gap-4 max-w-full">
                {" "}
                {/* Added max-w-full and flex-wrap */}
                <div className="overflow-x-auto flex-shrink-0 min-w-0">
                  <Guitar
                    pattern={chord.pattern}
                    rootNote={parseInt(note.alias)}
                  />
                </div>
                <div className="overflow-x-auto flex-shrink-0 min-w-0">
                  <Ukulele
                    pattern={chord.pattern}
                    rootNote={parseInt(note.alias)}
                  />
                </div>
              </div>
            </div>

            {/* Right side: Grid */}
            <div className="flex-grow">
              <Grid pattern={chord.pattern} rootNote={parseInt(note.alias)} />
            </div>
          </div>
        </div>
      ))}{" "}
    </div>
  );
};

export default ChordDetail;
