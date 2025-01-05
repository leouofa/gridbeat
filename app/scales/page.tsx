"use client";

import React, { useState } from "react";
import { usePreferences } from "@/contexts/PreferencesContext";
import { ChordView } from "@/components/ChordBank/ChordView";
import { useInstrument } from "@/hooks/useInstrument";
import { getChordNotes, playChord } from "@/utils/chordUtils";
import { NOTES, CHORDS, SCALES } from "@/constants";
import { Note, Chord, Scale } from "@/types";

function getChordQualityFromIntervals(intervals: number[]): Chord {
  const third = intervals[0] + intervals[1];
  const fifth = intervals[2] + intervals[3];

  if (third === 4 && fifth === 7)
    return CHORDS.find((chord) => chord.name === "Major")!;
  if (third === 3 && fifth === 7)
    return CHORDS.find((chord) => chord.name === "Minor")!;
  if (third === 3 && fifth === 6)
    return CHORDS.find((chord) => chord.name === "Diminished")!;
  if (third === 4 && fifth === 8)
    return CHORDS.find((chord) => chord.name === "Augmented")!;

  return CHORDS.find((chord) => chord.name === "Major")!;
}

export default function ScaleChordsPage() {
  const { preferences } = usePreferences();
  const { instrument, isLoading } = useInstrument(preferences.synthType);
  const [selectedScale, setSelectedScale] = useState<Scale>(SCALES[0]);
  const [selectedRoot, setSelectedRoot] = useState<Note>(NOTES[0]);

  const handlePlayChord = (chordNotes: string[]) => {
    playChord(instrument, chordNotes);
  };

  const getNextNote = (rootNote: Note, semitones: number): Note => {
    const currentIndex = NOTES.findIndex((note) => note.name === rootNote.name);
    const nextIndex = (currentIndex + semitones) % 12;
    return NOTES[nextIndex];
  };

  const generateScaleChords = () => {
    const chords: { rootNote: Note; chord: Chord }[] = [];
    let accumulatedSteps = 0;

    selectedScale.pattern.forEach((_, index) => {
      // Get intervals starting from current position
      const intervals: number[] = [];
      let sum = 0;

      for (let j = 0; j < 6; j++) {
        const patternIndex = (index + j) % selectedScale.pattern.length;
        intervals.push(selectedScale.pattern[patternIndex]);
        sum += selectedScale.pattern[patternIndex];
        if (sum >= 7) break;
      }

      chords.push({
        rootNote: getNextNote(selectedRoot, accumulatedSteps),
        chord: getChordQualityFromIntervals(intervals),
      });

      accumulatedSteps += selectedScale.pattern[index];
    });

    return chords;
  };

  const scaleChords = generateScaleChords();

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
            <ChordView
              key={index}
              note={chord.rootNote}
              chord={chord.chord}
              chordNotes={chordNotes}
              onPlay={handlePlayChord}
              onToggleFavorite={() => {}}
              isFavorite={false}
              isLoading={isLoading}
            />
          );
        })}
      </div>
    </div>
  );
}
