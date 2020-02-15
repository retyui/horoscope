import { AxiosRequestConfig } from 'axios';
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

import { getApplicationName } from '@/features/environment';

const injectDeviceInfo = async (requestConfig: AxiosRequestConfig) => {
  const params = {
    'x-application-name': getApplicationName(),
    'x-operating-system': Platform.OS,
    'x-device-id': await DeviceInfo.getUniqueId(),
    'x-device-model': await DeviceInfo.getModel(),
    'x-app-version': await DeviceInfo.getVersion(),
    'x-app-build-number': await DeviceInfo.getBuildNumber(),
    'x-device-name': await DeviceInfo.getDeviceName(),
  };

  const newRequestConfig = {
    ...requestConfig,
    headers: { ...requestConfig.headers, ...params },
  };

  return newRequestConfig;
};

export default injectDeviceInfo;
