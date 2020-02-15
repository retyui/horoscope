import crashlytics from '@react-native-firebase/crashlytics';
import React from 'react';
import { Button, Text, View } from 'react-native';

import SafeAreaView from '@/components/SafeAreaView';
import TopBar from '@/components/TopBar';
import { getApplicationName, getPlatformApiUrl } from '@/features/environment';
import { updateEnvs } from '@/features/environment/dynamicEnvs';
import { goBack } from '@/features/navigation';
import { openAlertAsync } from '@/utils/alert';

import Form from '../Form';
import QuickSignIn from '../QuickSignIn';
import styles from './styles';

const DevMenu = () => {
  return (
    <SafeAreaView>
      <TopBar title="Dev menu" />

      <View style={styles.root}>
        <Text>{`PLATFORM_API: ${getPlatformApiUrl()}`}</Text>

        {process.env.NODE_ENV === 'development' ? (
          // Available only for developers
          <QuickSignIn />
        ) : null}
        <Form
          initialApplicationName={getApplicationName()}
          initialPlatformApiUrl={getPlatformApiUrl()}
          onSubmit={async ({ applicationName, platformApiUrl }) => {
            await updateEnvs({ applicationName, platformApiUrl });
            const buttonName = await openAlertAsync(
              'Successfully updated',
              'You must close and open application to apply changes correctly',
              {
                back: {
                  text: 'Go back',
                },
                ok: {
                  text: 'Ok',
                },
              },
            );

            if (buttonName === 'back') {
              goBack();
            }
          }}
        />
        <View style={{ height: 20 }} />
        <Button title="Native crash" onPress={() => crashlytics().crash()} />
        <Button
          title="TypeError: obj.invalidFunction is not a function"
          onPress={() => {
            const obj = {};

            // @ts-ignore
            obj.invalidFunction();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default DevMenu;
