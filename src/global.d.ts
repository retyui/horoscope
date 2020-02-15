type $AsyncReturnType<T extends (...args: any) => Promise<any>> = ReturnType<
  T
> extends Promise<infer R>
  ? R
  : any;
