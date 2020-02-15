import { useCallback, useEffect, useRef, useState } from 'react';

type UseState = typeof useState;

// @ts-ignore
const useUnmountSafeState: UseState = (initialState: any) => {
  const mountRef = useRef(false);
  const [value, setValue] = useState(initialState);
  const setVal = useCallback(
    (newState) => {
      const { current: isMounted } = mountRef;

      if (isMounted) {
        setValue(newState);
      }
    },
    [mountRef],
  );

  useEffect(() => {
    mountRef.current = true;

    return () => {
      mountRef.current = false;
    };
  }, [mountRef]);

  return [value, setVal];
};

export default useUnmountSafeState;
