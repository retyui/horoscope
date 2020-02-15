import React, { ComponentProps } from 'react';

import Text from '@/components/Text';

import useStyles from './styles';

type Props = {
  variant?: 'afterTextField';
  hasError?: boolean;
} & Omit<ComponentProps<typeof Text>, 'variant'>;

const FieldHelperText = ({ variant, style, hasError, ...props }: Props) => {
  const styles = useStyles();

  return (
    <Text
      {...props}
      style={[
        styles.root,
        hasError && styles.hasError,
        variant && styles[variant],
        style,
      ]}
      variant="caption"
    />
  );
};

export default FieldHelperText;
