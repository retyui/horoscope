import { fbt, FbtParam } from 'fbt';
import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';

import BackButton from '@/components/BackButton';
import DismissKeyboardView from '@/components/DismissKeyboardView';
import SafeAreaView from '@/components/SafeAreaView';
import Text from '@/components/Text';
import useLogout from '@/features/auth/hooks/useLogout';
import Logo from '@/features/currentCompany/Logo';
import { getCurrentCompanyName } from '@/features/currentCompany/selectors';
import { useSelector } from '@/redux/hooks';

import Form from './Form';
import useConfirmOrganizationPassword from './hooks/useConfirmOrganizationPassword';
import useStyles from './styles';

const isIOS = Platform.OS === 'ios';

/*
 * This `View` wrapper need to fix bug on iOS (SafeAreaView + KeyboardAvoidingView)
 * When keyboard appear `<Text/>` jump without animation
 */
const ViewFixIos = View;

const OrganizationPassword = () => {
  const styles = useStyles();
  const onPress = useLogout();

  const companyName = useSelector(getCurrentCompanyName);
  const [onSubmit, isRunning, error] = useConfirmOrganizationPassword();

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        enabled={isIOS}
        behavior="padding"
        style={styles.avoidingView}
      >
        <DismissKeyboardView style={styles.root}>
          <Logo />
          <ViewFixIos>
            <Text style={styles.title} align="center">
              <fbt desc="title text">
                Please enter the password for your organization.
              </fbt>
            </Text>
            <Text style={styles.description} align="center">
              <fbt desc="description text">
                To view this exclusive info, please enter the password for{' '}
                <FbtParam name="companyName">{companyName}</FbtParam>
              </fbt>
            </Text>
          </ViewFixIos>
          <Form onSubmit={onSubmit} error={error} isRunning={isRunning} />
          <BackButton onPress={onPress} style={styles.backButton} />
        </DismissKeyboardView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OrganizationPassword;
