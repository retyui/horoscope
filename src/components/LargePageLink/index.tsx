import React, { ComponentProps } from 'react';
import LinearGradient from 'react-native-linear-gradient';

import BaseImage from '@/components/Image';
import { useTheme } from '@/features/styles';
import { Color } from '@/types/styles';

import Content from './Content';
import { ContentProps } from './Content/types';
import useStyles from './styles';

type Props = {
  color?: Color;
  showArrow?: boolean;
} & ContentProps &
  ComponentProps<typeof BaseImage>;

const linearGradientProps = {
  colors: ['rgba(0,0,0,0)', 'rgba(0,0,0,0.8)'],
  end: { x: 0, y: 1 },
  locations: [0.4, 1],
  start: { x: 0, y: 0 },
};

const PageLinkImageLarge = ({
  source,
  title,
  subTitle,
  description,
  style,
  showArrow = false,
  color,
  ...rest
}: Props) => {
  const styles = useStyles();
  const theme = useTheme();
  const hasImage = Boolean(source);
  const propsSource = hasImage
    ? { source }
    : {
        source: require('./assets/mask.png'),
        tintColor: theme.palette.accent.contrastText,
      };

  return (
    <BaseImage {...rest} {...propsSource} style={[styles.root, style]}>
      {hasImage ? (
        <LinearGradient
          {...linearGradientProps}
          pointerEvents="none"
          style={styles.gradientRoot}
        />
      ) : null}
      <Content
        color={color}
        showArrow={showArrow}
        title={title}
        subTitle={subTitle}
        description={description}
        style={styles.contentRoot}
      />
    </BaseImage>
  );
};

export default PageLinkImageLarge;
