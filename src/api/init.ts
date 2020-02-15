import { getPlatformApiUrl } from '@/features/environment';

import APIGateway from './APIGateway';
import injectDeviceInfo from './interceptors/deviceInfo';
import resources from './resources';

const apiGateway = new APIGateway({
  host: getPlatformApiUrl(),
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

apiGateway.injectToResources(resources);

apiGateway.useInterceptor({
  stage: 'request',
  onFulfilled: injectDeviceInfo,
});

if (process.env.BUILD_ENV !== 'production') {
  const {
    subscribeOnUpdateEnvs,
  } = require('@/features/environment/dynamicEnvs');

  subscribeOnUpdateEnvs(() => {
    apiGateway.axios.defaults.baseURL = getPlatformApiUrl();
  });
}
