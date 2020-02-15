import { INACTIVE } from '@/features/users/consts/statuses';
import {
  getUserCountryCode,
  getUserEmailAddress,
  getUserFirstName,
  getUserLastName,
  getUserPhone,
  getUserStatus,
} from '@/features/users/selectors';
import { RootState } from '@/types/redux';

export const getCurrentUserId = (state: RootState) => state.currentUser.userId;

const getCurrentUserWith = <Fn extends (...args: any[]) => any>(func: Fn) => (
  state: RootState,
): ReturnType<Fn> => {
  const currentUserId = getCurrentUserId(state);

  return func(state, currentUserId);
};

export const getCurrentUserFirstName = getCurrentUserWith(getUserFirstName);
export const getCurrentUserLastName = getCurrentUserWith(getUserLastName);
export const getCurrentUserPhone = getCurrentUserWith(getUserPhone);
export const getCurrentUserCountryCode = getCurrentUserWith(getUserCountryCode);
export const getCurrentUserEmailAddress = getCurrentUserWith(
  getUserEmailAddress,
);

export const isInactiveUser = (state: any) => {
  const currentUserId = getCurrentUserId(state);
  const status = getUserStatus(state, currentUserId);

  return status === INACTIVE;
};
