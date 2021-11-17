export class Audio {
    protected ctx: AudioContext;
    protected gain: GainNode;
 
    constructor () {
        this.ctx = new AudioContext();
        this.gain = this.ctx.createGain();
        this.gain.gain.value = 1;
        this.gain.connect(this.ctx.destination);
    }

    get sampleRate () {
        return this.ctx.sampleRate;
    }

    set volume (volume) {
        this.gain.gain.value = volume;
    }

    start () {
        this.ctx.resume();
    }

    stop () {
        this.ctx.suspend();
    }
}
