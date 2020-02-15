import { StackActions } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/routers';

import { getNavigatorInstance } from './instance';

type NavigationBackActionPayload = any;
type NavigationDispatch = any;
type NavigationNavigateActionPayload = any;
type NavigationPushAction = any;
type NavigationPushActionPayload = any;
type NavigationSetParamsActionPayload = any;

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
  const action = CommonActions.navigate({ ...options, routeName });

  dispatch(action);
};

export const goBack = () => {
  const dispatch = getDispatch();
  const action = CommonActions.goBack();

  dispatch(action);
};

export const setParams = (options: NavigationSetParamsActionPayload) => {
  const dispatch = getDispatch();
  const action = CommonActions.setParams(options);

  dispatch(action);
};
