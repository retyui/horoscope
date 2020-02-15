import createJSONParam from '../json';

const dateParam = createJSONParam();

test('should parse into JSON', () => {
  expect(dateParam.parse('{"data":{"user":"Ann"}}')).toEqual({
    data: {
      user: 'Ann',
    },
  });
});

test('should serialize into string', () => {
  expect(
    dateParam.serialize({
      data: {
        user: 'Ann',
      },
    }),
  ).toEqual('{"data":{"user":"Ann"}}');
});
