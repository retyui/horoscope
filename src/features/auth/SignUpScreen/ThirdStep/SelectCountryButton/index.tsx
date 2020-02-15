import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

import Text from '@/components/Text';

import useStyles from './styles';

type Props = {
  placeholder: string;
  value?: string | null;
  onPress: () => void;
};

const SelectCountryButton = ({ placeholder, value, onPress }: Props) => {
  const styles = useStyles();
  const hasValue = Boolean(value);

  return (
    <TouchableOpacity onPress={onPress} style={styles.root}>
      <Text style={[styles.text, hasValue && styles.textWithValue]}>
        {hasValue ? value : placeholder}
      </Text>
      <Image style={styles.icon} source={require('./assets/Arrow.png')} />
    </TouchableOpacity>
  );
};

export default SelectCountryButton;
