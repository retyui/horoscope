import { mount, ReactWrapper } from 'enzyme';
import React, { ComponentProps } from 'react';

import delay from '@/testing/delay';

import {
  DEFAULT_STAGE,
  FAILURE_STAGE,
  LOADING_STAGE,
  SUCCESS_STAGE,
} from './consts';
import AsyncButton from './index';

const ButtonComponent = ({ children }: any) => children;
const ButtonContent = ({ children }: any) => children;

const requiredProps = {
  ButtonComponent,
  ButtonContent,
  isRunning: false,
  error: null,
  children: <i />,
};

const render = (props?: Partial<ComponentProps<typeof AsyncButton>>) =>
  mount(<AsyncButton {...requiredProps} {...props} />);

const getStage = (wrapper: ReactWrapper<any, any, any>) =>
  wrapper.find(ButtonContent).props().stage;

test('should become disabled when switched to loading state', () => {
  const wrapper = render();

  wrapper.setProps({ isRunning: true }).update();
  expect(wrapper.childAt(0).props().disabled).toBe(true);
});

test('should set loading state when isRunning is true', () => {
  const wrapper = render();

  wrapper.setProps({ isRunning: true }).update();
  expect(getStage(wrapper)).toBe(LOADING_STAGE);
});

test('should set success stage when switched from loading state without error', () => {
  const wrapper = render();

  wrapper.setProps({ isRunning: true }).update();
  expect(getStage(wrapper)).toBe(LOADING_STAGE);

  wrapper.setProps({ isRunning: false, error: null }).update();
  expect(getStage(wrapper)).toBe(SUCCESS_STAGE);
});

test('should set failure stage when switched from loading state with error', () => {
  const wrapper = render();

  wrapper.setProps({ isRunning: true }).update();
  expect(getStage(wrapper)).toBe(LOADING_STAGE);

  wrapper.setProps({ isRunning: false, error: new Error('Test') }).update();
  expect(getStage(wrapper)).toBe(FAILURE_STAGE);
});

test('should return from success to normal state after delay', async () => {
  const returnDelay = 50;
  const wrapper = render({ returnDelay });

  wrapper.setProps({ isRunning: true }).update();
  expect(getStage(wrapper)).toBe(LOADING_STAGE);

  wrapper.setProps({ isRunning: false, error: null }).update();
  expect(getStage(wrapper)).toBe(SUCCESS_STAGE);

  await delay(returnDelay);

  wrapper.update();
  expect(getStage(wrapper)).toBe(DEFAULT_STAGE);
});

test('should return from failure to normal state after delay', async () => {
  const returnDelay = 50;
  const wrapper = render({ returnDelay });

  wrapper.setProps({ isRunning: true }).update();
  expect(getStage(wrapper)).toBe(LOADING_STAGE);

  wrapper.setProps({ isRunning: false, error: new Error('Test') }).update();
  expect(getStage(wrapper)).toBe(FAILURE_STAGE);

  await delay(returnDelay);

  wrapper.update();
  expect(getStage(wrapper)).toBe(DEFAULT_STAGE);
});

test('should not switch from loading to any other state when still loading', () => {
  const wrapper = render({});

  wrapper.setProps({ isRunning: true }).update();
  expect(getStage(wrapper)).toBe(LOADING_STAGE);
  wrapper.setProps({ isRunning: true, error: new Error('Test') }).update();
  expect(getStage(wrapper)).toBe(LOADING_STAGE);
});

test('should not switch from success to default state when no meaningful props changed', () => {
  const wrapper = render({});

  wrapper.setProps({ isRunning: true }).update();
  expect(getStage(wrapper)).toBe(LOADING_STAGE);

  wrapper.setProps({ isRunning: false, error: null }).update();
  expect(getStage(wrapper)).toBe(SUCCESS_STAGE);

  wrapper.setProps({ size: 'm' }).update();
  expect(getStage(wrapper)).toBe(SUCCESS_STAGE);
});

test('should not switch from failure to default state when no meaningful props changed', () => {
  const wrapper = render({});

  wrapper.setProps({ isRunning: true }).update();
  expect(getStage(wrapper)).toBe(LOADING_STAGE);

  wrapper.setProps({ isRunning: false, error: new Error('Test') }).update();
  expect(getStage(wrapper)).toBe(FAILURE_STAGE);

  wrapper.setProps({ size: 'm' }).update();
  expect(getStage(wrapper)).toBe(FAILURE_STAGE);
});
