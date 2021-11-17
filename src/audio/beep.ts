import { Audio } from './common';

export class AudioBeep extends Audio {
    public oscillator: OscillatorNode;
    private baseType: OscillatorType;
    private baseFrequency: number;

    constructor (type: OscillatorType = 'sine', frequency: number = 440) {
        super();
        this.baseType = type;
        this.baseFrequency = frequency;
        this.oscillator = null;
    }

    set type (type) {
        this.baseType = type;
        if (this.oscillator) {
            this.oscillator.type = type;
        }
    }

    set frequency (frequency) {
        this.baseFrequency = frequency;
        if (this.oscillator) {
            this.oscillator.frequency.value = frequency;
        }
    }

    play () {
        if (!this.oscillator) {
            this.oscillator = this.ctx.createOscillator();
            this.oscillator.type = this.baseType;
            this.oscillator.frequency.value = this.baseFrequency;
            this.oscillator.connect(this.gain);
            this.oscillator.start();
        }
    }

    pause () {
        if (this.oscillator) {
            this.oscillator.stop();
            this.oscillator = null;
        }
    }
}
