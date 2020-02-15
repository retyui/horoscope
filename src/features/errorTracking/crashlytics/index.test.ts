import { clearPerson, setPerson, trackException } from './index';

describe('trackException', () => {
  it('should work properly', () => {
    trackException(new Error('Test'));
  });
});

describe('clearPerson', () => {
  it('should work properly', async () => {
    await clearPerson();
  });
});

describe('setPerson', () => {
  it('should work properly', async () => {
    const email = 'test@test.com';
    const id = '123';
    const name = 'David';

    await setPerson({ email, id, name });
  });
});
