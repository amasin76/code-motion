import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import ControlPanel from '@/components/control';
import EditorWindow from '@/components/editor';
import Slider from '@/components/slider';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';

const Studio = () => {
  const { userId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    !userId && navigate('/sign-in');
  });

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
        minSize={6}
      >
        <aside className="border-right h-full border from-slate-950 to-slate-900 dark:bg-gradient-to-b">
          <Slider />
        </aside>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel id="editor">
        <main className="h-full flex-grow p-4 dark:bg-slate-950">
          <EditorWindow />
        </main>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel
        id="control"
        defaultSize={18}
        collapsible={true}
        collapsedSize={0}
        minSize={16}
        maxSize={20}
      >
        <ControlPanel />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Studio;
