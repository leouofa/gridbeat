import React from "react";
import { Chord, Note } from "@/types";
import { NOTES } from "@/constants";
import { ChordView } from "@/components/ChordBank/ChordView";
import { usePreferences } from "@/contexts/PreferencesContext";
import { useInstrument } from "@/hooks/useInstrument";
import { getChordNotes, playChord, isFavoriteChord } from "@/utils/chordUtils";

interface ChordDetailProps {
  chord: Chord;
}

const ChordDetail: React.FC<ChordDetailProps> = ({ chord }) => {
  const { preferences, updatePreferences } = usePreferences();
  const { instrument, isLoading } = useInstrument(preferences.synthType);

  const handlePlayChord = (chordNotes: string[]) => {
    playChord(instrument, chordNotes);
  };

  const toggleFavorite = (rootNote: Note, chord: Chord) => {
    const isCurrentlyFavorite = isFavoriteChord(
      preferences.favoriteChords,
      rootNote,
      chord,
    );

    if (isCurrentlyFavorite) {
      const updatedFavorites = preferences.favoriteChords.filter(
        (fc) =>
          !(fc.rootNote.name === rootNote.name && fc.chord.name === chord.name),
      );
      updatePreferences({ favoriteChords: updatedFavorites });
    } else {
      const updatedFavorites = [
        ...preferences.favoriteChords,
        { rootNote, chord },
      ];
      updatePreferences({ favoriteChords: updatedFavorites });
    }
  };

  return (
    <div className="p-4">
      <div className="mb-10">
        <h1 className="text-2xl">
          {chord.name} Chords ({chord.pattern.join(" - ")})
        </h1>
        <p>{chord.description}</p>
      </div>

      {NOTES.map((note, index) => {
        const chordNotes = getChordNotes(parseInt(note.alias), chord.pattern);
        const favorite = isFavoriteChord(
          preferences.favoriteChords,
          note,
          chord,
        );

        return (
          <ChordView
            key={index}
            note={note}
            chord={chord}
            chordNotes={chordNotes}
            onPlay={handlePlayChord}
            onToggleFavorite={() => toggleFavorite(note, chord)}
            isFavorite={favorite}
            isLoading={isLoading}
          />
        );
      })}
    </div>
  );
};

export default ChordDetail;
