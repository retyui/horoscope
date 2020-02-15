import { identity, prop as ramdaProp, tryCatch } from 'ramda';

export const prop = (key: string) => (item: any) => {
  const value = ramdaProp(key, item);

  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    if (item !== null && value === undefined) {
      throw new Error(
        `[getItemPropById]: Couldn't get property '${key}' from ${tryCatch(
          JSON.stringify,
          identity(item),
        )(item, null, 2)}`,
      );
    }
  }

  return value;
};
