import concatStyles from './concatStyles';

it('should return null', () => {
  expect(concatStyles()).toBeNull();
  expect(concatStyles(false)).toBeNull();
  expect(concatStyles(null)).toBeNull();
  expect(concatStyles([])).toBeNull();
});

it('should return flatten array when pass array in array', () => {
  const style1 = { s: 1 };
  const style2 = { s: 2 };
  const style3 = { s: 3 };
  const style4 = { s: 4 };

  expect(
    concatStyles(style1, false, style3, [null, style2, false, style4]),
  ).toEqual([style1, style3, style2, style4]);
});

it('should return only style when passed argument have one style object', () => {
  const style1 = { s: 1 };

  // @ts-ignore
  expect(concatStyles(false, [null, style1])).toBe(style1);
});
