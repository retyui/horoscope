import {
  COUNTRY_CODE_KEY,
  EMAIL_KEY,
  FIRST_NAME_KEY,
  LAST_NAME_KEY,
  PHONE_KEY,
  STATUS_KEY,
} from './consts/keys';
import dao from './dao';

const { getItemPropById } = dao.selectors;

export const getUserEmailAddress = getItemPropById(EMAIL_KEY);
export const getUserFirstName = getItemPropById(FIRST_NAME_KEY);
export const getUserLastName = getItemPropById(LAST_NAME_KEY);
export const getUserPhone = getItemPropById(PHONE_KEY);
export const getUserStatus = getItemPropById(STATUS_KEY);
export const getUserCountryCode = getItemPropById(COUNTRY_CODE_KEY);
