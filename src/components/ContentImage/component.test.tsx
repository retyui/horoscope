import { shallow } from 'enzyme';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';

import BaseImage from '@/components/Image';

import Component from './component';

const defaultProps = { onReload: () => {} };

const render = (props?: any) =>
  shallow(<Component {...defaultProps} {...props} />);

const simulateError = (wrapper: any, error?: any) =>
  wrapper
    .find(BaseImage)
    .props()
    .onError(error);

const simulatePressToErrorMessage = (wrapper: any) =>
  wrapper
    .find(TouchableWithoutFeedback)
    .props()
    .onPress();

const errorMessageExists = (wrapper: any) =>
  wrapper.find(TouchableWithoutFeedback).exists();

it('should call onError without argument when loading image failed', () => {
  const onError = jest.fn();
  const wrapper = render({ onError });
  const error = { some: 'data' };

  expect(onError).toHaveBeenCalledTimes(0);

  simulateError(wrapper, error);

  expect(onError).toHaveBeenCalledTimes(1);
  expect(onError).toHaveBeenCalledWith();
});

it('should render error message when loading image failed', () => {
  const wrapper = render();

  expect(errorMessageExists(wrapper)).toBeFalsy();

  simulateError(wrapper);

  expect(errorMessageExists(wrapper)).toBeTruthy();
});

it('should call onReload when press to error message', () => {
  const onReload = jest.fn();
  const wrapper = render({ onReload });

  expect(onReload).toHaveBeenCalledTimes(0);

  simulateError(wrapper);
  simulatePressToErrorMessage(wrapper);

  expect(onReload).toHaveBeenCalledTimes(1);
});
