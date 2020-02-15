import { fbt } from 'fbt';
import { string } from 'yup';

export const emailValidation = string()
  .email(fbt('Please enter a valid email address', 'invalid email error text'))
  .required(fbt('Email is a required field', 'not empty error text'));
