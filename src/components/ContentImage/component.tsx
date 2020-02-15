import React, { useState } from 'react';
import {
  Image as NativeImage,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { FastImageProperties } from 'react-native-fast-image';

import BaseImage from '@/components/Image';
import Text from '@/components/Text';

import useStyles from './styles';

type Props = {
  onReload: () => void;
} & FastImageProperties;

const ContentImage = ({ onError, style, onReload, ...rest }: Props) => {
  const styles = useStyles();
  const [hasError, setErrorFlag] = useState(false);
  const handlerOnError = () => {
    setErrorFlag(true);

    if (onError) {
      onError();
    }
  };

  return (
    <BaseImage {...rest} style={[styles.root, style]} onError={handlerOnError}>
      {hasError ? (
        <TouchableWithoutFeedback onPress={onReload}>
          <View style={styles.errorRoot}>
            <NativeImage source={require('./assets/reload.png')} />
            <Text style={styles.errorText}>Failed to load. Tap to refresh</Text>
          </View>
        </TouchableWithoutFeedback>
      ) : null}
    </BaseImage>
  );
};

export default ContentImage;
