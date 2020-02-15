import { object, string } from '@/features/serializers/params';

import {
  EMAIL_KEY,
  FIRST_NAME_KEY,
  LAST_NAME_KEY,
  PHONE_KEY,
  STATUS_KEY,
  UUID_KEY,
} from './consts/keys';

const annotations = {
  [PHONE_KEY]: string(),
  [LAST_NAME_KEY]: string(),
  [EMAIL_KEY]: string(),
  [FIRST_NAME_KEY]: string(),
  [STATUS_KEY]: string(),
  [UUID_KEY]: string(),
};

export default object(annotations);
