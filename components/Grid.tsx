"use client";

import React, { useEffect } from "react";
import { Interval, SynthType, Scale } from "@/types";
import { usePreferences } from "@/contexts/PreferencesContext";
import { getNoteHighlight } from "@/utils/NoteHighlighter";
import { PianoSamplerSingleton } from "@/utils/PianoSamplerSingleton";
import * as Tone from "tone";
import { useInstrument } from "@/hooks/useInstrument";
import LoadingSpinner from "@/components/LoadingSpinner";
import {
  GridCell,
  buildLaunchpadGrid,
  buildPushGrid,
  getCellPitch,
} from "@/utils/gridUtils";

interface GridProps {
  pattern?: Interval;
  rootNote?: number;
  synthType?: SynthType;
  controller?: "launchpad" | "push";
  scale?: Scale;
  scaleRootNote?: number;
  showHeader?: boolean;
  props?: {
    visible?: boolean;
    width?: number;
  };
}

const Grid: React.FC<GridProps> = ({
  pattern,
  rootNote,
  synthType: propsSynthType = undefined,
  controller = "launchpad",
  scale,
  scaleRootNote,
  showHeader = false,
  props,
}) => {
  const { preferences } = usePreferences();
  const activeSynthType = propsSynthType ?? preferences.synthType;
  const { instrument, isLoading } = useInstrument(activeSynthType);

  // Preload piano samples when component mounts
  useEffect(() => {
    PianoSamplerSingleton.getInstance(); // Start loading immediately
  }, []);

  const playNote = async (cell: GridCell) => {
    await Tone.start();

    if (instrument) {
      const noteWithOctave = getCellPitch(cell);
      instrument.triggerAttackRelease(noteWithOctave, "8n");
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Use props.visible if provided, otherwise check preferences for this controller
  const isVisible =
    props?.visible ?? preferences.visibleInstruments.includes(controller);

  // Early return if grid should not be visible
  if (!isVisible) {
    return null;
  }

  const grid =
    controller === "push"
      ? buildPushGrid({
          pushMode: preferences.pushMode,
          pushLayout: preferences.pushLayout,
          rootNote,
          scaleRootNote,
          scale,
          pattern,
        })
      : buildLaunchpadGrid(props?.width ?? preferences.gridWidth);

  const headerLabel = controller === "push" ? "Push" : "Launchpad";

  return (
    <div>
      {showHeader && (
        <div className="font-mono text-xs text-zinc-400 mb-1 mx-1">
          {headerLabel}
        </div>
      )}
      {[...grid].reverse().map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((cell, columnIndex) => {
            const highlight =
              pattern && rootNote !== undefined
                ? getNoteHighlight(cell.note, pattern, rootNote)
                : { opacity: 1 };

            return (
              <div
                key={`${rowIndex}-${columnIndex}`}
                className="w-12 h-12 flex items-center justify-center m-1 rounded border-2 border-gray-800 dark:border-gray-200 cursor-pointer hover:saturate-[2.5] active:saturate-[3.0] select-none"
                style={{
                  backgroundColor: cell.note.color,
                  color: cell.note.textColor,
                  opacity: highlight.opacity,
                  filter: highlight.filter,
                }}
                onClick={() => playNote(cell)}
              >
                {cell.note.name}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Grid;
