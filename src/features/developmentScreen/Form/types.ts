export type Values = {
  applicationName: string;
  platformApiUrl: string;
};

export type Props = {
  onSubmit: (values: Values) => void;
  initialPlatformApiUrl: string;
  initialApplicationName: string;
};
