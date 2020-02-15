import React, {
  ComponentProps,
  ComponentType,
  forwardRef,
  Ref,
  RefAttributes,
} from 'react';
import { StatusBar, ViewStyle } from 'react-native';
import BaseSafeAreaView from 'react-native-safe-area-view';

import { useTheme } from '@/features/styles';
import { getBarStyleByBackgroundColor } from '@/features/styles/utils/statusBar';
import concatStyles from '@/utils/style/concatStyles';

import useStyles from './styles';
import { shouldAddStatusBarPadding } from './utils';

type Props = ComponentProps<typeof BaseSafeAreaView>;

const SafeAreaView = (
  { style, forceInset, ...props }: Props,
  ref: Ref<any>,
) => {
  const styles = useStyles();
  const theme = useTheme();
  const { primary } = theme.palette.background;

  return (
    <>
      <BaseSafeAreaView
        {...props}
        ref={ref}
        forceInset={forceInset}
        style={concatStyles<ViewStyle>(
          styles.root,
          shouldAddStatusBarPadding(forceInset) && styles.statusBarPadding,
          style,
        )}
      />
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={getBarStyleByBackgroundColor(primary)}
      />
    </>
  );
};

// @ts-ignore
const WrappedSafeAreaView: ComponentType<Props &
  RefAttributes<BaseSafeAreaView>> = forwardRef(SafeAreaView);

export default WrappedSafeAreaView;
