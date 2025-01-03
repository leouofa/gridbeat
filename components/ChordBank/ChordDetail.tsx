import React from "react";
import { Chord, Note } from "@/types";
import { NOTES } from "@/constants";
import { ChordView } from "@/components/ChordBank/ChordView";
import * as Tone from "tone";
import { usePreferences } from "@/contexts/PreferencesContext";
import { useInstrument } from "@/hooks/useInstrument";

interface ChordDetailProps {
  chord: Chord;
}

const ChordDetail: React.FC<ChordDetailProps> = ({ chord }) => {
  const { preferences, updatePreferences } = usePreferences();
  const { instrument, isLoading } = useInstrument(preferences.synthType);

  const playChord = async (chordNotes: string[]) => {
    await Tone.start();

    if (instrument) {
      // Play each note in the chord with octave 4
      chordNotes.forEach((note) => {
        const standardNoteName = note.replace("♯", "#");
        const noteWithOctave = `${standardNoteName}4`;
        instrument.triggerAttackRelease(noteWithOctave, "0.5");
      });
    }
  };

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

  // Update helper function to use Note and Chord types
  const isFavorite = (rootNote: Note, chord: Chord) => {
    return preferences.favoriteChords.some(
      (fc) =>
        fc.rootNote.name === rootNote.name && fc.chord.name === chord.name,
    );
  };

  const toggleFavorite = (rootNote: Note, chord: Chord) => {
    const isCurrentlyFavorite = isFavorite(rootNote, chord);

    if (isCurrentlyFavorite) {
      // Remove from favorites
      const updatedFavorites = preferences.favoriteChords.filter(
        (fc) =>
          !(fc.rootNote.name === rootNote.name && fc.chord.name === chord.name),
      );
      updatePreferences({ favoriteChords: updatedFavorites });
    } else {
      // Add to favorites
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
        const favorite = isFavorite(note, chord);

        return (
          <ChordView
            key={index}
            note={note}
            chord={chord}
            chordNotes={chordNotes}
            onPlay={playChord}
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
