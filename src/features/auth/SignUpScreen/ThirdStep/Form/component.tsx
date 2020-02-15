import { fbt } from 'fbt';
import { FormikProps } from 'formik';
import React, { useCallback } from 'react';

import FormikFieldErrorText from '@/components/FormikFieldErrorText';
import FormikPhoneField from '@/components/FormikPhoneField';
import { getCountryName } from '@/features/countriesPhoneCodes/consts/countries';
import { goToSelectCountry } from '@/features/countriesPhoneCodes/navigation';
import { CountryId } from '@/features/countriesPhoneCodes/types';
import useKeyboardDismiss from '@/hooks/useKeyboardDismiss';

import NextButton from '../../NextButton';
import SelectCountryButton from '../SelectCountryButton';
import { COUNTRY_ID_KEY, PHONE_CHUNK_KEY } from './consts/fields';
import getErrorMessage from './errorAdapter';
import { Props, Values } from './types';

const fields = [PHONE_CHUNK_KEY];

const SecondStepForm = ({
  handleSubmit,
  isRunning,
  error,
  values: { [COUNTRY_ID_KEY]: countryId },
  setFieldValue,
}: Props & FormikProps<Values>) => {
  const onPressSubmitButton = useKeyboardDismiss(handleSubmit);
  const onPress = useCallback(
    () =>
      goToSelectCountry({
        onSelect: (newCountryId: CountryId) => {
          setFieldValue(COUNTRY_ID_KEY, newCountryId);
        },
      }),
    [setFieldValue],
  );

  return (
    <>
      <SelectCountryButton
        placeholder={fbt('Select country', 'default button text')}
        value={getCountryName(countryId)}
        onPress={onPress}
      />

      <FormikPhoneField
        autoFocus
        phoneFieldName={PHONE_CHUNK_KEY}
        countryFieldName={COUNTRY_ID_KEY}
        returnKeyType="done"
        onSubmitEditing={handleSubmit}
      />

      <FormikFieldErrorText fields={fields} variant="afterTextField">
        {getErrorMessage(error)}
      </FormikFieldErrorText>

      <NextButton
        isRunning={isRunning}
        error={error}
        onPress={onPressSubmitButton}
      >
        <fbt desc="button text">Continue</fbt>
      </NextButton>
    </>
  );
};

export default SecondStepForm;
