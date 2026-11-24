import ContentCard from "@/components/ContentCard";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Time Circle - Algorithmic Harmony & Dynamic Groove Generator | GridBeat",
  description:
    "Explore chord progressions, radial clockwork harmony visualization, procedural backing tracks, and multi-track MIDI export with Time Circle.",
  alternates: {
    canonical: "https://www.gridbeat.wiki/time-circle",
  },
};

export default function TimeCirclePage() {
  return (
    <div className="mt-20">
      <div className="mx-auto p-4">
        <div className="flex justify-center">
          <div className="w-full lg:w-7/12">
            {/* Card 1: What is Time Circle */}
            <ContentCard
              title="Time Circle"
              emoji="⏱️"
              headingLevel="h1"
            >
              <p className="text-base sm:text-lg mb-3 sm:mb-4 font-sans">
                <strong>Time Circle</strong> is a high-performance music theory exploration engine and dynamic backing track synthesizer engineered in pure Rust and running smoothly in modern browsers via WebAssembly (Wasm).
              </p>
              <p className="text-base sm:text-lg mb-3 sm:mb-4 font-sans">
                Designed to make harmony intuitive and visceral, it unifies circular progression visualization, algorithmic sound synthesis, multi-track accompaniment arranging, and AI agent interoperability through the Model Context Protocol (MCP).
              </p>
              <ul className="list-disc list-inside text-base sm:text-lg space-y-1 sm:space-y-2 font-sans mb-6">
                <li>
                  <strong>Interactive Clockwork Wheel:</strong> Radial visualization of 4, 8, 12, or 16 bars with Roman numeral harmonic color-coding and real-time rotating playhead.
                </li>
                <li>
                  <strong>Zero-Dependency Procedural Audio:</strong> Algorithmically generates an in-memory General MIDI SoundFont bank (<code className="text-sm bg-zinc-200 dark:bg-zinc-800 px-1 py-0.5 rounded">.sf2</code>) for instant, low-latency audio without external sample downloads.
                </li>
                <li>
                  <strong>Dynamic Arranger Engine:</strong> Authentic walking bass lines, Chicago shuffles, funk backbeats, neo-soul pocket comping, and automated turnaround fills.
                </li>
                <li>
                  <strong>Studio-Grade MIDI Export:</strong> Drag-and-drop Standard MIDI Files (SMF Format 1) with dedicated Conductor, Chords, Bass, and Drum tracks directly into any DAW.
                </li>
                <li>
                  <Link
                    href="/mcps"
                    className="text-blue-700 dark:text-blue-400 underline font-semibold"
                  >
                    AI &amp; MCP Integration:
                  </Link>{" "}
                  Direct bidirectional control for LLMs and coding agents like Antigravity, Claude Desktop, and Cursor.
                </li>
              </ul>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="https://time-circle.gridbeat.wiki/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm sm:text-base transition-colors duration-200 shadow"
                >
                  <span>Launch Time Circle Live</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
                <a
                  href="https://github.com/delta-orchid/time-circle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-medium text-sm sm:text-base transition-colors duration-200"
                >
                  <span>Time Circle GitHub</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
                <Link
                  href="/mcps"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-medium text-sm sm:text-base transition-colors duration-200"
                >
                  <span>Explore Music MCPs →</span>
                </Link>
              </div>
            </ContentCard>

            {/* Card 2: How to Use It */}
            <ContentCard
              title="How to Use It"
              emoji="🎹"
              headingLevel="h2"
            >
              <p className="text-base sm:text-lg mb-3 sm:mb-4 font-sans">
                Time Circle lets you explore, audition, and rearrange chord progressions in four easy steps:
              </p>
              <ol className="list-decimal list-inside text-base sm:text-lg space-y-3 font-sans mb-4">
                <li>
                  <strong>Select a Form Preset &amp; Key:</strong> Choose from 17 curated harmonic templates across Blues (Standard 12-bar, Bird Blues, Chicago Slow Blues with <code className="text-sm bg-zinc-200 dark:bg-zinc-800 px-1 py-0.5 rounded">#IVdim7</code>), Pop &amp; Rock (Pop Axis, 50s Doo-Wop, Andalusian cadence), or Soul &amp; R&amp;B (Royal Road, Neo-Soul gospel climbs, Motown grooves).
                </li>
                <li>
                  <strong>Edit Bars &amp; Chord Qualities:</strong> Click any measure on the radial wheel to edit chord degrees, switch between 16 chord qualities (triads, 7ths, 9ths, 13ths, 7alt, m7b5), or subdivide measures into 1, 2, or 4 chords.
                </li>
                <li>
                  <strong>Apply Spice &amp; Harmonic Mutations:</strong> Use the Spice slider to dynamically inject secondary dominants, tritone substitutions, and altered tensions into the progression, or trigger authentic 2-bar cadential turnarounds.
                </li>
                <li>
                  <strong>Shape the Rhythm Section &amp; Export:</strong> Customize comping keyboard/guitar styles, choose upright or electric bass lines, select drum grooves with swing settings (50% straight to 75% heavy shuffle), and export multi-track MIDI files with one click.
                </li>
              </ol>
            </ContentCard>

            {/* Card 3: Open Source & Desktop Build */}
            <ContentCard
              title="Open Source & Desktop Build"
              emoji="🛠️"
              headingLevel="h2"
            >
              <p className="text-base sm:text-lg mb-3 sm:mb-4 font-sans">
                Time Circle and its companion Model Context Protocol tools are 100% open source under the MIT License.
              </p>
              <ul className="list-disc list-inside text-base sm:text-lg space-y-1 sm:space-y-2 font-sans mb-4">
                <li>
                  <strong>Native Desktop GUI:</strong> In addition to the web app, Time Circle compiles to a native 60 FPS desktop application for macOS, Linux, and Windows using <code className="text-sm bg-zinc-200 dark:bg-zinc-800 px-1 py-0.5 rounded font-mono">egui</code> and <code className="text-sm bg-zinc-200 dark:bg-zinc-800 px-1 py-0.5 rounded font-mono">cpal</code> audio.
                </li>
                <li>
                  <strong>WebAssembly Pipeline:</strong> The exact same Rust engine powers the browser edition without external plugins.
                </li>
                <li>
                  <strong>AI &amp; MCP Integration:</strong> Explore the <Link href="/mcps" className="text-blue-700 dark:text-blue-400 underline font-medium">Time Circle MCP Server</Link> for AI composition and DAW MIDI export.
                </li>
              </ul>
              <div className="flex flex-wrap gap-4 pt-2 font-sans">
                <a
                  href="https://github.com/delta-orchid/time-circle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 dark:text-blue-400 underline font-semibold text-base sm:text-lg"
                >
                  time-circle Repository ↗
                </a>
                <Link
                  href="/mcps"
                  className="text-blue-700 dark:text-blue-400 underline font-semibold text-base sm:text-lg"
                >
                  Explore Music MCPs →
                </Link>
              </div>
            </ContentCard>
          </div>
        </div>
      </div>
    </div>
  );
}
