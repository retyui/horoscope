import { withFormik } from 'formik';
import { object } from 'yup';

import { deviceCountryId } from '@/features/countriesPhoneCodes/consts/device';
import { getInternationalPhone } from '@/features/countriesPhoneCodes/utils';
import { getPhoneValidation } from '@/features/users/validation';

import { PHONE_KEY } from '../../fields';
import { COUNTRY_ID_KEY, PHONE_CHUNK_KEY } from './consts/fields';
import { Props, Values } from './types';

export const validation = {
  [PHONE_CHUNK_KEY]: getPhoneValidation({ countryIdKey: COUNTRY_ID_KEY }),
};

export default withFormik<Props, Values>({
  mapPropsToValues: () => ({
    [PHONE_CHUNK_KEY]: '',
    [COUNTRY_ID_KEY]: deviceCountryId,
  }),
  validationSchema: object().shape(validation),
  handleSubmit: ({ countryId, phoneChunk }, { props, setSubmitting }) => {
    props.onSubmit({
      [PHONE_KEY]: getInternationalPhone(countryId, phoneChunk),
    });

    setSubmitting(false);
  },
});
