export type Values = {
  new_password: string;
  confirm_new_password: string;
};

export type Props = {
  onSubmit: (values: Values) => void;
  isRunning: boolean;
  error: Error | null;
};
