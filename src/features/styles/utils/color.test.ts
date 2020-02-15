import { fade, isDark, isLight } from './color';

it('should work properly', () => {
  expect(isLight('#fff')).toBe(true);
  expect(isDark('#fff')).toBe(false);

  expect(isLight('#000')).toBe(false);
  expect(isDark('#000')).toBe(true);
});

describe('fade', () => {
  it('should update alpha if need', () => {
    expect(fade('#000', 1)).toBe('rgb(0, 0, 0)');
    expect(fade('#000', 0)).toBe('rgba(0, 0, 0, 0)');
    expect(fade('#000', 0.4)).toBe('rgba(0, 0, 0, 0.4)');
  });

  it('should restricts a number to be within a range', () => {
    expect(fade('#000', 2)).toBe('rgb(0, 0, 0)');
    expect(fade('#000', -1)).toBe('rgba(0, 0, 0, 0)');
  });
});
