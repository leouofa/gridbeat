"use client";
import ContentCard from "@/components/ContentCard";
import Grid from "@/components/Grid";
import { NOTES } from "@/constants";
import * as Tone from "tone";
import { useEffect, useState } from "react";
import { usePreferences } from "@/contexts/PreferencesContext";
import { PianoSamplerSingleton } from "@/utils/PianoSamplerSingleton";

export default function NotesPage() {
  const { preferences } = usePreferences();
  const [instrument, setInstrument] = useState<
    Tone.Synth | Tone.Sampler | Tone.PolySynth | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize the instrument based on preferences
  useEffect(() => {
    let newInstrument: typeof instrument = null;
    let mounted = true;

    const setupInstrument = async () => {
      setIsLoading(true);

      if (preferences.synthType === "piano") {
        newInstrument = await PianoSamplerSingleton.getInstance();
      } else {
        newInstrument = new Tone.PolySynth(Tone.Synth, {
          oscillator: {
            type: "fatsawtooth",
          },
          envelope: {
            attack: 0.03,
            decay: 0.3,
            sustain: 0.4,
            release: 1.5,
          },
        })
          .chain(
            new Tone.Chorus({
              frequency: 2.5,
              delayTime: 3.5,
              depth: 0.7,
              wet: 0.3,
            }),
            new Tone.Reverb({
              decay: 2,
              wet: 0.2,
            }),
            new Tone.Compressor({
              threshold: -24,
              ratio: 3,
              attack: 0.03,
              release: 0.25,
            }),
            new Tone.EQ3({
              low: 2,
              mid: 0,
              high: 1,
              lowFrequency: 250,
              highFrequency: 2500,
            }),
          )
          .toDestination();
      }

      if (mounted) {
        setInstrument(newInstrument);
        setIsLoading(false);
      }
    };

    setupInstrument();

    return () => {
      mounted = false;
      if (newInstrument && preferences.synthType !== "piano") {
        newInstrument.dispose();
      }
    };
  }, [preferences.synthType]);

  const playNote = async (noteName: string) => {
    await Tone.start();

    if (instrument) {
      const standardNoteName = noteName.replace("♯", "#");
      const noteWithOctave = `${standardNoteName}4`;
      instrument.triggerAttackRelease(noteWithOctave, "16n");
    }
  };

  if (isLoading) {
    return <div>Loading synthesizer...</div>;
  }

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
