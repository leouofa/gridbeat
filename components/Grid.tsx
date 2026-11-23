"use client";

import React, { useEffect } from "react";
import { Note, Interval, SynthType, Scale, PushLayout } from "@/types";
import { NOTES, SCALES } from "@/constants";
import { usePreferences } from "@/contexts/PreferencesContext";
import { getNoteHighlight } from "@/utils/NoteHighlighter";
import { PianoSamplerSingleton } from "@/utils/PianoSamplerSingleton";
import * as Tone from "tone";
import { useInstrument } from "@/hooks/useInstrument";
import LoadingSpinner from "@/components/LoadingSpinner";

interface GridCell {
  note: Note;
  absoluteSemitones: number;
}

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
      const octave = 2 + Math.floor(cell.absoluteSemitones / 12);
      const standardNoteName = cell.note.name.replace("♯", "#");
      const noteWithOctave = `${standardNoteName}${octave}`;
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

  // Helper function to normalize note position into 0..11
  const normalizePosition = (position: number): number => {
    let normalized = position % 12;
    if (normalized < 0) normalized += 12;
    return normalized;
  };

  const getPushChromaticRowStep = (layout: PushLayout): number => {
    switch (layout) {
      case "4ths":
        return 5;
      case "3rds":
        return 3;
      case "sequent":
        return 8;
    }
  };

  const getPushInKeyRowStep = (layout: PushLayout): number => {
    switch (layout) {
      case "4ths":
        return 3;
      case "3rds":
        return 2;
      case "sequent":
        return 8;
    }
  };

  const resolveActiveScale = (): Scale => {
    if (scale) return scale;
    // Infer Minor scale for chords with a minor 3rd (e.g., Minor, Diminished), otherwise Major
    const isMinorQuality = pattern && pattern[1] === 3;
    const targetName = isMinorQuality ? "Minor" : "Major";
    return SCALES.find((s) => s.name === targetName) ?? SCALES[0];
  };

  const getScaleDegreeSemitones = (activeScale: Scale): number[] => {
    const offsets: number[] = [0];
    let acc = 0;
    for (let i = 0; i < activeScale.pattern.length - 1; i++) {
      acc += activeScale.pattern[i];
      offsets.push(acc);
    }
    return offsets;
  };

  const buildLaunchpadGrid = (): GridCell[][] => {
    const width = props?.width ?? preferences.gridWidth;
    const rowStep = [2, 3, 4, 5, 8].includes(width) ? width : 8;
    const grid: GridCell[][] = [];

    for (let row = 0; row < 8; row++) {
      const gridRow: GridCell[] = [];
      for (let column = 0; column < 8; column++) {
        const absoluteSemitones = row * rowStep + column;
        const note = NOTES[normalizePosition(absoluteSemitones)];
        gridRow.push({ note, absoluteSemitones });
      }
      grid.push(gridRow);
    }

    return grid;
  };

  const buildPushGrid = (): GridCell[][] => {
    const anchorNoteNumber = scaleRootNote ?? rootNote ?? 1;
    const anchorIndex = normalizePosition(anchorNoteNumber - 1);
    const grid: GridCell[][] = [];

    if (preferences.pushMode === "inKey") {
      const activeScale = resolveActiveScale();
      const degreeOffsets = getScaleDegreeSemitones(activeScale);
      const scaleLen = degreeOffsets.length;
      const rowDegreeStep = getPushInKeyRowStep(preferences.pushLayout);

      for (let row = 0; row < 8; row++) {
        const gridRow: GridCell[] = [];
        for (let column = 0; column < 8; column++) {
          const degreeIndex = row * rowDegreeStep + column;
          const octaveSemitones = Math.floor(degreeIndex / scaleLen) * 12;
          const degreeSemitones = degreeOffsets[degreeIndex % scaleLen];
          const absoluteSemitones =
            anchorIndex + octaveSemitones + degreeSemitones;
          const note = NOTES[normalizePosition(absoluteSemitones)];
          gridRow.push({ note, absoluteSemitones });
        }
        grid.push(gridRow);
      }
    } else {
      const rowStep = getPushChromaticRowStep(preferences.pushLayout);

      for (let row = 0; row < 8; row++) {
        const gridRow: GridCell[] = [];
        for (let column = 0; column < 8; column++) {
          const absoluteSemitones = anchorIndex + row * rowStep + column;
          const note = NOTES[normalizePosition(absoluteSemitones)];
          gridRow.push({ note, absoluteSemitones });
        }
        grid.push(gridRow);
      }
    }

    return grid;
  };

  const grid =
    controller === "push" ? buildPushGrid() : buildLaunchpadGrid();

  const headerLabel = controller === "push" ? "Push" : "Launchpad";

  return (
    <div>
      {showHeader && (
        <div className="font-mono text-xs text-zinc-400 mb-1 mx-1">
          {headerLabel}
        </div>
      )}
      {grid.reverse().map((row, rowIndex) => (
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
