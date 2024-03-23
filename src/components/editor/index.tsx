import { useCallback } from 'react';
import { CodeIcon, PlaySquareIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getSnapshotAtTime } from '@/core/doc/raw-doc';
import { useStore } from '@/store';
import { Language } from '@/utils/languages';

import Preview from '../preview';

import Editor from './editor';

function EditorWindow() {
  const { doc, currentTime, updateSnapshot } = useStore((state) => ({
    doc: state.doc,
    currentTime: state.currentTime,
    updateSnapshot: state.updateSnapshot,
  }));

  const deleteSnapshot = useStore((state) => state.deleteSnapshot);

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
      <div className="z-10 grid h-9 grid-cols-3 items-center rounded-t-lg pr-4">
        <div>
          <TabsList className="z-50 h-fit gap-2 bg-zinc-800">
            <TabsTrigger value="editor" className="flex gap-2">
              <CodeIcon className="w-5" /> Code
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex gap-2">
              <PlaySquareIcon className="w-5" /> Preview
            </TabsTrigger>
          </TabsList>
        </div>
        <div className="inline-flex items-center justify-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-400 ring-gray-800">
          <input
            className="bg-transparent text-center focus:border-none focus:outline-none"
            defaultValue="Code.tsx"
            type="text"
            spellCheck="false"
          />
        </div>
        <div className="flex justify-end">
          <button className="mr-2 h-3 w-3 rounded-full bg-yellow-400"></button>
          <button className="mr-2 h-3 w-3 rounded-full bg-green-400"></button>
          <button
            className="h-3 w-3 rounded-full bg-red-400"
            onClick={() => {
              +currentSnapShot.id > 1 &&
                deleteSnapshot(+currentSnapShot.id - 1);
            }}
          ></button>
        </div>
      </div>
      <div className="flex-grow px-1 pb-1">
        <TabsContent value="editor" className="h-full">
          <Editor
            value={currentSnapShot?.code || ''}
            language={doc.language || Language.jsx}
            className="h-full"
            onChange={handleCodeUpdate}
          />
        </TabsContent>
        <TabsContent value="preview">
          <Preview />
        </TabsContent>
      </div>
    </Tabs>
  );
}

export default EditorWindow;
