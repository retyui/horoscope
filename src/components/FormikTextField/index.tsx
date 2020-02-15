import React, { ComponentProps, forwardRef, Ref, useCallback } from 'react';
import { TextInput as NativeTextInput } from 'react-native';

import TextInput from '@/components/TextField';
import useReactNativeTextField from '@/utils/formik/useReactNativeTextField';

type Props = {
  name: string;
  noLeftRightSpaces?: boolean;
} & Omit<ComponentProps<typeof TextInput>, 'value' | 'onChangeText' | 'onBlur'>;

const FormikTextField = (
  { name, noLeftRightSpaces = false, ...props }: Props,
  ref: Ref<NativeTextInput>,
) => {
  const [{ value, onBlur, onChangeText }] = useReactNativeTextField(name);
  const handleOnChangeText = useCallback(
    (text: string) => onChangeText(noLeftRightSpaces ? text.trim() : text),
    [noLeftRightSpaces, onChangeText],
  );

  return (
    <TextInput
      onChangeText={handleOnChangeText}
      onBlur={onBlur}
      value={value}
      {...props}
      ref={ref}
    />
  );
};

export default forwardRef(FormikTextField);
