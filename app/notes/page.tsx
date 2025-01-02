import ContentCard from "@/components/ContentCard";
import Grid from "@/components/Grid";
import { NOTES } from "@/constants";

export default function NotesPage() {
  return (
    <div className="mt-20">
      <div className="mx-auto p-4">
        <div className="flex justify-center">
          <div className="w-full lg:w-7/12">
            <ContentCard title="What are Notes" emoji="🎵" headingLevel="h1">
              <ul className="list-disc list-inside text-base sm:text-lg space-y-1 sm:space-y-2 font-sans">
                <li>
                  At their simplest form notes are <strong>symbols</strong> for
                  sounds.
                </li>
                <li>
                  Western music uses 12 notes, to denote 12 distinct sounds.
                </li>
              </ul>

              <div className="flex justify-center gap-2 my-6">
                {NOTES.map((note) => (
                  <div
                    key={note.alias}
                    className="w-10 h-10 flex items-center justify-center rounded"
                  >
                    {note.alias}
                  </div>
                ))}
              </div>

              <ul className="list-disc list-inside text-base sm:text-lg space-y-1 sm:space-y-2 font-sans">
                <li>
                  Instead of using numbers we can use letters to represent them.
                </li>
                <li>Its easiest to think of it as a musical alphabet.</li>
              </ul>

              <div className="flex justify-center gap-2 my-6">
                {NOTES.map((note) => (
                  <div
                    key={note.name}
                    className="w-10 h-10 flex items-center justify-center rounded"
                    style={{
                      backgroundColor: note.color,
                      color: note.textColor,
                    }}
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
                  Sharps notes (♯) have alternate names, called flats (♭).
                </li>
                <li>For example, C♯ is equivalent to D♭.</li>
              </ul>

              <div className="flex justify-center gap-2 my-6">
                {NOTES.map((note) => (
                  <div
                    key={note.name}
                    className={`w-10 h-10 flex items-center justify-center rounded ${
                      !note.natural ? "bg-black text-white" : "bg-white"
                    }`}
                  >
                    {note.name}
                  </div>
                ))}
              </div>
            </ContentCard>

            <ContentCard title="The Octaves" emoji="🎶" headingLevel="h2">
              <ul className="list-disc list-inside text-base sm:text-lg space-y-1 sm:space-y-2 font-sans">
                <li>
                  On a grid controller the notes are laid out from{" "}
                  <strong>bottom left to top right</strong>.
                </li>
                <li>They start with C, go up to B, and then repeat.</li>
                <li>
                  The distance from C to B is called an <strong>Octave</strong>.
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
                  Learning to use the grid controller is no different than using
                  a computer keyboard.
                </li>
                <li>
                  In the beginning you will look at the controller to find the
                  notes you are looking for.
                </li>
                <li>
                  Over time you will develop muscle memory, and will know which
                  button to press based on the sound you want to produce.
                </li>
              </ul>
            </ContentCard>
          </div>
        </div>
      </div>
    </div>
  );
}
