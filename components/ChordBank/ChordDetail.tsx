import React from "react";
import { Chord, Note } from "@/types";
import { NOTES } from "@/constants";
import Grid from "@/components/Grid";
import PianoKeyboard from "@/components/PianoKeyboard";
import Guitar from "@/components/Guitar";
import Ukulele from "@/components/Ukulele";
import * as Tone from "tone";
import { usePreferences } from "@/contexts/PreferencesContext";
import { useInstrument } from "@/hooks/useInstrument";

interface ChordDetailProps {
  chord: Chord;
}

const ChordDetail: React.FC<ChordDetailProps> = ({ chord }) => {
  const { preferences, updatePreferences } = usePreferences();
  const { instrument, isLoading } = useInstrument(preferences.synthType);

  const hasVisibleInstruments = preferences.visibleInstruments.length > 0;

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
          <div key={index} className={hasVisibleInstruments ? "mb-28" : "mb-2"}>
            <div
              className={`font-mono text-lg flex items-center gap-2 ${hasVisibleInstruments ? "mb-6" : ""}`}
            >
              <span>
                {`${note.name} ${chord.name} (${chordNotes.join(", ")})`}
              </span>
              <button
                onClick={() => playChord(chordNotes)}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-500 active:bg-blue-700 text-sm border-2 border-gray-800 dark:border-gray-200 "
                disabled={isLoading}
              >
                Play
              </button>
              <button
                onClick={() => toggleFavorite(note, chord)}
                className={`px-3 py-1 rounded text-sm border-2 ${
                  favorite
                    ? "bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-600 text-black border-gray-800"
                    : "bg-gray-600 hover:bg-gray-500 active:bg-gray-700 text-white border-gray-800"
                }`}
              >
                {favorite ? "★ Favorited" : "☆ Add to Favorites"}
              </button>
            </div>
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
