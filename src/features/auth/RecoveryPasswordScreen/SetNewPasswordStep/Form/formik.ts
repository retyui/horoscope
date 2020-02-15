import { fbt } from 'fbt';
import { withFormik } from 'formik';
import { object, string } from 'yup';

import { passwordValidation } from '@/features/users/validation';

import { CONFIRM_NEW_PASSWORD_KEY, NEW_PASSWORD } from './fields';
import { Props, Values } from './types';

export default withFormik<Props, Values>({
  mapPropsToValues: () => ({
    [NEW_PASSWORD]: '',
    [CONFIRM_NEW_PASSWORD_KEY]: '',
  }),
  validationSchema: object().shape({
    [NEW_PASSWORD]: passwordValidation,
    [CONFIRM_NEW_PASSWORD_KEY]: string()
      .required(fbt('Confirm your new password', 'not empty error text'))
      .test(
        'check passwords',
        fbt("The passwords you entered don't match", 'error text').toString(),
        function(confirmNewPassword) {
          const { [NEW_PASSWORD]: newPassword } = this.parent;

          return newPassword === confirmNewPassword;
        },
      ),
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.onSubmit(values);

    setSubmitting(false);
  },
});
