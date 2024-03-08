import Editor from '@/components/studio/editor';
import Slides from '@/components/studio/slides';
import { Language } from '@/utils/languages';

interface StudioProps {}

const Studio: React.FC<StudioProps> = () => {
  return (
    <div className="min-h-[calc(100vh-57px)] flex">
      <aside className="w-64 dark:bg-gradient-to-b from-slate-950 to-slate-900 border border-right flex flex-col items-center">
        <Slides />
      </aside>
      <main className="flex-grow grow dark:bg-slate-950 p-4">
        <Editor
          value="let str = 'bio'"
          language={Language.jsx}
          className="border border-2 h-full"
          onChange={() => {
            return null;
          }}
        />
      </main>
    </div>
  );
};

export default Studio;
