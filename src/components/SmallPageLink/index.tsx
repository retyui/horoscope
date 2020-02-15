import React from 'react';
import { FastImageProperties } from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';

import ContentText from '@/components/ContentText';
import BaseImage from '@/components/Image';
import useValidTextColorStyle from '@/features/contentBlocks/hooks/useValidTextColorStyle';
import { Color } from '@/types/styles';

import useStyles from './styles';

type Props = {
  color?: Color;
  title: string;
  source?: FastImageProperties['source'] | null;
} & Omit<FastImageProperties, 'source'>;

const linearGradientProps = {
  colors: ['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)'],
  end: { x: 0, y: 1 },
  locations: [0.5, 1],
  start: { x: 0, y: 0 },
};

const MediumPageLink = ({ color, source, title, style, ...rest }: Props) => {
  const styles = useStyles();
  const hasImage = Boolean(source);
  const colorStyles = useValidTextColorStyle(color);

  return (
    <BaseImage
      {...rest}
      source={source}
      style={[styles.root, !hasImage && styles.noImageRoot, style]}
    >
      {hasImage ? (
        <LinearGradient
          {...linearGradientProps}
          pointerEvents="none"
          style={styles.gradientRoot}
        />
      ) : null}
      <ContentText
        numberOfLines={2}
        ellipsizeMode="tail"
        variant="h1"
        style={[styles.titleText, colorStyles]}
      >
        {title}
      </ContentText>
    </BaseImage>
  );
};

export default MediumPageLink;
