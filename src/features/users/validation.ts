import { fbt } from 'fbt';
import { string } from 'yup';

import { getInternationalPhone } from '@/features/countriesPhoneCodes/utils';

import {
  MINIMAL_PASSWORD_LENGTH,
  MINIMAL_PHONE_NUMBER_LENGTH,
} from './consts/limits';

export const emailValidation = string()
  .email(fbt('Please enter a valid email address', 'invalid email error text'))
  .required(fbt('Email is a required field', 'not empty error text'));

export const getPhoneValidation = ({
  countryIdKey,
}: {
  countryIdKey: string;
}) =>
  string()
    .required(fbt('Phone number is a required field', 'not empty error text'))
    .test(
      'check phone length',
      fbt(
        `Please confirm that phone number is correct.`,
        'invalid phone number',
      ).toString(),
      function(phoneChunk) {
        const { [countryIdKey]: countryId } = this.parent;
        const phone = getInternationalPhone(countryId, phoneChunk);

        return phone.length >= MINIMAL_PHONE_NUMBER_LENGTH;
      },
    );

export const passwordValidation = string()
  .required(fbt('Password is a required field', 'not empty error text'))
  .min(
    MINIMAL_PASSWORD_LENGTH,
    fbt(
      `Password must be at least ${fbt.param(
        'MINIMAL_PASSWORD_LENGTH',
        MINIMAL_PASSWORD_LENGTH,
      )} characters`,
      'too short password error text',
    ),
  );
