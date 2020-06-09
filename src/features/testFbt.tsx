import React from 'react';
import { fbt, FbtPlural } from 'fbt';

const getLikeCount = () => Math.random();
const getPhotoCount = () => Math.random();

export default () => {
  return (
    <fbt desc="test plural">
      You have
      <FbtPlural
        count={getLikeCount()}
        name="number of likes"
        showCount="ifMany"
        many="likes"
      >
        a like
      </FbtPlural>
      on your
      <FbtPlural count={getPhotoCount()} showCount="no">
        photo
      </FbtPlural>.
    </fbt>
  );
};
