import { TEXT_FIELD_MARGIN_BOTTOM } from '@/components/TextField/styles';
import { makeUseStyles } from '@/features/styles';

const MARGIN_DIFF = TEXT_FIELD_MARGIN_BOTTOM - 5;

export default makeUseStyles(({ palette }) => ({
  root: {
    fontSize: 13,
    lineHeight: 18,
    minHeight: 20,
    marginTop: 4,
    opacity: 0.8,
  },
  hasError: {
    color: palette.error.primary,
  },
  afterTextField: {
    marginTop: -MARGIN_DIFF,
    marginBottom: MARGIN_DIFF,
  },
}));
