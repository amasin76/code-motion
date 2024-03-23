import { DownloadIcon } from 'lucide-react';
import { useStore } from '@/store';
import { EncodeStatus } from '@/store/encode-task';
import { dateFilename, downloadBlob } from '@/utils/download';

import { Button } from '../ui/button';

export function VideoExport() {
  const { encodeState, startEncodeTask, abortEncodeTask } = useStore(
    (state) => ({
      encodeState: state.encodeState,
      startEncodeTask: state.startEncodeTask,
      abortEncodeTask: state.abortEncodeTask,
    }),
  );

  const handleClick = () => {
    if (encodeState == null || encodeState.status === EncodeStatus.Error) {
      startEncodeTask();
    } else if (encodeState.status === EncodeStatus.Encoding) {
      abortEncodeTask();
    } else if (encodeState.status === EncodeStatus.Done) {
      downloadBlob(encodeState.result, `code_motion-${dateFilename()}.webm`);
      abortEncodeTask();
    }
  };

  const progress =
    encodeState?.status === EncodeStatus.Encoding
      ? encodeState.progress
      : encodeState?.status === EncodeStatus.Done
        ? 1
        : 0;

  const progressPercent = `${Math.round(progress * 100)}%`;

  return (
    <Button
      className="felx relative w-full gap-1.5 font-normal"
      variant="secondary"
      title={
        encodeState?.status === EncodeStatus.Encoding ? 'Click to cancel' : ''
      }
      onClick={handleClick}
    >
      <DownloadIcon className="w-5" />
      <span>
        {encodeState == null
          ? 'Export'
          : encodeState.status === EncodeStatus.Done
            ? 'Save'
            : encodeState.status === EncodeStatus.Encoding
              ? progressPercent
              : 'Re-Export'}
      </span>
      <span
        className={`animate-progress absolute bottom-0 left-0 top-0 bg-slate-200 mix-blend-overlay`}
        style={{
          width: progressPercent,
        }}
      />
    </Button>
  );
}
