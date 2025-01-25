import type { Metadata } from "next";
import NotesClient from "./Client";

export const metadata: Metadata = {
    title: "Musical Notes | GridBeat",
    description: "Learn about musical notes, sharps, flats, and octaves with interactive examples and playable sounds. Perfect for beginners learning music theory.",
    alternates: {
        canonical: "https://www.gridbeat.wiki/notes",
    },
}

export default function NotesPage() {
    return <NotesClient />;
}
