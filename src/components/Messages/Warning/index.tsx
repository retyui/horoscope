import React, { ComponentProps } from 'react';
import { Image } from 'react-native';

import BaseMessage from '../Base';
import useStyles from './styles';

type Props = Omit<ComponentProps<typeof BaseMessage>, 'Icon'>;

const WarningMessage = (props: Props) => {
  const styles = useStyles();

  return (
    <BaseMessage
      {...props}
      Icon={
        <Image style={styles.icon} source={require('../assets/warning.png')} />
      }
    />
  );
};

export default WarningMessage;
