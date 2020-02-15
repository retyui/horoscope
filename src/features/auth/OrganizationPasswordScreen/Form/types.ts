export type Values = {
  password: string;
};

export type Props = {
  onSubmit: (values: Values) => void;
  isRunning: boolean;
  error: Error | null;
};
