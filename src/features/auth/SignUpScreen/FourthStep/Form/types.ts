import { SignUpRequest } from '../../../types';

export type Values = SignUpRequest;

export type Props = {
  onSubmit: (values: Values) => void;
  isRunning: boolean;
  error: Error | null;
  initialPhone?: Values['phone'];
  initialEmail?: Values['email'];
  initialFirstName?: Values['first_name'];
  initialLastName?: Values['last_name'];
};
