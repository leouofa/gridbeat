"use client";

import React from "react";
import { usePreferences } from "@/contexts/PreferencesContext";
import { ChordView } from "@/components/ChordBank/ChordView";
import ContentCard from "@/components/ContentCard";
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
      {preferences.favoriteChords.length === 0 ? (
        <div className="mx-auto p-4 mt-20">
          <div className="flex justify-center">
            <div className="w-full lg:w-7/12">
              <ContentCard
                title="No Favorites Yet"
                emoji="⭐️"
                headingLevel="h2"
              >
                <ul className="list-disc list-inside text-base sm:text-lg space-y-1 sm:space-y-2 font-sans">
                  <li>Your favorite chords collection is currently empty</li>
                  <li>
                    Visit the Chord Bank to explore and add chords you love
                  </li>
                  <li>Save chords to quickly access them here later</li>
                </ul>
              </ContentCard>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-2xl mb-4">Favorite Chords</h1>
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
