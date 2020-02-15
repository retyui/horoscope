import { formatInvalidReason, formatTakenEmailReason } from '@/api/errors';

import { EMAIL_KEY } from '../../../fields';

export const INVALID_EMAIL = formatInvalidReason(EMAIL_KEY);
export const ALREADY_USED_EMAIL = formatTakenEmailReason(EMAIL_KEY);
