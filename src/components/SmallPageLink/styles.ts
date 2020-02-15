import { StyleSheet } from 'react-native';

import { makeUseStyles } from '@/features/styles';

export default makeUseStyles(({ palette }) => ({
  root: {
    borderRadius: 8,
    height: 200,
  },
  noImageRoot: {
    backgroundColor: palette.accent.primary,
  },
  titleText: {
    position: 'absolute',
    fontSize: 20,
    lineHeight: 24,
    bottom: 20,
    left: 20,
    right: 20,
  },
  gradientRoot: StyleSheet.absoluteFillObject,
}));
