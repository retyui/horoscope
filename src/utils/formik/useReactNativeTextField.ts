import {
  FieldHelperProps,
  FieldInputProps,
  FieldMetaProps,
  useField as useBaseField,
} from 'formik';
import { useCallback, useRef } from 'react';

export type ReactNativeFieldInputProps<Val> = Omit<
  FieldInputProps<Val>,
  'onBlur' | 'onChange'
> & {
  onBlur: () => void;
  onChangeText: (text: string) => void;
};

const useReactNativeTextField = <Val extends any>(
  name: string,
): [
  ReactNativeFieldInputProps<Val>,
  FieldMetaProps<Val>,
  FieldHelperProps<Val>,
] => {
  const changedFlagRef = useRef<boolean>(false);
  const [originalInputProps, meta, helpers] = useBaseField(name);
  const { setTouched, setValue } = helpers;
  const onChangeText = useCallback(
    (text: string) => {
      changedFlagRef.current = true;
      setValue(text);
    },
    [setValue],
  );
  const onBlur = useCallback(() => {
    // set touched only if a user input any text
    if (changedFlagRef.current) {
      setTouched(true);
    }
  }, [setTouched]);

  const inputProps = {
    ...originalInputProps,
    onChangeText,
    onBlur,
  };

  return [inputProps, meta, helpers];
};

export default useReactNativeTextField;
