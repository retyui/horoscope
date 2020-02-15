import addSeconds from 'date-fns/addSeconds';
import { fbt, FbtParam } from 'fbt';
import React, { useState } from 'react';
import Countdown, { CountdownRenderProps } from 'react-countdown-now';

import Text from '@/components/Text';

import { RESEND_CODE_THROTTLE_IN_SECONDS } from '../consts';
import useStyles from './styles';

const formatTime = (time: number): string => `0${time}`.slice(-2);

type Props = {
  resendCode: () => void;
};

const Resend = ({ resendCode }: Props) => {
  const styles = useStyles();
  const [resendEnableDate, setValue] = useState(
    addSeconds(new Date(), RESEND_CODE_THROTTLE_IN_SECONDS),
  );

  const handleResendButtonClick = () => {
    resendCode();

    setValue(addSeconds(new Date(), RESEND_CODE_THROTTLE_IN_SECONDS));
  };

  const renderResend = ({
    completed,
    minutes,
    seconds,
  }: CountdownRenderProps) => {
    return completed ? (
      <Text style={styles.text} onPress={handleResendButtonClick}>
        <fbt desc="button text">Didn't get the code? Resend</fbt>
      </Text>
    ) : (
      <Text style={styles.text}>
        <fbt desc="button text">
          Resend code in
          <FbtParam name="time">
            <Text style={styles.throttleTime}>
              {formatTime(minutes)}:{formatTime(seconds)}
            </Text>
          </FbtParam>
        </fbt>
      </Text>
    );
  };

  return (
    <Countdown
      zeroPadTime={4}
      key={resendEnableDate.toString()}
      date={resendEnableDate}
      renderer={renderResend}
    />
  );
};

export default Resend;
