import isItemLoaded from '../isItemLoaded';

// @ts-ignore
const selector = isItemLoaded({ getRoot: (x) => x });
const id = 'A';
const item = { id, name: 'Hall' };

test('should return true if exists', () => {
  const state = {
    [id]: { ...item },
  };

  expect(selector(state, id)).toEqual(true);
});

test('should return false otherwise', () => {
  const state = {};

  expect(selector(state, id)).toEqual(false);
});
