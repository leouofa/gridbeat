import ContentCard from "@/components/ContentCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Leonid Medovyy - Creator of GridBeat | GridBeat",
  description:
    "Learn about Leonid Medovyy, software engineer, AI architect, and creator of GridBeat. Explore his ventures including Ninja in Brazil, his book Modern Applications of Ninjutsu, and his electronic music on SoundCloud and Mixcloud.",
  alternates: {
    canonical: "https://www.gridbeat.wiki/about",
  },
};

export default function AboutPage() {
  return (
    <div className="mt-20">
      <div className="mx-auto p-4">
        <div className="flex justify-center">
          <div className="w-full lg:w-7/12">
            {/* Card 1: About Leonid Medovyy */}
            <ContentCard
              title="About Leonid Medovyy"
              emoji="👋"
              headingLevel="h1"
            >
              <p className="text-base sm:text-lg mb-3 sm:mb-4 font-sans">
                <strong>Leonid Medovyy</strong> is a software engineer, AI architect, author, and electronic music producer based in the United States and operating via{" "}
                <a
                  href="https://www.macron1.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 dark:text-blue-400 underline font-medium"
                >
                  macron1.io
                </a>
                .
              </p>
              <p className="text-base sm:text-lg mb-3 sm:mb-4 font-sans">
                As a lifelong builder, Leonid created <strong>GridBeat</strong> and <strong>Time Circle</strong> to solve a fundamental problem in music education: bridge the gap between abstract music theory and intuitive, hands-on musical expression. By translating complex chord formulas, scale modes, and harmonic voicings into real-time interactive finger patterns across isomorphic grid controllers (Novation Launchpad, Ableton Push), piano keyboards, and acoustic fretboards (guitar and ukulele), GridBeat turns theory into immediate muscle memory.
              </p>
              <p className="text-base sm:text-lg mb-6 font-sans">
                Leonid also engineered the official GridBeat and Time Circle Model Context Protocol (MCP) servers, empowering AI coding assistants with deterministic chord calculations, vector PDF sheet generation, and DAW-ready MIDI exports.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="https://www.macron1.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm sm:text-base transition-colors duration-200 shadow"
                >
                  <span>Visit macron1.io</span>
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
                  href="https://github.com/delta-orchid"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-medium text-sm sm:text-base transition-colors duration-200"
                >
                  <span>delta-orchid on GitHub</span>
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

            {/* Card 2: Ninja in Brazil */}
            <ContentCard
              title="Ninja in Brazil"
              emoji="🥷"
              headingLevel="h2"
            >
              <p className="text-base sm:text-lg mb-3 sm:mb-4 font-sans">
                <strong>Ninja in Brazil</strong> (
                <a
                  href="https://ninjainbrazil.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 dark:text-blue-400 underline font-medium"
                >
                  ninjainbrazil.com
                </a>
                ) is Leonid&apos;s personal development ecosystem and web/mobile platform crafted specifically for developers, engineers, and modern polymaths.
              </p>
              <p className="text-base sm:text-lg mb-3 sm:mb-4 font-sans">
                Built on the conviction that high-performance software engineering requires holistic capability, Ninja in Brazil provides dedicated tools for tracking multi-disciplinary skills, managing personal project showcases, cultivating daily discipline, and avoiding burnout.
              </p>
              <ul className="list-disc list-inside text-base sm:text-lg space-y-2 font-sans mb-6">
                <li>
                  <strong>Holistic Growth:</strong> Unifies technical engineering prowess with physical fitness, martial discipline, nutrition, and artistic creativity.
                </li>
                <li>
                  <strong>Daily Practice Loops:</strong> Structured systems to maintain momentum, build repeatable habits, and translate long-term aspirations into daily execution.
                </li>
                <li>
                  <strong>Developer-Centric Philosophy:</strong> Tailored for builders navigating rapid tech evolution, distributed systems, and modern startup environments.
                </li>
              </ul>

              <div className="pt-2">
                <a
                  href="https://ninjainbrazil.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm sm:text-base transition-colors duration-200 shadow"
                >
                  <span>Explore Ninja in Brazil</span>
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

            {/* Card 3: Modern Applications of Ninjutsu */}
            <ContentCard
              title="Modern Applications of Ninjutsu"
              emoji="📖"
              headingLevel="h2"
            >
              <p className="text-base sm:text-lg mb-3 sm:mb-4 font-sans">
                In his book,{" "}
                <a
                  href="https://www.amazon.com/dp/B0HNF1T788"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 dark:text-blue-400 underline font-semibold"
                >
                  Modern Applications of Ninjutsu
                </a>
                , Leonid adapts ancient ninja principles, including adaptability, resilience, strategic patience, and self-reliance, into an actionable blueprint for modern life and career mastery.
              </p>
              <p className="text-base sm:text-lg mb-3 sm:mb-4 font-sans">
                A centerpiece of the book is <strong>Chapter 8: &ldquo;Music for Ninjas&rdquo;</strong>, which dismantles the myth that musical ability is an innate, mystical gift:
              </p>
              <ul className="list-disc list-inside text-base sm:text-lg space-y-2 font-sans mb-6">
                <li>
                  <strong>The Music Instinct:</strong> Rhythm is hardwired into the human nervous system through our heartbeat, breathing, and walking. Music is a trainable skill that sharpens timing, pattern recognition, and emotional intuition.
                </li>
                <li>
                  <strong>Electronic Music as an On-Ramp:</strong> Why electronic production and isomorphic grid controllers are the smartest starting point because they decouple music theory, song structure, and harmony from years of mechanical finger gymnastics, allowing you to learn the language before mastering the handwriting.
                </li>
                <li>
                  <strong>The Simple Practice Loop:</strong> A 30-day framework focused on 5 minutes of metronome timing, 10–20 minutes of harmonic vocabulary (chords and scales), and 10–20 minutes of tangible output.
                </li>
                <li>
                  <strong>The Rule of Progress:</strong> Never leave a session without finishing and saving a concrete artifact, such as an 8-bar loop, a clean progression take, or a recorded song section.
                </li>
              </ul>

              <div className="pt-2">
                <a
                  href="https://www.amazon.com/dp/B0HNF1T788"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm sm:text-base transition-colors duration-200 shadow"
                >
                  <span>Get the Book on Amazon</span>
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

            {/* Card 4: Music Productions & DJ Sets */}
            <ContentCard
              title="Music Productions & DJ Sets"
              emoji="🎧"
              headingLevel="h2"
            >
              <p className="text-base sm:text-lg mb-3 sm:mb-4 font-sans">
                Leonid puts the &ldquo;Music for Ninjas&rdquo; philosophy into practice as an active electronic music producer, live performer, and DJ. You can listen to his original tracks, beats, and curated sets across his official streaming channels:
              </p>
              <ul className="list-disc list-inside text-base sm:text-lg space-y-2 font-sans mb-6">
                <li>
                  <strong>SoundCloud (Original Tracks &amp; Beats):</strong> Explore original electronic compositions, synth explorations, hardware jam sessions, and studio experiments at{" "}
                  <a
                    href="https://soundcloud.com/leonid-medovyy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 dark:text-blue-400 underline font-medium"
                  >
                    soundcloud.com/leonid-medovyy
                  </a>
                  .
                </li>
                <li>
                  <strong>Mixcloud (DJ Sets &amp; Focus Mixes):</strong> Stream long-form electronic DJ sets, groove progressions, and curated mixes designed for flow state, coding, and deep creative focus at{" "}
                  <a
                    href="https://www.mixcloud.com/itsleonid/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 dark:text-blue-400 underline font-medium"
                  >
                    mixcloud.com/itsleonid
                  </a>
                  .
                </li>
              </ul>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="https://soundcloud.com/leonid-medovyy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm sm:text-base transition-colors duration-200 shadow"
                >
                  <span>SoundCloud Profile</span>
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
                  href="https://www.mixcloud.com/itsleonid/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-medium text-sm sm:text-base transition-colors duration-200"
                >
                  <span>Mixcloud Profile</span>
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
          </div>
        </div>
      </div>
    </div>
  );
}
