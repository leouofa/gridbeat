"use client";
import ContentCard from "@/components/ContentCard";
import Grid from "@/components/Grid";
import { NOTES } from "@/constants";
import * as Tone from "tone";
import { useEffect, useState } from "react";

export default function NotesPage() {
  const [synth, setSynth] = useState<Tone.Synth | null>(null);

  // Initialize the synth when the component mounts
  useEffect(() => {
    const newSynth = new Tone.Synth().toDestination();
    setSynth(newSynth);

    // Cleanup when component unmounts
    return () => {
      newSynth.dispose();
    };
  }, []);

  const playNote = async (noteName: string) => {
    // Make sure audio context is started (needs user interaction first)
    await Tone.start();

    if (synth) {
      const standardNoteName = noteName.replace("♯", "#");
      const noteWithOctave = `${standardNoteName}4`;
      synth.triggerAttackRelease(noteWithOctave, "16n");
    }
  };

  return (
    <div className="mt-20">
      <div className="mx-auto p-4">
        <div className="flex justify-center">
          <div className="w-full lg:w-7/12">
            <ContentCard title="What are Notes" emoji="🎵" headingLevel="h1">
              <ul className="list-disc list-inside text-base sm:text-lg space-y-1 sm:space-y-2 font-sans">
                <li>
                  Notes are simply <strong>symbols</strong> that represent
                  sounds.
                </li>
                <li>
                  Western music uses 12 distinct notes to represent unique
                  sounds.
                </li>
              </ul>

              <div className="flex gap-2 mt-8 mb-8">
                {NOTES.map((note) => (
                  <div
                    key={note.alias}
                    className="w-10 h-10 flex items-center justify-center rounded border-2 border-gray-800 dark:border-gray-200 cursor-pointer hover:opacity-80 active:opacity-60 select-none"
                    onClick={() => playNote(note.name)}
                  >
                    {note.alias}
                  </div>
                ))}
              </div>

              <ul className="list-disc list-inside text-base sm:text-lg space-y-1 sm:space-y-2 font-sans">
                <li>Notes can be represented by letters instead of numbers.</li>
                <li>Think of it as a musical alphabet for easy reference.</li>
              </ul>

              <div className="flex gap-2 mt-8">
                {NOTES.map((note) => (
                  <div
                    key={note.name}
                    className="w-10 h-10 flex items-center justify-center rounded border-2 border-gray-800 dark:border-gray-200 cursor-pointer hover:opacity-80 active:opacity-60 select-none"
                    style={{
                      backgroundColor: note.color,
                      color: note.textColor,
                    }}
                    onClick={() => playNote(note.name)}
                  >
                    {note.name}
                  </div>
                ))}
              </div>
            </ContentCard>

            <ContentCard title="Sharps and Flats" emoji="♯" headingLevel="h2">
              <ul className="list-disc list-inside text-base sm:text-lg space-y-1 sm:space-y-2 font-sans">
                <li>The notes with the hash sign (♯) are called sharps.</li>
                <li>The notes without sharps are called natural notes.</li>
                <li>
                  Sharps notes (♯) have alternate names known as flats (♭).
                </li>
                <li>For example, C♯ is equivalent to D♭.</li>
              </ul>

              <div className="flex gap-2 mt-8">
                {NOTES.map((note) => (
                  <div
                    key={note.name}
                    className={`w-10 h-10 flex items-center justify-center rounded border-2 border-gray-800 dark:border-gray-200 cursor-pointer hover:opacity-80 active:opacity-60 select-none ${
                      !note.natural
                        ? "bg-black text-white"
                        : "bg-white dark:text-gray-800"
                    }`}
                    onClick={() => playNote(note.name)}
                  >
                    {note.name}
                  </div>
                ))}
              </div>
            </ContentCard>

            <ContentCard title="The Octaves" emoji="🎶" headingLevel="h2">
              <ul className="list-disc list-inside text-base sm:text-lg space-y-1 sm:space-y-2 font-sans">
                <li>
                  The grid controller lays out notes from{" "}
                  <strong>bottom left to top right</strong>.
                </li>
                <li>
                  It starts with C, progresses to B, and repeats the cycle.
                </li>
                <li>
                  The span from C to B is called an <strong>Octave</strong>.
                </li>
                <li>Every time the pattern repeats a new Octave begins.</li>
              </ul>

              <div className="my-6">
                <Grid props={{ visible: true, width: 8 }} />
              </div>
            </ContentCard>

            <ContentCard title="Take Your Time" emoji="🧘‍♀" headingLevel="h2">
              <ul className="list-disc list-inside text-base sm:text-lg space-y-1 sm:space-y-2 font-sans">
                <li>
                  Using a grid controller is similar to mastering a computer
                  keyboard.
                </li>
                <li>
                  Initially, {"you'll"} rely on looking at the controller to
                  find the right notes.
                </li>
                <li>
                  With practice, your muscle memory will guide you, and{" "}
                  {"you'll"} intuitively know which button produces which sound.
                </li>
              </ul>
            </ContentCard>
          </div>
        </div>
      </div>
    </div>
  );
}
