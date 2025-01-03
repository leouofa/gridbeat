"use client";

import React from "react";
import { Interval, SynthType } from "@/types";
import { usePreferences } from "@/contexts/PreferencesContext";
import { getNoteHighlight } from "@/utils/NoteHighlighter";
import { useGridNotePlayer } from "@/hooks/useGridNotePlayer";
import { buildGrid } from "@/utils/gridBuilder";
import LoadingSpinner from "@/components/LoadingSpinner";

interface GridProps {
  pattern?: Interval;
  rootNote?: number;
  synthType?: SynthType;
  props?: {
    visible?: boolean;
    width?: number;
  };
}

const Grid: React.FC<GridProps> = ({ pattern, rootNote, synthType, props }) => {
  const { preferences } = usePreferences();
  const {
    playNote,
    isLoading,
    isVisible: isInstrumentVisible,
  } = useGridNotePlayer(synthType);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const isVisible =
    props?.visible ??
    (isInstrumentVisible && preferences.visibleInstruments.includes("grid"));

  if (!isVisible) {
    return null;
  }

  const width = props?.width ?? preferences.gridWidth;
  const grid = buildGrid(width);

  return (
    <div>
      {grid.reverse().map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((note, columnIndex) => {
            const highlight =
              pattern && rootNote !== undefined
                ? getNoteHighlight(note, pattern, rootNote)
                : { opacity: 1 };

            return (
              <div
                key={`${rowIndex}-${columnIndex}`}
                className="w-12 h-12 flex items-center justify-center m-1 rounded border-2 border-gray-800 dark:border-gray-200 cursor-pointer hover:saturate-[2.5] active:saturate-[3.0] select-none"
                style={{
                  backgroundColor: note.color,
                  color: note.textColor,
                  opacity: highlight.opacity,
                  filter: highlight.filter,
                }}
                onClick={() => playNote(note, rowIndex, columnIndex)}
              >
                {note.name}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Grid;
