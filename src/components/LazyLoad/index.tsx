import React, { ComponentType } from 'react';

import LoadProgress from '@/components/LoadProgress';

import LoadError from './LoadError';

type Props = {
  tryAgain: () => void;
  children: any;
  error: Error | null;
  Error?: ComponentType<any>;
  isRunning: boolean;
  Loading?: ComponentType<any>;
  payload: any | null;
};

const LazyLoad = ({
  tryAgain,
  children,
  Error = LoadError,
  error,
  isRunning,
  Loading = LoadProgress,
  payload,
}: Props) => {
  if (isRunning) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} tryAgain={tryAgain} />;
  }

  if (payload) {
    return children;
  }

  return null;
};

export default LazyLoad;
