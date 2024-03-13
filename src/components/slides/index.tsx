import { useState } from 'react';
import { AnimatePresence, motion, Reorder } from 'framer-motion';
import { PlusIcon, RotateCcwIcon, TrashIcon } from 'lucide-react';
import Divider from '@/components/common/Divider';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { DocSnapshot, getSnapshotAtTime } from '@/core/doc/raw-doc';
import { useStore } from '@/store';

function Slides() {
  const [items, setItems] = useState([1, 2, 3]);

  const { doc, currentTime } = useStore();

  const [currentSnapshotIndex] = getSnapshotAtTime(doc, currentTime);

  const snapshots = doc?.snapshots;

  const { gotoSnapshot, deleteSnapshot } = useStore((state) => ({
    gotoSnapshot: state.gotoSnapshot,
    deleteSnapshot: state.deleteSnapshot,
  }));

  return (
    <ScrollArea className="w-full h-[calc(100vh-59px)] overflow-y-auto">
      <Reorder.Group
        className="flex flex-col p-4 gap-4"
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
                      className="absolute z-10 hidden group-hover:md:block group/delete-btn top-2 right-2 px-1 hover:bg-zinc-700 text-white rounded-md cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteSnapshot(idx);
                      }}
                    >
                      <TrashIcon className="w-5 group-hover/delete-btn:text-red-400 text-white/30 duration-300" />
                    </button>
                  )}
                  <span className="absolute text-slate-400 z-10 text-ms left-1.5 bottom-0">
                    {idx + 1}
                  </span>
                  <div className="w-full aspect-[5/3]"></div>
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

export default Slides;

interface SlideActionsProps {
  snapshots: DocSnapshot[];
}

function SlideActions({ snapshots }: SlideActionsProps) {
  const duplicateSnapshot = useStore((state) => state.duplicateSnapshot);

  return (
    <div className="w-full flex flex-wrap gap-4">
      <Button
        className="px-3 grow rounded bg-slate-800"
        variant={'secondary'}
        title={`Duplicate Slide#${snapshots.length - 1}`}
        onClick={() => {
          duplicateSnapshot(snapshots.length - 1);
        }}
      >
        <PlusIcon className="w-5 text-slate-400" />
      </Button>
      <Button
        className="px-3 grow rounded"
        variant={'secondary'}
        title="Delete All"
      >
        <RotateCcwIcon className="w-5 text-slate-400 bg-slate-800" />
      </Button>
    </div>
  );
}
