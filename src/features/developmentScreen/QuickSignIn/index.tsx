import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';

import FieldHelperText from '@/components/FieldHelperText';

import { DEFAULT_PASSWORD, DEV_TEAM_EMAILS } from './consts';
import getErrorMessage from './errorAdapter';
import useQuickLogin from './hooks/useQuickLogin';
import styles, { ACTIVITY_INDICATOR_SIZE } from './styles';

const QuickLogin = () => {
  const [quickLogin, isRunning, _, error] = useQuickLogin();

  return (
    <>
      <FieldHelperText hasError style={styles.errors}>
        {getErrorMessage(error)}
      </FieldHelperText>

      {DEV_TEAM_EMAILS.map((email) => (
        <TouchableOpacity
          key={email}
          style={styles.credentialsItem}
          onPress={() => {
            if (!isRunning) {
              quickLogin({
                email,
                password: DEFAULT_PASSWORD,
              });
            }
          }}
        >
          <Text>Email: {email}</Text>
          <Text>Password: {DEFAULT_PASSWORD}</Text>
        </TouchableOpacity>
      ))}

      {isRunning ? (
        <ActivityIndicator
          style={styles.activityIndicator}
          size={ACTIVITY_INDICATOR_SIZE}
          color="red"
        />
      ) : null}
    </>
  );
};

export default QuickLogin;
