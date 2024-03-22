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
    [currentSnapShot, currentSnapshotIndex, updateSnapshot]
  );

  return (
    <Tabs
      id="editor-window"
      defaultValue="editor"
      className="max-w-[60rem] max-h-[40rem] h-full m-auto shadow-[10px_32px_200px_0px_#3182ce55] dark:bg-zinc-900 rounded-lg shadow-md flex flex-col"
    >
      <div className="h-9 rounded-t-lg grid grid-cols-3 items-center pr-4 z-10">
        <div>
          <TabsList className="h-fit gap-2 bg-zinc-800 z-50">
            <TabsTrigger value="editor" className="flex gap-2">
              <CodeIcon className="w-5" /> Code
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex gap-2">
              <PlaySquareIcon className="w-5" /> Preview
            </TabsTrigger>
          </TabsList>
        </div>
        <div className="justify-center inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-400 ring-gray-800">
          <input
            className="bg-transparent focus:border-none focus:outline-none text-center"
            defaultValue="Code.tsx"
            type="text"
            spellCheck="false"
          />
        </div>
        <div className="flex justify-end">
          <button className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></button>
          <button className="w-3 h-3 bg-green-400 rounded-full mr-2"></button>
          <button
            className="w-3 h-3 bg-red-400 rounded-full"
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
