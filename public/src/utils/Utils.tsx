import moment from 'moment';
import { Alert, Linking, Platform } from 'react-native';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

export async function requestNearbyDevicesPermission() {
  try {
    if (Platform.OS === 'android') {
      if (Platform.Version >= 31) {
        const permission = PERMISSIONS.ANDROID.NEARBY_WIFI_DEVICES;
        const status = await check(permission);
        if (status === RESULTS.DENIED) {
          const result = await request(permission);
          return result === RESULTS.GRANTED;
        } else if (status === RESULTS.GRANTED) {
          return true;
        } else if (status === RESULTS.BLOCKED) {
          console.log(
            'Nearby Devices permission is blocked. Opening settings...',
          );
          Linking.openSettings();
          return false;
        } else {
          return false;
        }
      } else {
        const permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
        const status = await check(permission);

        if (status === RESULTS.DENIED) {
          const result = await request(permission);
          return result === RESULTS.GRANTED;
        } else if (status === RESULTS.GRANTED) {
          return true;
        } else if (status === RESULTS.BLOCKED) {
          console.log('Location permission is blocked. Opening settings...');
          Linking.openSettings();
          return false;
        } else {
          return false;
        }
      }
    } else if (Platform.OS === 'ios') {
      const permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
      const status = await check(permission);

      if (status === RESULTS.DENIED) {
        const result = await request(permission);
        return result === RESULTS.GRANTED;
      } else if (status === RESULTS.GRANTED) {
        return true;
      } else if (status === RESULTS.BLOCKED) {
        console.log('Location permission is blocked. Opening settings...');
        Linking.openSettings();
        return false;
      } else {
        return false;
      }
    } else {
      console.log('Unsupported platform.');
      return false;
    }
  } catch (error) {
    console.error('Error requesting permission:', error);
    return false;
  }
}

export const checkBackGroundLocationPermission = async () => {
  const platformPermission =
    Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_ALWAYS : PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION;

  const locationStatus = await check(platformPermission);
  if (locationStatus === RESULTS.GRANTED) {
    return true;
  } else {
    try {
      const result = await request(platformPermission);
      if (result === RESULTS.GRANTED) {
        return true;
      } else if (result === RESULTS.BLOCKED || result === RESULTS.DENIED) {
        Alert.alert(
          '',
          Platform.OS === 'ios' ? 'Required Location Permission is Always' : 'Required Location Permission',
          [
            {
              text: 'Go to Settings',
              onPress: () => Linking.openSettings(),
            },
            {
              text: 'Cancel',
            },
          ]
        );
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  }
};

export const checkMotionPermission = async () => {
  const platformPermission =
    Platform.OS === 'ios' ? PERMISSIONS.IOS.MOTION : PERMISSIONS.ANDROID.NEARBY_WIFI_DEVICES;
  const motionStatus = await check(platformPermission);
  if (motionStatus === RESULTS.GRANTED) {
    return true;
  } else {
    try {
      const result = await request(platformPermission);
      if (result === RESULTS.GRANTED) {
        return true;
      } else if (result === RESULTS.BLOCKED || result === RESULTS.DENIED || RESULTS.UNAVAILABLE) {
        Alert.alert(
          '',
          Platform.OS === 'ios' ? 'Required Motion Permission' : 'Required NearBy Permission',
          [
            {
              text: 'Go to Settings',
              onPress: () => Linking.openSettings(),
            },
            {
              text: 'Cancel',
            },
          ]
        );
      }
    } catch (error) {
      console.error('Error requesting motion permission:', error);
    }
  }
};

export const checkLocationPermission = async () => {
  const platformPermission =
    Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

  const locationStatus = await check(platformPermission);
  if (locationStatus === RESULTS.GRANTED) {
    return true;
  } else {
    try {
      const result = await request(platformPermission);
      if (result === RESULTS.GRANTED) {
        return true;
      } else if (result === RESULTS.BLOCKED || result === RESULTS.DENIED) {
        Alert.alert(
          '',
          Platform.OS === 'ios' ? 'Required Location Permission Allow while using App' : 'Required Location Permission',
          [
            {
              text: 'Go to Settings',
              onPress: () => Linking.openSettings(),
            },
            {
              text: 'Cancel',
            },
          ]
        );
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  }
};

export const isTokenExpired = (created: any, expiresIn: any) => {
  const createdTime = moment(created).clone(); // Prevent mutation
  const expiryTime = createdTime.add(expiresIn, 'seconds');
  return moment().isAfter(expiryTime);
};
