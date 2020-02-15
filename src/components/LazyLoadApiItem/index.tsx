import React, { ComponentProps } from 'react';

import LazyLoad from '@/components/LazyLoad';

type Props = {
  alreadyInStore: boolean;
} & ComponentProps<typeof LazyLoad>;

const LazyLoadApiItem = ({ alreadyInStore, children, ...props }: Props) => {
  if (alreadyInStore) {
    return children;
  }

  return <LazyLoad {...props}>{children}</LazyLoad>;
};

export default LazyLoadApiItem;
