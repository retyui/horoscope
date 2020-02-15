import { makeUseStyles } from '@/features/styles';

export default makeUseStyles(({ palette }) => ({
  root: {
    width: 205,
    height: 205,
    alignSelf: 'center',
  },
  innerRoot: {
    position: 'absolute',
    opacity: 0.1,
    borderRadius: 999,
    backgroundColor: palette.text.primary,
  },
  innerRoot0: {
    height: '100%',
    width: '100%',
  },
  innerRoot1: {
    height: '66.66%',
    width: '66.66%',
    left: '16.66%',
    top: '16.66%',
  },
  innerRoot2: {
    height: '33.33%',
    width: '33.33%',
    left: '33.33%',
    top: '33.33%',
  },
}));
