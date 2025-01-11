"use client";

import React, { useState } from "react";
import { usePreferences } from "@/contexts/PreferencesContext";
import { ChordView } from "@/components/ChordBank/ChordView";
import { useInstrument } from "@/hooks/useInstrument";
import { getChordNotes, playChord, isFavoriteChord } from "@/utils/chordUtils";
import { NOTES, CHORDS, SCALES } from "@/constants";
import { Note, Chord, Scale } from "@/types";
import ChordButton from "@/components/ChordBank/ChordButton";

const ScaleList: React.FC<{
  scales: Scale[];
  selectedScale: string;
  onSelectScale: (scaleName: string) => void;
}> = ({ scales, selectedScale, onSelectScale }) => {
  return (
    <div className="flex space-x-2 mb-2">
      {scales.map((scale) => (
        <ChordButton
          key={scale.name}
          name={scale.name}
          onClick={() => onSelectScale(scale.name)}
          isActive={selectedScale === scale.name}
        />
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
    <div className="flex space-x-2">
      {notes.map((note) => (
        <ChordButton
          key={note.name}
          name={note.name}
          onClick={() => onSelectNote(note.name)}
          isActive={selectedNote === note.name}
        />
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
  const { preferences, updatePreferences } = usePreferences();
  const { instrument, isLoading } = useInstrument(preferences.synthType);
  const [selectedScale, setSelectedScale] = useState<Scale>(SCALES[0]);
  const [selectedRoot, setSelectedRoot] = useState<Note>(NOTES[0]);

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

  return (
    <>
      <div className="fixed top-[72px] left-0 right-0 bg-zinc-800 border-b border-zinc-800 z-40">
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
        <div className="mb-10">
          <h2 className="text-2xl">
            {selectedRoot.name} {selectedScale.name}
          </h2>
          <p className="">{selectedScale.description}</p>
        </div>

        <div className="space-y-4">
          {generateScaleChords().map((chord, index) => {
            const chordNotes = getChordNotes(
              parseInt(chord.rootNote.alias),
              chord.chord.pattern,
            );

            return (
              <div key={index} className="flex items-center gap-4">
                <div className="flex-1">
                  <ChordView
                    note={chord.rootNote}
                    chord={chord.chord}
                    chordNotes={chordNotes}
                    onPlay={handlePlayChord}
                    onToggleFavorite={() =>
                      toggleFavorite(chord.rootNote, chord.chord)
                    }
                    isFavorite={isFavoriteChord(
                      preferences.favoriteChords,
                      chord.rootNote,
                      chord.chord,
                    )}
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
