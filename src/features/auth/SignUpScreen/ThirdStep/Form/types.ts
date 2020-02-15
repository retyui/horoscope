export type Values = {
  phoneChunk: string;
  countryId: string;
};

export type SubmitValues = {
  phone: string;
};

export type Props = {
  onSubmit: (values: SubmitValues) => void;
  isRunning: boolean;
  error: Error | null;
};
