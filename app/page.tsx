import ContentCard from "@/components/ContentCard";

export default function Home() {
  return (
    <div className="mt-20">
      <div className="mx-auto p-4">
        <div className="flex justify-center">
          <div className="w-full lg:w-7/12">
            <ContentCard
              title="The Truth About Music"
              emoji="🎵"
              headingLevel="h1"
            >
              <p className="text-base sm:text-lg mb-3 sm:mb-4 font-sans">
                Have you ever wondered why music speaks to everyone, no matter
                their background? Music {"isn't"} just something we listen to—
                {"it's"} part of who we are. Here are some truths about music:
              </p>
              <ul className="list-disc list-inside text-base sm:text-lg space-y-1 sm:space-y-2 font-sans">
                <li>
                  We are all born knowing how to tap our feet, sing and enjoy
                  music.
                </li>
                <li>
                  Just like the human language, music is an{" "}
                  <a
                    href="https://www.amazon.com/Language-Instinct-How-Mind-Creates/dp/1491514981"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 underline"
                  >
                    Instinct
                  </a>
                  .
                </li>
                <li>
                  Music both unifies and equalizes people, breaking down
                  barriers that separate us.
                </li>
                <li>
                  Music is a language of feeling, and through it, people get to
                  know the real us.
                </li>
                <li>
                  <strong>Anyone can learn how to play music</strong>,
                  regardless of age, creed or gender.
                </li>
                <li>
                  Learning music is simpler than it seems. Just start and give
                  yourself the space to grow.
                </li>
                <li>
                  Music is a marathon, not a sprint—slow down and enjoy the
                  journey.
                </li>
              </ul>
            </ContentCard>

            <ContentCard
              title="Start With Electronic Music"
              emoji="💾"
              headingLevel="h2"
            >
              <p className="text-base sm:text-lg mb-3 sm:mb-4 font-sans">
                Ready to create your own beats and explore endless
                possibilities? Electronic music is a great way to get started on
                your musical journey. {"Here's"} why:
              </p>
              <ul className="list-disc list-inside text-base sm:text-lg space-y-1 sm:space-y-2 font-sans">
                <li>
                  Start making music right away while you develop rhythm and
                  timing.
                </li>
                <li>
                  <strong>Simplify learning</strong> by separating music theory
                  from learning how to play an instrument.
                </li>
                <li>
                  Learn one instrument, and {"you'll"} have access to hundreds
                  of others.
                </li>
                <li>Learn live looping and become a one-person orchestra.</li>
                <li>
                  Use filters and special effects to craft your own unique
                  sounds.
                </li>
                <li>Produce your own music and share it with the world.</li>
                <li>
                  Music is music—your skills in electronic music will enhance
                  your ability to play traditional instruments.
                </li>
              </ul>
            </ContentCard>

            <ContentCard
              title="Use Grid Controllers"
              emoji="🛠️"
              headingLevel="h2"
            >
              <p className="text-base sm:text-lg mb-3 sm:mb-4 font-sans">
                If {"you're"} new to music production, grid controllers are a
                game changer. Imagine creating music by simply pressing buttons.
              </p>
              <p className="text-base sm:text-lg mb-3 sm:mb-4 font-sans">
                {"That's"} the power of a grid controller like the Novation
                Launchpad. {"It's"} as easy as tapping a button to trigger
                different sounds, making it a perfect tool for beginners.{" "}
                {"Here's"} why:
              </p>
              <ul className="list-disc list-inside text-base sm:text-lg space-y-1 sm:space-y-2 font-sans">
                <li>
                  Launchpads are similar to computer keyboards, making them an
                  ideal choice for those that already know how to type.
                </li>
                <li>
                  <strong>They are affordable</strong> with prices ranging from{" "}
                  <a
                    href="https://us.novationmusic.com/products/launchpad-mini-mk3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 underline"
                  >
                    $99
                  </a>{" "}
                  to{" "}
                  <a
                    href="https://us.novationmusic.com/products/launchpad-pro-mk3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 underline"
                  >
                    $299
                  </a>{" "}
                  for new models. Used and refurbished units are much cheaper.
                </li>
                <li>
                  They are multi-purpose. You can play piano, viola and lay down
                  the drum track with a single controller.
                </li>
                <li>
                  They will grow with you. As you get better at music you can
                  expand your setup and add more launchpads to your arsenal.
                </li>
              </ul>
            </ContentCard>
          </div>
        </div>
      </div>
    </div>
  );
}
