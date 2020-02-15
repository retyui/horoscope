import toArray from '../toArray';

it('should return empty array when pass nil', () => {
  expect(toArray(undefined)).toEqual([]);
  expect(toArray(null)).toEqual([]);
});

it('should return array with one item what pass object', () => {
  const item = { test: 'data' };

  expect(toArray(item)).toEqual([item]);
});

it('should return the same array', () => {
  const arr = [{ test: 'data' }, { test: 'data2' }];

  expect(toArray(arr)).toBe(arr);
});
