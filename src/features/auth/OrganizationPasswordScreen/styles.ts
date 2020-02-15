import { makeUseStyles } from '@/features/styles';

export default makeUseStyles(({ fonts: { AvenirNext } }) => ({
  avoidingView: {
    flex: 1,
  },
  root: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  title: {
    fontFamily: AvenirNext.bold,
    fontSize: 26,
    lineHeight: 30,
    marginBottom: 10,
    marginTop: 50,
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 30,
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
}));
