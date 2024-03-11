import { useState } from 'react';
import { Reorder } from 'framer-motion';
import { PlusIcon, RotateCcwIcon, TrashIcon } from 'lucide-react';
import Divider from '@/components/common/Divider';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useStore } from '@/store';

function Slides() {
  const [items, setItems] = useState([1, 2, 3]);

  const { gotoSnapshot } = useStore();

  return (
    <ScrollArea className="w-full h-[calc(100vh-59px)] overflow-y-auto">
      <Reorder.Group
        className="flex flex-col p-4 gap-4"
        values={items}
        onReorder={setItems}
      >
        {items.map((item, idx) => (
          <Reorder.Item
            className="rounded bg-slate-800/50"
            key={item}
            value={item}
            onClick={() => {
              gotoSnapshot(idx);
            }}
          >
            <div className="group relative cursor-grab">
              <button className="absolute z-10 hidden group-hover:block top-2 right-2 text-white bg-zinc-600/70 px-1 rounded-md cursor-pointer">
                <TrashIcon className="w-5 hover:text-red-400 text-white/50" />
              </button>
              <span className="absolute text-slate-400 z-10 text-ms left-1.5 bottom-0 text-white">
                {idx + 1}
              </span>
              <div className="w-full aspect-[5/3]"></div>
            </div>
          </Reorder.Item>
        ))}
        <Divider />
        <SlidesActions />
      </Reorder.Group>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
}

export default Slides;

function SlidesActions() {
  return (
    <div className="w-full flex flex-wrap gap-4">
      <Button
        className="px-3 grow rounded"
        variant={'secondary'}
        title="Add Slide"
      >
        <PlusIcon className="w-5 text-slate-400" />
      </Button>
      <Button
        className="px-3 grow rounded"
        variant={'secondary'}
        title="Delete All"
      >
        <RotateCcwIcon className="w-5 text-slate-400" />
      </Button>
    </div>
  );
}
