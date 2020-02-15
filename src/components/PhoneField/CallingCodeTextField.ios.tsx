import React from 'react';
import { TextInput } from 'react-native';

import TextField from '@/components/TextField';

class ClickableTextField extends TextInput {
  _onPress = (event: any) => {
    const {
      // @ts-ignore
      onPress,
      editable,
    } = this.props;

    if (onPress) {
      onPress(event);
    }

    if (editable || editable === undefined) {
      this.focus();
    }
  };
}

const CallingCodeTextField = (props: any) => (
  <TextField Component={ClickableTextField} {...props} />
);

export default CallingCodeTextField;
