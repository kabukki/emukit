import { Video } from './common';

export class VideoOnOff extends Video {
    private context: CanvasRenderingContext2D;

    constructor (
        canvas: HTMLCanvasElement,
        private colors: { on: string, off: string },
    ) {
        super(canvas);
        this.context = canvas.getContext('2d');
    }

    paint () {
        for (let y = 0; y < this.canvas.height; y++) {
            for (let x = 0; x < this.canvas.width; x++) {
                this.context.fillStyle = this.framebuffer[x + y * this.canvas.width] === 1 ? this.colors.on : this.colors.off;
                this.context.fillRect(x, y, 1, 1);
            }
        }
    }
}
