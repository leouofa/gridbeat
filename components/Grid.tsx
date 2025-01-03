"use client";

import React, { useEffect, useState } from "react";
import { Note, Interval, SynthType } from "@/types";
import { NOTES } from "@/constants";
import { usePreferences } from "@/contexts/PreferencesContext";
import { getNoteHighlight } from "@/utils/NoteHighlighter";
import * as Tone from "tone";

class PianoSamplerSingleton {
  private static instance: Tone.Sampler | null = null;
  private static isLoading = false;
  private static loadPromise: Promise<void> | null = null;

  static async getInstance(): Promise<Tone.Sampler> {
    if (!this.instance && !this.loadPromise) {
      this.isLoading = true;
      this.loadPromise = new Promise((resolve) => {
        const sampler = new Tone.Sampler({
          urls: {
            A0: "A0.mp3",
            C1: "C1.mp3",
            "D#1": "Ds1.mp3",
            "F#1": "Fs1.mp3",
            A1: "A1.mp3",
            C2: "C2.mp3",
            "D#2": "Ds2.mp3",
            "F#2": "Fs2.mp3",
            A2: "A2.mp3",
            C3: "C3.mp3",
            "D#3": "Ds3.mp3",
            "F#3": "Fs3.mp3",
            A3: "A3.mp3",
            C4: "C4.mp3",
            "D#4": "Ds4.mp3",
            "F#4": "Fs4.mp3",
            A4: "A4.mp3",
            C5: "C5.mp3",
            "D#5": "Ds5.mp3",
            "F#5": "Fs5.mp3",
            A5: "A5.mp3",
            C6: "C6.mp3",
            "D#6": "Ds6.mp3",
            "F#6": "Fs6.mp3",
            A6: "A6.mp3",
            C7: "C7.mp3",
            "D#7": "Ds7.mp3",
            "F#7": "Fs7.mp3",
            A7: "A7.mp3",
            C8: "C8.mp3",
          },
          release: 1,
          baseUrl: "https://tonejs.github.io/audio/salamander/",
          onload: () => {
            this.instance = sampler;
            this.isLoading = false;
            resolve();
          },
        }).toDestination();
      });
    }
    await this.loadPromise;
    return this.instance!;
  }
}

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
            type: "triangle",
          },
          envelope: {
            attack: 0.02,
            decay: 0.1,
            sustain: 0.3,
            release: 1,
          },
        }).toDestination();
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
    return <div>Loading synthesizer...</div>;
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
