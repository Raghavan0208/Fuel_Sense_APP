import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  AppState,
  AppStateStatus,
  Linking,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {promptForEnableLocationIfNeeded} from 'react-native-android-location-enabler';

type LocationPermissionProps = {
  onPermissionGranted?: () => void;
  onPermissionDenied?: () => void;
  interval?: number; // Optional prop to set the interval for permission checks
  allowAllTime?: boolean;
};

const LocationPermission: React.FC<LocationPermissionProps> = ({
  onPermissionGranted,
  onPermissionDenied,
  interval = 1000000, // Default interval is 5/3 minutes
  allowAllTime = false,
}) => {
  const hasAccess = useRef<boolean>(true);
  const [isRequestingPermission, setIsRequestingPermission] = useState(false);

  const [appState, setAppState] = useState<AppStateStatus>(
    AppState.currentState,
  );
  const onCanclePress = () => {
    hasAccess.current = false;
  };
  const requestPermission = async () => {
    if (Platform.OS === 'ios') {
      // Handle iOS-specific permissions if needed
      if (allowAllTime) {
        // Check background location permission on iOS
        const grantedBg = await request(PERMISSIONS.IOS.LOCATION_ALWAYS);

        if (grantedBg !== RESULTS.GRANTED) {
          Alert.alert(
            'Background Location Access Required',
            'Please allow background location permissions.',
            [
              {
                text: 'Cancel',
                style: 'cancel',
                onPress: () => onPermissionDenied && onPermissionDenied(),
              },
              {text: 'OK', onPress: () => Linking.openSettings()},
            ],
          );
        } else {
          hanleEnableLocation();

          onPermissionGranted && onPermissionGranted();
        }
      } else {
        const granted = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

        if (granted !== RESULTS.GRANTED) {
          Alert.alert(
            'Permissions',
            'Location permissions are required. Please allow them.',
            [
              {
                text: 'Cancel',
                style: 'cancel',
                onPress: () => onPermissionDenied && onPermissionDenied(),
              },
              {text: 'OK', onPress: () => Linking.openSettings()},
            ],
          );
          return;
        } else {
          hanleEnableLocation();

          onPermissionGranted && onPermissionGranted();
        }
      }
    } else {
      try {
        setIsRequestingPermission(true);

        console.log('android permission');
        const granted = await request(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This App needs to Access your location',
            buttonPositive: 'YES',
          },
        );

        if (granted !== RESULTS.GRANTED) {
          Alert.alert(
            'Permissions',
            'Location permissions are required. Please allow them.',
            [
              {
                text: 'Cancel',
                style: 'cancel',
                onPress: () => onPermissionDenied && onPermissionDenied(),
              },
              {text: 'OK', onPress: () => Linking.openSettings()},
            ],
          );
          return;
        } else {
          console.log('android permission', granted);
          hanleEnableLocation();

          onPermissionGranted && onPermissionGranted();
        }
        if (allowAllTime) {
          console.log('for ');

          const grantedBg = await request(
            PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
            {
              title: 'Background Location Access Required',
              message:
                'This app collects location data to enable an accurate prediction on travel mode while the app is closed or not in use.',
              buttonPositive: 'YES',
            },
          );

          if (grantedBg !== RESULTS.GRANTED) {
            Alert.alert(
              'Background Location Access Required',
              'Please allow background location permissions.',
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                  onPress: () => onPermissionDenied && onPermissionDenied(),
                },
                {text: 'OK', onPress: () => Linking.openSettings()},
              ],
            );
          } else {
            hanleEnableLocation();

            onPermissionGranted && onPermissionGranted();
          }
        }
      } catch (err) {
        console.log('request permission error');

        console.warn(err);
      } finally {
        setIsRequestingPermission(false);
      }
    }
  };

  const requestPermissions = async () => {
    console.log('asl for permission', allowAllTime);

    if (allowAllTime) {
      Alert.alert(
        'Background Location Permission Required',
        'To track your journey even when the app is not active, we need access to your location in the background.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => onPermissionDenied && onPermissionDenied(),
          },
          {text: 'Allow', onPress: () => requestPermission()},
        ],
      );
    } else {
      Alert.alert(
        'Location Permission Required',
        'To track your journey and provide accurate records, we need access to your location.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => onPermissionDenied && onPermissionDenied(),
          },
          {text: 'Allow', onPress: () => requestPermission()},
        ],
      );
    }
  };

  const hanleEnableLocation = async () => {
    if (Platform.OS === 'android') {
      try {
        const enableResult = await promptForEnableLocationIfNeeded();
        console.log('enableResult', enableResult);
      } catch (error) {
        console.log('Error in open location ', error);
      }
    }
  };
  const checkPermissions = async () => {
    try {
      let fineLocationGranted, backgroundLocationGranted;

      if (Platform.OS === 'ios') {
        // Check location permission for iOS
        fineLocationGranted = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        backgroundLocationGranted = await check(
          PERMISSIONS.IOS.LOCATION_ALWAYS,
        );
      } else {
        // Check location permission for Android
        fineLocationGranted = await check(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );
        backgroundLocationGranted = await check(
          PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
        );
      }

      const fineLocationIsGranted = fineLocationGranted === RESULTS.GRANTED;
      const backgroundLocationIsGranted =
        backgroundLocationGranted === RESULTS.GRANTED;

      if (!fineLocationIsGranted || !backgroundLocationIsGranted) {
        if (!isRequestingPermission) {
          console.log('11212');
          requestPermissions();
        }
      } else {
        console.log('1121290349');
        hanleEnableLocation();
        onPermissionGranted && onPermissionGranted();
      }
    } catch (err) {
      console.log('Permission grant eerror');

      console.warn(err);
    }
  };

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        // App has come back to the foreground, check permissions again
        checkPermissions();
      }
      setAppState(nextAppState);
    };

    const appStateListener = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    // Set an interval to check permissions based on the provided interval
    const permissionCheckInterval = setInterval(checkPermissions, interval);

    return () => {
      clearInterval(permissionCheckInterval); // Clear the interval on component unmount
      appStateListener.remove(); // Clean up app state listener
    };
  }, [appState, interval]);

  useEffect(() => {
    setTimeout(() => {
      requestPermissions();
    }, 1000);
  }, []);

  return null; // This component doesn't render anything
};

export default LocationPermission;
