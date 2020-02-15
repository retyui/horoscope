import { fbt } from 'fbt';
import { withFormik } from 'formik';
import { object, string } from 'yup';

import { PASSWORD_KEY } from './consts/fields';
import { Props, Values } from './types';

export default withFormik<Props, Values>({
  mapPropsToValues: () => ({
    [PASSWORD_KEY]: '',
  }),
  validationSchema: object().shape({
    [PASSWORD_KEY]: string().required(
      fbt('Password is a required field', 'not empty error text'),
    ),
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.onSubmit(values);

    setSubmitting(false);
  },
});
