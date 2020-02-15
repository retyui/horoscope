import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';

import delay from '../../testing/delay';
import useAsyncCallback from '../useAsyncCallback';

const TestComponent = ({ asyncFn, onRender }) => {
  const [call, loading, payload, error] = useAsyncCallback(asyncFn);

  onRender({
    call,
    loading,
    payload,
    error,
  });

  return null;
};

const requiredProps = {
  asyncFn: async () => {},
};

const render = (props) =>
  mount(<TestComponent {...requiredProps} {...props} />);

describe('payload', () => {
  let value = {};
  const onRender = (v) => {
    value = v;
  };
  const asyncFn = jest.fn();

  render({
    asyncFn,
    onRender,
  });

  test('should return undefined when promise did not resolved', () => {
    expect(value.payload).toBeUndefined();
  });

  test('then should set payload prop when called async function was resolved', async () => {
    const result = { mur: 'Amur' };

    asyncFn.mockResolvedValueOnce(result);

    act(() => {
      value.call();
    });

    await delay(1);

    expect(value.payload).toBe(result);
  });
});

describe('call', () => {
  test('should call async function with passed arguments', async () => {
    let value = {};
    const onRender = (v) => {
      value = v;
    };
    const asyncFn = jest.fn().mockResolvedValueOnce(null);

    render({ asyncFn, onRender });

    expect(asyncFn).toHaveBeenCalledTimes(0);

    const args = [1, '2', true];

    act(() => {
      value.call(...args);
    });

    await delay(1);

    expect(asyncFn).toHaveBeenCalledTimes(1);
    expect(asyncFn).toHaveBeenCalledWith(...args);
  });
});

describe('error', () => {
  let value = {};
  const onRender = (v) => {
    value = v;
  };
  const asyncFn = jest.fn();

  render({ asyncFn, onRender });

  test('should return initial error value', () => {
    expect(value.error).toBe(null);
  });

  test('then should set error prop when called async function was rejected', async () => {
    const e = new Error('Test error');

    asyncFn.mockRejectedValueOnce(e);

    act(() => {
      value.call();
    });

    await delay(1);

    expect(value.error).toBe(e);
    expect(value.loading).toBe(false);
  });

  test('and finally when async function was resolver set error prop to null', async () => {
    const result = [6, 9];

    asyncFn.mockResolvedValue(result);

    expect(value.error).not.toBe(null);

    act(() => {
      value.call();
    });

    await delay(1);

    expect(value.error).toBe(null);
  });
});

describe('loading', () => {
  describe('positive way, when async function does not throw an error', () => {
    let value = {};
    const onRender = jest.fn((v) => {
      value = v;
    });
    const defaultValue = [1, 2, 3];

    render({ onRender, defaultValue });

    test('should return initial loading prop value', () => {
      expect(value.loading).toBe(false);
      expect(onRender).toHaveBeenCalledTimes(1);
    });

    test('should return initial loading prop value', () => {
      act(() => {
        value.call();
      });

      expect(value.loading).toBe(true);
      expect(onRender).toHaveBeenCalledTimes(2);
    });

    test('and when async function resolved should reset flat', async () => {
      await delay(0);

      expect(value.loading).toBe(false);
      expect(value.payload).not.toBe(defaultValue);
    });
  });

  describe('negative way, when async function throws an error', () => {
    let value = {};
    const asyncFn = jest.fn().mockRejectedValueOnce(new Error());
    const onRender = jest.fn((v) => {
      value = v;
    });

    render({ asyncFn, onRender });

    test('should return initial loading prop value', () => {
      expect(value.loading).toBe(false);
      expect(onRender).toHaveBeenCalledTimes(1);
    });

    test('should return initial loading prop value', () => {
      act(() => {
        value.call();
      });

      expect(value.loading).toBe(true);
      expect(onRender).toHaveBeenCalledTimes(2);
    });

    test('and when async function rejected should reset flat', async () => {
      await delay(0);

      expect(value.loading).toBe(false);
      expect(value.error).not.toBe(null);
    });
  });
});
