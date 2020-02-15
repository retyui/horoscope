import React, {
  ComponentProps,
  forwardRef,
  Ref,
  useCallback,
  useState,
} from 'react';
import {
  StyleProp,
  TextInput as NativeTextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import concatStyles from '@/utils/style/concatStyles';

import AnimatedLabel from './AnimatedLabel';
import useStyles from './styles';

type Props = {
  rootStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  Component?: ComponentProps<any>;
} & Omit<
  ComponentProps<typeof NativeTextInput>,
  'placeholderTextColor' | 'style'
>;

const TextField = (
  {
    Component = NativeTextInput,
    onBlur,
    onFocus,
    value,
    placeholder,
    rootStyle,
    inputStyle,
    ...props
  }: Props,
  ref: Ref<NativeTextInput>,
) => {
  const [isFocused, setFlag] = useState(false);
  const styles = useStyles();

  const handleOnFocus = useCallback(
    (event) => {
      setFlag(true);

      if (onFocus) {
        onFocus(event);
      }
    },
    [onFocus],
  );
  const handleOnBlur = useCallback(
    (event) => {
      setFlag(false);

      if (onBlur) {
        onBlur(event);
      }
    },
    [onBlur],
  );

  return (
    <View style={concatStyles<ViewStyle>(styles.rootStyle, rootStyle)}>
      <AnimatedLabel
        style={styles.labelText}
        isExpand={isFocused || Boolean(value)}
      >
        {placeholder}
      </AnimatedLabel>
      <Component
        {...props}
        ref={ref}
        value={value}
        onBlur={handleOnBlur}
        onFocus={handleOnFocus}
        style={concatStyles<TextStyle>(styles.inputStyle, inputStyle)}
      />
    </View>
  );
};

export default forwardRef(TextField);
