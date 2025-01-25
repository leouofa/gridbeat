import type { Metadata } from "next";
import FavoritesClient from "./Client";

export const metadata: Metadata = {
    title: "Favorite Chords | GridBeat",
    description: "Access your personalized collection of favorite chords. Save and organize the chords you love for quick reference and practice.",
    alternates: {
        canonical: "https://www.gridbeat.wiki/favorites",
    },
}

export default function FavoritesPage() {
    return <FavoritesClient />;
}
