import { useCallback } from 'react';
import { CodeIcon, PlaySquareIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getSnapshotAtTime } from '@/core/doc/raw-doc';
import { useStore } from '@/store';

import Preview from '../preview';

import Editor from './editor';

function EditorWindow() {
  const { doc, currentTime, updateSnapshot } = useStore((state) => ({
    doc: state.doc,
    currentTime: state.currentTime,
    updateSnapshot: state.updateSnapshot,
  }));

  const [currentSnapshotIndex] = getSnapshotAtTime(doc, currentTime);

  const currentSnapShot = doc?.snapshots[currentSnapshotIndex];

  const handleCodeUpdate = useCallback(
    (code: string) => {
      updateSnapshot(currentSnapshotIndex, {
        ...currentSnapShot,
        code,
      });
    },
    [currentSnapShot, currentSnapshotIndex, updateSnapshot],
  );

  return (
    <Tabs
      id="editor-window"
      defaultValue="editor"
      className="m-auto flex h-full max-h-[40rem] max-w-[60rem] flex-col rounded-lg shadow-[10px_32px_200px_0px_#3182ce55] dark:bg-zinc-900"
    >
      <div className="relative z-10 flex min-h-10 items-center justify-between rounded-t-lg shadow-[rgba(0,0,15,0.3)_0px_5px_8px_0px]">
        <div className="flex pl-2">
          <button className="mr-2 h-3 w-3 rounded-full bg-red-400"></button>
          <button className="mr-2 h-3 w-3 rounded-full bg-yellow-400"></button>
          <button className="h-3 w-3 rounded-full bg-green-400"></button>
        </div>
        <div className="absolute right-[42%] text-gray-400">
          <input
            id="file-name"
            className="w-full bg-transparent text-center text-[12px] focus:border-none focus:outline-none"
            defaultValue="Code.tsx"
            type="text"
            spellCheck="false"
          />
        </div>
        <div data-html2canvas-ignore="true">
          <TabsList className="float-right ml-auto gap-2 bg-zinc-800">
            <TabsTrigger value="editor" className="flex gap-2">
              <CodeIcon className="w-5" /> Editor
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex gap-2">
              <PlaySquareIcon className="w-5" /> Preview
            </TabsTrigger>
          </TabsList>
        </div>
      </div>
      <div className="h-full px-1 pb-1">
        <TabsContent value="editor" className="mt-0 h-full">
          <Editor
            value={currentSnapShot?.code || ''}
            language={doc.language}
            className="h-full"
            onChange={handleCodeUpdate}
          />
        </TabsContent>
        <TabsContent value="preview" className="mt-0">
          <Preview />
        </TabsContent>
      </div>
    </Tabs>
  );
}

export default EditorWindow;
