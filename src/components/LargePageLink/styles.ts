import { StyleSheet } from 'react-native';

import { makeUseStyles } from '@/features/styles';

export default makeUseStyles(({ palette }) => ({
  root: {
    borderRadius: 8,
    backgroundColor: palette.accent.primary,
  },
  gradientRoot: StyleSheet.absoluteFillObject,
  contentRoot: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 25,
  },
}));
