import { renderHook } from '@/testing/hooks';
import { createMockProvider, createMockReduxStore } from '@/testing/redux';

import { useSelector } from './index';

describe('useSelector', () => {
  it('should call selector with state and deps', () => {
    const selector = jest.fn();
    const state = { any: 'data' };
    const store = createMockReduxStore({ getState: () => state });
    const deps = [1, 2];

    renderHook(
      () =>
        useSelector(
          selector,
          // @ts-ignore
          deps,
        ),
      {
        WrapperComponent: createMockProvider(store),
      },
    );

    expect(selector).toHaveBeenCalledWith(state, ...deps);
  });

  it('should return selector result', () => {
    const selectorResult = 'MurAmur';
    const selector = jest.fn().mockReturnValue(selectorResult);
    const store = createMockReduxStore();

    const { result } = renderHook(() => useSelector(selector), {
      WrapperComponent: createMockProvider(store),
    });

    expect(result.current).toBe(selectorResult);
  });

  describe('memoization', () => {
    it('should not call selector when selector dependencies do not changed', () => {
      const selector = jest.fn();
      const store = createMockReduxStore();
      const defaultSelectorDeps = [1, 2];

      const { wrapper } = renderHook(
        ({ selectorDeps }: any) =>
          useSelector(selector, selectorDeps || defaultSelectorDeps),
        {
          WrapperComponent: createMockProvider(store),
        },
      );

      const CALL_COUNT = 2;

      expect(selector).toHaveBeenCalledTimes(CALL_COUNT);

      wrapper
        .setProps({ selectorDeps: [1, 2] })
        .setProps({ selectorDeps: [1, 2] })
        .setProps({ selectorDeps: [1, 2] })
        .update();

      expect(selector).toHaveBeenCalledTimes(CALL_COUNT);
    });

    it('should call selector when selector dependencies was changed', () => {
      const selector = jest.fn();
      const store = createMockReduxStore();
      const defaultSelectorDeps = [1, 2];

      const { wrapper } = renderHook(
        ({ selectorDeps }: any) =>
          useSelector(selector, selectorDeps || defaultSelectorDeps),
        {
          WrapperComponent: createMockProvider(store),
        },
      );

      const CALL_COUNT = 2;

      expect(selector).toHaveBeenCalledTimes(CALL_COUNT);

      wrapper.setProps({ selectorDeps: [6, 9] });

      expect(selector).toHaveBeenCalledTimes(CALL_COUNT + 1);
    });
  });
});
