import { number } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';

import ContentImage from './index';

storiesOf('content_block/image_large', module)
  .add('default', () => (
    <ContentImage
      source={{
        uri:
          'https://cdn.pixabay.com/photo/2017/04/03/15/52/love-you-2198772__340.png',
      }}
      style={{
        width: number('width', 300),
        height: number('height', 300),
      }}
    />
  ))
  .add('error', () => (
    <ContentImage
      source={{
        uri:
          'https://cdn.pixabay.com/photo/2017/04/03/15/52/love-you-2198772__340.png2',
      }}
      style={{
        width: number('width', 300),
        height: number('height', 300),
      }}
    />
  ));
