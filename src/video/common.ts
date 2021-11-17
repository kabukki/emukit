export abstract class Video {
    public framebuffer: Uint8ClampedArray;

    constructor (
        protected canvas: HTMLCanvasElement,
    ) {
        this.framebuffer = new Uint8ClampedArray(4 * canvas.width * canvas.height);
    }

    abstract paint ();

    screenshot () {
        return this.canvas.toDataURL();
    }
}
