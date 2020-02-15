import { mount } from 'enzyme';
import React, { ComponentProps } from 'react';

import { MockThemeProvider } from '@/testing/stylex';

import Text from './index';

const render = (props: ComponentProps<typeof Text>) =>
  mount(
    <MockThemeProvider>
      <Text {...props} />
    </MockThemeProvider>,
  );

it("shouldn't return null", () => {
  const wrapper = render({
    variant: 'caption',
    align: 'center',
  });

  expect(wrapper.children()).not.toBeNull();
});
