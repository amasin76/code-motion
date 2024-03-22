import { useEffect, useMemo, useRef } from 'react';
import { PauseIcon, PlayIcon } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { getSumDuration } from '@/core/doc/raw-doc';
import { DocumentDrawer } from '@/core/drawer';
import { useStore } from '@/store';

// import { VideoExport } from './export';

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

  console.log(currentTime);

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
    <div className="flex flex-col items-center">
      <div className="relative flex flex-col items-center">
        <canvas ref={canvasRef} />
        <button
          className="absolute bottom-7 p-2 rounded-full hover:bg-zinc-800 duration-200"
          type="button"
          onClick={() => {
            setPlaying(!playing);
          }}
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </button>

        {/* <VideoExport /> */}
      </div>
      <Slider
        className="w-1/3 mt-4 cursor-pointer"
        min={0}
        max={duration}
        value={[currentTime]}
        onValueChange={(newTime) => setCurrentTime(newTime[0])}
      />
    </div>
  );
}
