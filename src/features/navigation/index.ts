import {
  NavigationActions,
  NavigationBackActionPayload,
  NavigationDispatch,
  NavigationNavigateActionPayload,
  NavigationPushAction,
  NavigationPushActionPayload,
  NavigationSetParamsActionPayload,
  StackActions,
} from 'react-navigation';

import { getNavigatorInstance } from './instance';

export const getDispatch = (): NavigationDispatch => {
  const navigator = getNavigatorInstance();

  if (navigator) {
    // @ts-ignore
    return navigator.dispatch;
  }

  throw new Error("Couldn't extract navigator instance");
};

export const push = (
  routeName: string,
  options?: Omit<NavigationPushActionPayload, 'routeName'>,
) => {
  const dispatch = getDispatch();
  const action: NavigationPushAction = StackActions.push({
    routeName,
    ...options,
  });

  dispatch(action);
};

export const navigateTo = (
  routeName: string,
  options?: Omit<NavigationNavigateActionPayload, 'routeName'>,
) => {
  const dispatch = getDispatch();
  const action = NavigationActions.navigate({ ...options, routeName });

  dispatch(action);
};

export const goBack = (options?: NavigationBackActionPayload) => {
  const dispatch = getDispatch();
  const action = NavigationActions.back(options);

  dispatch(action);
};

export const setParams = (options: NavigationSetParamsActionPayload) => {
  const dispatch = getDispatch();
  const action = NavigationActions.setParams(options);

  dispatch(action);
};
