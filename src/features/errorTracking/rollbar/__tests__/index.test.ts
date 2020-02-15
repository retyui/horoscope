import { NativeModules } from 'react-native';

import { APPLICATION_NAME_KEY } from '../../consts/extraParams';
import {
  trackException,
  unSafeClearPerson,
  unSafeSetPerson,
  unSafeTrackException,
} from '../index';

describe('setPerson', () => {
  it('should call rollbar method', async () => {
    const [id, name, email] = ['id', 'name', 'email'];
    const rollbarMock = {
      setPerson: jest.fn(),
    };

    await unSafeSetPerson(
      // @ts-ignore
      rollbarMock,
      { id, name, email },
    );

    expect(rollbarMock.setPerson).toHaveBeenCalledWith(id, name, email);
  });
});

describe('setPerson', () => {
  it('should call .clearPerson method without args', async () => {
    const rollbarMock = {
      clearPerson: jest.fn(),
    };

    await unSafeClearPerson(
      // @ts-ignore
      rollbarMock,
    );

    expect(rollbarMock.clearPerson).toHaveBeenCalledTimes(1);
  });
});

describe('trackException', () => {
  it("should not failed with error when can't create Rollbar instance", async () => {
    const error = new Error('test');
    const init = jest.fn(() => {
      throw new Error('init error');
    });

    NativeModules.RollbarReactNative.init = init;

    expect(init).toHaveBeenCalledTimes(0);

    await trackException(error);

    expect(init).toHaveBeenCalledTimes(1);

    NativeModules.RollbarReactNative.init = () => {};
  });

  it('should call .error method with extra params', async () => {
    const rollbarMock = { error: jest.fn((_err, _extra, cb) => cb()) };
    const error = new Error('test');
    const AppName = 'AppName';

    process.env.APPLICATION_NAME = AppName;

    await unSafeTrackException(
      // @ts-ignore
      rollbarMock,
      error,
    );

    expect(rollbarMock.error).toHaveBeenCalledWith(
      error,
      {
        [APPLICATION_NAME_KEY]: AppName,
      },
      expect.any(Function),
    );
  });
});
