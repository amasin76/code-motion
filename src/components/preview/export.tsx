import { DownloadIcon } from 'lucide-react';
import { useStore } from '@/store';
import { EncodeStatus } from '@/store/encode-task';
import { dateFilename, downloadBlob } from '@/utils/download';

export function VideoExport() {
  const { encodeState, startEncodeTask, abortEncodeTask } = useStore(
    (state) => ({
      encodeState: state.encodeState,
      startEncodeTask: state.startEncodeTask,
      abortEncodeTask: state.abortEncodeTask,
    })
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
    <button
      type="button"
      title={
        encodeState?.status === EncodeStatus.Encoding ? 'Click to cancel' : ''
      }
      onClick={handleClick}
    >
      <DownloadIcon />

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
        style={{
          width: progressPercent,
        }}
      />
    </button>
  );
}
