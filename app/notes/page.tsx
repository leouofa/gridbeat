"use client";
import ContentCard from "@/components/ContentCard";
import Grid from "@/components/Grid";
import LoadingSpinner from "@/components/LoadingSpinner";
import { NoteButtonRow } from "@/components/NoteButtonRow";
import { useNotePlayer } from "@/hooks/useNotePlayer";
import { NOTES } from "@/constants";

export default function NotesPage() {
  const { playNote, isLoading } = useNotePlayer("piano");

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const handlePlayNote = (noteName: string) => {
    const note = NOTES.find((n) => n.name === noteName);
    if (note) {
      playNote(note, 4);
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

              <NoteButtonRow
                variant="alias"
                onPlay={handlePlayNote}
                className="mb-8"
              />

              <ul className="list-disc list-inside text-base sm:text-lg space-y-1 sm:space-y-2 font-sans">
                <li>Notes can be represented by letters instead of numbers.</li>
                <li>Think of it as a musical alphabet for easy reference.</li>
              </ul>

              <NoteButtonRow onPlay={handlePlayNote} />
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

              <NoteButtonRow variant="natural" onPlay={handlePlayNote} />
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
