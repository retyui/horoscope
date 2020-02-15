export type Values = {
  first_name: string;
  last_name: string;
};

export type Props = {
  onSubmit: (values: Values) => void;
};
