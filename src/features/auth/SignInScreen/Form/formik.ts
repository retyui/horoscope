import { fbt } from 'fbt';
import { withFormik } from 'formik';
import { object, string } from 'yup';

import { emailValidation } from '@/features/users/validation';

import { EMAIL_KEY, PASSWORD_KEY } from './consts/fields';
import { Props, Values } from './types';

export default withFormik<Props, Values>({
  mapPropsToValues: () => ({
    [EMAIL_KEY]: '',
    [PASSWORD_KEY]: '',
  }),
  validationSchema: object().shape({
    [EMAIL_KEY]: emailValidation,
    [PASSWORD_KEY]: string().required(
      fbt('Password is a required field', 'not empty error text'),
    ),
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.onSubmit(values);

    setSubmitting(false);
  },
});
