import React, { ComponentProps, forwardRef, Ref, useCallback } from 'react';
import { TextInput as NativeTextInput } from 'react-native';

import PhoneField from '@/components/PhoneField';
import {
  getCountryCallingCode,
  getPhoneMaskByCountryId,
} from '@/features/countriesPhoneCodes/consts/countries';
import { goToSelectCountry } from '@/features/countriesPhoneCodes/navigation';
import useReactNativeTextField from '@/utils/formik/useReactNativeTextField';

type Props = {
  countryFieldName: string;
  phoneFieldName: string;
} & Omit<
  ComponentProps<typeof PhoneField>,
  'value' | 'onChangeText' | 'onPressCode' | 'callingCode' | 'mask'
>;

const FormikPhoneField = (
  { countryFieldName, phoneFieldName, ...props }: Props,
  ref: Ref<NativeTextInput>,
) => {
  const [
    { value: countryId, onChangeText: setCountryId },
  ] = useReactNativeTextField(countryFieldName);
  const [
    { value: phoneNumber, onChangeText: setPhoneNumber, onBlur },
  ] = useReactNativeTextField(phoneFieldName);
  const onPressCode = useCallback(
    () => goToSelectCountry({ onSelect: setCountryId }),
    [setCountryId],
  );
  const handleOnChangeText = useCallback(
    (masked: string, unmasked?: string) => setPhoneNumber(unmasked || masked),
    [setPhoneNumber],
  );

  return (
    <PhoneField
      ref={ref}
      value={phoneNumber}
      onBlur={onBlur}
      onChangeText={handleOnChangeText}
      onPressCode={onPressCode}
      callingCode={getCountryCallingCode(countryId)}
      mask={getPhoneMaskByCountryId(countryId)}
      {...props}
    />
  );
};

export default forwardRef(FormikPhoneField);
