import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import Text from '@/components/Text';
import concatStyles from '@/utils/style/concatStyles';

import useStyles from './styles';

type Props = {
  children?: any;
  Icon: any;
  title: string;
  subTitle?: string;
  style?: StyleProp<ViewStyle>;
};

const BaseMessage = ({ style, Icon, title, subTitle, children }: Props) => {
  const styles = useStyles();

  return (
    <View style={concatStyles<ViewStyle>(styles.root, style)}>
      {Icon}
      <Text style={styles.title}>{title}</Text>
      {subTitle ? <Text style={styles.subTitle}>{subTitle}</Text> : null}

      {children ? <View style={styles.spaces} /> : null}

      {children}
    </View>
  );
};

export default BaseMessage;
