import { useCallback } from 'react';

import useUnmountSafeState from './useUnmountSafeState';

const useAsyncCallback = (asyncFn, deps) => {
  const [isRunning, setRunningFlag] = useUnmountSafeState(false);
  const [error, setError] = useUnmountSafeState(null);
  const [payload, setPayload] = useUnmountSafeState();

  const call = useCallback(
    (...args) => {
      setError(null);
      setRunningFlag(true);

      asyncFn(...args)
        .then(setPayload)
        .catch(setError)
        .finally(() => setRunningFlag(false));
    },
    // eslint-disable-next-line
    deps,
  );

  return [call, isRunning, payload, error];
};

export default useAsyncCallback;
