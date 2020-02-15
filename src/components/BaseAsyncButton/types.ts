import { ComponentType } from 'react';

export type ButtonStage = 'default' | 'loading' | 'success' | 'failure';

export type ButtonContentProps = {
  stage: ButtonStage;
  children: any;
};

export type DefaultProps = {
  returnDelay?: number;
  disabled?: boolean;
};

export type Props = DefaultProps & {
  ButtonComponent: ComponentType<any>;
  ButtonContent: ComponentType<any>;
  error: Error | null;
  isRunning: boolean;
  children: any;
};
