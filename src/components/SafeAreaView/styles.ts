import { StatusBar } from 'react-native';

import { makeUseStyles } from '@/features/styles';

export default makeUseStyles(({ palette }) => ({
  root: {
    flex: 1,
    backgroundColor: palette.background.primary,
  },
  statusBarPadding: {
    paddingTop: StatusBar.currentHeight,
  },
}));
