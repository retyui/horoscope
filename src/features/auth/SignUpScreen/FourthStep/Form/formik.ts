import { withFormik } from 'formik';
import { object } from 'yup';

import { passwordValidation } from '@/features/users/validation';

import {
  EMAIL_KEY,
  FIRST_NAME_KEY,
  LAST_NAME_KEY,
  PASSWORD_KEY,
  PHONE_KEY,
} from '../../fields';
import { validation as fistStepValidation } from '../../FirstStep/Form/formik';
import { validation as secondStepValidation } from '../../SecondStep/Form/formik';
import { Props, Values } from './types';

export default withFormik<Props, Values>({
  mapPropsToValues: ({
    initialPhone = '',
    initialEmail = '',
    initialFirstName = '',
    initialLastName = '',
  }) => ({
    [PHONE_KEY]: initialPhone,
    [EMAIL_KEY]: initialEmail,
    [FIRST_NAME_KEY]: initialFirstName,
    [LAST_NAME_KEY]: initialLastName,
    [PASSWORD_KEY]: '',
  }),
  validationSchema: object().shape({
    ...fistStepValidation,
    ...secondStepValidation,
    [PASSWORD_KEY]: passwordValidation,
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.onSubmit(values);

    setSubmitting(false);
  },
});
