export const getScaleDiff = (width: number, scaleRatio: number): number =>
  (width - width * scaleRatio) / 2;
