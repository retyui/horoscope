import { StyleSheet } from 'react-native';

const LINE_HEIGHT = 22;

export default StyleSheet.create({
  root: {
    position: 'absolute',
    fontSize: 17,
    lineHeight: LINE_HEIGHT,
    top: '50%',
    marginTop: -(LINE_HEIGHT / 2),
    left: 0,
    right: 0,
  },
});
