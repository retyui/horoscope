import { navigateTo } from '@/features/navigation';

import { MAIN_ROOT_SCREEN_NAME } from './consts';

export const setMainRoot = () => navigateTo(MAIN_ROOT_SCREEN_NAME);
