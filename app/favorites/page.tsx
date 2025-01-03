"use client";

import React from "react";
import { usePreferences } from "@/contexts/PreferencesContext";
import { ChordView } from "@/components/ChordBank/ChordView";
import { NOTES } from "@/constants";
import { useInstrument } from "@/hooks/useInstrument";
import * as Tone from "tone";

export default function FavoritesHome() {
  const { preferences, updatePreferences } = usePreferences();
  const { instrument, isLoading } = useInstrument(preferences.synthType);

  const playChord = async (chordNotes: string[]) => {
    await Tone.start();

    if (instrument) {
      chordNotes.forEach((note) => {
        const standardNoteName = note.replace("♯", "#");
        const noteWithOctave = `${standardNoteName}4`;
        instrument.triggerAttackRelease(noteWithOctave, "0.5");
      });
    }
  };

  const toggleFavorite = (index: number) => {
    const updatedFavorites = preferences.favoriteChords.filter(
      (_, i) => i !== index,
    );
    updatePreferences({ favoriteChords: updatedFavorites });
  };

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
      <h1 className="text-2xl mb-4">Favorite Chords</h1>
      {preferences.favoriteChords.length === 0 ? (
        <p>No favorite chords yet. Add some from the Chord Bank!</p>
      ) : (
        <div className="space-y-8">
          {preferences.favoriteChords.map((favorite, index) => {
            const chordNotes = getChordNotes(
              parseInt(favorite.rootNote.alias),
              favorite.chord.pattern,
            );

            return (
              <ChordView
                key={index}
                note={favorite.rootNote}
                chord={favorite.chord}
                chordNotes={chordNotes}
                onPlay={playChord}
                onToggleFavorite={() => toggleFavorite(index)}
                isFavorite={true}
                isLoading={isLoading}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
