import React, { ComponentProps, ComponentType } from 'react';

import BaseAsyncButton from '@/components/BaseAsyncButton';
import BaseButton from '@/components/BaseButton';

import ButtonContent from './ButtonContent';

type Props = {
  ButtonComponent?: ComponentType<any>;
  ButtonContent?: ComponentType<any>;
} & Omit<
  ComponentProps<typeof BaseAsyncButton>,
  'ButtonComponent' | 'ButtonContent'
> &
  ComponentProps<typeof BaseButton>;

const AsyncActionButton = (props: Props) => (
  <BaseAsyncButton
    ButtonContent={ButtonContent}
    ButtonComponent={BaseButton}
    {...props}
  />
);

export default AsyncActionButton;
