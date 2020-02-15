import { useCallback } from 'react';
import { useDispatch, useSelector as useReduxSelector } from 'react-redux';

const defaultDeps = [];

export const useSelector = (selectorFn, selectorDeps = defaultDeps) => {
  const memoizedSelector = useCallback(
    (state) => selectorFn(state, ...selectorDeps),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    selectorDeps,
  );

  return useReduxSelector(memoizedSelector);
};

export { useDispatch };
