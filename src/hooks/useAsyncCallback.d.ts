declare function useAsyncCallback<Return>(
  fn: () => Promise<Return>,
  deps: Array<any>,
): [() => void, boolean, Return | undefined, Error | null];

declare function useAsyncCallback<Return, Arg1>(
  fn: (arg1: Arg1) => Promise<Return>,
  deps: Array<any>,
): [(arg1: Arg1) => void, boolean, Return | undefined, Error | null];

declare function useAsyncCallback<Return, Arg1, Arg2>(
  fn: (arg1: Arg1, arg2: Arg2) => Promise<Return>,
  deps: Array<any>,
): [
  (arg1: Arg1, arg2: Arg2) => void,
  boolean,
  Return | undefined,
  Error | null,
];

declare function useAsyncCallback<Return, Arg1, Arg2, Arg3>(
  fn: (arg1: Arg1, arg2: Arg2, arg3: Arg3) => Promise<Return>,
  deps: Array<any>,
): [
  (arg1: Arg1, arg2: Arg2, arg3: Arg3) => void,
  boolean,
  Return | undefined,
  Error | null,
];

export default useAsyncCallback;
