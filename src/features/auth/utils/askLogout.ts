import { fbt } from 'fbt';

import { openAlertAsync } from '@/utils/alert';

const askLogout = () =>
  openAlertAsync(
    fbt('Confirmations', 'logout alert title').toString(),
    fbt(
      'Are you sure you want to Logout?',
      'logout alert message text',
    ).toString(),
    {
      no: {
        text: fbt('Cancel', 'negative logout alert button text').toString(),
        style: 'cancel',
      },
      yes: {
        text: fbt('Yes', 'positive logout alert button text').toString(),
      },
    },
  );

export default askLogout;
