import { number, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';

import ContentTitleImage from './index';

storiesOf('content_block/image-title', module)
  .add('default', () => (
    <ContentTitleImage
      title={text('title', 'Title')}
      source={{
        uri:
          'https://cdn.pixabay.com/photo/2017/04/03/15/52/love-you-2198772__340.png',
      }}
      style={{
        width: number('width', 333),
        height: number('height', 333),
      }}
    />
  ))
  .add('no image', () => (
    <ContentTitleImage
      title={text('title', 'Title')}
      style={{
        width: number('width', 333),
        height: number('height', 333),
      }}
    />
  ));
