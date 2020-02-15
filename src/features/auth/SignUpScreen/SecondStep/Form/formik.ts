import { withFormik } from 'formik';
import { object } from 'yup';

import { emailValidation } from '@/features/users/validation';

import { EMAIL_KEY } from '../../fields';
import { Props, Values } from './types';

export const validation = {
  [EMAIL_KEY]: emailValidation,
};

export default withFormik<Props, Values>({
  mapPropsToValues: () => ({
    [EMAIL_KEY]: '',
  }),
  validationSchema: object().shape(validation),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.onSubmit(values);

    setSubmitting(false);
  },
});
