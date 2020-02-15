import { StyleSheet } from 'react-native';

export const ACTIVITY_INDICATOR_SIZE = 69;

export default StyleSheet.create({
  errors: {
    minHeight: 0,
  },
  activityIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -ACTIVITY_INDICATOR_SIZE / 2,
    marginLeft: -ACTIVITY_INDICATOR_SIZE / 2,
  },
  credentialsItem: {
    paddingVertical: 10,
    marginHorizontal: -5,
    paddingHorizontal: 5,
    borderTopColor: '#00000040',
    borderTopWidth: 1,
  },
});
