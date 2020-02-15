import { fbt } from 'fbt';
import React from 'react';

import ActionButton from '@/components/ActionButton';
import { WarningMessage } from '@/components/Messages';
import { getErrorMessage as getDefaultErrorMessage } from '@/features/i18n/errors';

type Props = {
  error: Error;
  tryAgain: () => void;
  getErrorMessage?: (error: Error) => string;
};

const LoadError = ({
  getErrorMessage = getDefaultErrorMessage,
  error,
  tryAgain,
}: Props) => (
  <WarningMessage
    title={fbt('Error', 'title')}
    subTitle={getErrorMessage(error)}
  >
    <ActionButton onPress={tryAgain}>
      <fbt desc="button text">Try again</fbt>
    </ActionButton>
  </WarningMessage>
);

export default LoadError;
