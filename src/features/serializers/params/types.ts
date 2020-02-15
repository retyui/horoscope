export type Options<T> = { defaultValue: T };

export type SerializerDescriptor<T> = {
  options?: Options<T>;
  parse(val: any): T;
  serialize(val: T): any;
};
