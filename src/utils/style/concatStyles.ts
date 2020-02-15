import { StyleProp } from 'react-native';

const concatStyles = <Stl>(
  ...styles: Array<StyleProp<Stl>>
): Array<StyleProp<Stl>> | StyleProp<Stl> | null => {
  let tmp: Array<StyleProp<Stl>> = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const style of styles) {
    if (style) {
      if (Array.isArray(style)) {
        const flattenStyles = concatStyles(
          // @ts-ignore
          ...style,
        );

        if (flattenStyles) {
          tmp = tmp.concat(flattenStyles);
        }
      } else {
        tmp = tmp.concat(style);
      }
    }
  }

  if (tmp.length === 0) {
    return null;
  }

  if (tmp.length === 1) {
    return tmp[0];
  }

  return tmp;
};

export default concatStyles;
