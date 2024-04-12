import { useEffect, useMemo, useRef } from 'react';
import { PauseIcon, PlayIcon } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { getSumDuration } from '@/core/doc/raw-doc';
import { DocumentDrawer } from '@/core/drawer';
import { useStore } from '@/store';

export default function Preview() {
  const { doc, currentTime, setCurrentTime, setPlaying, playing } = useStore(
    (state) => ({
      doc: state.doc,
      currentTime: state.currentTime,
      setCurrentTime: state.setCurrentTime,
      setPlaying: state.setPlaying,
      playing: state.playing,
    }),
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
    (async function () {
      await drawerRef.current?.setDoc(doc);
      drawerRef.current?.render(currentTime);
    })();
  }, [doc, currentTime]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex flex-col items-center">
        <canvas ref={canvasRef} />
        <button
          className="absolute bottom-7 rounded-full p-2 duration-200 hover:bg-zinc-800"
          type="button"
          onClick={() => {
            setPlaying(!playing);
          }}
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </button>
      </div>
      <Slider
        className="mt-4 w-1/3 cursor-pointer"
        min={0}
        max={duration}
        value={[currentTime]}
        onValueChange={(newTime) => setCurrentTime(newTime[0])}
      />
    </div>
  );
}
