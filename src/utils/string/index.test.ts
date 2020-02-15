import { truncate } from './index';

describe('truncate', () => {
  it('should return passed string when length less than max limit', () => {
    const str = '123';
    const maxLength = 5;

    expect(truncate(str, maxLength)).toBe(str);
  });

  it('should return a truncated string when length great then max limit', () => {
    const str = '123456789';
    const maxLength = 5;

    expect(truncate(str, maxLength)).toBe('12345…');
  });
});
