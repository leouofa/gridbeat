"use client";

import React from "react";
import { usePreferences } from "@/contexts/PreferencesContext";
import { ChordView } from "@/components/ChordBank/ChordView";
import { useInstrument } from "@/hooks/useInstrument";
import { getChordNotes, playChord } from "@/utils/chordUtils";

export default function FavoritesHome() {
  const { preferences, updatePreferences } = usePreferences();
  const { instrument, isLoading } = useInstrument(preferences.synthType);

  const handlePlayChord = (chordNotes: string[]) => {
    playChord(instrument, chordNotes);
  };

  const toggleFavorite = (index: number) => {
    const updatedFavorites = preferences.favoriteChords.filter(
      (_, i) => i !== index,
    );
    updatePreferences({ favoriteChords: updatedFavorites });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Favorite Chords</h1>
      {preferences.favoriteChords.length === 0 ? (
        <p>No favorite chords yet. Add some from the Chord Bank!</p>
      ) : (
        <div>
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
                onPlay={handlePlayChord}
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
