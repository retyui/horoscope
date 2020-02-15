import { useCallback } from 'react';
import { Keyboard } from 'react-native';

const useKeyboardDismiss = <T extends (...args: any[]) => any>(
  handleSubmit: T,
): T =>
  // @ts-ignore
  useCallback(
    (...args: any[]) => {
      Keyboard.dismiss();

      return handleSubmit(...args);
    },
    [handleSubmit],
  );

export default useKeyboardDismiss;
