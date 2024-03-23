import { CodeIcon, PlayIcon } from 'lucide-react';

import Divider from '../ui/Divider';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

import { CodeTab } from './code';
import { VideoTab } from './video';

export default function ControlPanel() {
  return (
    <ScrollArea className="border-left h-[calc(100vh-57px)] w-full overflow-y-auto border from-slate-950 to-slate-900 dark:bg-gradient-to-b">
      <Tabs defaultValue="code" className="grid w-full gap-2 p-2">
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
