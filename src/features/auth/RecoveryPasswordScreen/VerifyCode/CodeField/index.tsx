import React, { ComponentProps } from 'react';
import { Text, View } from 'react-native';
import {
  CodeField as BaseCodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import useReactNativeTextField from '@/utils/formik/useReactNativeTextField';

import { CELL_COUNT } from '../consts';
import useStyles from './styles';

type Props = Omit<
  ComponentProps<typeof BaseCodeField>,
  'value' | 'onBlur' | 'cellCount' | 'onChangeText' | 'rootStyle' | 'renderCell'
> & {
  name: string;
};

const replaceNotNumberSymbols = (text: string) => text.replace(/\D/g, '');

const CodeFiled = ({ name, ...rest }: Props) => {
  const styles = useStyles();
  const [{ onChangeText, onBlur, value }] = useReactNativeTextField(name);
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    setValue: onChangeText,
    value,
  });
  const handlerOnChangeText = (text: string) =>
    onChangeText(replaceNotNumberSymbols(text));

  return (
    <BaseCodeField
      ref={ref}
      {...rest}
      value={value}
      onBlur={onBlur}
      cellCount={CELL_COUNT}
      onChangeText={handlerOnChangeText}
      rootStyle={styles.cellsRoot}
      keyboardType="number-pad"
      renderCell={({ index, symbol, isFocused }) => (
        <View
          // Remove <View/> wrapper when issue https://github.com/facebook/react-native/issues/23537 would be closed
          key={index}
          onLayout={getCellOnLayoutHandler(index)}
          style={styles.cell}
        >
          <Text style={styles.cellText}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        </View>
      )}
      {...props}
    />
  );
};

export default CodeFiled;
