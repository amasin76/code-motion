import { useState } from 'react';
import { CameraIcon } from 'lucide-react';
import { captureScreenShot } from '@/utils/screenshot';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const themes = [
  { value: 'dracula', label: 'Dracula' },
  { value: 'ifran', label: 'Ifran' },
  { value: 'tokyo', label: 'Tokyo' },
];

export function CodeTab() {
  const [selectedTheme, setSelectedTheme] = useState<string>(themes[0].value);

  const handleThemeChange = (value: string) => {
    setSelectedTheme(value);
  };

  const handleScreenshot = () => {
    captureScreenShot('editor-window', 'png', 'transparent');
  };

  return (
    <ul className="space-y-4 text-xs dark:text-slate-300">
      <li>
        <Label htmlFor="font-size">
          font-size <sup>px</sup>
        </Label>
        <Input id="font-size" type="number" defaultValue={18} />
      </li>
      <li>
        <Label>themes</Label>
        <Select defaultValue={selectedTheme}>
          <SelectTrigger>
            <SelectValue placeholder="Select a theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {themes.map((theme, idx) => (
                <SelectItem
                  key={idx}
                  value={theme.value}
                  onClick={() => handleThemeChange(theme.value)}
                >
                  {theme.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </li>
      <li>
        <Button
          className="w-full flex gap-1.5 font-normal"
          variant="secondary"
          onClick={handleScreenshot}
        >
          <CameraIcon className="w-5" />
          Screenshot
        </Button>
      </li>
    </ul>
  );
}
