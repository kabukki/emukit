import { Video } from './common';

export class VideoWebGL extends Video {
    private context: WebGL2RenderingContext;

    constructor (canvas: HTMLCanvasElement) {
        super(canvas);
        this.context = canvas.getContext('webgl2');
    }

    paint () {}
}
