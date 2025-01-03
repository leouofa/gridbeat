"use client";

import React from "react";
import { usePreferences } from "@/contexts/PreferencesContext";

export default function FavoritesHome() {
  const { preferences } = usePreferences();

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Favorite Chords</h1>
      {preferences.favoriteChords.length === 0 ? (
        <p>No favorite chords yet. Add some from the Chord Bank!</p>
      ) : (
        <ul className="space-y-2">
          {preferences.favoriteChords.map((favorite, index) => (
            <li
              key={index}
              className="font-mono p-2 border border-zinc-700 rounded"
            >
              <div className="flex items-center gap-2">
                <span
                  className={`w-4 h-4 rounded-full`}
                  style={{ backgroundColor: favorite.rootNote.color }}
                />
                <span>
                  {favorite.rootNote.name} {favorite.chord.name}
                </span>
              </div>
              <p className="text-sm text-zinc-400 mt-1">
                {favorite.chord.description}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
