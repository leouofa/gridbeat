import ContentCard from "@/components/ContentCard";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Model Context Protocol (MCP) Servers - GridBeat & Time Circle | GridBeat",
  description:
    "Empower AI assistants with deterministic chord shapes, space-maximized vector PDF chord sheet generation, algorithmic harmony mutation, and multi-track MIDI export using the GridBeat and Time Circle MCP servers.",
  alternates: {
    canonical: "https://www.gridbeat.wiki/mcps",
  },
};

export default function MCPsPage() {
  return (
    <div className="mt-20">
      <div className="mx-auto p-4">
        <div className="flex justify-center">
          <div className="w-full lg:w-7/12">
            {/* Card 1: GridBeat MCP */}
            <ContentCard
              title="GridBeat MCP"
              emoji="🎛️"
              headingLevel="h1"
            >
              <p className="text-base sm:text-lg mb-3 sm:mb-4 font-sans">
                <strong>gridbeat-mcp</strong> is a production-grade Model Context Protocol (MCP) server that connects AI coding assistants, including Claude Desktop, Cursor, Antigravity, and Windsurf, directly to the GridBeat Chord Shapes engine.
              </p>
              <p className="text-base sm:text-lg mb-3 sm:mb-4 font-sans">
                Standard language models frequently hallucinate chord voicings, finger positions, and fret numbers. GridBeat MCP solves this by providing deterministic music calculations and publication-ready vector PDF rendering directly from conversational prompts.
              </p>
              <ul className="list-disc list-inside text-base sm:text-lg space-y-2 font-sans mb-6">
                <li>
                  <strong>Deterministic Multi-Instrument Lookup:</strong> Through the <code className="text-sm bg-zinc-200 dark:bg-zinc-800 px-1.5 py-0.5 rounded font-mono">get_chord_shapes</code> tool, agents query exact note intervals, pitches, and active finger coordinates across 8×8 pad matrices (Novation Launchpad, Ableton Push in chromatic and scale-locked inKey modes), fretboards (Guitar, Ukulele), and piano keyboards.
                </li>
                <li>
                  <strong>Space-Maximized Vector PDF Engine:</strong> The <code className="text-sm bg-zinc-200 dark:bg-zinc-800 px-1.5 py-0.5 rounded font-mono">generate_chord_sheet_pdf</code> tool uses a dynamic 2D layout optimization algorithm that calculates the ideal grid dimensions per page, maximizing diagram sizes and eliminating wasted margins.
                </li>
                <li>
                  <strong>Chord Deduplication &amp; Progression Headers:</strong> Repeated chords throughout song sections are automatically deduplicated into unique diagrams while the complete progression sequence remains clearly displayed in the header.
                </li>
                <li>
                  <strong>Studio &amp; Print Themes:</strong> Render crisp charts in full color, ink-saving black &amp; white, or high-contrast dark themes formatted for US Letter or A4 paper.
                </li>
              </ul>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="https://github.com/delta-orchid/gridbeat-mcp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm sm:text-base transition-colors duration-200 shadow"
                >
                  <span>GridBeat MCP GitHub</span>
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
                  href="https://github.com/delta-orchid/gridbeat/blob/main/API.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-medium text-sm sm:text-base transition-colors duration-200"
                >
                  <span>Chord Shapes API Docs</span>
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
              </div>
            </ContentCard>

            {/* Card 2: Time Circle MCP */}
            <ContentCard
              title="Time Circle MCP"
              emoji="⏱️"
              headingLevel="h2"
            >
              <p className="text-base sm:text-lg mb-3 sm:mb-4 font-sans">
                <strong>time-circle-mcp</strong> bridges AI assistants with <strong>Time Circle</strong>, the high-performance Rust and WebAssembly music theory and dynamic backing track synthesis engine.
              </p>
              <p className="text-base sm:text-lg mb-3 sm:mb-4 font-sans">
                Equipped with 15 specialized tools, 3 structured resources, and 3 workflow prompts, AI agents gain full control over chord progression composition, harmonic voice leading, groove arrangements, and multi-track MIDI production.
              </p>
              <ul className="list-disc list-inside text-base sm:text-lg space-y-2 font-sans mb-6">
                <li>
                  <strong>Algorithmic Harmony &amp; Form Presets:</strong> Choose from 17 curated harmonic structures across Blues (12-bar, Bird Blues, Slow Blues), Pop &amp; Rock (Pop Axis, 50s Ballad, Andalusian Cadence), and Soul &amp; R&amp;B (Royal Road, Neo-Soul gospel climbs). Agents can subdivide measures, edit 16 chord qualities, and transpose keys instantly.
                </li>
                <li>
                  <strong>Dynamic Harmonic Mutation &amp; Turnarounds:</strong> Dial in harmonic spice (0.0 to 1.0) to inject secondary dominants, tritone substitutions, and altered tensions, or trigger authentic 2-measure cadential turnaround fills.
                </li>
                <li>
                  <strong>Multi-Track Virtual Rhythm Section:</strong> Arrange 10 keyboard and guitar comping instruments across 8 styles, upright and electric bass lines (walking bass, shuffle boogie, two-feel), and 9 drum kit grooves with variable swing feel (50% straight to 75% shuffle).
                </li>
                <li>
                  <strong>Dual-Mode Visual Bridge &amp; Headless Operation:</strong> Runs in headless mode for fast background agent tasks or connects via WebSocket (<code className="text-sm bg-zinc-200 dark:bg-zinc-800 px-1 py-0.5 rounded font-mono">ws://127.0.0.1:3847</code>) to the live WebAssembly app for synchronized radial wheel display and low-latency audio playback.
                </li>
                <li>
                  <strong>Studio-Grade MIDI Export:</strong> Renders Standard MIDI Files (SMF Format 1) with dedicated Conductor, Harmony, Bass, and Drum tracks directly to disk for import into any DAW.
                </li>
              </ul>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="https://github.com/delta-orchid/time-circle-mcp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm sm:text-base transition-colors duration-200 shadow"
                >
                  <span>Time Circle MCP GitHub</span>
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
                  href="/time-circle"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-medium text-sm sm:text-base transition-colors duration-200"
                >
                  <span>Learn About Time Circle →</span>
                </Link>
                <a
                  href="https://time-circle.gridbeat.wiki/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-medium text-sm sm:text-base transition-colors duration-200"
                >
                  <span>Launch Time Circle Live ↗</span>
                </a>
              </div>
            </ContentCard>

            {/* Card 3: Quickstart & GitHub Links */}
            <ContentCard
              title="Quickstart & Open Source Links"
              emoji="🚀"
              headingLevel="h2"
            >
              <p className="text-base sm:text-lg mb-3 sm:mb-4 font-sans">
                Connecting GridBeat MCP and Time Circle MCP to your AI environment takes just three simple steps:
              </p>
              <ol className="list-decimal list-inside text-base sm:text-lg space-y-3 font-sans mb-6">
                <li>
                  <strong>Clone &amp; Build:</strong> Clone the repositories from GitHub and run <code className="text-sm bg-zinc-200 dark:bg-zinc-800 px-1.5 py-0.5 rounded font-mono">npm install &amp;&amp; npm run build</code> using Node.js 18 or higher.
                </li>
                <li>
                  <strong>Configure Your Client:</strong> Add the servers to your MCP configuration file in Claude Desktop, Cursor, Antigravity, or Windsurf pointing to the compiled distribution script over standard I/O (stdio). Detailed configuration examples for each platform are available in the respective repository READMEs.
                </li>
                <li>
                  <strong>Prompt in Natural Language:</strong> Ask your assistant to calculate chord fingerings for your controller, generate printable PDF chord sheets, mutate jazz progressions with harmonic spice, or export multi-track MIDI arrangements directly into your project workflow.
                </li>
              </ol>

              <p className="text-base sm:text-lg mb-4 font-sans">
                All GridBeat and Time Circle projects are 100% open source under the MIT License on GitHub:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <a
                  href="https://github.com/delta-orchid/gridbeat-mcp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-100 transition-colors duration-200 font-sans"
                >
                  <span className="font-semibold text-sm sm:text-base">gridbeat-mcp</span>
                  <span className="text-xs text-zinc-400">GitHub ↗</span>
                </a>
                <a
                  href="https://github.com/delta-orchid/time-circle-mcp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-100 transition-colors duration-200 font-sans"
                >
                  <span className="font-semibold text-sm sm:text-base">time-circle-mcp</span>
                  <span className="text-xs text-zinc-400">GitHub ↗</span>
                </a>
                <a
                  href="https://github.com/delta-orchid/gridbeat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-100 transition-colors duration-200 font-sans"
                >
                  <span className="font-semibold text-sm sm:text-base">gridbeat (Web App)</span>
                  <span className="text-xs text-zinc-400">GitHub ↗</span>
                </a>
                <a
                  href="https://github.com/delta-orchid/time-circle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-100 transition-colors duration-200 font-sans"
                >
                  <span className="font-semibold text-sm sm:text-base">time-circle (Engine)</span>
                  <span className="text-xs text-zinc-400">GitHub ↗</span>
                </a>
              </div>
            </ContentCard>
          </div>
        </div>
      </div>
    </div>
  );
}
