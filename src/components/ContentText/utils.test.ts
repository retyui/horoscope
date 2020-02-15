import { Theme } from '@/features/styles/theme';

import { getFontFamily } from './utils';

describe('getFontFamily', () => {
  const bold = 'Bold';
  const boldItalic = 'BoldItalic';
  const regular = 'Regular';
  const regularItalic = 'Italic';

  const theme: Theme = {
    fonts: {
      // @ts-ignore
      AvenirNext: {
        bold,
        boldItalic,
        regular,
        regularItalic,
      },
    },
  };

  it('should return "regular" by default', () => {
    expect(
      getFontFamily({ theme, variant: undefined, fontStyle: undefined }),
    ).toEqual(regular);
  });

  it('should return "regular" when variant "body"', () => {
    expect(
      getFontFamily({ theme, variant: 'body', fontStyle: undefined }),
    ).toEqual(regular);
    expect(
      getFontFamily({ theme, variant: 'body', fontStyle: 'normal' }),
    ).toEqual(regular);
  });

  it('should return "bold" when variant "h1"', () => {
    expect(
      getFontFamily({ theme, variant: 'h1', fontStyle: undefined }),
    ).toEqual(bold);
    expect(
      getFontFamily({ theme, variant: 'h1', fontStyle: 'normal' }),
    ).toEqual(bold);
  });

  it('should return "regularItalic" when variant "body" and style "italic"', () => {
    expect(
      getFontFamily({ theme, variant: 'body', fontStyle: 'italic' }),
    ).toEqual(regularItalic);
  });

  it('should return "boldItalic" when variant "h1" and style "italic"', () => {
    expect(
      getFontFamily({ theme, variant: 'h1', fontStyle: 'italic' }),
    ).toEqual(boldItalic);
  });
});
