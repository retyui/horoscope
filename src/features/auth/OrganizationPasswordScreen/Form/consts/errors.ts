import { formatInvalidReason } from '@/api/errors';

import { PASSWORD_KEY } from './fields';

export const INCORRECT_PASSWORD = formatInvalidReason(PASSWORD_KEY);
