import { Language } from '@/utils/languages';

import Editor from './editor';

function EditorWindow() {
  return (
    <div className="max-w-[60rem] max-h-[60rem] h-full m-auto shadow-[10px_32px_200px_0px_#3182ce55] dark:bg-zinc-900 rounded-lg shadow-md flex flex-col">
      <div className="h-9 rounded-t-lg grid grid-cols-3 items-center px-4 z-10">
        <div>{/* TODO: add font-size, theme */}</div>
        <div className="justify-center inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-400 ring-gray-800">
          <input
            className="bg-transparent focus:border-none focus:outline-none text-center"
            value="Code.tsx"
            type="text"
            spellCheck="false"
          />
        </div>
        <div className="flex justify-end">
          <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
          <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
        </div>
      </div>
      <div className="flex-grow px-1 pb-1 overflow-auto">
        <Editor
          value="let str = 'bio'"
          language={Language.jsx}
          className="h-full"
          onChange={() => {
            return null;
          }}
        />
      </div>
    </div>
  );
}

export default EditorWindow;
