import html2canvas from 'html2canvas';

import { dateFilename } from './download';

export function captureScreenShot(
  elementId: string,
  fileType: string,
  backgroundColor: string,
  _fileName = dateFilename()
): void {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('element undefined');
  }

  html2canvas(element, {
    backgroundColor: backgroundColor,
    allowTaint: true,
  })
    .then((canvas) => {
      const image = canvas.toDataURL('image/' + fileType);
      const a = document.createElement('a');
      a.href = image;
      // a.target = '_blank';
      // a.rel = 'noopener noreferrer';
      a.download = _fileName;
      a.click();
      canvas.remove();
    })
    .catch((err) => {
      console.error(err);
    });
}
