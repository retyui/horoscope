import { navigateTo } from '@/features/navigation';

import {
  SIGN_UP_SCREEN_NAME_STEP2,
  SIGN_UP_SCREEN_NAME_STEP3,
  SIGN_UP_SCREEN_NAME_STEP4,
} from '../consts/screens';

export const goToSecondSignUpStep = () => navigateTo(SIGN_UP_SCREEN_NAME_STEP2);
export const goToThirdSignUpStep = () => navigateTo(SIGN_UP_SCREEN_NAME_STEP3);
export const goToFourthSignUpStep = () => navigateTo(SIGN_UP_SCREEN_NAME_STEP4);
