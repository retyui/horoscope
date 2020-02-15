import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';

import ContentText from './index';

storiesOf('content_block/text-*', module)
  .add('text_h1', () => (
    <ContentText variant="h1">{text('children', 'Title text')}</ContentText>
  ))
  .add('text_body_regular', () => (
    <ContentText variant="body">
      {text(
        'children',
        'Lorem ipsum dolor sit amet constructeur subtitle can have multiple lines',
      )}
    </ContentText>
  ))
  .add('text_body_center_italics', () => (
    <ContentText variant="body" align="center" fontStyle="italic">
      {text('children', '“Don’t wait for the opportunity. Create it.”')}
    </ContentText>
  ));
