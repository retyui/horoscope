import { makeUseStyles } from '@/features/styles';

export default makeUseStyles(({ safeArea }) => ({
  root: {
    flex: 1,
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
    right: 0,
    left: 0,
    paddingHorizontal: '15%',
  },
  button: {
    position: 'absolute',
    bottom: safeArea.bottom || 32,
    right: 16,
    left: 16,
    width: 'auto',
  },
}));
