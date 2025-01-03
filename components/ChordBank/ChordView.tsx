import React from "react";
import { Chord, Note } from "@/types";
import Grid from "@/components/Grid";
import PianoKeyboard from "@/components/PianoKeyboard";
import Guitar from "@/components/Guitar";
import Ukulele from "@/components/Ukulele";
import { usePreferences } from "@/contexts/PreferencesContext";

interface ChordViewProps {
  note: Note;
  chord: Chord;
  chordNotes: string[];
  onPlay: (notes: string[]) => void;
  onToggleFavorite: () => void;
  isFavorite: boolean;
  isLoading?: boolean;
}

export const ChordView: React.FC<ChordViewProps> = ({
  note,
  chord,
  chordNotes,
  onPlay,
  onToggleFavorite,
  isFavorite,
  isLoading = false,
}) => {
  const { preferences } = usePreferences();
  const hasVisibleInstruments = preferences.visibleInstruments.length > 0;
  const rootNoteNumber = parseInt(note.alias);

  return (
    <div className={hasVisibleInstruments ? "mb-28" : "mb-2"}>
      <div
        className={`font-mono text-lg flex items-center gap-2 ${
          hasVisibleInstruments ? "mb-6" : ""
        }`}
      >
        <span>{`${note.name} ${chord.name} (${chordNotes.join(", ")})`}</span>
        <button
          onClick={() => onPlay(chordNotes)}
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-500 active:bg-blue-700 text-sm border-2 border-gray-800 dark:border-gray-200"
          disabled={isLoading}
        >
          Play
        </button>
        <button
          onClick={onToggleFavorite}
          className={`px-3 py-1 rounded text-sm border-2 ${
            isFavorite
              ? "bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-600 text-black border-gray-800"
              : "bg-gray-600 hover:bg-gray-500 active:bg-gray-700 text-white border-gray-800"
          }`}
        >
          {isFavorite ? "★ Favorited" : "☆ Add to Favorites"}
        </button>
      </div>
      <div className="flex flex-wrap gap-4">
        <div className="flex-shrink-0 flex flex-col gap-4 max-w-full">
          <div className="overflow-x-auto">
            <PianoKeyboard pattern={chord.pattern} rootNote={rootNoteNumber} />
          </div>
          <div className="flex flex-wrap gap-4 max-w-full">
            <div className="overflow-x-auto flex-shrink-0 min-w-0">
              <Guitar pattern={chord.pattern} rootNote={rootNoteNumber} />
            </div>
            <div className="overflow-x-auto flex-shrink-0 min-w-0">
              <Ukulele pattern={chord.pattern} rootNote={rootNoteNumber} />
            </div>
          </div>
        </div>
        <div className="flex-grow">
          <Grid pattern={chord.pattern} rootNote={rootNoteNumber} />
        </div>
      </div>
    </div>
  );
};
