"use client";

import React, { useState } from "react";
import { usePreferences } from "@/contexts/PreferencesContext";
import { ChordView } from "@/components/ChordBank/ChordView";
import { useInstrument } from "@/hooks/useInstrument";
import { getChordNotes, playChord } from "@/utils/chordUtils";
import { NOTES, CHORDS, SCALES } from "@/constants";
import { Note, Chord, Scale } from "@/types";

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

  const scaleChords = generateScaleChords();

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
    <div className="p-4">
      <h1 className="text-2xl mb-4">Scale Chord Generator</h1>

      <div className="flex gap-4 mb-6">
        <div className="w-48">
          <label className="block text-sm font-medium mb-2">Scale</label>
          <select
            className="w-full p-2 border rounded"
            value={selectedScale.name}
            onChange={(e) => {
              const newScale = SCALES.find((s) => s.name === e.target.value);
              if (newScale) setSelectedScale(newScale);
            }}
          >
            {SCALES.map((scale) => (
              <option key={scale.name} value={scale.name}>
                {scale.name}
              </option>
            ))}
          </select>
        </div>

        <div className="w-48">
          <label className="block text-sm font-medium mb-2">Root Note</label>
          <select
            className="w-full p-2 border rounded"
            value={selectedRoot.name}
            onChange={(e) => {
              const newRoot = NOTES.find((n) => n.name === e.target.value);
              if (newRoot) setSelectedRoot(newRoot);
            }}
          >
            {NOTES.map((note) => (
              <option key={note.name} value={note.name}>
                {note.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-xl">
          {selectedRoot.name} {selectedScale.name}
        </h2>
        <p className="text-sm text-gray-600">{selectedScale.description}</p>
      </div>

      <div className="space-y-4">
        {scaleChords.map((chord, index) => {
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
  );
}
