import { useStore } from '@/store';

import { VideoExport } from '../preview/export';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export function VideoTab() {
  const { doc, updateDocProperties } = useStore((state) => ({
    doc: state.doc,
    updateDocProperties: state.updateDocProperties,
  }));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePropertyChange = (propertyName: string, newValueParser: any) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = newValueParser(e.target.value);
      updateDocProperties({
        ...doc,
        [propertyName]: newValue,
      });
    };
  };

  const handleFontSizeChange = handlePropertyChange('fontSize', parseInt);
  const handleFrameRateChange = handlePropertyChange('frameRate', parseInt);

  return (
    <ul className="space-y-4 text-xs dark:text-slate-300">
      <li>
        <Label htmlFor="font-size">
          font-size <sup>px</sup>
        </Label>
        <Input
          id="font-size"
          type="number"
          defaultValue={doc.fontSize}
          min={1}
          onChange={handleFontSizeChange}
        />
      </li>
      <li>
        <Label htmlFor="frame-rate">
          frame-rate <sup>fps</sup>
        </Label>
        <Input
          id="frame-rate"
          type="number"
          defaultValue={doc.frameRate}
          min={1}
          onChange={handleFrameRateChange}
        />
      </li>
      <li>
        <Label htmlFor="slide-duration" title="second">
          slide duration <sup>s</sup>
        </Label>
        <Input
          id="slide-duration"
          type="number"
          defaultValue={3}
          min={0.1}
          step={0.1}
          disabled
        />
      </li>
      <li>
        <VideoExport />
      </li>
    </ul>
  );
}
