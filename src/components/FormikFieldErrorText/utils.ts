import { FormikErrors, FormikTouched } from 'formik';

type Options<Values> = {
  fields: Array<keyof Values>;
  errors: FormikErrors<Values>;
  touched: FormikTouched<Values>;
};

export const extractErrorMessageFromFields = <Values>({
  fields,
  touched,
  errors,
}: Options<Values>): string | null => {
  for (const fieldName of fields) {
    const isTouched = touched[fieldName];
    const errorMessage = errors[fieldName];

    if (isTouched && errorMessage) {
      // @ts-ignore
      return errorMessage;
    }
  }

  return null;
};
