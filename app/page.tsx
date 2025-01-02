export default function Home() {
  return (
    <div className="screen welcome mt-10">
      <div className="container mx-auto p-4">
        <div className="grid">
          <div className="row flex justify-center">
            <div className="column w-full lg:w-11/12">
              <div className="segment bg-gray-800 text-white p-6 mb-6">
                <h1 className="text-4xl font-bold text-center border-b-2 pb-2 mb-4">
                  The Truth About Music
                </h1>
                <ul className="list-disc list-inside text-lg space-y-4">
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
                      className="text-blue-400 underline"
                    >
                      Instinct
                    </a>
                    .
                  </li>
                  <li>Music both unifies and equalizes people.</li>
                  <li>
                    Music is a language of feeling and through it people get to
                    know the real us.
                  </li>
                  <li>
                    <strong>Anyone can learn music</strong> how to play music,
                    regardless of age, creed or sexual orientation.
                  </li>
                  <li>
                    Music is easy to learn. All you have to do is start and give
                    yourself space to succeed.
                  </li>
                  <li>Music is a marathon. Slow down and enjoy the journey.</li>
                </ul>
              </div>

              <div className="segment bg-gray-800 text-white p-6 mb-6">
                <h1 className="text-4xl font-bold text-center border-b-2 pb-2 mb-4">
                  Why Electronic Music?
                </h1>
                <ul className="list-disc list-inside text-lg space-y-4">
                  <li>
                    Start making music right away while you develop rhythm and
                    timing.
                  </li>
                  <li>
                    <strong>Simplify learning</strong> by separating music
                    theory from learning how to play an instrument.
                  </li>
                  <li>
                    Learn one instrument, and play hundreds of other
                    instruments.
                  </li>
                  <li>Learn live looping and become a one person orchestra.</li>
                  <li>
                    Use filters and special effects to craft your super special
                    sounds.
                  </li>
                  <li>
                    Learn how to produce your own music and share it with
                    others.
                  </li>
                  <li>
                    Music is music. You will become better at playing normal
                    instruments.
                  </li>
                </ul>
              </div>

              <div className="segment bg-gray-800 text-white p-6">
                <h1 className="text-4xl font-bold text-center border-b-2 pb-2 mb-4">
                  Why Grid Controllers?
                </h1>
                <p className="text-lg mb-4">
                  There are over 1,500 music instruments out there. This site
                  focuses on Grid Controllers, specifically the Novation
                  Launchpad Series, here is why:
                </p>
                <ul className="list-disc list-inside text-lg space-y-4">
                  <li>
                    Launchpads are similar to computer keyboards, making them an
                    ideal choice for those that already know how to type.
                  </li>
                  <li>
                    <strong>They are affordable</strong> with prices ranging
                    from{" "}
                    <a
                      href="https://novationmusic.com/en/launch/launchpad-mini"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 underline"
                    >
                      $100
                    </a>{" "}
                    to{" "}
                    <a
                      href="https://novationmusic.com/en/launch/launchpad-pro"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 underline"
                    >
                      $350
                    </a>{" "}
                    for new models. Used and refurbished units are much cheaper.
                  </li>
                  <li>
                    They're multi-purpose. You can play piano, viola and lay
                    down the drum track with a single controller.
                  </li>
                  <li>
                    They'll grow with you. As you get better at music you can
                    expand your setup and add more launchpads to your arsenal.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
