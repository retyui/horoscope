import { DynamicEnvs } from '../types';

/* istanbul ignore next */
const createEnvGetter = (
  getDefaultValue: () => string | undefined,
  localAlias?: keyof DynamicEnvs,
) => (): string => {
  const { getEnvs } = require('../dynamicEnvs');
  const localEnvs = getEnvs();
  const localEnvValue =
    // @ts-ignore
    localEnvs[localAlias];

  if (localEnvValue) {
    return localEnvValue;
  }

  return getDefaultValue() || '';
};

export default createEnvGetter;
