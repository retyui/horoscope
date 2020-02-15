import { YellowBox } from 'react-native';

const ignoreMessages = [
  // TODO: remove it when react-native was updated to 0.62+
  'componentWillMount',
  // TODO: remove it when react-native-text-input-mask fix it
  'componentWillReceiveProps',
];

YellowBox.ignoreWarnings(ignoreMessages);
