"use client";

import React, { useEffect, useState } from "react";
import { Note, Interval, SynthType } from "@/types";
import { NOTES } from "@/constants";
import { usePreferences } from "@/contexts/PreferencesContext";
import { getNoteHighlight } from "@/utils/NoteHighlighter";
import { PianoSamplerSingleton } from "@/utils/PianoSamplerSingleton";
import * as Tone from "tone";

interface GridProps {
  pattern?: Interval;
  rootNote?: number;
  synthType?: SynthType;
  props?: {
    visible?: boolean;
    width?: number;
  };
}

const Grid: React.FC<GridProps> = ({
  pattern,
  rootNote,
  synthType: propsSynthType = undefined,
  props,
}) => {
  const { preferences } = usePreferences();
  const activeSynthType = propsSynthType ?? preferences.synthType;
  const [instrument, setInstrument] = useState<
    Tone.Synth | Tone.Sampler | Tone.PolySynth | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let newInstrument: typeof instrument = null;
    let mounted = true;

    const setupInstrument = async () => {
      setIsLoading(true);

      if (activeSynthType === "piano") {
        newInstrument = await PianoSamplerSingleton.getInstance();
      } else {
        newInstrument = new Tone.PolySynth(Tone.Synth, {
          oscillator: {
            type: "fatsawtooth",
          },
          envelope: {
            attack: 0.03,
            decay: 0.3,
            sustain: 0.4,
            release: 1.5,
          },
        })
          .chain(
            // Add chorus for width and richness
            new Tone.Chorus({
              frequency: 2.5,
              delayTime: 3.5,
              depth: 0.7,
              wet: 0.3,
            }),
            // Add reverb for space and depth
            new Tone.Reverb({
              decay: 2,
              wet: 0.2,
            }),
            // Add a subtle compression to glue it together
            new Tone.Compressor({
              threshold: -24,
              ratio: 3,
              attack: 0.03,
              release: 0.25,
            }),
            // EQ to shape the tone
            new Tone.EQ3({
              low: 2,
              mid: 0,
              high: 1,
              lowFrequency: 250,
              highFrequency: 2500,
            }),
          )
          .toDestination();
      }

      if (mounted) {
        setInstrument(newInstrument);
        setIsLoading(false);
      }
    };

    setupInstrument();

    return () => {
      mounted = false;
      if (newInstrument && activeSynthType !== "piano") {
        newInstrument.dispose();
      }
    };
  }, [activeSynthType]);

  // Preload piano samples when component mounts
  useEffect(() => {
    PianoSamplerSingleton.getInstance(); // Start loading immediately
  }, []);

  const playNote = async (
    note: Note,
    rowIndex: number,
    columnIndex: number,
  ) => {
    await Tone.start();

    if (instrument) {
      const actualRowIndex = 7 - rowIndex;
      const position = actualRowIndex * 8 + columnIndex;

      let octave = 1;
      let notePosition = 0;

      for (let i = 0; i < position; i++) {
        if (notePosition === 12) {
          notePosition = 0;
        }
        if (notePosition === 0) {
          octave++;
        }
        notePosition++;
      }

      const standardNoteName = note.name.replace("♯", "#");
      const noteWithOctave = `${standardNoteName}${octave}`;
      instrument.triggerAttackRelease(noteWithOctave, "8n");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px] w-full">
        <div className="flex items-center gap-2 text-lg font-medium text-gray-700 dark:text-gray-300">
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading synthesizer...
        </div>
      </div>
    );
  }

  // Use props.visible if provided, otherwise check preferences
  const isVisible =
    props?.visible ?? preferences.visibleInstruments.includes("grid");

  // Early return if grid should not be visible
  if (!isVisible) {
    return null;
  }

  // Helper function to normalize note position
  const normalizePosition = (position: number): number => {
    // Handle negative numbers and numbers larger than 11
    let normalized = position % 12;
    if (normalized < 0) normalized += 12;
    return normalized;
  };

  const buildGrid = (): Note[][] => {
    // Use props.width if provided, otherwise use preferences width
    const width = props?.width ?? preferences.gridWidth;

    switch (width) {
      case 8:
        return buildEight();
      case 2:
        return buildWithOverlap(5);
      case 3:
        return buildWithOverlap(4);
      case 4:
        return buildWithOverlap(3);
      case 5:
        return buildWithOverlap(2);
      default:
        return buildEight();
    }
  };

  const buildEight = (): Note[][] => {
    const grid: number[][] = [];

    for (let row = 0; row < 8; row++) {
      const gridRow: number[] = [];

      for (let column = 0; column < 8; column++) {
        if (row === 0) {
          gridRow.push(normalizePosition(column));
        } else {
          const previousNote =
            column === 0 ? grid[row - 1][7] : gridRow[column - 1];

          const newPosition = normalizePosition(
            previousNote === 11 ? 0 : previousNote + 1,
          );
          gridRow.push(newPosition);
        }
      }

      grid.push(gridRow);
    }

    return fillGrid(grid);
  };

  const buildWithOverlap = (noteStepback: number): Note[][] => {
    const grid: number[][] = [];

    for (let row = 0; row < 8; row++) {
      const gridRow: number[] = [];

      for (let column = 0; column < 8; column++) {
        if (row === 0) {
          gridRow.push(normalizePosition(column));
        } else {
          let newPosition: number;

          if (column === 0) {
            const previousNote = grid[row - 1][7];
            newPosition = normalizePosition(previousNote - noteStepback);
          } else {
            const previousNote = gridRow[column - 1];
            newPosition = normalizePosition(
              previousNote === 11 ? 0 : previousNote + 1,
            );
          }

          gridRow.push(newPosition);
        }
      }

      grid.push(gridRow);
    }

    return fillGrid(grid);
  };

  const fillGrid = (gridWithNumbers: number[][]): Note[][] => {
    return gridWithNumbers.map((row) =>
      row.map((position) => {
        const normalizedPos = normalizePosition(position);
        return NOTES[normalizedPos];
      }),
    );
  };

  const grid = buildGrid();

  return (
    <div>
      {grid.reverse().map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((note, columnIndex) => {
            const highlight =
              pattern && rootNote !== undefined
                ? getNoteHighlight(note, pattern, rootNote)
                : {};

            return (
              <div
                key={`${rowIndex}-${columnIndex}`}
                className="w-12 h-12 flex items-center justify-center m-1 rounded border-2 border-gray-800 dark:border-gray-200 cursor-pointer hover:opacity-80 active:opacity-60 select-none"
                style={{
                  backgroundColor: note.color,
                  color: note.textColor,
                  ...highlight,
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
