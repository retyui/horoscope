import { number, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';

import LargePageLink from './index';

const uri =
  'https://cdn.pixabay.com/photo/2017/04/03/15/52/love-you-2198772__340.png';
const longText =
  'Lorem ipsum dolor sit amet constructeur subtitle can have multiple lines can have multiple lines';
const description = longText.slice(0, 48);

storiesOf('page_link/large', module)
  .add('default', () => (
    <LargePageLink
      title={text('title', 'Title')}
      subTitle={text('subTitle', 'Subtitle')}
      description={text('text', description)}
      source={{ uri }}
      style={{ width: number('width', 333), height: number('height', 333) }}
    />
  ))
  .add('with long description', () => (
    <LargePageLink
      title={text('title', 'Title')}
      subTitle={text('subTitle', 'Subtitle')}
      description={text('text', longText)}
      source={{ uri }}
      style={{ width: number('width', 333), height: number('height', 333) }}
    />
  ))
  .add('with long sub title', () => (
    <LargePageLink
      title={text('title', 'Title')}
      subTitle={text('subTitle', longText)}
      description={text('text', description)}
      source={{ uri }}
      style={{ width: number('width', 333), height: number('height', 333) }}
    />
  ))
  .add('with long title', () => (
    <LargePageLink
      title={text('title', longText)}
      subTitle={text('subTitle', 'Subtitle')}
      description={text('text', description)}
      source={{ uri }}
      style={{ width: number('width', 333), height: number('height', 333) }}
    />
  ))
  .add('all texts are long', () => (
    <LargePageLink
      title={text('title', longText)}
      subTitle={text('subTitle', longText)}
      description={text('text', longText)}
      source={{ uri }}
      style={{ width: number('width', 333), height: number('height', 333) }}
    />
  ))
  .add('no subtitle', () => (
    <LargePageLink
      title={text('title', 'Title')}
      description={text('text', description)}
      source={{ uri }}
      style={{ width: number('width', 333), height: number('height', 333) }}
    />
  ))
  .add('no description', () => (
    <LargePageLink
      title={text('title', 'Title')}
      subTitle={text('subTitle', 'Subtitle')}
      source={{ uri }}
      style={{ width: number('width', 333), height: number('height', 333) }}
    />
  ))
  .add('no subtitle & description', () => (
    <LargePageLink
      title={text('title', 'Title')}
      source={{ uri }}
      style={{ width: number('width', 333), height: number('height', 333) }}
    />
  ))
  .add('no image', () => (
    <LargePageLink
      title={text('title', 'Title')}
      subTitle={text('subTitle', 'Subtitle')}
      description={text('text', description)}
      style={{ width: number('width', 333), height: number('height', 333) }}
    />
  ));
