import { RefObject, useCallback, useRef } from 'react';
import { TextInput } from 'react-native';

const useOnSubmitEditing = (): [RefObject<TextInput>, () => void] => {
  const textInputRef = useRef<TextInput>(null);
  const focusNextField = useCallback(() => {
    const { current: nextField } = textInputRef;

    if (nextField) {
      nextField.focus();
    }
  }, [textInputRef]);

  return [textInputRef, focusNextField];
};

export default useOnSubmitEditing;
