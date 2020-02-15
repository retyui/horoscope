import { StyleSheet } from 'react-native';

import { makeUseStyles } from '@/features/styles';

export default makeUseStyles({
  titleText: {
    position: 'absolute',
    bottom: 35,
    left: 20,
    right: 20,
  },
  gradientRoot: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.8,
  },
});
