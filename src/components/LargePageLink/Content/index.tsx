import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import ArrowRight from '@/components/ArrowRight';
import ContentText from '@/components/ContentText';
import {
  MAX_CONTENT_TEXT_LENGTH,
  MAX_SUBTITLE_LENGTH,
} from '@/components/LargePageLink/consts';
import useValidTextColorStyle from '@/features/contentBlocks/hooks/useValidTextColorStyle';
import { Color } from '@/types/styles';
import { truncate } from '@/utils/string';

import useStyles from './styles';
import { ContentProps } from './types';

type Props = ContentProps & {
  color?: Color;
  showArrow: boolean;
  style?: StyleProp<ViewStyle>;
};

const Content = ({
  color,
  showArrow,
  style,
  title,
  subTitle,
  description,
}: Props) => {
  const styles = useStyles();
  const colorStyle = useValidTextColorStyle(color);

  return (
    <View style={style} pointerEvents="none">
      <View style={styles.titleRoot}>
        <ContentText
          style={[styles.titleText, colorStyle]}
          numberOfLines={2}
          ellipsizeMode="tail"
          variant="h1"
        >
          {title}
        </ContentText>
        {showArrow ? (
          <ArrowRight style={[styles.icon, { tintColor: colorStyle.color }]} />
        ) : null}
      </View>
      {subTitle ? (
        <ContentText style={[styles.subTitleText, colorStyle]} variant="body">
          {truncate(subTitle, MAX_SUBTITLE_LENGTH)}
        </ContentText>
      ) : null}
      {description ? (
        <ContentText style={[styles.text, colorStyle]} variant="body">
          {truncate(description, MAX_CONTENT_TEXT_LENGTH)}
        </ContentText>
      ) : null}
    </View>
  );
};

export default Content;
