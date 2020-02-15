import getItemPropById from '../getItemPropById';

// @ts-ignore
const selector = getItemPropById({ getRoot: (x) => x })('name');
const id = 'A';
const item = { id, name: 'Hall' };

test('should return property if item exists', () => {
  const state = {
    [id]: { ...item },
  };

  expect(selector(state, id)).toEqual('Hall');
});

test('should return undefined otherwise', () => {
  const state = {};

  expect(selector(state, id)).toBeUndefined();
});
