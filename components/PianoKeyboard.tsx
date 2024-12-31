import React from "react";

interface PianoKeyProps {
  isBlack: boolean;
  note: string;
}

const PianoKey: React.FC<PianoKeyProps> = ({ isBlack, note }) => {
  return (
    <div
      className={`
            ${
              isBlack
                ? "bg-black h-32 w-8 -mx-4 z-10 hover:bg-gray-800"
                : "bg-white h-48 w-12 hover:bg-gray-100"
            }
            relative cursor-pointer border border-gray-800
          `}
      data-note={note}
    />
  );
};

const PianoKeyboard: React.FC = () => {
  const createKeys = () => {
    const notes = [
      "C",
      "C#",
      "D",
      "D#",
      "E",
      "F",
      "F#",
      "G",
      "G#",
      "A",
      "A#",
      "B",
    ];
    const keys = [];
    const octaves = 2; // Full piano has 7 octaves plus a few extra keys

    for (let octave = 0; octave < octaves; octave++) {
      notes.forEach((note) => {
        const isBlack = note.includes("#");
        keys.push({ note: `${note}${octave}`, isBlack });
      });
    }

    // Add the final C key for the last octave
    keys.push({ note: "C8", isBlack: false });

    return keys;
  };

  const keys = createKeys();

  return (
    <div className="w-full overflow-x-auto p-4">
      <div className="flex relative">
        {keys.map((key, index) => (
          <PianoKey key={index} isBlack={key.isBlack} note={key.note} />
        ))}
      </div>
    </div>
  );
};

export default PianoKeyboard;
