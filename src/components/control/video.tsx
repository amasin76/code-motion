import { VideoExport } from '../preview/export';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export function VideoTab() {
  return (
    <ul className="space-y-4 text-xs dark:text-slate-300">
      <li>
        <Label htmlFor="font-size">
          font-size <sup>px</sup>
        </Label>
        <Input id="font-size" type="number" defaultValue={18} min={1} />
      </li>
      <li>
        <Label htmlFor="frame-rate">
          frame-rate <sup>fps</sup>
        </Label>
        <Input id="frame-rate" type="number" defaultValue={60} min={1} />
      </li>
      <li>
        <Label htmlFor="slide-duration" title="second">
          slide duration <sup>s</sup>
        </Label>
        <Input
          id="slide-duration"
          type="number"
          defaultValue={1}
          min={0.1}
          step={0.1}
        />
      </li>
      <li>
        <VideoExport />
      </li>
    </ul>
  );
}
