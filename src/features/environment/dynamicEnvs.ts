import AsyncStorage from '@react-native-community/async-storage';

import { DynamicEnvs } from './types';

const ASYNC_STORAGE_KEY = `DYNAMIC_APPLICATION_ENVS`;

let memoryEnvs: Partial<DynamicEnvs> = {};
const onChangeHandlers: { [unicKey: string]: () => void } = {};

const setMemoryEnvs = (newEnvs: Partial<DynamicEnvs>) => {
  memoryEnvs = {
    ...memoryEnvs,
    ...newEnvs,
  };

  [...Object.values(onChangeHandlers)].forEach((callback) => callback());
};

export const restoreStoredEnvs = async (): Promise<void> => {
  try {
    const result = await AsyncStorage.getItem(ASYNC_STORAGE_KEY);
    // @ts-ignore
    const { platformApiUrl } = JSON.parse(result);

    setMemoryEnvs({ platformApiUrl });
  } catch {}
};

export const updateEnvs = async ({ platformApiUrl }: DynamicEnvs) => {
  await AsyncStorage.setItem(
    ASYNC_STORAGE_KEY,
    JSON.stringify({
      platformApiUrl,
    }),
  );

  await restoreStoredEnvs();
};

export const subscribeOnUpdateEnvs = (fn: () => void) => {
  const key = Math.random().toString();

  onChangeHandlers[key] = fn;

  return () => {
    delete onChangeHandlers[key];
  };
};

export const getEnvs = () => ({ ...memoryEnvs });
