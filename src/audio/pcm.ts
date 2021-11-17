import { RingBuffer } from 'ringbuf.js';

import bla from '../../worklets/pcm.worklet.js';
import { Audio } from './common';

export class AudioPCM extends Audio {
    private buffer: RingBuffer;
 
    constructor (
        public readonly length: number,
    ) {
        super();
    }

    get capacity () {
        return this.length * this.ctx.sampleRate / 1000;
    }

    async init () {
        if (!this.buffer) {
            await this.ctx.audioWorklet.addModule(
                URL.createObjectURL(new Blob([bla], { type: 'text/javascript' })),
            );

            const queue = RingBuffer.getStorageForCapacity(this.capacity, Float32Array);
            const node = new AudioWorkletNode(this.ctx, 'pcm', {
                processorOptions: {
                    queue,
                },
            });

            node.connect(this.gain);
            this.buffer = new RingBuffer(queue, Float32Array);
        }
    }

    queue (chunk: Float32Array) {
        this.buffer.push(chunk);
    }

    debug () {
        return {
            readable: this.buffer.available_read(),
            writable: this.buffer.available_write(),
            full: this.buffer.full(),
        };
    }
}
