import createArray from '../array';
import createBoolean from '../boolean';
import createNumber from '../number';
import createString from '../string';

const serializerArrayStrings = createArray(createString());
const serializerArrayNumbers = createArray(createNumber());
const serializerArrayBooleans = createArray(createBoolean());

it('should raises an error when trying to parse not string or array', () => {
  expect(() => {
    serializerArrayStrings.parse(
      // @ts-ignore
      null,
    );
  }).toThrow();
});

it('should parse array correctly', () => {
  expect(serializerArrayStrings.parse(['1', '2'])).toEqual(['1', '2']);
  expect(serializerArrayNumbers.parse(['1', '2'])).toEqual([1, 2]);
  expect(serializerArrayBooleans.parse(['false', 'true'])).toEqual([
    false,
    true,
  ]);
});

it('should parse string correctly', () => {
  expect(serializerArrayStrings.parse('1,2')).toEqual(['1', '2']);
  expect(serializerArrayNumbers.parse('1,2')).toEqual([1, 2]);
  expect(serializerArrayBooleans.parse('false,true')).toEqual([false, true]);
});

it('should serialize correctly', () => {
  expect(serializerArrayStrings.serialize(['1', '2'])).toEqual(['1', '2']);
  expect(serializerArrayNumbers.serialize([1, 2])).toEqual([1, 2]);
  expect(serializerArrayBooleans.serialize([false, true])).toEqual([
    false,
    true,
  ]);
});
