import { StyleProp, ViewStyle } from 'react-native';

export type Values = {
  email: string;
  password: string;
};

export type Props = {
  style: StyleProp<ViewStyle>;
  onSubmit: (values: Values) => void;
  isRunning: boolean;
  error: Error | null;
};
