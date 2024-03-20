import { type CSSProperties, useEffect, useMemo, useRef } from 'react';
import { getSumDuration } from '@/core/doc/raw-doc';
import { DocumentDrawer } from '@/core/drawer';
import { useStore } from '@/store';

import { VideoExport } from './export';

export default function Preview() {
  const { doc, currentTime, setCurrentTime, setPlaying, playing } = useStore(
    (state) => ({
      doc: state.doc,
      currentTime: state.currentTime,
      setCurrentTime: state.setCurrentTime,
      setPlaying: state.setPlaying,
      playing: state.playing,
    })
  );

  const duration = useMemo(() => getSumDuration(doc), [doc]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawerRef = useRef<DocumentDrawer>();

  useEffect(() => {
    const drawer = new DocumentDrawer(canvasRef.current as HTMLCanvasElement);
    drawerRef.current = drawer;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).__drawer = drawer;
  }, []);

  useEffect(() => {
    drawerRef.current?.setDoc(doc);
    drawerRef.current?.render(currentTime);
  }, [doc, currentTime]);

  return (
    <div className="">
      <canvas ref={canvasRef} className="mx-auto border-x border-zinc-700" />
      <div className="w-1/2">
        <button
          type="button"
          onClick={() => {
            setPlaying(!playing);
          }}
        >
          play
        </button>

        <VideoExport />
      </div>
      <input
        className="w-full"
        type="range"
        value={currentTime}
        min={0}
        max={duration}
        style={
          {
            '--progress-rate': currentTime / duration,
          } as CSSProperties
        }
        onChange={(e) => {
          setCurrentTime(Number(e.target.value));
        }}
      />
    </div>
  );
}
