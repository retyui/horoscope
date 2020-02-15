import { createSafeAsyncFunction, createSafeFunction } from './index';

describe('createSafeAsyncFunction', () => {
  it('should not throw error', async () => {
    const safeAsyncFunction = createSafeAsyncFunction(async () => {
      throw new Error('Test');
    });

    await safeAsyncFunction();
  });
});

describe('createSafeFunction', () => {
  it('should not throw error', () => {
    const safeFunction = createSafeFunction(() => {
      throw new Error('Test');
    });

    safeFunction();
  });
});
