import { push } from '@/features/navigation';

import { DEV_MENU_SCREEN_NAME } from './consts';

export const goToDevMenu = () => push(DEV_MENU_SCREEN_NAME);
