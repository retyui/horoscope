import ViewPager from '@react-native-community/viewpager';
import { fbt } from 'fbt';
import React from 'react';
import { View } from 'react-native';

import Button from '@/components/Button';
import SafeAreaView from '@/components/SafeAreaView';
import Text from '@/components/Text';

import data from './data';
import HoroscopeCard from './HoroscopeCard';
import useStyles from './styles';

const SelectHoroscope = () => {
  const styles = useStyles();

  return (
    <SafeAreaView style={styles.root}>
      <ViewPager initialPage={0} style={styles.pager}>
        {data.map((item, index) => (
          <View key={index} style={styles.pagerItem}>
            <HoroscopeCard
              iconSource={item.icon}
              name={item.name()}
              range="x --- x"
            />
          </View>
        ))}
      </ViewPager>
      <Text weight="800" style={styles.title}>
        <fbt desc="title text">Select Your Horoscope </fbt>
        {'\n'}
        <fbt desc="title text">Sign</fbt>
      </Text>
      <Button variant="contained" style={styles.button}>
        <fbt desc="button text">Done</fbt>
      </Button>
    </SafeAreaView>
  );
};

export default SelectHoroscope;
