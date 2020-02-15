import { call, select } from '@redux-saga/core/effects';

import {
  getCurrentUserEmailAddress,
  getCurrentUserFirstName,
  getCurrentUserId,
} from '@/features/currentUser/selectors';
import { clearPerson, setPerson } from '@/features/errorTracking';

import { onAuthorizeSuccess, onDeauthorize } from './index';

describe('onDeauthorize', () => {
  it('should call clearPerson', () => {
    const generator = onDeauthorize();

    expect(generator.next().value).toEqual(call(clearPerson));
    expect(generator.next().done).toBeTruthy();
  });
});

describe('onAuthorizeSuccess', () => {
  it('should call setPerson with user props', () => {
    const generator = onAuthorizeSuccess();
    const id = 'id';
    const email = 'test@test.com';
    const name = 'David';

    expect(generator.next().value).toEqual(select(getCurrentUserId));
    expect(generator.next(id).value).toEqual(
      select(getCurrentUserEmailAddress),
    );
    expect(generator.next(email).value).toEqual(
      select(getCurrentUserFirstName),
    );
    expect(generator.next(name).value).toEqual(
      call(setPerson, { id, name, email }),
    );

    expect(generator.next().done).toBeTruthy();
  });
});
