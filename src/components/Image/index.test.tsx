import { shallow } from 'enzyme';
import React from 'react';

import Component from './index';

const render = () => shallow(<Component />);

it("shouldn't return null", () => {
  const wrapper = render();

  expect(wrapper.children()).not.toBeNull();
});
