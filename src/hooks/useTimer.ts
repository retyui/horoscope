import { useCallback, useRef } from 'react';

const useTimer = <CallbackFn extends (...args: any[]) => any>(
  callback: CallbackFn,
  delay: number,
): [CallbackFn, () => void] => {
  const timerRef = useRef<any>();
  const stop = useCallback(() => {
    clearTimeout(timerRef.current);
  }, [timerRef]);

  const start = useCallback(
    (...args: any[]) => {
      stop();
      timerRef.current = setTimeout(callback, delay, ...args);
    },
    [stop, callback, delay],
  );

  // @ts-ignore
  return [start, stop];
};

export default useTimer;
