import { useState, useEffect } from "react";
import * as Tone from "tone";
import { PianoSamplerSingleton } from "@/utils/PianoSamplerSingleton";
import { SynthType } from "@/types";

export const useInstrument = (synthType: SynthType) => {
  const [instrument, setInstrument] = useState<
    Tone.Synth | Tone.Sampler | Tone.PolySynth | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let newInstrument: typeof instrument = null;
    let mounted = true;

    const setupInstrument = async () => {
      setIsLoading(true);

      if (synthType === "piano") {
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
            new Tone.Chorus({
              frequency: 2.5,
              delayTime: 3.5,
              depth: 0.7,
              wet: 0.3,
            }),
            new Tone.Reverb({
              decay: 2,
              wet: 0.2,
            }),
            new Tone.Compressor({
              threshold: -24,
              ratio: 3,
              attack: 0.03,
              release: 0.25,
            }),
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
      if (newInstrument && synthType !== "piano") {
        newInstrument.dispose();
      }
    };
  }, [synthType]);

  return { instrument, isLoading };
};
