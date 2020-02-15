import { getScaleDiff } from './utils';

it('should return scale difference', () => {
  expect(getScaleDiff(200, 0.7)).toBe(30);
});
