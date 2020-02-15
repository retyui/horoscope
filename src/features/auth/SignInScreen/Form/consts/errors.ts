import { formatInvalidReason } from '@/api/errors';

import { PASSWORD_KEY } from './fields';

export const USER_NOT_FOUND = 'resource_not_found';

export const INVALID_CREDENTIALS = formatInvalidReason(PASSWORD_KEY);
