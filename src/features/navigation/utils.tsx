import React, { ComponentType } from 'react';

export const createDynamicScreen = (
  getterComponent: () => { default: ComponentType<any> },
) => {
  const { default: Component } = getterComponent();

  return (props: any) => <Component {...props} />;
};
