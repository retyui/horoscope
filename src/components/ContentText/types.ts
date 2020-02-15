import { ComponentProps } from 'react';

import BaseText from '@/components/Text';

export type Props = {
  children: string;
  variant?: 'h1' | 'body';
  fontStyle?: 'italic' | 'normal';
} & Omit<ComponentProps<typeof BaseText>, 'variant'>;
