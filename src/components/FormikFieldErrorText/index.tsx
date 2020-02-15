import { useFormikContext } from 'formik';
import React, { ComponentProps } from 'react';

import FieldHelperText from '@/components/FieldHelperText';

import { extractErrorMessageFromFields } from './utils';

type Props = {
  fields: Array<string>;
} & Omit<ComponentProps<typeof FieldHelperText>, 'hasError'>;

const FormikFieldErrorText = ({ fields, children, ...props }: Props) => {
  const { touched, errors } = useFormikContext<any>();

  return (
    <FieldHelperText {...props} hasError>
      {extractErrorMessageFromFields<any>({
        fields,
        touched,
        errors,
      }) || children}
    </FieldHelperText>
  );
};

export default FormikFieldErrorText;
