# Emukit

Development kit for emulator development, providing common video and audio functionality.

## Usage

The library provides multiple utility classes to abstract away the common wiring tasks. The main usage consists in extending the `Emulator` abstract class by providing the necessary code to run the emulator.

```js
import { Emulator, AudioPCM, Video2D } from '@kabukki/emukit';

export class SomeEmulator extends Emulator<AudioPCM, Video2D> {
    // ...

    cycle () {

    }
}
```

### Audio

- `AudioBeep`: plays beeping sounds using an oscillator.
- `AudioPCM`: plays PCM data using a ring buffer.

### Video

- `VideoOnOff`: paints to a 2D canvas based on a simple on/off distinction for pixels.
- `Video2D`: paints a 2D framebuffer.
- `VideoWebGL`: paints a complex scene using WebGL.

## Toolchain

Audio worklets are loaded in a particular manner that is difficult to work with in a bundler's environment. Thus to work around tooling issues related to loading paths, the worklets are inlined, but we first need to bundle them to make them available as-is:

1. Write worklet source as usual (`src` folder).
2. Bundle worklet and make it available from the `worklets` folder.
3. Inline the worklets in source by using `Blob`s.

That is why the build pipeline actually occurs in two steps, first building the worklets and then the code that may consume them.
