import { navigateTo } from '@/features/navigation';

import { AUTH_ROOT_SCREEN_NAME } from './consts/screens';

export const navigateToAuthRoot = () => navigateTo(AUTH_ROOT_SCREEN_NAME);
