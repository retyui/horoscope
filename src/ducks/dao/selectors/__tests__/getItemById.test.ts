import getItemById from '../getItemById';

// @ts-ignore
const selector = getItemById({ getRoot: (x) => x });
const id = 'A';
const item = { id, name: 'Hall' };

test('should return item if exists', () => {
  const state = {
    [id]: { ...item },
  };

  expect(selector(state, id)).toEqual(item);
});

test('should return null otherwise', () => {
  const state = {};

  expect(selector(state, id)).toEqual(null);
});
