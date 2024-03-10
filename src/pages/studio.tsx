import EditorWindow from '@/components/editor';
import Slides from '@/components/slides';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';

interface StudioProps {}

const Studio: React.FC<StudioProps> = () => {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      autoSaveId="persistence"
      className="min-h-[calc(100vh-57px)]"
    >
      <ResizablePanel
        id="sidebar"
        defaultSize={12}
        collapsible={true}
        collapsedSize={0}
        minSize={5}
      >
        <aside className="h-full dark:bg-gradient-to-b from-slate-950 to-slate-900 border border-right flex flex-col items-center">
          <Slides />
        </aside>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel id="editor">
        <main className="h-full flex-grow grow dark:bg-slate-950 p-4">
          <EditorWindow />
        </main>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Studio;
