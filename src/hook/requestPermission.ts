import {Platform, PermissionsAndroid, Alert} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
const ANDROID_13_VERSION_CODE = 33;

export const requestPermissions = async () => {
  if (Platform.OS === 'android') {
    try {
      if (Platform.Version >= ANDROID_13_VERSION_CODE) {
        const audioGranted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Microphone Permission',
            message: 'App needs access to your microphone to record audio.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (audioGranted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert(
            'Microphone Permission Required',
            'Please grant microphone permission to record audio.',
          );
          return false;
        }
      } else {
        const permissions = [
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ];

        const granted = await PermissionsAndroid.requestMultiple(permissions);

        const allGranted = Object.values(granted).every(
          permission => permission === PermissionsAndroid.RESULTS.GRANTED,
        );

        if (!allGranted) {
          Alert.alert(
            'Permissions Required',
            'Please grant all permissions to use voice recording.',
          );
          return false;
        }
      }
      return true;
    } catch (err) {
      console.warn(err);
      return false;
    }
  } else {
    const permission = PERMISSIONS.IOS.MICROPHONE;
    const result = await check(permission);

    if (result !== RESULTS.GRANTED) {
      const permissionResult = await request(permission);
      if (permissionResult !== RESULTS.GRANTED) {
        Alert.alert(
          'Microphone Permission',
          'Please grant microphone permission to use voice recording features.',
        );
        return false;
      }
    }
    return true;
  }
};
