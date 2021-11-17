import { Video } from './common';

export class Video2D extends Video {
    private context: CanvasRenderingContext2D;

    constructor (canvas: HTMLCanvasElement) {
        super(canvas);
        this.context = canvas.getContext('2d');
    }

    paint () {
        this.context.putImageData(new ImageData(this.framebuffer, this.canvas.width, this.canvas.height), 0, 0);
    }
}
