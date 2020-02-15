import React from 'react';
import { ActivityIndicator } from 'react-native';

import ButtonText from '@/components/ActionButton/ButtonText';
import { LOADING_STAGE } from '@/components/BaseAsyncButton/consts';
import { ButtonContentProps } from '@/components/BaseAsyncButton/types';
import { useTheme } from '@/features/styles';

const ButtonContent = ({ stage, children }: ButtonContentProps) => {
  const { palette } = useTheme();

  if (stage === LOADING_STAGE) {
    return <ActivityIndicator size="large" color={palette.text.primary} />;
  }

  return <ButtonText>{children}</ButtonText>;
};

export default ButtonContent;
