import { fbt } from 'fbt';
import React from 'react';
import { View } from 'react-native';
import { LoginManager, AccessToken } from 'react-native-fbsdk';

import Button from '@/components/Button';
import EllipseIcon from '@/components/EllipseIcon';
import SafeAreaView from '@/components/SafeAreaView';
import Text from '@/components/Text';

import useStyles from './styles';
import { pushToSelectHoroscopeScreen } from '@/features/auth/navigation';

const Welcome = () => {
  const styles = useStyles();

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.innerRoot}>
        <EllipseIcon />
        <Text weight="800" style={styles.welcomeMsg}>
          <fbt desc="Welcome msg">{`Welcome To \n Horoscope Premium`}</fbt>
        </Text>
      </View>
      <Button
        variant="contained"
        onPress={() => {
          LoginManager.logInWithPermissions(['public_profile']).then(
            (result) => {
              if (result.isCancelled) {
                console.log('Login cancelled');
              } else {
                console.log(
                  'Login success with permissions: ' +
                    result.grantedPermissions.toString(),
                );
                AccessToken.getCurrentAccessToken().then((data) => {
                  console.log(data.accessToken.toString());
                });
              }
            },
            function(error) {
              console.log('Login fail with error: ' + error);
            },
          );
        }}
      >
        <fbt desc="button text">Sign up with Facebook</fbt>
      </Button>
      <Button
        onPress={pushToSelectHoroscopeScreen}
        variant="outlined"
        style={styles.manuallyBtn}
      >
        <fbt desc="button text">Select your Zodiac Manually</fbt>
      </Button>
    </SafeAreaView>
  );
};

export default Welcome;
