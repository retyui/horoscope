import { number, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';

import MediumPageLink from './index';

const uri =
  'https://cdn.pixabay.com/photo/2017/04/03/15/52/love-you-2198772__340.png';

storiesOf('page_link/medium', module)
  .add('default', () => (
    <MediumPageLink
      title={text('title', 'Title')}
      source={{ uri }}
      style={{
        width: number('width', 157),
      }}
    />
  ))
  .add('long title', () => (
    <MediumPageLink
      title={text('title', 'Title text very long long long long')}
      source={{ uri }}
      style={{
        width: number('width', 157),
      }}
    />
  ))
  .add('no image', () => (
    <MediumPageLink
      title={text('title', 'Title')}
      style={{
        width: number('width', 157),
      }}
    />
  ));
