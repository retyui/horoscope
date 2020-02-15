import createBoolean from '../boolean';
import createDatetime from '../datetime';
import createNumber from '../number';
import createObject from '../object';

const serializer = createObject({
  num: createNumber(),
  date: createDatetime(),
  bool: createBoolean(),
});

describe('.parse()', () => {
  it('should parse object', () => {
    const obj = {
      num: 1,
      bool: false,
      date: '2019-10-11T10:26:34.954Z',
    };

    expect(serializer.serialize(serializer.parse(obj))).toEqual(obj);
  });

  it('should ignore unknown params', () => {
    const obj = {
      num: 1,
      bool: false,
      date: '2019-10-11T10:26:34.954Z',

      unknownParam: 1,
      unknownParam2: true,
    };

    expect(serializer.serialize(serializer.parse(obj))).toEqual(obj);
  });
});
