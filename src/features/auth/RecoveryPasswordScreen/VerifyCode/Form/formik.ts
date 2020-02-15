import { withFormik } from 'formik';

import { CODE_KEY } from './fields';
import { Props, Values } from './types';

export default withFormik<Props, Values>({
  mapPropsToValues: () => ({
    [CODE_KEY]: '',
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.onSubmit(values);

    setSubmitting(false);
  },
});
