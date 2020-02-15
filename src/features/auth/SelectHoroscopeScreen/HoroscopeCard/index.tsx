import React from 'react';
import { Image, View } from 'react-native';

import Text from '@/components/Text';

import useStyles from './styles';

type Props = {
  iconSource: any;
  name: string;
  range: string;
};

const HoroscopeCard = ({ iconSource, name, range }: Props) => {
  const styles = useStyles();

  return (
    <>
      <View style={styles.iconRoot}>
        <Image source={iconSource} style={styles.icon} />
      </View>
      <Text weight="800" style={styles.name}>
        {name}
      </Text>
      <Text weight="600" style={styles.range}>
        {range}
      </Text>
    </>
  );
};

export default HoroscopeCard;
