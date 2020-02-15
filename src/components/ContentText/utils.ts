import { Theme } from '@/features/styles/theme';

import { Props } from './types';

type Options = {
  theme: Theme;
  variant: Props['variant'];
  fontStyle: Props['fontStyle'];
};

export const getFontFamily = ({ theme, variant, fontStyle }: Options) => {
  const { AvenirNext } = theme.fonts;

  if (variant === 'h1') {
    if (fontStyle === 'italic') {
      return AvenirNext.boldItalic;
    }

    return AvenirNext.bold;
  }

  if (fontStyle === 'italic') {
    return AvenirNext.regularItalic;
  }

  return AvenirNext.regular;
};
