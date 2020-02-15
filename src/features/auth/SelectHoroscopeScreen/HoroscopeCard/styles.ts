import { makeUseStyles } from '@/features/styles';
import { palette } from '@/features/styles/palette';

export default makeUseStyles(() => ({
  root: {},
  iconRoot: {
    width: 210,
    height: 210,
    borderRadius: 210,
    marginBottom: 40,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: palette.background.second,
  },
  icon: {
    tintColor: palette.text.primary,
  },
  name: {
    fontSize: 18,
    lineHeight: 23,
    tintColor: palette.text.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  range: {
    fontSize: 14,
    textAlign: 'center',
    color: palette.text.hidden,
  },
}));
