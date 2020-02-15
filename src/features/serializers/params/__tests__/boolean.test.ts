import createBoolParam from '../boolean';

const boolParam = createBoolParam();

it('should parse into boolean', () => {
  expect(boolParam.parse('true')).toEqual(true);
  expect(boolParam.parse('false')).toEqual(false);
});

it('should serialize into boolean', () => {
  expect(boolParam.serialize(false)).toEqual(false);
  expect(boolParam.serialize(true)).toEqual(true);
});
