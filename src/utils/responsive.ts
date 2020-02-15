import { getWindowWidth } from './dimensions';

const windowWidth = getWindowWidth();

type Options = {
  scaleWidth: number;
  scaleHeight: number;
  rootWidth?: number;
};

export const calcHeight = ({
  scaleWidth,
  scaleHeight,
  rootWidth = windowWidth,
}: Options): number => {
  const ratio = scaleHeight / scaleWidth;

  return rootWidth * ratio;
};
