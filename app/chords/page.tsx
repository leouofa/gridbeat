import ChordBank from "@/components/ChordBank";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Chord Bank | GridBeat",
    description: "Explore and learn musical chords with our interactive chord bank. Play, favorite, and understand different chord types and progressions.",
    alternates: {
        canonical: "https://www.gridbeat.wiki/chords",
    },
}


export default function ChordsHome() {
  return (
    <div>
      <ChordBank />
    </div>
  );
}
