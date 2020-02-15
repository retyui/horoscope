export const createSafeFunction = <Args extends Array<any>>(
  fn: (...args: Args) => void,
) => (...args: Args) => {
  try {
    fn(...args);
  } catch {}
};

export const createSafeAsyncFunction = <Args extends Array<any>>(
  fn: (...args: Args) => Promise<any>,
) => async (...args: Args): Promise<void> => {
  try {
    await fn(...args);
  } catch {}
};
