export type Values = {
  code: string;
};

export type Props = {
  onSubmit: (values: Values) => void;
  isRunning: boolean;
  error: Error | null;
};
