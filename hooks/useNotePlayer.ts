import * as Tone from "tone";
import { Note, SynthType } from "@/types";
import { useInstrument } from "@/hooks/useInstrument";
import { usePreferences } from "@/contexts/PreferencesContext";

type InstrumentType = "guitar" | "piano" | "ukulele";

export const useNotePlayer = (
  instrumentType: InstrumentType,
  propsSynthType?: SynthType,
) => {
  const { preferences } = usePreferences();
  const activeSynthType = propsSynthType ?? preferences.synthType;
  const { instrument, isLoading } = useInstrument(activeSynthType);

  // Check if instrument is visible
  const isVisible = preferences.visibleInstruments.includes(instrumentType);

  const playNote = async (note: Note, octave: number) => {
    await Tone.start();

    if (instrument) {
      const standardNoteName = note.name.replace("♯", "#");
      const noteWithOctave = `${standardNoteName}${octave}`;
      instrument.triggerAttackRelease(noteWithOctave, "8n");
    }
  };

  return {
    playNote,
    isLoading,
    isVisible,
    instrument,
  };
};
