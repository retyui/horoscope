import { withFormik } from 'formik';
import { object, string } from 'yup';

import { APPLICATION_NAME_KEY, PLATFORM_API_URL_KEY } from './consts/fields';
import { Props, Values } from './types';

export default withFormik<Props, Values>({
  mapPropsToValues: ({ initialPlatformApiUrl, initialApplicationName }) => ({
    [PLATFORM_API_URL_KEY]: initialPlatformApiUrl,
    [APPLICATION_NAME_KEY]: initialApplicationName,
  }),
  validationSchema: object().shape({
    [PLATFORM_API_URL_KEY]: string()
      .required()
      .url()
      .trim(),
    [APPLICATION_NAME_KEY]: string()
      .required()
      .trim(),
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.onSubmit(values);

    setSubmitting(false);
  },
});
