import { mount } from 'enzyme';
import React from 'react';

import useFieldNavigation from '../useFieldNavigation';

type HookReturnType = ReturnType<typeof useFieldNavigation>;
type Props = {
  onRender: (fn: HookReturnType) => void;
};

const TestComponent = ({ onRender }: Props) => {
  const fieldNavigation = useFieldNavigation();

  onRender(fieldNavigation);

  return null;
};

const render = (props: Props) => mount(<TestComponent {...props} />);

const renderOnce = (): Promise<HookReturnType> =>
  new Promise((resolve) =>
    render({
      onRender: (fieldNavigation: HookReturnType) => {
        resolve(fieldNavigation);
      },
    }),
  );

describe('returnKeyType', () => {
  it("should return 'done' when don't pass nextFieldName prop", async () => {
    const value = await renderOnce();

    expect(
      value({
        currentFiledName: 'email',
        nextFieldName: undefined,
      }).returnKeyType,
    ).toBe('done');
  });

  it("should return 'next' when don't pass nextFieldName prop", async () => {
    const value = await renderOnce();

    expect(
      value({
        currentFiledName: 'email',
        nextFieldName: 'password',
      }).returnKeyType,
    ).toBe('next');
  });
});

describe('onSubmitEditing', () => {
  it("should call '.focus()' when onSubmitEditing", async () => {
    const value = await renderOnce();

    const focus = jest.fn();
    const [filedName1, filedName2] = ['email', 'password'];
    const props1 = value({
      currentFiledName: filedName1,
      nextFieldName: filedName2,
    });
    const props2 = value({
      currentFiledName: filedName2,
      nextFieldName: undefined,
    });

    // @ts-ignore
    props2.ref.current = { focus };

    expect(focus).toHaveBeenCalledTimes(0);

    props1.onSubmitEditing();

    expect(focus).toHaveBeenCalledTimes(1);
  });

  it('should call any focus methods when ref not fount', async () => {
    const value = await renderOnce();

    const focus = jest.fn();
    const [filedName1, filedName2] = ['email', 'password'];

    const props1 = value({
      currentFiledName: filedName1,
      nextFieldName: filedName2,
    });

    const props2 = value({
      currentFiledName: filedName2,
      nextFieldName: undefined,
    });

    // @ts-ignore
    props1.ref.current = { focus };
    // @ts-ignore
    props2.ref.current = { focus };

    props2.onSubmitEditing();

    expect(focus).toHaveBeenCalledTimes(0);
  });
});

describe('onSubmitEditing', () => {
  it('should memoize onSubmitEditing handler', async () => {
    const value = await renderOnce();

    const params = { currentFiledName: 'email' };

    const { onSubmitEditing: onSubmitEditing1 } = value({ ...params });
    const { onSubmitEditing: onSubmitEditing2 } = value({ ...params });

    expect(onSubmitEditing1).toBe(onSubmitEditing2);
  });

  it('should memoize input ref object', async () => {
    const value = await renderOnce();

    const params = { currentFiledName: 'email' };

    const { ref: ref1 } = value({ ...params });
    const { ref: ref2 } = value({ ...params });

    expect(ref1).toBe(ref2);
  });
});
