import React from "react";
import { NOTES } from "@/constants";
import { Note } from "@/types";

interface PianoKeyProps {
  note: Note;
  octave: number;
}

const PianoKey: React.FC<PianoKeyProps> = ({ note, octave }) => {
  const isBlack = !note.natural;

  return (
    <div
      className={`
        ${isBlack ? "bg-black h-32 w-8 -mx-4 z-10 pl-1 pt-16" : `bg-white h-48 w-12 pl-5 pt-36 `}
        relative border border-gray-800 font-mono
      `}
      data-note={`${note.name}${octave}`}
      style={{
        background: isBlack
          ? `linear-gradient(to bottom, black 0%, black 30%, ${note.color} 30%, ${note.color} 100%)`
          : note.color,
        color: note.textColor,
      }}
    >
      {note.name}
    </div>
  );
};

const PianoKeyboard: React.FC = () => {
  const createKeys = () => {
    const keys = [];
    const octaves = 2;

    for (let octave = 0; octave < octaves; octave++) {
      NOTES.forEach((note) => {
        keys.push({ note, octave });
      });
    }

    // Add the final C key for the last octave
    keys.push({ note: NOTES[0], octave: 2 });

    return keys;
  };

  const keys = createKeys();

  return (
    <div className="w-full overflow-x-auto p-4">
      <div className="flex relative">
        {keys.map((key, index) => (
          <PianoKey key={index} note={key.note} octave={key.octave} />
        ))}
      </div>
    </div>
  );
};

export default PianoKeyboard;
