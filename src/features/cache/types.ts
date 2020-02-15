import AsyncStorage from '@react-native-community/async-storage';

export type Storage = Pick<
  typeof AsyncStorage,
  'getAllKeys' | 'getItem' | 'multiGet' | 'multiRemove' | 'multiSet' | 'setItem'
>;

export interface AbstractStorage<T> {
  type: string;
  setItems(item: Array<T>): Promise<void>;
  setStorage(storage: Storage): void;
  cleanAll(): Promise<void>;
  cleanUp(options: { days: number }): Promise<void>;
}
