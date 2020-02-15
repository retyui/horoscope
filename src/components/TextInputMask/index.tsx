import React, { forwardRef, Ref, useCallback } from 'react';
import { TextInput, TextInputProps } from 'react-native';
// @ts-ignore
import BaseTextInputMask from 'react-native-text-input-mask';

const TextInputMask = (
  props: TextInputProps & { mask?: string },
  ref: Ref<typeof TextInput>,
) => {
  const onRef = useCallback(
    (textInputRef) => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(textInputRef);
        } else if (typeof ref === 'object') {
          // @ts-ignore
          // eslint-disable-next-line no-param-reassign
          ref.current = textInputRef;
        }
      }
    },
    [ref],
  );

  return <BaseTextInputMask {...props} refInput={onRef} />;
};

export default forwardRef(TextInputMask);
