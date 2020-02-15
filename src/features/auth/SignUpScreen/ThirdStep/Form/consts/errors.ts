import { formatInvalidReason } from '@/api/errors';

import { PHONE_KEY } from '../../../fields';

export const INVALID_PHONE = formatInvalidReason(PHONE_KEY);
