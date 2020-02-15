import { makeUseStyles } from '@/features/styles';

export default makeUseStyles(({ safeArea }) => ({
  root: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  pager: {
    flex: 1,
  },
  pagerItem: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    top: '14%',
    position: 'absolute',
    fontSize: 22,
    lineHeight: 30,
    textAlign: 'center',
    right: 20,
    left: 20,
  },
  button: {
    position: 'absolute',
    bottom: safeArea.bottom || 32,
  },
}));
