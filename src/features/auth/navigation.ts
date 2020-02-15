import { navigateTo, push } from '@/features/navigation';

import {
  AUTH_ROOT_SCREEN_NAME,
  ORGANIZATION_PASSWORD_ROOT_SCREEN_NAME,
  RECOVER_PASSWORD_SCREEN_NAME,
  SIGN_IN_SCREEN_NAME,
  SIGN_UP_SCREEN_NAME,
} from './consts/screens';

export const setAuthRoot = () => navigateTo(AUTH_ROOT_SCREEN_NAME);

export const setOrganizationPasswordRoot = () =>
  navigateTo(ORGANIZATION_PASSWORD_ROOT_SCREEN_NAME);

export const pushToRecoveryPassword = () => push(RECOVER_PASSWORD_SCREEN_NAME);

export const navigateToSignIn = () => navigateTo(SIGN_IN_SCREEN_NAME);

export const pushToSignUp = () => push(SIGN_UP_SCREEN_NAME);
