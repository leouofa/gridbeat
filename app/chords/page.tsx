import ChordBank from "@/components/ChordBank";
import type {Metadata} from "next";

export const metadata: Metadata = {
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
