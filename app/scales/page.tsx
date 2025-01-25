import type { Metadata } from "next";
import ScalesClient from "./Client";

export const metadata: Metadata = {
    title: "Musical Scales | GridBeat",
    description: "Discover and play musical scales with their corresponding chords. Learn about scale degrees, chord progressions, and music theory fundamentals.",
    alternates: {
        canonical: "https://www.gridbeat.wiki/scales",
    },
}

export default function ScalesPage() {
    return <ScalesClient />;
}
