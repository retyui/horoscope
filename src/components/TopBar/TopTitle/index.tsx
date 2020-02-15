import React, { ComponentProps } from 'react';

import Text from '@/components/Text';

import useStyles from './styles';

type Props = ComponentProps<typeof Text> & { children: any };

const TopTitle = ({ style, ...props }: Props) => {
  const styles = useStyles();

  return <Text {...props} style={[styles.root, style]} />;
};

export default TopTitle;
