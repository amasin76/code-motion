export function dateFilename() {
  const curDate = new Date()
    .toLocaleString('en-GB')
    .replace(', ', '_')
    .replace(/\/|:| /g, '-');
  return curDate;
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
