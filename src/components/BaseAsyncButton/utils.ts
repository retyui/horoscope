import {
  DEFAULT_STAGE,
  FAILURE_STAGE,
  LOADING_STAGE,
  SUCCESS_STAGE,
} from './consts';
import { ButtonStage } from './types';

type Deps = {
  isRunning: boolean;
  error: Error | null;
};

export const getButtonStage = (
  currentStage: ButtonStage,
  { isRunning, error }: Deps,
): ButtonStage => {
  if (currentStage === DEFAULT_STAGE && isRunning) {
    return LOADING_STAGE;
  }

  if (currentStage === LOADING_STAGE) {
    if (isRunning) {
      return LOADING_STAGE;
    }

    if (error) {
      return FAILURE_STAGE;
    }

    return SUCCESS_STAGE;
  }

  return currentStage;
};

export const shouldResetStage = (stage: ButtonStage): boolean =>
  stage === SUCCESS_STAGE || stage === FAILURE_STAGE;

export const isInLoadingStage = (stage: ButtonStage): boolean =>
  stage === LOADING_STAGE;
