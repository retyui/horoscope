import { fbt } from 'fbt';
import { withFormik } from 'formik';
import { object, string } from 'yup';

import { FIRST_NAME_KEY, LAST_NAME_KEY } from '../../fields';
import { Props, Values } from './types';

export const validation = {
  [LAST_NAME_KEY]: string().required(
    fbt('Last name is a required field', 'not empty error text'),
  ),
  [FIRST_NAME_KEY]: string().required(
    fbt('First name is a required field', 'not empty error text'),
  ),
};

export default withFormik<Props, Values>({
  mapPropsToValues: () => ({
    [FIRST_NAME_KEY]: '',
    [LAST_NAME_KEY]: '',
  }),
  validationSchema: object().shape(validation),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.onSubmit(values);

    setSubmitting(false);
  },
});
