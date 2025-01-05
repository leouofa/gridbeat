"use client";

import React, { useState, useEffect } from "react";
import ChordList from "@/components/ChordBank/ChordList";
import ChordDetail from "@/components/ChordBank/ChordDetail";
import { CHORDS, NOTES } from "@/constants";
import { usePreferences } from "@/contexts/PreferencesContext";
import ChordButton from "@/components/ChordBank/ChordButton";
import { Note } from "@/types";

const DEFAULT_CHORD = "Major";

const ChordBank: React.FC = () => {
  const { preferences, updatePreferences } = usePreferences();
  const [selectedNote, setSelectedNote] = useState<Note>(NOTES[0]);
  const [visibleChordNote, setVisibleChordNote] = useState<string>(
    NOTES[0].name,
  );

  const selectedChord =
    CHORDS.find((c) => c.name === preferences.activeChordName) ||
    CHORDS.find((c) => c.name === DEFAULT_CHORD)!;

  useEffect(() => {
    // Set up intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const noteId = entry.target.id.replace("chord-", "");
            setVisibleChordNote(noteId);
          }
        });
      },
      {
        rootMargin: "-140px 0px -80% 0px", // Adjust these values to control when the highlighting happens
        threshold: 0,
      },
    );

    // Observe all chord elements
    NOTES.forEach((note) => {
      const element = document.getElementById(`chord-${note.name}`);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleSelectChord = (chordName: string) => {
    updatePreferences({ activeChordName: chordName });
  };

  const scrollToNote = (noteName: string) => {
    const element = document.getElementById(`chord-${noteName}`);
    if (element) {
      // Calculate header height (adjust this value if your header height changes)
      const headerHeight = 180; // Approximate height of the fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setSelectedNote(NOTES.find((note) => note.name === noteName) || NOTES[0]);
    }
  };

  return (
    <>
      <div className="fixed top-[56px] left-0 right-0 bg-zinc-800 border-b border-zinc-800 z-40">
        <div className="p-3 font-mono">
          <ChordList
            chords={CHORDS}
            onSelectChord={handleSelectChord}
            selectedChordName={selectedChord.name}
          />
          <div className="mt-2 flex space-x-2">
            {NOTES.map((note) => (
              <ChordButton
                key={note.name}
                name={note.name}
                onClick={() => scrollToNote(note.name)}
                isActive={visibleChordNote === note.name}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-32">
        <ChordDetail chord={selectedChord} />
      </div>
    </>
  );
};

export default ChordBank;
