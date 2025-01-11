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
  const [, setSelectedNote] = useState<Note>(NOTES[0]);
  const [visibleChordNote, setVisibleChordNote] = useState<string>(
    NOTES[0].name,
  );

  const selectedChord =
    CHORDS.find((c) => c.name === preferences.activeChordName) ||
    CHORDS.find((c) => c.name === DEFAULT_CHORD)!;

  useEffect(() => {
    const handleScroll = () => {
      // Check if we're at the bottom of the page
      if (
        window.innerHeight + Math.round(window.scrollY) >=
        document.documentElement.scrollHeight - 70 // Adding a small buffer
      ) {
        // When at the bottom, set the last note as visible
        setVisibleChordNote(NOTES[NOTES.length - 1].name);
        return;
      }

      // Regular intersection observer logic for other cases
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
          rootMargin: "-120px 0px -80% 0px",
          threshold: 0,
        },
      );

      NOTES.forEach((note) => {
        const element = document.getElementById(`chord-${note.name}`);
        if (element) observer.observe(element);
      });

      return () => observer.disconnect();
    };

    // Initial setup
    handleScroll();

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSelectChord = (chordName: string) => {
    updatePreferences({ activeChordName: chordName });
  };

  const scrollToNote = (noteName: string) => {
    const element = document.getElementById(`chord-${noteName}`);
    if (element) {
      const headerHeight = 180;
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
      <div className="fixed top-[72px] left-0 right-0 bg-zinc-800 border-b border-zinc-800 z-40">
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
      <div className="mt-36">
        <ChordDetail chord={selectedChord} />
      </div>
    </>
  );
};

export default ChordBank;
