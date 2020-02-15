import React, { ComponentProps, useState } from 'react';

import { randomString } from '@/utils/random';

import BaseContentImage from './component';

type Props = Omit<ComponentProps<typeof BaseContentImage>, 'onReload'>;

const ContentImage = (props: Props) => {
  const [forceRenderKey, setReRenderKey] = useState('');
  const handlerOnPress = () => {
    setReRenderKey(randomString());
  };

  return (
    <BaseContentImage
      {...props}
      key={forceRenderKey}
      onReload={handlerOnPress}
    />
  );
};

export default ContentImage;
