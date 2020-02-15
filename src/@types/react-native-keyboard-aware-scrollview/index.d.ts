/// <reference types="react-native" />

declare module 'react-native-keyboard-aware-scrollview' {
  import * as React from 'react';
  import {
    ScrollViewProps,
    FlatListProps,
    SectionListProps,
  } from 'react-native';

  interface KeyboardAwareProps {
    innerRef?: (ref: JSX.Element) => void;
    viewIsInsideTabBar?: boolean;
    resetScrollToCoords?: {
      x: number;
      y: number;
    };
    enableResetScrollToCoords?: boolean;
    enableAutomaticScroll?: boolean;
    enableOnAndroid?: boolean;
    extraHeight?: number;
    extraScrollHeight?: number;
    keyboardOpeningTime?: number;
    onKeyboardWillShow?: (frames: Object) => void;
    onKeyboardDidShow?: (frames: Object) => void;
    onKeyboardWillHide?: (frames: Object) => void;
    onKeyboardDidHide?: (frames: Object) => void;
    onKeyboardWillChangeFrame?: (frames: Object) => void;
    onKeyboardDidChangeFrame?: (frames: Object) => void;
  }

  interface KeyboardAwareScrollViewProps
    extends KeyboardAwareProps,
      ScrollViewProps {}
  interface KeyboardAwareFlatListProps<ItemT>
    extends KeyboardAwareProps,
      FlatListProps<ItemT> {}
  interface KeyboardAwareSectionListProps<ItemT>
    extends KeyboardAwareProps,
      SectionListProps<ItemT> {}

  interface KeyboardAwareState {
    keyboardSpace: number;
  }

  declare class ScrollableComponent<P, S> extends React.Component<P, S> {
    getScrollResponder: () => void;
    scrollToPosition: (x: number, y: number, animated?: boolean) => void;
    scrollToEnd: (animated?: boolean) => void;
    scrollForExtraHeightOnAndroid: (extraHeight: number) => void;
    scrollToFocusedInput: (
      reactNode: Object,
      extraHeight?: number,
      keyboardOpeningTime?: number,
    ) => void;
  }

  export class KeyboardAwareMixin {}
  export class KeyboardAwareScrollView extends ScrollableComponent<
    KeyboardAwareScrollViewProps,
    KeyboardAwareState
  > {}
  export class KeyboardAwareFlatList extends ScrollableComponent<
    KeyboardAwareFlatListProps<any>,
    KeyboardAwareState
  > {}
  export class KeyboardAwareSectionList extends ScrollableComponent<
    KeyboardAwareSectionListProps<any>,
    KeyboardAwareState
  > {}
}
