import { withFormik } from 'formik';
import { object } from 'yup';

import { emailValidation } from '@/features/users/validation';

import { EMAIL_KEY } from './consts/fields';
import { Props, Values } from './types';

export default withFormik<Props, Values>({
  mapPropsToValues: () => ({
    [EMAIL_KEY]: '',
  }),
  validationSchema: object().shape({
    [EMAIL_KEY]: emailValidation,
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.onSubmit(values);

    setSubmitting(false);
  },
});