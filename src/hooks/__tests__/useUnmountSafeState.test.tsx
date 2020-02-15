import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';

import useUnmountSafeState from '../useUnmountSafeState';

const TestComponent = ({ initialState, onRender }: any) => {
  const [state, setState] = useUnmountSafeState(initialState);

  onRender({
    state,
    setState,
  });

  return null;
};

const render = (props: any) => mount(<TestComponent {...props} />);

describe('payload', () => {
  let value: any = {};
  const onRender = (v: any) => {
    value = v;
  };
  const initialState = null;
  const nextStateValue = 123;

  const wrapper = render({
    onRender,
    initialState,
  });

  test('should call setState when component was mounted', () => {
    expect(value.state).toBe(initialState);

    act(() => value.setState(nextStateValue));

    wrapper.update();

    expect(value.state).toBe(nextStateValue);
  });

  test('then when a component was unmounted setState never can be called', () => {
    expect(value.state).toBe(nextStateValue);

    wrapper.unmount();

    const newValue = 987;

    act(() => value.setState(newValue));

    expect(value.state).toBe(nextStateValue);
  });
});
