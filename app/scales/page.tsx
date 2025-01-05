"use client";

import React, { useState } from "react";
import { usePreferences } from "@/contexts/PreferencesContext";
import { ChordView } from "@/components/ChordBank/ChordView";
import { useInstrument } from "@/hooks/useInstrument";
import { getChordNotes, playChord } from "@/utils/chordUtils";
import { NOTES, CHORDS, SCALES } from "@/constants";
import { Note, Chord, Scale } from "@/types";

const ScaleList: React.FC<{
  scales: Scale[];
  selectedScale: string;
  onSelectScale: (scaleName: string) => void;
}> = ({ scales, selectedScale, onSelectScale }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {scales.map((scale) => (
        <button
          key={scale.name}
          onClick={() => onSelectScale(scale.name)}
          className={`px-3 py-1 rounded ${
            selectedScale === scale.name
              ? "bg-blue-500 text-white"
              : "bg-zinc-700 hover:bg-zinc-600"
          }`}
        >
          {scale.name}
        </button>
      ))}
    </div>
  );
};

const RootNoteList: React.FC<{
  notes: Note[];
  selectedNote: string;
  onSelectNote: (noteName: string) => void;
}> = ({ notes, selectedNote, onSelectNote }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {notes.map((note) => (
        <button
          key={note.name}
          onClick={() => onSelectNote(note.name)}
          className={`px-3 py-1 rounded ${
            selectedNote === note.name
              ? "bg-blue-500 text-white"
              : "bg-zinc-700 hover:bg-zinc-600"
          }`}
        >
          {note.name}
        </button>
      ))}
    </div>
  );
};

function getScaleDegreeChordQualities(scale: Scale): Chord[] {
  const chordQualities: Chord[] = [];

  // For each scale degree, determine its chord quality by looking at the third and fifth
  for (let i = 0; i < scale.pattern.length; i++) {
    // Calculate the third and fifth intervals from this scale degree
    const thirdInterval =
      scale.pattern[i % scale.pattern.length] +
      scale.pattern[(i + 1) % scale.pattern.length];

    const fifthInterval =
      thirdInterval +
      (scale.pattern[(i + 2) % scale.pattern.length] +
        scale.pattern[(i + 3) % scale.pattern.length]);

    // Determine chord quality based on the intervals
    let chordQuality: Chord;
    if (thirdInterval === 4 && fifthInterval === 7) {
      chordQuality = CHORDS.find((chord) => chord.name === "Major")!;
    } else if (thirdInterval === 3 && fifthInterval === 7) {
      chordQuality = CHORDS.find((chord) => chord.name === "Minor")!;
    } else if (thirdInterval === 3 && fifthInterval === 6) {
      chordQuality = CHORDS.find((chord) => chord.name === "Diminished")!;
    } else if (thirdInterval === 4 && fifthInterval === 8) {
      chordQuality = CHORDS.find((chord) => chord.name === "Augmented")!;
    } else {
      chordQuality = CHORDS.find((chord) => chord.name === "Major")!; // fallback
    }

    chordQualities.push(chordQuality);
  }

  return chordQualities;
}

export default function ScaleChordsPage() {
  const { preferences } = usePreferences();
  const { instrument, isLoading } = useInstrument(preferences.synthType);
  const [selectedScale, setSelectedScale] = useState<Scale>(SCALES[0]);
  const [selectedRoot, setSelectedRoot] = useState<Note>(NOTES[0]);

  const handlePlayChord = (chordNotes: string[]) => {
    playChord(instrument, chordNotes);
  };

  const generateScaleChords = () => {
    const chords: { rootNote: Note; chord: Chord }[] = [];
    let currentNote = selectedRoot;
    const chordQualities = getScaleDegreeChordQualities(selectedScale);

    // Generate each chord in the scale
    selectedScale.pattern.forEach((interval, index) => {
      chords.push({
        rootNote: currentNote,
        chord: chordQualities[index],
      });

      // Move to next note in the scale
      const nextNoteIndex =
        (NOTES.findIndex((n) => n.name === currentNote.name) + interval) % 12;
      currentNote = NOTES[nextNoteIndex];
    });

    return chords;
  };

  // Helper function to get roman numeral notation
  const getRomanNumeral = (index: number, chord: Chord): string => {
    const numerals = ["I", "II", "III", "IV", "V", "VI", "VII"];
    const numeral = numerals[index];

    if (chord.name === "Minor") {
      return numeral.toLowerCase();
    } else if (chord.name === "Diminished") {
      return numeral.toLowerCase() + "°";
    }
    return numeral;
  };

  return (
    <>
      <div className="fixed top-[56px] left-0 right-0 bg-zinc-800 border-b border-zinc-800 z-40">
        <div className="p-3 font-mono">
          <ScaleList
            scales={SCALES}
            selectedScale={selectedScale.name}
            onSelectScale={(scaleName) => {
              const newScale = SCALES.find((s) => s.name === scaleName);
              if (newScale) setSelectedScale(newScale);
            }}
          />
          <div className="mt-2">
            <RootNoteList
              notes={NOTES}
              selectedNote={selectedRoot.name}
              onSelectNote={(noteName) => {
                const newRoot = NOTES.find((n) => n.name === noteName);
                if (newRoot) setSelectedRoot(newRoot);
              }}
            />
          </div>
        </div>
      </div>

      <div className="mt-32 p-4">
        <div className="mb-4">
          <h2 className="text-xl">
            {selectedRoot.name} {selectedScale.name}
          </h2>
          <p className="text-sm text-gray-600">{selectedScale.description}</p>
        </div>

        <div className="space-y-4">
          {generateScaleChords().map((chord, index) => {
            const chordNotes = getChordNotes(
              parseInt(chord.rootNote.alias),
              chord.chord.pattern,
            );

            return (
              <div key={index} className="flex items-center gap-4">
                <div className="w-12 text-sm font-medium">
                  {getRomanNumeral(index, chord.chord)}
                </div>
                <div className="flex-1">
                  <ChordView
                    note={chord.rootNote}
                    chord={chord.chord}
                    chordNotes={chordNotes}
                    onPlay={handlePlayChord}
                    onToggleFavorite={() => {}}
                    isFavorite={false}
                    isLoading={isLoading}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
