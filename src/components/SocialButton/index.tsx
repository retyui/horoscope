import React from 'react';
import { Image, StyleProp, View, ViewStyle } from 'react-native';

import ArrowRight from '@/components/ArrowRight';
import ContentText from '@/components/ContentText';
import TouchableOpacity from '@/components/TouchableOpacity';
import concatStyles from '@/utils/style/concatStyles';

import useStyles from './styles';

const iconsMap = {
  yelp: require('./assets/yelp.png'),
  instagram: require('./assets/instagram.png'),
  twitter: require('./assets/twitter.png'),
  facebook: require('./assets/facebook.png'),
  pinterest: require('./assets/pinterest.png'),
};

const defaultIcon = require('./assets/link.png');

type Props = {
  onPress?: () => void;
  label: string;
  icon?: null | keyof typeof iconsMap;
  style?: StyleProp<ViewStyle>;
};

const SocialButton = ({ onPress, label, icon, style }: Props) => {
  const styles = useStyles();
  const iconSource = (icon && iconsMap[icon]) || defaultIcon;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={concatStyles<ViewStyle>(styles.root, style)}>
        <Image source={iconSource} style={styles.socialIcon} />
        <ContentText variant="body" style={styles.text}>
          {label}
        </ContentText>
        <ArrowRight style={styles.arrowIcon} />
      </View>
    </TouchableOpacity>
  );
};

export default SocialButton;
