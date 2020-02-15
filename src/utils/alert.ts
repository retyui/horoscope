import { Alert, AlertButton } from 'react-native';

type Button = Omit<AlertButton, 'onPress'>;

export const openAlertAsync = <Buttons extends { [btnName: string]: Button }>(
  title: string,
  message: string,
  buttons: Buttons,
): Promise<keyof Buttons | 'dismiss'> =>
  new Promise((res) => {
    const buttonsArray = Object.entries(buttons).map(([name, btnOptions]) => ({
      ...btnOptions,
      onPress: () => res(name),
    }));

    Alert.alert(title, message, buttonsArray, {
      cancelable: false,
      onDismiss: () => res('dismiss'),
    });
  });
