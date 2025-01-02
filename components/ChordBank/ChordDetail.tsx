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
  // Helper function to get notes in chord pattern
  const getChordNotes = (rootNote: number, pattern: number[]): string[] => {
    const notesInPattern: number[] = [];
    let currentNote = rootNote;

    // Add root note
    notesInPattern.push(currentNote);

    // Add each interval to get the next note
    for (let i = 0; i < pattern.length - 1; i++) {
      currentNote += pattern[i + 1];
      // Normalize to 1-12 range
      while (currentNote > 12) {
        currentNote -= 12;
      }
      notesInPattern.push(currentNote);
    }

    // Convert note numbers to note names
    return notesInPattern.map(
      (noteNum) =>
        NOTES.find((note) => parseInt(note.alias) === noteNum)?.name || "",
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Chord Type</h2>
      <p className="mb-1">
        <strong>Name:</strong> {chord.name}
      </p>
      <p>
        <strong>Pattern:</strong> {chord.pattern.join(" - ")}
      </p>
      <br />
      <br />
      {NOTES.map((note, index) => {
        const chordNotes = getChordNotes(parseInt(note.alias), chord.pattern);
        return (
          <div key={index} className="mb-28">
            <h2 className="font-mono mb-6 text-lg">
              {`${note.name} ${chord.name} (${chordNotes.join(", ")})`}
            </h2>
            <div className="flex flex-wrap gap-4">
              <div className="flex-shrink-0 flex flex-col gap-4 max-w-full">
                <div className="overflow-x-auto">
                  <PianoKeyboard
                    pattern={chord.pattern}
                    rootNote={parseInt(note.alias)}
                  />
                </div>
                <div className="flex flex-wrap gap-4 max-w-full">
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
              <div className="flex-grow">
                <Grid pattern={chord.pattern} rootNote={parseInt(note.alias)} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChordDetail;
