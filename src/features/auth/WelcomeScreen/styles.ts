import { makeUseStyles } from '@/features/styles';

export default makeUseStyles({
  root: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  innerRoot: {
    flex: 1,
    justifyContent: 'center',
  },
  welcomeMsg: {
    marginTop: 55,
    fontSize: 18,
    lineHeight: 23,
    textAlign: 'center',
  },
  manuallyBtn: {
    marginTop: 16,
  },
});
