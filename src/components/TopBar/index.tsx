import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';

import BackButton from '@/components/BackButton';
import TopTitle from '@/components/TopBar/TopTitle';
import { goBack } from '@/features/navigation';
import concatStyles from '@/utils/style/concatStyles';

import useStyles from './styles';
import { canGoBack } from './utils';

type Props = {
  rightButton?: any;
  leftButton?: any;
  title?: string;
  style?: StyleProp<ViewStyle>;
  forceBackButton?: boolean;
};

const TopBar = ({
  style,
  rightButton,
  leftButton,
  title,
  forceBackButton,
}: Props) => {
  const styles = useStyles();
  const navigation = useNavigation();
  const showBackButton = forceBackButton || canGoBack(navigation);

  return (
    <>
      <View style={concatStyles<ViewStyle>(styles.root, style)}>
        {leftButton || showBackButton ? <BackButton onPress={goBack} /> : null}
        {rightButton}
      </View>
      <TopTitle>{title}</TopTitle>
    </>
  );
};

export default TopBar;
