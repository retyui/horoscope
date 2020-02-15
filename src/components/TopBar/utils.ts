import { lt, path, pipe } from 'ramda';

export const canGoBack: (nav: any) => boolean = (navigation) =>
  pipe(
    // @ts-ignore
    path(['state', 'index']),
    lt(0),
  )(navigation.dangerouslyGetParent());
