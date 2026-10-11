/**
 * Web Audio API Synthesizer for Opera Vocal Ranges, Structural Parts & Famous Aria Motifs
 */

export interface NoteEvent {
  freq: number;
  duration: number; // in seconds
  delay: number;    // start offset in seconds
  vibrato?: boolean;
}

class OperaSoundEngine {
  private ctx: AudioContext | null = null;
  private activeNodes: AudioNode[] = [];
  private timeoutIds: number[] = [];

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public stopAll(): void {
    this.timeoutIds.forEach((id) => window.clearTimeout(id));
    this.timeoutIds = [];
    this.activeNodes.forEach((node) => {
      try {
        if ('stop' in node && typeof (node as OscillatorNode).stop === 'function') {
          (node as OscillatorNode).stop();
        }
        node.disconnect();
      } catch {
        // Ignore already stopped nodes
      }
    });
    this.activeNodes = [];
  }

  /**
   * Plays a single rich vocal-like tone with subtle vibrato and warm harmonic filtering
   */
  public playNote(freq: number, duration = 0.7, delay = 0, vibrato = true): void {
    const ctx = this.getContext();
    const startTime = ctx.currentTime + delay;
    const stopTime = startTime + duration;

    // Master gain with smooth envelope
    const mainGain = ctx.createGain();
    mainGain.gain.setValueAtTime(0.001, startTime);
    mainGain.gain.linearRampToValueAtTime(0.18, startTime + Math.min(0.08, duration * 0.25));
    mainGain.gain.exponentialRampToValueAtTime(0.12, startTime + duration * 0.7);
    mainGain.gain.exponentialRampToValueAtTime(0.0001, stopTime);

    // Warm low-pass filter to emulate acoustic resonance
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(Math.min(freq * 4.5, 4200), startTime);
    filter.Q.setValueAtTime(2.2, startTime);

    // Fundamental + octave/fifth overtone oscillators
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    osc1.type = 'triangle';
    osc2.type = 'sawtooth';

    osc1.frequency.setValueAtTime(freq, startTime);
    osc2.frequency.setValueAtTime(freq, startTime);

    const osc2Gain = ctx.createGain();
    osc2Gain.gain.setValueAtTime(0.35, startTime);

    // Subtle operatic vibrato (5.5 Hz)
    if (vibrato && duration >= 0.35) {
      const vibOsc = ctx.createOscillator();
      const vibGain = ctx.createGain();
      vibOsc.frequency.setValueAtTime(5.5, startTime);
      vibGain.gain.setValueAtTime(freq * 0.012, startTime);
      vibOsc.connect(vibGain);
      vibGain.connect(osc1.frequency);
      vibGain.connect(osc2.frequency);
      vibOsc.start(startTime);
      vibOsc.stop(stopTime);
      this.activeNodes.push(vibOsc, vibGain);
    }

    osc1.connect(filter);
    osc2.connect(osc2Gain);
    osc2Gain.connect(filter);
    filter.connect(mainGain);
    mainGain.connect(ctx.destination);

    osc1.start(startTime);
    osc2.start(startTime);
    osc1.stop(stopTime);
    osc2.stop(stopTime);

    this.activeNodes.push(osc1, osc2, osc2Gain, filter, mainGain);
  }

  public playSequence(notes: NoteEvent[], onComplete?: () => void): void {
    this.stopAll();
    let maxEnd = 0;
    notes.forEach((n) => {
      this.playNote(n.freq, n.duration, n.delay, n.vibrato ?? true);
      if (n.delay + n.duration > maxEnd) {
        maxEnd = n.delay + n.duration;
      }
    });

    if (onComplete) {
      const id = window.setTimeout(() => {
        onComplete();
      }, maxEnd * 1000 + 80);
      this.timeoutIds.push(id);
    }
  }

  /**
   * Plays an ascending & peaking vocal arpeggio representing a specific voice type
   */
  public playVocalRangeDemo(voiceId: string, onComplete?: () => void): void {
    const sequences: Record<string, NoteEvent[]> = {
      soprano: [
        { freq: 261.63, duration: 0.35, delay: 0.0 },   // C4
        { freq: 329.63, duration: 0.35, delay: 0.35 },  // E4
        { freq: 392.00, duration: 0.35, delay: 0.70 },  // G4
        { freq: 523.25, duration: 0.45, delay: 1.05 },  // C5
        { freq: 659.25, duration: 0.45, delay: 1.50 },  // E5
        { freq: 783.99, duration: 0.45, delay: 1.95 },  // G5
        { freq: 1046.50, duration: 1.10, delay: 2.40, vibrato: true }, // High C6
      ],
      mezzo: [
        { freq: 220.00, duration: 0.4, delay: 0.0 },    // A3
        { freq: 277.18, duration: 0.4, delay: 0.4 },    // C#4
        { freq: 329.63, duration: 0.4, delay: 0.8 },    // E4
        { freq: 440.00, duration: 0.45, delay: 1.2 },   // A4
        { freq: 554.37, duration: 0.45, delay: 1.65 },  // C#5
        { freq: 659.25, duration: 0.5, delay: 2.1 },    // E5
        { freq: 880.00, duration: 1.05, delay: 2.6, vibrato: true },  // A5
      ],
      alto: [
        { freq: 174.61, duration: 0.45, delay: 0.0 },   // F3
        { freq: 220.00, duration: 0.45, delay: 0.45 },  // A3
        { freq: 261.63, duration: 0.45, delay: 0.90 },  // C4
        { freq: 349.23, duration: 0.50, delay: 1.35 },  // F4
        { freq: 440.00, duration: 0.50, delay: 1.85 },  // A4
        { freq: 523.25, duration: 0.55, delay: 2.35 },  // C5
        { freq: 698.46, duration: 1.10, delay: 2.90, vibrato: true }, // F5
      ],
      tenor: [
        { freq: 130.81, duration: 0.4, delay: 0.0 },    // C3
        { freq: 164.81, duration: 0.4, delay: 0.4 },    // E3
        { freq: 196.00, duration: 0.4, delay: 0.8 },    // G3
        { freq: 261.63, duration: 0.45, delay: 1.2 },   // C4
        { freq: 329.63, duration: 0.45, delay: 1.65 },  // E4
        { freq: 392.00, duration: 0.5, delay: 2.1 },    // G4
        { freq: 523.25, duration: 1.15, delay: 2.6, vibrato: true },  // Tenor High C5
      ],
      baritone: [
        { freq: 110.00, duration: 0.45, delay: 0.0 },   // A2
        { freq: 138.59, duration: 0.45, delay: 0.45 },  // C#3
        { freq: 164.81, duration: 0.45, delay: 0.90 },  // E3
        { freq: 220.00, duration: 0.50, delay: 1.35 },  // A3
        { freq: 277.18, duration: 0.50, delay: 1.85 },  // C#4
        { freq: 329.63, duration: 0.50, delay: 2.35 },  // E4
        { freq: 440.00, duration: 1.10, delay: 2.85, vibrato: true }, // A4
      ],
      bass: [
        { freq: 82.41, duration: 0.5, delay: 0.0 },     // E2
        { freq: 110.00, duration: 0.5, delay: 0.5 },    // A2
        { freq: 130.81, duration: 0.5, delay: 1.0 },    // C3
        { freq: 164.81, duration: 0.5, delay: 1.5 },    // E3
        { freq: 220.00, duration: 0.5, delay: 2.0 },    // A3
        { freq: 261.63, duration: 0.5, delay: 2.5 },    // C4
        { freq: 329.63, duration: 1.15, delay: 3.0, vibrato: true },  // E4
      ],
    };

    this.playSequence(sequences[voiceId] || sequences.soprano, onComplete);
  }

  /**
   * Plays iconic melodic motifs from the 4 famous composers in Section 6
   */
  public playMasterworkMotif(composerId: string, onComplete?: () => void): void {
    const motifs: Record<string, NoteEvent[]> = {
      // Mozart: Queen of the Night staccato high F6 arpeggio motif
      mozart: [
        { freq: 587.33, duration: 0.35, delay: 0.0 },                // D5
        { freq: 698.46, duration: 0.35, delay: 0.38 },               // F5
        { freq: 880.00, duration: 0.22, delay: 0.78, vibrato: false }, // A5
        { freq: 880.00, duration: 0.22, delay: 1.04, vibrato: false }, // A5
        { freq: 880.00, duration: 0.22, delay: 1.30, vibrato: false }, // A5
        { freq: 1046.50, duration: 0.22, delay: 1.56, vibrato: false }, // C6
        { freq: 880.00, duration: 0.22, delay: 1.82, vibrato: false }, // A5
        { freq: 1174.66, duration: 0.22, delay: 2.08, vibrato: false }, // D6
        { freq: 1396.91, duration: 0.75, delay: 2.35, vibrato: true },  // High F6!
      ],
      // Verdi: La Traviata / Rigoletto lyrical Italianate cantabile waltz motif
      verdi: [
        { freq: 392.00, duration: 0.45, delay: 0.0 },   // G4
        { freq: 493.88, duration: 0.25, delay: 0.48 },  // B4
        { freq: 587.33, duration: 0.55, delay: 0.76 },  // D5
        { freq: 523.25, duration: 0.30, delay: 1.35 },  // C5
        { freq: 493.88, duration: 0.30, delay: 1.68 },  // B4
        { freq: 440.00, duration: 0.50, delay: 2.00 },  // A4
        { freq: 392.00, duration: 0.95, delay: 2.55, vibrato: true }, // G4
      ],
      // Bizet: Carmen "Habanera" chromatic descending motif (D5 - C#5 - C5 - B4 - Bb4 - A4)
      bizet: [
        { freq: 587.33, duration: 0.42, delay: 0.0 },   // D5
        { freq: 554.37, duration: 0.42, delay: 0.45 },  // C#5
        { freq: 523.25, duration: 0.22, delay: 0.90 },  // C5
        { freq: 523.25, duration: 0.22, delay: 1.15 },  // C5
        { freq: 493.88, duration: 0.42, delay: 1.40 },  // B4
        { freq: 466.16, duration: 0.42, delay: 1.85 },  // Bb4
        { freq: 440.00, duration: 0.95, delay: 2.30, vibrato: true }, // A4
      ],
      // Puccini: Turandot "Nessun dorma" ("Vincerò!" soaring climax)
      puccini: [
        { freq: 293.66, duration: 0.45, delay: 0.0 },   // D4
        { freq: 329.63, duration: 0.45, delay: 0.48 },  // E4
        { freq: 369.99, duration: 0.55, delay: 0.96 },  // F#4
        { freq: 440.00, duration: 0.65, delay: 1.55 },  // A4 ("Vin-")
        { freq: 493.88, duration: 1.20, delay: 2.22, vibrato: true }, // High B4 ("-ce-")
        { freq: 440.00, duration: 0.95, delay: 3.45, vibrato: true }, // A4 ("-rò!")
      ],
    };

    this.playSequence(motifs[composerId] || motifs.mozart, onComplete);
  }

  /**
   * Plays structural demonstration for Opera parts (Overture, Recitative, Aria, Duet/Trio, Chorus)
   */
  public playStructureDemo(partId: string, onComplete?: () => void): void {
    const demos: Record<string, NoteEvent[]> = {
      aria: [
        { freq: 440.00, duration: 0.55, delay: 0.0, vibrato: true },
        { freq: 554.37, duration: 0.55, delay: 0.58, vibrato: true },
        { freq: 659.25, duration: 0.70, delay: 1.16, vibrato: true },
        { freq: 880.00, duration: 1.20, delay: 1.90, vibrato: true },
      ],
      recitative: [
        // Speech-like rapid syllabic notes on same pitch with quick cadence
        { freq: 293.66, duration: 0.16, delay: 0.0, vibrato: false },
        { freq: 293.66, duration: 0.16, delay: 0.20, vibrato: false },
        { freq: 293.66, duration: 0.16, delay: 0.40, vibrato: false },
        { freq: 329.63, duration: 0.18, delay: 0.60, vibrato: false },
        { freq: 293.66, duration: 0.25, delay: 0.82, vibrato: false },
        { freq: 261.63, duration: 0.35, delay: 1.25, vibrato: false },
        { freq: 196.00, duration: 0.45, delay: 1.65, vibrato: false },
      ],
      duet: [
        // Two simultaneous voices in harmonious thirds/sixths
        { freq: 329.63, duration: 0.6, delay: 0.0 },
        { freq: 392.00, duration: 0.6, delay: 0.0 },
        { freq: 369.99, duration: 0.6, delay: 0.62 },
        { freq: 440.00, duration: 0.6, delay: 0.62 },
        { freq: 392.00, duration: 1.0, delay: 1.25 },
        { freq: 493.88, duration: 1.0, delay: 1.25 },
        { freq: 587.33, duration: 1.0, delay: 1.25 },
      ],
      chorus: [
        // Full 4-part grand choral chord progression
        { freq: 130.81, duration: 0.8, delay: 0.0 },
        { freq: 196.00, duration: 0.8, delay: 0.0 },
        { freq: 329.63, duration: 0.8, delay: 0.0 },
        { freq: 523.25, duration: 0.8, delay: 0.0 },
        { freq: 146.83, duration: 0.8, delay: 0.85 },
        { freq: 220.00, duration: 0.8, delay: 0.85 },
        { freq: 349.23, duration: 0.8, delay: 0.85 },
        { freq: 587.33, duration: 0.8, delay: 0.85 },
        { freq: 130.81, duration: 1.2, delay: 1.70 },
        { freq: 261.63, duration: 1.2, delay: 1.70 },
        { freq: 392.00, duration: 1.2, delay: 1.70 },
        { freq: 659.25, duration: 1.2, delay: 1.70 },
      ],
      overture: [
        // Orchestral curtain-raiser fanfare
        { freq: 261.63, duration: 0.25, delay: 0.0, vibrato: false },
        { freq: 329.63, duration: 0.25, delay: 0.26, vibrato: false },
        { freq: 392.00, duration: 0.25, delay: 0.52, vibrato: false },
        { freq: 523.25, duration: 0.65, delay: 0.78, vibrato: true },
        { freq: 392.00, duration: 0.25, delay: 1.48, vibrato: false },
        { freq: 523.25, duration: 1.10, delay: 1.76, vibrato: true },
      ],
    };

    this.playSequence(demos[partId] || demos.aria, onComplete);
  }
}

export const soundEngine = new OperaSoundEngine();
