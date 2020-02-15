import { Platform } from 'react-native';
import { Client, Configuration } from 'rollbar-react-native';

import {
  getRollbarClientAccessToken,
  getRollbarSourceMapsVersion,
} from '@/features/environment';

export const getConfig = () => {
  const token = getRollbarClientAccessToken();
  const codeVersion = getRollbarSourceMapsVersion();
  const enabled = Boolean(token);
  const config = new Configuration(token, {
    enabled,
    environment: process.env.BUILD_ENV,
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      client: {
        javascript: {
          source_map_enabled: true,
          code_version: codeVersion,
        },
      },
    },
  });

  config.setPlatform(Platform.OS);

  return config;
};

let currentClient: Client | null = null;

export const createInstance = () => {
  try {
    if (!currentClient) {
      const config = getConfig();

      currentClient = new Client(config);

      /*
        The `.error(...)` method would be called when:
        1) captured unhandled Promise rejections
        2) captured uncaught exceptions

        And to avoid runtime exception this was patched

        Links:
        https://github.com/rollbar/rollbar-react-native/blob/3fae06f583ca3bb5e882e18cd26ee0e9df41d008/src/Rollbar.js#L35-L39
        https://github.com/rollbar/rollbar-react-native/blob/3fae06f583ca3bb5e882e18cd26ee0e9df41d008/src/Rollbar.js#L52

      */

      const { error: originalErrorMethod } = currentClient;

      // @ts-ignore
      currentClient.error = (...args) => {
        try {
          originalErrorMethod.apply(currentClient, args);
        } catch {
          // ignore errors
        }
      };
    }

    return currentClient;
  } catch {
    return null;
  }
};
