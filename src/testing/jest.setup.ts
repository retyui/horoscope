/* eslint-disable no-undef */
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { NativeModules } from 'react-native';

configure({ adapter: new Adapter() });

NativeModules.RNCAsyncStorage = {};
NativeModules.RollbarReactNative = {
  init: () => {},
  deviceAttributes: () => '{}',
};

jest.mock('@react-native-firebase/app', () => ({}));
jest.mock('@react-native-firebase/crashlytics', () => {
  jest.fn(() => ({
    recordError: jest.fn(),
    setUserEmail: jest.fn().mockResolvedValue(null),
    setUserId: jest.fn().mockResolvedValue(null),
    setUserName: jest.fn().mockResolvedValue(null),
    setAttribute: jest.fn().mockResolvedValue(null),
  }));
});
