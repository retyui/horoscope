import { createRef, RefObject, useRef } from 'react';

type RefsMap = {
  [filedName: string]: InputRef;
};

type HandlersMap = {
  [filedName: string]: () => void;
};

type Options = {
  currentFiledName: string;
  nextFieldName?: string;
};

type InputRef = RefObject<{ focus: () => void }>;

type Props = {
  ref: RefObject<any>;
  onSubmitEditing: () => void;
  returnKeyType: 'next' | 'done';
};

const useFieldNavigation = () => {
  const fieldsRefMap = useRef<RefsMap>({});
  const handlerOnSubmitEditingMapRef = useRef<HandlersMap>({});

  const fieldNavigation = ({
    currentFiledName,
    nextFieldName,
  }: Options): Props => {
    const { current: handlers } = handlerOnSubmitEditingMapRef;
    const { current: refs } = fieldsRefMap;

    if (!refs[currentFiledName]) {
      refs[currentFiledName] = createRef();
    }

    if (!handlers[currentFiledName]) {
      handlers[currentFiledName] = () => {
        const nextFieldRef = nextFieldName && refs[nextFieldName];

        if (nextFieldRef && nextFieldRef.current) {
          nextFieldRef.current.focus();
        }
      };
    }

    return {
      ref: refs[currentFiledName],
      returnKeyType: nextFieldName ? 'next' : 'done',
      onSubmitEditing: handlers[currentFiledName],
    };
  };

  return fieldNavigation;
};

export default useFieldNavigation;
