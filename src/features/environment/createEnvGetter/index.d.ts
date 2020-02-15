import { DynamicEnvs } from '../types';

declare function createEnvGetter(
  getDefaultValue: () => string | undefined,
  localAlias?: keyof DynamicEnvs,
): () => string;

export default createEnvGetter;
