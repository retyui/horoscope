import React, { Component } from 'react';
import {
  Animated,
  LayoutChangeEvent,
  StyleProp,
  TextStyle,
} from 'react-native';

import styles from './styles';
import { getScaleDiff } from './utils';

type Props = {
  isExpand: boolean;
  style?: StyleProp<TextStyle>;
};

type State = {
  offsetX: number;
};

const { Text, Value, timing } = Animated;

const inputRange = [0, 1];
const scaleRatio = 0.75;
const offsetY = -20;

const getValue = (isExpand: boolean) => (isExpand ? 1 : 0);

class AnimatedLabel extends Component<Props, State> {
  state = { offsetX: 0 };

  animation = new Value(getValue(this.props.isExpand));

  scale = this.animation.interpolate({
    inputRange,
    outputRange: [1, scaleRatio],
  });

  translateY = this.animation.interpolate({
    inputRange,
    outputRange: [0, offsetY],
  });

  handlerOnLayout = ({
    nativeEvent: {
      layout: { width },
    },
  }: LayoutChangeEvent) => {
    this.setState(() => ({ offsetX: -getScaleDiff(width, scaleRatio) }));
  };

  animateLabel() {
    const { isExpand } = this.props;

    timing(this.animation, {
      duration: 200,
      toValue: getValue(isExpand),
      useNativeDriver: true,
    }).start();
  }

  componentDidUpdate(prevProps: Props) {
    const { isExpand } = this.props;

    if (isExpand !== prevProps.isExpand) {
      this.animateLabel();
    }
  }

  render() {
    const { style, ...props } = this.props;
    const { offsetX } = this.state;

    const translateX = this.animation.interpolate({
      inputRange,
      outputRange: [0, offsetX],
    });

    const transformStyle = {
      transform: [
        { translateY: this.translateY },
        { translateX },
        { scale: this.scale },
      ],
    };

    return (
      <Text
        {...props}
        onLayout={this.handlerOnLayout}
        style={[style, styles.root, transformStyle]}
      />
    );
  }
}

export default AnimatedLabel;
