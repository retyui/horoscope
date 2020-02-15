import jsonwebtoken from 'jsonwebtoken';

import decodeTokenPayload from './decodeTokenPayload';

it('should decode token payload data', () => {
  const payload = { id: 1 };
  const token = jsonwebtoken.sign(payload, 'secret_key');

  expect(decodeTokenPayload(token)).toEqual(expect.objectContaining(payload));
});

it('should return nothing when token invalid', () => {
  const token = 'INVALID_TOKEN';

  expect(decodeTokenPayload(token)).toBeNull();
});
