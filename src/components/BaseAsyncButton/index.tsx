import React, { useCallback, useEffect, useState } from 'react';

import useTimer from '@/hooks/useTimer';

import { DEFAULT_STAGE } from './consts';
import { ButtonStage, Props } from './types';
import { getButtonStage, isInLoadingStage, shouldResetStage } from './utils';

const BaseAsyncButton = ({
  ButtonComponent,
  ButtonContent,
  children,
  disabled = false,
  error,
  isRunning,
  returnDelay = 2000,
  ...rest
}: Props) => {
  const [stage, setStage] = useState<ButtonStage>(DEFAULT_STAGE);
  const resetStage = useCallback(() => setStage(DEFAULT_STAGE), [setStage]);
  const [start, stop] = useTimer(resetStage, returnDelay);

  useEffect(() => {
    const newStage = getButtonStage(stage, { isRunning, error });

    if (stage !== newStage) {
      setStage(newStage);

      if (shouldResetStage(newStage)) {
        start();
      }
    }
  }, [isRunning, error, stage, stop, start]);

  useEffect(() => stop, [stop]);

  return (
    <ButtonComponent {...rest} disabled={disabled || isInLoadingStage(stage)}>
      <ButtonContent stage={stage}>{children}</ButtonContent>
    </ButtonComponent>
  );
};

export default BaseAsyncButton;
