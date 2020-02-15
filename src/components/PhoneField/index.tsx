import React, { ComponentProps, forwardRef, Ref } from 'react';
import { TextInput as NativeTextInput, View } from 'react-native';

import TextField from '@/components/TextField';
import TextInputMask from '@/components/TextInputMask';

import CallingCodeTextField from './CallingCodeTextField';
import useStyles from './styles';

type TextInputMaskProps = ComponentProps<typeof TextInputMask>;
type TextFieldProps = ComponentProps<typeof TextField>;

type Props = {
  mask: TextInputMaskProps['mask'];
  onPressCode?: () => void;
  callingCode: string;
  textFieldRef?: Ref<NativeTextInput>;
} & TextFieldProps;

const PhoneField = ({
  mask,
  callingCode,
  onPressCode,
  textFieldRef,
  placeholder,
  ...props
}: Props) => {
  const styles = useStyles();

  return (
    <View style={styles.row}>
      <View style={styles.codeCell}>
        <CallingCodeTextField
          editable={false}
          onPress={onPressCode}
          value={`+${callingCode}`}
          placeholder={placeholder}
        />
      </View>
      <View style={styles.phoneCell}>
        <TextField
          ref={textFieldRef}
          Component={TextInputMask}
          // @ts-ignore `mask` prop from TextInputMask
          mask={mask}
          {...props}
          keyboardType="phone-pad"
          // iOS
          textContentType="telephoneNumber"
          // Android
          autoCompleteType="tel"
        />
      </View>
    </View>
  );
};

export default forwardRef(
  ({ mask, ...props }: Props, ref: Ref<NativeTextInput>) => (
    <PhoneField
      // Force remount a PhoneField component to avoid crashes when mask changing
      key={mask}
      mask={mask}
      textFieldRef={ref}
      {...props}
    />
  ),
);
