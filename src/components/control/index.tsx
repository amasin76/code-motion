import { CodeIcon, PlayIcon } from 'lucide-react';

import Divider from '../ui/Divider';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

import { CodeTab } from './code';
import { VideoTab } from './video';

export default function ControlPanel() {
  return (
    <ScrollArea className="w-full h-[calc(100vh-57px)] dark:bg-gradient-to-b from-slate-950 to-slate-900 border border-left overflow-y-auto">
      <Tabs defaultValue="code" className="w-full p-2 grid gap-2">
        <TabsList className="w-fit justify-self-center">
          <TabsTrigger value="code" className="flex gap-2">
            <CodeIcon className="w-5" />
            Code
          </TabsTrigger>
          <TabsTrigger value="video" className="flex gap-2">
            <PlayIcon className="w-5" />
            Video
          </TabsTrigger>
        </TabsList>
        <Divider />
        <TabsContent value="code">
          <CodeTab />
        </TabsContent>
        <TabsContent value="video">
          <VideoTab />
        </TabsContent>
      </Tabs>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
}
