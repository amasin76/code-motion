import { useState } from 'react';
import { AnimatePresence, motion, Reorder } from 'framer-motion';
import { PlusIcon, RotateCcwIcon, TrashIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Divider from '@/components/ui/Divider';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { DocSnapshot, getSnapshotAtTime } from '@/core/doc/raw-doc';
import { useStore } from '@/store';

function Slider() {
  const [items, setItems] = useState([1, 2, 3]);

  const { doc, currentTime } = useStore();

  const [currentSnapshotIndex] = getSnapshotAtTime(doc, currentTime);

  const snapshots = doc?.snapshots;

  const { gotoSnapshot, deleteSnapshot } = useStore((state) => ({
    gotoSnapshot: state.gotoSnapshot,
    deleteSnapshot: state.deleteSnapshot,
  }));

  return (
    <ScrollArea className="h-[calc(100vh-59px)] w-full overflow-y-auto">
      <Reorder.Group
        className="flex flex-col gap-4 p-4"
        values={items}
        onReorder={setItems}
      >
        <AnimatePresence mode="popLayout">
          {snapshots.map((item, idx) => (
            <motion.div
              key={idx}
              layout
              initial={{ opacity: 0, x: -400 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 200 }}
              transition={{ duration: 0.6, type: 'spring' }}
            >
              <Reorder.Item
                className={`rounded bg-slate-800/50 hover:bg-slate-900 ${
                  currentSnapshotIndex === idx && 'outline outline-zinc-700'
                }`}
                key={idx}
                value={item}
                onClick={() => {
                  gotoSnapshot(idx);
                }}
              >
                <div className="group relative cursor-pointer">
                  {idx > 0 && (
                    <button
                      className="group/delete-btn absolute right-2 top-2 z-10 hidden cursor-pointer rounded-md px-1 text-white hover:bg-zinc-700 group-hover:md:block"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteSnapshot(idx);
                      }}
                    >
                      <TrashIcon className="w-5 text-white/30 duration-300 group-hover/delete-btn:text-red-400" />
                    </button>
                  )}
                  <span className="text-ms absolute bottom-0 left-1.5 z-10 text-slate-400">
                    {idx + 1}
                  </span>
                  <div className="aspect-[5/3] w-full"></div>
                </div>
              </Reorder.Item>
            </motion.div>
          ))}
        </AnimatePresence>
        <Divider />
        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <SlideActions snapshots={snapshots} />
        </motion.div>
      </Reorder.Group>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
}

export default Slider;

interface SlideActionsProps {
  snapshots: DocSnapshot[];
}

function SlideActions({ snapshots }: SlideActionsProps) {
  const duplicateSnapshot = useStore((state) => state.duplicateSnapshot);

  return (
    <div className="flex w-full flex-wrap gap-4">
      <Button
        className="grow rounded bg-slate-800 px-3"
        variant={'secondary'}
        title={`Duplicate Slide#${snapshots.length - 1}`}
        onClick={() => {
          duplicateSnapshot(snapshots.length - 1);
        }}
      >
        <PlusIcon className="w-5 text-slate-400" />
      </Button>
      <Button
        className="grow rounded px-3"
        variant={'secondary'}
        title="Delete All"
      >
        <RotateCcwIcon className="w-5 bg-slate-800 text-slate-400" />
      </Button>
    </div>
  );
}
