import { FormikProps } from 'formik';
import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';

import FormikFieldErrorText from '@/components/FormikFieldErrorText';

import { PLATFORM_API_URL_KEY } from './consts/fields';
import styles from './styles';
import { Props, Values } from './types';

const fields = [PLATFORM_API_URL_KEY];

const EnvsForm = ({
  handleSubmit,
  setFieldValue,
  isValid,
  values,
}: Props & FormikProps<Values>) => (
  <>
    <View style={styles.rowRoot}>
      <Text style={styles.rowTitle}>Platform API:</Text>
      <TextInput
        multiline
        style={[styles.input, styles.apiInput]}
        placeholder="API host:"
        value={values[PLATFORM_API_URL_KEY]}
        onChangeText={(text) => setFieldValue(PLATFORM_API_URL_KEY, text)}
      />
    </View>

    <FormikFieldErrorText fields={fields} />
    <Button disabled={!isValid} title="Apply changes" onPress={handleSubmit} />
  </>
);

export default EnvsForm;
