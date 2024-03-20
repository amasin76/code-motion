declare module 'webm-writer' {
  // https://github.com/thenickdude/webm-writer-js#usage-chrome
  interface WebMWriterConfig {
    quality: number;

    frameDuration: number | null;
    frameRate: number | null;

    transparent: boolean;
    alphaQuality?: numver;
  }

  export default class WebMWriter {
    constructor(config: WebMWriterConfig): WebMWriter;

    addFrame(
      frame: HTMLCanvasElement | HTMLImageElement | OffscreenCanvas,
      duration?: number
    ): void;

    complete(): Promise<Blob>;
  }
}
