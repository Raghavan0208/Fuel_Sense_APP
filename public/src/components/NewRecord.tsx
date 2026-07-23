/* eslint-disable prettier/prettier */
import { Box, Center, Heading, Text, View } from 'native-base';
import React, { memo, useEffect, useRef, useState } from 'react';
import { Alert, AppState, Linking, Platform, StyleSheet } from 'react-native';
import { IJourneyModel, IPlanReadingModel } from '../models/Models';
import NewRecordBasic from './NewRecordBasic';
import LocationPermission from './LocationPermission';
import {
  check,
  PERMISSIONS,
  request,
  RESULTS,
  openSettings,
} from 'react-native-permissions';
import { promptForEnableLocationIfNeeded } from 'react-native-android-location-enabler';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  accessToken: any;
  dashboardData: IJourneyModel;
  journeyReading?: Array<IPlanReadingModel>;
  countryCode: any;
  LoginId: any;
  isBackgroundOn?: boolean;
  isManualRecordOn?: boolean | undefined;
  setIsManualRecordOn?: (a: boolean) => void;
  setScreen?: any | undefined;
  setIsTracking?: (a: boolean) => void;
};

const NewRecord: React.FC<Props> = ({
  accessToken,
  dashboardData,
  journeyReading,
  countryCode,
  LoginId,
  isBackgroundOn,
  isManualRecordOn,
  setIsManualRecordOn,
  setScreen,
  setIsTracking,
}) => {
  // const [isPermissionGranted, setIsPermissionGranted] =
  // useState<boolean>(false);

  // Change key when isPermissionGranted changes to force re-render
  // const [key, setKey] = useState<number>(0);

  // useEffect(() => {
  //   // Trigger re-render by updating the key
  //   setKey(prevKey => prevKey + 1);
  // }, [isPermissionGranted]);
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);
  const onPermissionDenied = () => {
    setScreen && setScreen('Dashboard');
    console.log('permission Denied');
  };

  const checkBackLocation = async () => {
    const locationPermission = await AsyncStorage.getItem('bg_location');

    if (locationPermission && JSON.parse(locationPermission)) {
      console.log('asked Once');
      return;
    }
    const bkPermission =
      Platform.OS == 'ios'
        ? PERMISSIONS.IOS.LOCATION_ALWAYS
        : PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION;
    const checkPer = await check(bkPermission);
    if (checkPer != RESULTS.GRANTED) {
      askBackGroundPermission();
    }
  };
  const askBackGroundPermission = () => {
    return new Promise<void>(async (resolve, reject) => {
      Alert.alert(
        'Enable Background Location Access',
        'FuelSense collects location data to enable vehicle tracking and journey monitoring, even when the app is closed or not in use. This data is used to support features like auto-tracking and precise trip logging.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: reject,
          },
          {
            text: 'Allow',
            onPress: async () => {
              const bkPermission =
                Platform.OS == 'ios'
                  ? PERMISSIONS.IOS.LOCATION_ALWAYS
                  : PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION;
              const ask = await request(bkPermission);
              const locationPermission = await AsyncStorage.getItem(
                'bg_location',
              );

              if (ask == RESULTS.GRANTED) {
                console.log('called background permission granted');
                await AsyncStorage.setItem('bg_location', JSON.stringify(true));
                const locationFirstTime =
                  locationPermission && JSON.parse(locationPermission);
                if (!locationFirstTime) {
                  console.log('called for the first time in session');

                  setIsTracking && setIsTracking(true);
                }
                resolve();
              } else {
                reject();
              }
            },
          },
        ],
      );
    });
  };

  const requestPermission = async () => {
    if (Platform.OS === 'ios') {
      // Handle iOS-specific permissions if needed
      const granted = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

      if (granted !== RESULTS.GRANTED) {
        Alert.alert('Permissions', 'Location permissions is required.', [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => onPermissionDenied && onPermissionDenied(),
          },
          {
            text: 'OK',
            onPress: () => {
              Linking.openSettings();
              const subscription = AppState.addEventListener(
                'change',
                async nextAppState => {
                  if (nextAppState === 'active') {
                    const newPermissionStatus = await check(
                      PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
                    );
                    if (newPermissionStatus === RESULTS.GRANTED) {
                      checkBackLocation();
                      setIsPermissionGranted(true);
                    }
                    subscription.remove();
                  }
                },
              );
            },
          },
        ]);
        return;
      }
      checkBackLocation();
      setIsPermissionGranted(true);
    } else {
      try {
        console.log('android permission');
        const granted = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

        if (granted !== RESULTS.GRANTED) {
          Alert.alert('Permissions', 'Location permissions is required.', [
            {
              text: 'Cancel',
              style: 'cancel',
              onPress: () => onPermissionDenied && onPermissionDenied(),
            },
            {
              text: 'OK',
              onPress: () => {
                Linking.openSettings();
                const subscription = AppState.addEventListener(
                  'change',
                  async nextAppState => {
                    if (nextAppState === 'active') {
                      const newPermissionStatus = await check(
                        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                      );
                      if (newPermissionStatus === RESULTS.GRANTED) {
                        checkBackLocation();
                        setIsPermissionGranted(true);
                      }
                      subscription.remove();
                    }
                  },
                );
              },
            },
          ]);
          return;
        } else {
          console.log('android permission', granted);
          promptForEnableLocationIfNeeded();
          checkBackLocation();
          setIsPermissionGranted(true);
        }
      } catch (err) {
        console.log('request permission error');
        console.warn(err);
      }
    }
  };

  const askPermission = async () => {
    const granted = await check(
      Platform.OS == 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    );
    if (granted == RESULTS.GRANTED) {
      checkBackLocation();
      setIsPermissionGranted(true);
      return;
    }
    requestPermission();
    // if (Platform.OS == 'ios') {
    //   requestPermission();
    // } else {
    //   Alert.alert(
    //     'Allow Location Permission',
    //     'To track your journey and provide accurate records, we need access to your location.',
    //     [
    //       {
    //         text: 'Cancel',
    //         style: 'cancel',
    //         onPress: () => onPermissionDenied && onPermissionDenied(),
    //       },
    //       {text: 'Allow', onPress: () => requestPermission()},
    //     ],
    //   );
    // }
  };

  useEffect(() => {
    const chhange = AppState.addEventListener('change', e => {
      if (e == 'active') {
        askPermission();
      }
    });

    askPermission();
    return () => {
      chhange.remove();
    };
  }, []);

  return (
    <Center h="100%">
      {/* <LocationPermission
        onPermissionGranted={() => setIsPermissionGranted(!isPermissionGranted)}
        onPermissionDenied={onPermissionDenied}
      /> */}
      <Box
        _dark={{
          bg: 'coolGray.800',
        }}
        _light={{
          bg: 'white',
        }}
        flex="1"
        safeAreaTop
        maxW="400px"
        w="100%"
      // key={key} // Add key to trigger re-render
      >
        <Heading
          p={Platform.OS == 'android' ? '3' : '0'}
          pl="3"
          pt="3"
          size="lg">
          <View w={'100%'}>
            <View>
              <Text
                color="coolGray.800"
                textTransform={'uppercase'}
                fontWeight="medium"
                style={styles.headText}>
                New Record
              </Text>
            </View>
          </View>
        </Heading>
        {isPermissionGranted && (
          <NewRecordBasic
            dashboardData={dashboardData}
            countryCode={countryCode}
            LoginId={LoginId}
            isBackgroundOn={isBackgroundOn}
            isManualRecordOn={isManualRecordOn}
            setIsManualRecordOn={setIsManualRecordOn}
          />
        )}
      </Box>
    </Center>
  );
}

const styles = StyleSheet.create({
  headText: {
    fontSize: 19,
  },
});

export default memo(NewRecord);
