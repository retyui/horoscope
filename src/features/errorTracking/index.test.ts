import {
  createErrorBoundary,
  createErrorBoundaryAsync,
  createSagaErrorBoundary,
} from './index';

describe('createErrorBoundary', () => {
  it("shouldn't throw errors", async () => {
    const fn = () => {
      throw new Error('Test');
    };

    const wrappedFn = createErrorBoundary(fn);

    await wrappedFn();
  });
});

describe('createErrorBoundaryAsync', () => {
  it("shouldn't throw errors", async () => {
    const fn = async () => {
      throw new Error('Test');
    };

    const wrappedFn = createErrorBoundaryAsync(fn);

    await wrappedFn();
  });
});

describe('createSagaErrorBoundary', () => {
  it("shouldn't throw errors", () => {
    function* saga() {
      const err = yield;

      throw new Error(err);
    }

    const wrappedSaga = createSagaErrorBoundary(saga);

    const it = wrappedSaga();

    it.next();
    it.next();

    expect(it.next().done).toBeTruthy();
  });
});
