import React, { ComponentProps } from 'react';

import AsyncActionButton from '@/components/AsyncActionButton';

import useStyles from './styles';

type Props = Omit<ComponentProps<typeof AsyncActionButton>, 'style'>;

const NextButton = (props: Props) => {
  const styles = useStyles();

  return <AsyncActionButton {...props} style={styles.root} />;
};

export default NextButton;
