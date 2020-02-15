import { REDUX_STORE_KEY } from '@/features/users/consts';
import {
  EMAIL_KEY,
  FIRST_NAME_KEY,
  LAST_NAME_KEY,
  PHONE_KEY,
  STATUS_KEY,
} from '@/features/users/consts/keys';
import { INACTIVE } from '@/features/users/consts/statuses';

import {
  getCurrentUserEmailAddress,
  getCurrentUserFirstName,
  getCurrentUserLastName,
  getCurrentUserPhone,
  isInactiveUser,
} from './selectors';

const userId = '0';
const mockState = (partialUser: {}): any => ({
  currentUser: {
    userId,
  },
  [REDUX_STORE_KEY]: {
    [userId]: { ...partialUser },
  },
});

it('should return true when user has an inactive status', () => {
  expect(isInactiveUser(mockState({ [STATUS_KEY]: INACTIVE }))).toBe(true);
});

it('should return user phone', () => {
  const phone = '123';

  expect(getCurrentUserPhone(mockState({ [PHONE_KEY]: phone }))).toBe(phone);
});

it('should return user last name', () => {
  const lastName = 'Dvd';

  expect(getCurrentUserLastName(mockState({ [LAST_NAME_KEY]: lastName }))).toBe(
    lastName,
  );
});

it('should return user first name', () => {
  const firstName = 'Dvd';

  expect(
    getCurrentUserFirstName(mockState({ [FIRST_NAME_KEY]: firstName })),
  ).toBe(firstName);
});

it('should return user first name', () => {
  const email = 'test@test.com';

  expect(getCurrentUserEmailAddress(mockState({ [EMAIL_KEY]: email }))).toBe(
    email,
  );
});
