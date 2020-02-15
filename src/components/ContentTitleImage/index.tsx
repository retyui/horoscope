import React, { ComponentProps } from 'react';
import LinearGradient from 'react-native-linear-gradient';

import ContentText from '@/components/ContentText';
import BaseImage from '@/components/Image';
import useValidTextColorStyle from '@/features/contentBlocks/hooks/useValidTextColorStyle';
import { Color } from '@/types/styles';

import useStyles from './styles';

type Props = {
  title: string;
  color?: Color;
} & ComponentProps<typeof BaseImage>;

const linearGradientProps = {
  colors: [
    'rgba(0,0,0,0.6)',
    'rgba(0,0,0,0)',
    'rgba(0,0,0,0)',
    'rgba(0,0,0,0.5)',
  ],
  end: { x: 0, y: 1 },
  locations: [0, 0.3, 0.8, 1],
  start: { x: 0, y: 0 },
};

const ContentTitleImage = ({ color, title, ...rest }: Props) => {
  const styles = useStyles();
  const colorStyle = useValidTextColorStyle(color);

  return (
    <BaseImage {...rest}>
      <LinearGradient {...linearGradientProps} style={styles.gradientRoot} />
      <ContentText variant="h1" style={[styles.titleText, colorStyle]}>
        {title}
      </ContentText>
    </BaseImage>
  );
};

export default ContentTitleImage;
