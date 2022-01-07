import GameStats from 'game-stats';
import throttle from 'lodash.throttle';

import { Video, Audio, Save } from '.';

export abstract class Emulator <A extends Audio, V extends Video> extends EventTarget {
    private rafHandle: ReturnType<typeof requestAnimationFrame>;
    protected stats: GameStats;

    constructor (
        protected video: V,
        protected audio: A,
    ) {
        super();
        this.stats = new GameStats();
        this.emitSave = throttle(this.emitSave.bind(this), 2000);
        this.emitDebug = throttle(this.emitDebug.bind(this), 1000);
    }

    /**
     * Callback called on every frame
     */
    abstract cycle (): void;
    abstract reset (): void;
    abstract save (): Save;
    abstract load (save: Save): void;
    abstract debug (): any;

    async init () {}

    async start () {
        const rafCallback = (timestamp) => {
            try {
                this.cycle();
                this.stats.record(timestamp);
                this.emitSave();
                this.emitDebug();
                this.rafHandle = requestAnimationFrame(rafCallback);
            } catch (err) {
                this.stop(err);
            }
        };

        this.rafHandle = requestAnimationFrame(rafCallback);
        this.audio.start();
    }

    stop (error?: Error) {
        this.audio.stop();
        cancelAnimationFrame(this.rafHandle);
        if (error) {
            this.emit('error', { error });
        }
    }

    protected emit (event: string, data: any) {
        this.dispatchEvent(new CustomEvent(event, {
            detail: data,
        }));
    }

    private emitSave () {
        this.emit('save', this.save());
    }

    private emitDebug () {
        this.emit('debug', this.debug());
    }
}
