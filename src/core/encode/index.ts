import WebMWriter from 'webm-writer';
import { sleep } from '@/utils/sleep';

import { getSumDuration, type RawDoc } from '../doc/raw-doc';
import { DocumentDrawer } from '../drawer';

interface VideoEncodeOptions {
  frameRate?: number;
  onProgress?: (progress: number) => void;
}
export class VideoEncoder {
  readonly drawer: DocumentDrawer;
  readonly duration: number;
  private aborted = false;

  constructor(
    private readonly doc: RawDoc,
    private readonly options: VideoEncodeOptions = {}
  ) {
    const canvas = document.createElement('canvas');
    this.drawer = new DocumentDrawer(canvas, 1);
    this.drawer.setDoc(this.doc);
    this.duration = getSumDuration(this.doc);
  }

  private get frameRate() {
    return this.options.frameRate ?? 30;
  }

  private get frameCount() {
    return (this.duration / 1000) * this.frameRate;
  }

  private get frameDuration() {
    return 1000 / this.frameRate;
  }

  async encode(): Promise<Blob> {
    const writer = new WebMWriter({
      quality: 0.9,
      frameDuration: this.frameDuration,
      frameRate: this.frameRate,
      transparent: true,
    });

    for (let frame = 0; frame < this.frameCount; frame++) {
      if (this.aborted) {
        throw new Error('Aborted');
      }

      const time = frame * this.frameDuration;
      this.drawer.render(time);
      writer.addFrame(this.drawer.canvas, this.frameDuration);
      console.log(this.drawer.canvas, this.frameDuration, time);

      if (this.options.onProgress !== undefined) {
        this.options.onProgress(frame / this.frameCount);
      }

      await sleep(0);
    }

    return writer.complete();
  }

  abort() {
    this.aborted = true;
  }
}
