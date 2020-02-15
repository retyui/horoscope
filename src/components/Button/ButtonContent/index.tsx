import React from 'react';
import { ActivityIndicator } from 'react-native';

import { LOADING_STAGE } from '@/components/BaseAsyncButton/consts';
import { ButtonContentProps } from '@/components/BaseAsyncButton/types';
import { useTheme } from '@/features/styles';

import ButtonText from '../ButtonText';

const ButtonContent = ({ variant, stage, children }: ButtonContentProps) => {
  const { palette } = useTheme();

  if (stage === LOADING_STAGE) {
    return <ActivityIndicator size="large" color={palette.text.primary} />;
  }

  return <ButtonText variant={variant}>{children}</ButtonText>;
};

export default ButtonContent;
