import { useState, useEffect } from "react";
import * as Tone from "tone";
import { PianoSamplerSingleton } from "@/utils/PianoSamplerSingleton";
import { SynthType } from "@/types";
import { ToneManager } from "@/utils/ToneManager";

export const useInstrument = (synthType: SynthType) => {
  const [instrument, setInstrument] = useState<
    Tone.Synth | Tone.Sampler | Tone.PolySynth | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);

  const initializeAudio = async () => {
    await ToneManager.getInstance().initialize();
  };

  useEffect(() => {
    let mounted = true;

    const setupInstrument = async () => {
      setIsLoading(true);

      let newInstrument: typeof instrument;
      if (synthType === "piano") {
        newInstrument = await PianoSamplerSingleton.getInstance();
      } else {
        newInstrument = ToneManager.getInstance().getSynth();
      }

      if (mounted) {
        setInstrument(newInstrument);
        setIsLoading(false);
      }
    };

    setupInstrument();

    return () => {
      mounted = false;
    };
  }, [synthType]);

  return { instrument, isLoading, initializeAudio };
};
