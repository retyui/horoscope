import { makeUseStyles } from '@/features/styles';

export default makeUseStyles(({ palette }) => ({
  root: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    color: palette.text.primary,
    fontSize: 26,
    lineHeight: 30,
    marginTop: 50,
  },
  subTitle: {
    textAlign: 'center',
    color: palette.text.primary,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 8,
  },
  spaces: {
    height: 50,
  },
}));
