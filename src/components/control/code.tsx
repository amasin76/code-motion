import { langNames, LanguageName } from '@uiw/codemirror-extensions-langs';
import { CameraIcon } from 'lucide-react';
import { useStore } from '@/store';
import { mirrorThemes, useCodeEditorStore } from '@/store/code-control';
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

export function CodeTab() {
  const handleScreenshot = () => {
    captureScreenShot('editor-window', 'png', 'transparent');
  };

  const { doc, updateDocProperties } = useStore((state) => ({
    doc: state.doc,
    updateDocProperties: state.updateDocProperties,
  }));
  const { codeFontSize, setCodeFontSize } = useCodeEditorStore();

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCodeFontSize(Number(e.target.value));
  };

  const handleLanguageChange = (selectedLanguage: LanguageName) => {
    const updatedDoc = { ...doc, language: selectedLanguage };
    updateDocProperties(updatedDoc);
  };

  return (
    <ul className="space-y-4 text-xs dark:text-slate-300">
      <li>
        <Label htmlFor="font-size">
          font-size <sup>px</sup>
        </Label>
        <Input
          id="font-size"
          type="number"
          defaultValue={codeFontSize}
          min={1}
          onChange={handleFontSizeChange}
        />
      </li>
      <li>
        <Label htmlFor="tab-size">
          tab-size <sup>char</sup>
        </Label>
        <Input
          id="tab-size"
          type="number"
          defaultValue={2}
          min={1}
          step={1}
          disabled
        />
      </li>
      <li>
        <Label>themes</Label>
        <Select>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {Object.keys(mirrorThemes).map((theme, idx) => (
                <SelectItem key={idx} value={theme}>
                  {mirrorThemes[theme as keyof typeof mirrorThemes]}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </li>
      <li>
        <Label>language</Label>
        <Select
          defaultValue={doc.language}
          onValueChange={handleLanguageChange}
        >
          <SelectTrigger>
            <SelectValue defaultValue={doc.language} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {langNames.map((language, index) => (
                <SelectItem key={index} value={language}>
                  {language}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </li>
      <li>
        <Button
          className="flex w-full gap-1.5 font-normal"
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
