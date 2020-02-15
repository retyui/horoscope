import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';

import TextInput from './index';

storiesOf('TextInput', module).add('default', () => (
  <TextInput placeholder={text('placeholder', 'Placeholder text')} />
));
