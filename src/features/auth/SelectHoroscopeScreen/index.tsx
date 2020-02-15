import ViewPager from '@react-native-community/viewpager';
import { format } from 'date-fns';
import { fbt } from 'fbt';
import React from 'react';
import { View } from 'react-native';

import Button from '@/components/Button';
import SafeAreaView from '@/components/SafeAreaView';
import Text from '@/components/Text';

import data from './data';
import HoroscopeCard from './HoroscopeCard';
import useStyles from './styles';

const formatDateRange = ({ start, end }: { start: Date; end: Date }) =>
  `${format(start, 'dd MMMM')} — ${format(end, 'dd MMMM')}`;

const SelectHoroscope = () => {
  const styles = useStyles();

  return (
    <SafeAreaView style={styles.root}>
      <ViewPager initialPage={0} style={styles.pager}>
        {data.map(({ start, name, icon, end }, index) => (
          <View key={index} style={styles.pagerItem}>
            <HoroscopeCard
              iconSource={icon}
              name={name()}
              range={formatDateRange({ start, end })}
            />
          </View>
        ))}
      </ViewPager>
      <Text weight="800" style={styles.title}>
        <fbt desc="title text">Select Your Horoscope Sign</fbt>
      </Text>
      <Button variant="contained" style={styles.button}>
        <fbt desc="button text">Done</fbt>
      </Button>
    </SafeAreaView>
  );
};

export default SelectHoroscope;
