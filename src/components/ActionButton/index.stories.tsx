import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';

import Button from './index';

storiesOf('content_block/link-cta', module).add('default', () => (
  <Button>{text('label', 'Action button')}</Button>
));
