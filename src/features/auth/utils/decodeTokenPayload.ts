import { decode } from 'base-64';

const decodeTokenPayload = (token: string) => {
  try {
    const [, base64Payload] = token.split('.');
    const rawPayload = decode(base64Payload);

    return JSON.parse(rawPayload);
  } catch (e) {
    return null;
  }
};

export default decodeTokenPayload;
