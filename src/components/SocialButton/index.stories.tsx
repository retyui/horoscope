import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';

import SocialButton from './index';

storiesOf('content_block/link-social', module)
  .add('list', () => (
    <>
      <SocialButton
        label={text('label-instagram', 'Follow me on Instagram')}
        icon="instagram"
      />
      <SocialButton
        label={text('label-twitter', 'Follow on Twitter')}
        icon="twitter"
      />
      <SocialButton
        label={text('label-facebook', 'Like my page on Facebook')}
        icon="facebook"
      />
    </>
  ))
  .add('instagram', () => (
    <SocialButton
      label={text('label', 'Follow me on Instagram')}
      icon="instagram"
    />
  ))
  .add('twitter', () => (
    <SocialButton label={text('label', 'Follow on Twitter')} icon="twitter" />
  ))
  .add('facebook', () => (
    <SocialButton
      label={text('label', 'Like my page on Facebook')}
      icon="facebook"
    />
  ));
