import * as Tone from "tone";

export class ToneManager {
  private static instance: ToneManager;
  private synth: Tone.PolySynth | null = null;
  private initialized = false;

  private constructor() {}

  static getInstance(): ToneManager {
    if (!ToneManager.instance) {
      ToneManager.instance = new ToneManager();
    }
    return ToneManager.instance;
  }

  async initialize() {
    if (!this.initialized) {
      await Tone.start();
      this.initialized = true;
    }
  }

  getSynth(): Tone.PolySynth {
    if (!this.synth) {
      this.synth = new Tone.PolySynth(Tone.Synth, {
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
    return this.synth;
  }
}
