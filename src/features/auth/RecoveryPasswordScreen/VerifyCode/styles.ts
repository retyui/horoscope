import { makeUseStyles } from '@/features/styles';

import { ROOT_PADDING } from './consts';

export default makeUseStyles({
  root: {
    flex: 1,
    paddingHorizontal: ROOT_PADDING,
  },
  submitButton: {
    marginTop: 50,
  },
});
