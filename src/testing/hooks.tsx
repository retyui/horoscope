import { mount } from 'enzyme';
import React, { ComponentType } from 'react';

type Options = {
  WrapperComponent?: ComponentType<any>;
};

export const renderHook = (
  callHookFn: Function,
  { WrapperComponent }: Options = {},
) => {
  const result = { current: null };
  const TestComponent = (props: {}) => {
    result.current = callHookFn(props);

    return null;
  };
  const RootComponent = (props: any) =>
    WrapperComponent ? (
      <WrapperComponent>
        <TestComponent {...props} />
      </WrapperComponent>
    ) : (
      <TestComponent {...props} />
    );

  const wrapper = mount(<RootComponent />);

  return {
    result,
    wrapper,
  };
};
