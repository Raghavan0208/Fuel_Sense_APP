/* eslint-disable */
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  Linking,
  NativeEventEmitter,
  Platform,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Actionsheet,
  Box,
  Button,
  Center,
  ChevronRightIcon,
  DeleteIcon,
  Heading,
  HStack,
  Modal,
  ScrollView,
  Spacer,
  Switch,
  Text,
  useDisclose,
  VStack,
} from 'native-base';
import { View } from 'react-native';

import { useIsFocused } from '@react-navigation/native';
import { IJourneyModel, IPlanReadingModel } from '../models/Models';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  check,
  openSettings,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';
import { getTokenDetail } from '../components/Helper';
import { Divider } from 'react-native-paper';
import CommonServices, {
  damoovRefreshToken,
  fetchToken,
} from '../Services/CommonServices';
import moment from 'moment';
import CustomSwitch from '../components/CustomSwitch';
// import TelematicsSdk from 'react-native-telematics';
import {
  checkBackGroundLocationPermission,
  checkLocationPermission,
  checkMotionPermission,
  isTokenExpired,
  requestNearbyDevicesPermission,
} from '../utils/Utils';
import { tr } from '@tashi-iu/react-native-paper-dates';
import CustomTextInput from '../components/CustomTextInput';

type Props = {
  navigation?: any;
  dashboardData?: IJourneyModel;
  setScreen?: any | undefined;
  accessToken?: any;
  countryCode?: any;
  setAccessToken?: any;
  setCountry?: any;
  onText?: any;
  offText?: any;
  isdisabled?: any;
};

const Settings = ({
  navigation,
  dashboardData,
  setScreen,
  accessToken,
  countryCode,
  setAccessToken,
  setCountry,
  onText,
  offText,
  isdisabled,
}: Props) => {
  const [isPlanGet, setIsPlanGet] = useState(false);
  const [isAutoInPressed, setIsAutoInPressed] = useState(false);
  const isPlanActive = useRef(true);
  const currentPlan = useRef(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const [helpModal, setHelpModal] = useState(false);
  const [isTracking, setIsTracking] = useState<boolean>(false);
  const [isDriveSmart, setIsDriveSmart] = useState<boolean>(false);
  const [isUnit, setIsUnit] = useState<boolean>(false);
  const [showTimeOutModal, setShowTimeOutModal] = useState<boolean>(false);
  const [update, setUpdate] = useState(false);
  const [tripText, setTripText] = useState<any>('');
  const [getCustomTags, setgetCustomTags] = useState<Array<any>>([]);

  const { isOpen, onOpen, onClose } = useDisclose();
  const [customtagmodelopen, setCustomtagmodelopen] = useState(false);
  const isFocused = useIsFocused();
  const [resetInOut, setResetInOut] = useState(0);
  const [resetInOutDriveSmart, setResetInOutDriveSmart] = useState(0);
  const [resetInOutunit, setResetInOutUnit] = useState(0);

  const [findRateVlue, setFindRateValue] = useState('');
  const screenHeight = Dimensions.get('window').height;

  const onSubscriptionPress = () => {
    onClose();
    if (isPlanGet) {
      navigation.navigate('Subscription', {
        isPlanActive: isPlanActive.current,
        currentPlan: currentPlan.current,
      });
    }
  };

  const getJourneyDetails = (userPlanId: any, country: string) => {
    CommonServices.getWithQueryParam(
      'Journey',
      'GetAllPlanReading',
      'userplanid',
      userPlanId,
      country,
    )
      .then(res => {
        if (res.status === 200) {
          console.log("uyyuyu",res.data, userPlanId, country, dashboardData?.id);
          res.data?.map(
            (item: {
              userVehicleDetails: { rateName: React.SetStateAction<string> };
            }) => {
              if (item) {
                setFindRateValue(item?.userVehicleDetails?.rateName);
              }
            },
          );
        }
      })
      .catch((e: string) => { 
        console.log(e);
      });
  };

  useEffect(() => {
    getJourneyDetails(dashboardData?.id, countryCode);
  }, []);

  const trackingHandler = async (value: boolean) => {
    if (value) {
      const locationPermissionGranted =
        await checkBackGroundLocationPermission();
    }
    await AsyncStorage.setItem('ejt', value.toString());
    console.log('🚀 ~ getAutoOnOffValue ~ Setting:',value);
  
    setIsTracking(value);
    // try {
    //   if (value) {
    //     const locationPermissionGranted = await checkBackGroundLocationPermission();
    //     if (locationPermissionGranted) {

    //       if (types == 'change') {

    //         // setIsAuto(value)
    //         await AsyncStorage.setItem('isAuto', JSON.stringify(value));
    //         setIsTracking(value);
    //         await AsyncStorage.setItem('ejt', JSON.stringify(value));
    //       }
    //       if (types == 'click') {
    //         const newValue = !value;
    //         await AsyncStorage.setItem('ejt', JSON.stringify(newValue));
    //         setIsTracking(newValue);
    //       }
    //     } else {
    //       // setIsAuto(false)
    //       await AsyncStorage.setItem('isAuto', JSON.stringify(false));

    //       setIsTracking(false);
    //       await AsyncStorage.setItem('ejt', JSON.stringify(false));
    //       setIsAutoInPressed(false);
    //     }
    //   }

    // } catch (error) {
    //   console.error('error', error);
    // }
  };

  const getOneYearDate = (date: any) => {
    var numOfYears = 1;
    var expireDate = new Date(date);
    expireDate.setFullYear(expireDate.getFullYear() + numOfYears);
    expireDate.setDate(expireDate.getDate() - 1);

    return expireDate;
  };

  useEffect(() => {
    ViewLogin();
    getCustomTagsByLoginid(getTokenDetail(accessToken).LoginId);
  }, [isFocused, update]);

  const ViewLogin = async () => {
    const country = await AsyncStorage.getItem('CountryId');
    const id = await AsyncStorage.getItem('LOGIN_ID');

    if (!(id && country)) {
      return;
    }
    try {
      setIsPlanGet(false);
      const viewLogin = await CommonServices.getWithQueryParam(
        'Registration',
        'View',
        'loginId',
        Number(id),
        JSON.parse(country || 'UK') || 'UK',
      );

      const planData = viewLogin?.data?.plan;
      const planId = planData?.planId;
      const date = moment(getOneYearDate(planData?.purchaseDate)).format(
        'YYYY-MM-DD',
      );
      const currDate = moment(new Date()).format('YYYY-MM-DD');

      currentPlan.current = planData;
      isPlanActive.current = true;
      if (currDate > date) {
        isPlanActive.current = false;
        setShowTimeOutModal(true);
      }
      setIsPlanGet(true);
    } catch (e) {
      console.log('Error', e);
    } finally {
      console.log('true');
    }
  };

  const logOut = () => {
    isPlanActive.current = true;
    currentPlan.current = null;
    AsyncStorage.clear();
    setScreen('login');
    setAccessToken('');
    setModalVisible(false);
    setCountry('');
    onClose();
    setIsPlanGet(false);
    disableSDK();
  };

  const getCustomTagsByLoginid = (loginid: any) => {
    CommonServices.getWithSingleParam('CustomTags', 'GetCustomTagsByLoginid', loginid, countryCode).then(res => {
      if (res?.status === 200) {
        setgetCustomTags(res.data);
      }
    })
      .catch(e => {
        console.error('Error posting data:', e.response?.data || e.message);
      });
  }

  const OnAddCustomTags = (LoginId: any) => {
    let data = {};

    data = {
      id: 0,
      created: new Date(),
      createdBy: 0,
      modified: '2023-08-22T10:03:32.140Z',
      modifiedBy: 0,
      active: true,
      loginid: LoginId,
      name: tripText,
      displayName: tripText,
      enumName: tripText,
      displayInList: true
    }

    CommonServices.post('CustomTags', 'CreateCustomTags', data, countryCode)
      .then(res => {
        if (res?.status === 200) {
          Alert.alert(
            'Success',
            'Trip Tags Added Successfully',
            [
              {
                text: 'OK',
                onPress: () => {
                  setTripText("");
                  getCustomTagsByLoginid(getTokenDetail(accessToken).LoginId);
                },
              },
            ],
            { cancelable: false }
          );
        }
      })
      .catch(e => {
        console.error('Error posting data:', e.response?.data || e.message);
      });
  };

  const onCancelSubscription = (LoginId: any) => {
    CommonServices.getWithSingleParam(
      'Registration',
      'CancelSubscription',
      LoginId,
      countryCode,
    )
      .then(res => {
        if (res.status === 200) {
          AsyncStorage.clear();
          setScreen('login');
          setAccessToken('');
          setCancelModal(false);
          onClose();
        }
      })
      .catch(e => console.log(e));
  };

  const handleSwitchChange = async (value: boolean) => {
    if (value) {
      const isAllowNearByPermission = await requestNearbyDevicesPermission();
      if (isAllowNearByPermission) {
        requestPermissions();
      } else {
        Alert.alert('Please Enable NearByDevice permission');
      }
    } else {
      disableSDK();
    }
  };


  const enableSDK = async () => {
    try {
      const deviceToken: any = await AsyncStorage.getItem('deviceToken');
      const res = JSON.parse(deviceToken);
      if (res?.DeviceToken) {
        const { Token, ExpiresIn } = res?.AccessToken;
        // const isEnabled = await TelematicsSdk.enable(res?.DeviceToken);

        const createdDate = moment(res?.created);
        // if (isEnabled) {
        //   if (isTokenExpired(createdDate, ExpiresIn)) {
        //     const newDeviceToken = await damoovRefreshToken(
        //       res?.RefreshToken,
        //       Token,
        //     );
        //     if (newDeviceToken?.status == 200) {
        //       const deviceToken = {
        //         ...newDeviceToken?.Result,
        //         DeviceToken: res?.DeviceToken,
        //       };

        //       await AsyncStorage.setItem(
        //         'deviceToken',
        //         JSON.stringify(deviceToken),
        //       );
        //       fetchToken(deviceToken?.DeviceToken);
        //       updateSdkStatus();
        //     }
        //   } else {
        //     fetchToken(res?.DeviceToken);
        //     updateSdkStatus();
        //   }
        // }
      }
    } catch (error: any) {
      console.error('Enable SDK Error:', error);
    }
  };

  const disableSDK = async () => {
    try {
      // await TelematicsSdk.disable();
      updateSdkStatus();
    } catch (error: any) {
      console.error('Disable SDK Error:', error);
    }
  };

  const updateSdkStatus = async () => {
    try {
      // const isEnabled = await TelematicsSdk.getStatus();
      setIsDriveSmart(isEnabled);
    } catch (error: any) {
      console.log(error);
    }
  };
  const getAutoOnOffValue = async () => {
    const newValue: any = await AsyncStorage.getItem('ejt');
    setIsTracking(JSON.parse(newValue));
  };

  useEffect(() => {
    updateSdkStatus();
    getAutoOnOffValue();
  }, []);

  // async function requestNearbyDevicesPermission() {
  //   try {
  //     if (Platform.OS === 'android') {
  //       if (Platform.Version >= 31) {
  //         const permission = PERMISSIONS.ANDROID.NEARBY_WIFI_DEVICES;
  //         const status = await check(permission);
  //         if (status === RESULTS.DENIED) {
  //           const result = await request(permission);
  //           return result === RESULTS.GRANTED;
  //         } else if (status === RESULTS.GRANTED) {
  //           return true;
  //         } else if (status === RESULTS.BLOCKED) {
  //           console.log(
  //             'Nearby Devices permission is blocked. Opening settings...',
  //           );
  //           openAppSettings();
  //           return false;
  //         } else {
  //           return false;
  //         }
  //       } else {
  //         const permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
  //         const status = await check(permission);

  //         if (status === RESULTS.DENIED) {
  //           const result = await request(permission);
  //           return result === RESULTS.GRANTED;
  //         } else if (status === RESULTS.GRANTED) {
  //           return true;
  //         } else if (status === RESULTS.BLOCKED) {
  //           console.log('Location permission is blocked. Opening settings...');
  //           openAppSettings();
  //           return false;
  //         } else {
  //           return false;
  //         }
  //       }
  //     } else if (Platform.OS === 'ios') {
  //       const permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
  //       const status = await check(permission);

  //       if (status === RESULTS.DENIED) {
  //         const result = await request(permission);
  //         return result === RESULTS.GRANTED;
  //       } else if (status === RESULTS.GRANTED) {
  //         return true;
  //       } else if (status === RESULTS.BLOCKED) {
  //         console.log('Location permission is blocked. Opening settings...');
  //         openAppSettings();
  //         return false;
  //       } else {
  //         return false;
  //       }
  //     } else {
  //       console.log('Unsupported platform.');
  //       return false;
  //     }
  //   } catch (error) {
  //     console.error('Error requesting permission:', error);
  //     return false;
  //   }
  // }

  const requestPermissions = async () => {
    try {
      // const isGranted = await TelematicsSdk.requestPermissions();
      // if (isGranted) {
      //   enableSDK();
      //   return;
      // } else {
      //   const locationPermissionGranted =
      //     await checkBackGroundLocationPermission();
      //   if (!locationPermissionGranted) {
      //     return;
      //   }
      //   const motionPermissionGranted = await checkMotionPermission();
      //   if (!motionPermissionGranted) {
      //     return;
      //   }
      //   const locationWhenInUsePermissionGranted =
      //     await checkLocationPermission();
      //   if (!locationWhenInUsePermissionGranted) {
      //     return;
      //   }
      //   enableSDK();
      // }
    } catch (error: any) {
      showErrorAlert(error);
    }
  };

  const showErrorAlert = (error: any) => {
    Alert.alert('Error', error.message, [{ text: 'OK' }]);
  };

  return (
    <SafeAreaView>
      <Heading
      p={Platform.OS == 'android' ? '7' : '0'} pl="3" pt="3" size="lg">
      <View w={'100%'}>
        <Text
          color="coolGray.800"
          textTransform={'uppercase'}
          fontWeight="medium"
          style={styles.headText}>
          Settings
        </Text>
      </View>
      </Heading>
      <View style={{ minHeight: screenHeight }}>
        <ScrollView
          scrollEnabled={true}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          maxHeight={'100%'}
          contentContainerStyle={{
            paddingBottom: 100,
          }}>

          <View style={styles.subheaderView}>
            <Text style={styles.subHeaderText}>Accounts</Text>
          </View>

          <VStack>
            <Actionsheet.Item style={styles.settingsEmailbuy}>
              Subscriber
            </Actionsheet.Item>
            <Spacer />
            <Text style={styles.settingsEmail}>
              {getTokenDetail(accessToken)?.Email}
            </Text>
          </VStack>

          <HStack>
            <View style={styles.settingsEmailContainer}>
              <Actionsheet.Item
                onPress={onSubscriptionPress}
                style={styles.settingsEmailbuy}>
                Buy Subscription
              </Actionsheet.Item>
            </View>
            <Spacer />
            {!isPlanGet && (
              <View>
                <ActivityIndicator style={styles.activityindicator} />
              </View>
            )}
          </HStack>

          <Divider style={{ marginTop: -5, marginBottom: 10 }} />

          <View style={styles.subheaderView}>
            <Text style={styles.subHeaderText}>DetectSMART</Text>
          </View>

          <VStack>
            <HStack>
              {/* <View style={styles.settingsEmailContainer}> */}
              <Actionsheet.Item
                onPress={() => {
                  trackingHandler(isTracking);
                }}
                style={styles.settingsEmailbuy}>
                Auto Opt IN/OUT
              </Actionsheet.Item>
              <View style={{ position: 'absolute', right: 10, top: 15 }}>
                <CustomSwitch
                  key={resetInOut}
                  value={isTracking}
                  onValueChange={trackingHandler}
                  // onValueChange={(val: any) => trackingHandler(val)}
                  onText="IN"
                  offText="OUT" />
              </View>
            </HStack>
            <Text style={styles.informationtext}>
              (i) Push OUT for GPS Auto detect Drives On and Push IN for GPS Auto
              detect drives Off
            </Text>
          </VStack>

          <Divider style={{ marginTop: 15, marginBottom: 10 }} />

          {/* <View style={styles.subheaderView}>
            <Text style={styles.subHeaderText}>DriveSMART</Text>
          </View>

          <VStack>
            <HStack>
              <Actionsheet.Item style={styles.settingsEmailbuy}>
                DriveSMART ON/OFF
              </Actionsheet.Item>
              <Spacer />

              <View style={{ position: 'absolute', right: 10, top: 15 }}>
                <CustomSwitch
                  key={isDriveSmart ? 'enabled' : 'disabled'}
                  value={isDriveSmart}
                  onValueChange={handleSwitchChange}
                  onText={'ON'}
                  offText={'OFF'} />
              </View>
            </HStack>
            <Text style={styles.informationtext}>
              (i) For improved driving, know your score, review your drives for
              reduction in speeding, phone distraction and many more. Collect your
              stars.
            </Text>
          </VStack> */}

          {/* <Divider style={{ marginTop: 15, marginBottom: 10 }} />S */}

          <View style={styles.subheaderView}>
            <Text style={styles.subHeaderText}>Customisation</Text>
          </View>

          <HStack justifyContent="space-between" alignItems="center" width="90%">
            <Actionsheet.Item
              onPress={() => {
                onClose(), navigation.navigate('Vehicle');
              }}
              style={styles.CustomisationView}>
              <Text style={{ fontSize: 16 }}>Change Vehicle</Text>
            </Actionsheet.Item>
            <Spacer />
            <ChevronRightIcon />
          </HStack>

          <HStack justifyContent="space-between" alignItems="center" width="90%">
            <Actionsheet.Item
              onPress={() => {
                onClose(), navigation.navigate('Vehicle');
              }}
              style={styles.CustomisationViewsecond}>
              <Text style={{ fontSize: 16 }}>Add Vehicle</Text>
            </Actionsheet.Item>
            <Spacer />
            <ChevronRightIcon mt="-2" />
          </HStack>

          <HStack justifyContent="space-between" alignItems="center" width="90%">
            <Actionsheet.Item style={styles.customtags} onPress={() => {
              setCustomtagmodelopen(true);
            }}>
              <Text style={{ fontSize: 16 }}>Custom Tags</Text>
            </Actionsheet.Item>
            <Spacer />
            <ChevronRightIcon mt="-2" />
          </HStack>

          <VStack>
            <HStack>
              <Actionsheet.Item style={styles.customtags}>
                Mileage Rate
              </Actionsheet.Item>
              <Spacer />
            </HStack>
            {findRateVlue == '' ? (
              <View style={styles.settingsEmailContainerRate}>
                <ActivityIndicator />
              </View>
            ) : (
              // <Text style={styles.settingsEmailContainerRate}>
              <Text style={styles.settingsEmail}>{findRateVlue} Rate</Text>
            )
              // </Text>
            }
          </VStack>

          <VStack>
            <HStack>
              {/* <View style={styles.settingsEmailContainer}> */}
              <Actionsheet.Item
                // onPress={() => {
                //   trackingHandler('click', isTracking);
                // }}
                style={styles.customtagsunit}
                disabled>
                Unit KM/Mile
              </Actionsheet.Item>
              <Spacer />
              <View style={{ position: 'absolute', right: 13, top: 10 }}>
                <CustomSwitch
                  key={resetInOutunit}
                  // key={isTracking ? 'on' : 'off'} // Use key to force re-render
                  value={isUnit}
                  onValueChange={
                    // trackingHandler('change', !isTracking);
                    (value: any) => {
                      setIsUnit(value);
                      navigation.navigate('Vehicle' as never);
                    }}
                  isDisabled={true}
                  onText={'KM'}
                  offText={'Mile'} />
              </View>
              {/* </View> */}
            </HStack>
          </VStack>

          <Divider style={{ marginTop: -2, marginBottom: 10 }} />

          <View style={styles.subheaderView}>
            <Text style={styles.subHeaderText}>Other Settings</Text>
          </View>

          <HStack>
            <Actionsheet.Item
              onPress={() => {
                setHelpModal(true);
                onClose();
              }}
              style={styles.CustomisationView}>
              Help
            </Actionsheet.Item>
          </HStack>

          <HStack>
            <Actionsheet.Item
              onPress={() => setCancelModal(true)}
              style={styles.CustomisationViewsecond}>
              Delete Account
            </Actionsheet.Item>
          </HStack>
          <HStack>
            <Actionsheet.Item
              onPress={() => setModalVisible(true)}
              style={styles.CustomisationViewsecond}>
              Sign Out
            </Actionsheet.Item>
          </HStack>

          <View>
            <Box px="4" py="10"></Box>
          </View>

          <Modal
            isOpen={helpModal}
            onClose={() => setHelpModal(false)}
            _backdrop={{
              _dark: {
                bg: 'coolGray.800',
              },
              bg: 'warmGray.50',
            }}>
            <Modal.Content maxWidth="100%" w={'100%'} h="full">
              <Modal.CloseButton />
              <Modal.Header>Getting Started with FuelSense app</Modal.Header>
              <Modal.Body>
                <Text fontWeight={'bold'}>
                  To signup to FuelSense app and allow location services, follow
                  the general steps:
                </Text>
                {`
  1. . Download the app: Go to your mobile device's app store (such as Google Play Store for Android or App Store for iOS) and search for fuelsense app you want to sign up for or go to our webpage fuelsense.org and you can download the app by clicking the icon for download app. Tap on the app's icon, and then select the option to download and install it.
                  
  2. Launch the app: Locate the app on your device's home screen or in your app drawer and tap on it to open it.

  3. Sign up or create an account: You are required to create account or sign up in the web platform fuelsense.org for the geography or markets you belong for your car or bike. After successful subscription, you can use an existing account registered on webpage fuelsense.org to sign in on the fuelsense app. For new users, follow the on-screen instructions to complete the signup process, which involves providing your email address, choosing a password, and agreeing to the app's terms and conditions for subscribing.

  4. Grant permission to access location: Once you have signed up and logged in to the app, you are prompted to enable location services. This is must to allow auto-tracking of journey as it utilize location-based features, such as navigation and to calculate Co2 grams/km or grams/miles.
  `}
                {/* <Image ml={"10"} h={"64"} w={"56"} source={require('../assests/iosprompts.png')} alt="jorney" /> */}

                {`
  5. Grant permission on Android devices: If you are using an Android device, a popup window will usually appear, asking if you want to allow the app to access your device's location. You must choose to grant access all the time, only while using the app for auto-tracking or driving detection.
  `}
                {/* <Image ml={"10"} h={"64"} w={"56"} source={require('../assests/androidpropmt.png')} alt="jorney" /> */}
                {`
  6. Grant permission on iOS and Android devices: If you are using an iOS device, you need to go to your device's settings in case the location services during sign in is not set to on.
                  `}
                {/* <Image ml={"10"} h={"64"} w={"56"} source={require('../assests/iosprompt1.png')} alt="jorney" /> */}
                {`
  For IOS Tap on "Privacy," then "Location Services." Find fuelsense app in the list you want to enable location services for and select the desired location access option, such as "Always," or “while using this app”.

  For Android, select the desired location access option, such as "allow only while using the app”
                  `}
                {/* <Image ml={"10"} h={"80"} w={"56"} source={require('../assests/androidpropmt1.png')} alt="jorney" /> */}
                <Text fontWeight={'bold'}>Auto-tracking of Journey: </Text>
                {`
Real Time tracking of journey on fuelsense are designed to track and record your journeys or trips using your mobile device's location services with enable your journey toggle button to be found under settings. Use it to start and end the journey for added privacy and convenience. You have provision to classify the journey for business or personal and assess the CO2 for the registered vehicle(car/motorbike). Once the signup and enabled location services and enable the journey tracking, the app will start automatically tracking your journeys whenever you're on the move more than 10 miles per hour with app open or running on background. It will record your start and end locations, distance travelled, and Co2 emissions for the registered vehicle. Any wait times for pickup and dropoff for 10 mins is accounted under the same trip thus enabling you to register the trip as a single event of drive. Review and manage your trips after completing your journeys. You can open the fuelsense app to view and manage your tracked trips and we enable you to classify the journey as personal or business.

On default, the journey is marked as personal under Journey page of app. You also have option to delete a journey as sometimes any public travel or other vehicle travel is captured as trip when the app is running in background if you opt in for auto tracking feature. When you are on public transport or on vehicle other than your registered vehicle, please kill the app from the background for any recording of the journey. IMPORTANT: Opting for auto tracking, fuelsense app must be opened regularly for auto-tracking of journey. Please open the app once in a day and allow it to run on background for the app to capture and record journeys and assess the Co2 emission for your registered vehicle. In case of using public transport such as trains or travelling in vehicles other than your registered car or motorbikes, please force kill the app running in the background.`}
                <Text fontWeight={'bold'}>Questions in Your mind : </Text>
                {`
1. How much data fuelsense app uses ?

Switch on the mobile data for the driving or Wi FI if available, the data usage is minimal for the tracking happening in background. To get a better estimate of the data usage of the app,

Go to your device's settings and locate the "Data Usage" or "Wi-Fi & Network" section. Within the data usage settings, you can find a list of apps and in specific fuelsense app that have consumed data on your device.

Keep in mind that the data usage can vary based on factors such as the frequency of tracking updates, map data usage on frequent travels/trips. In general, during our test runs the app average consumption of data is 1.5 – 2.00 GB which is minimal for a 250 GB or unlimited data packages from providers. This less than 0.5% of the total data package.

2. How to classify your Drives in fuelsense app and web dashboard ?

Go to Journey page of the mobile app and you can classify the drive with just a swipe using the toggle button for Personal or Business. By default the drive is classified as personal drive and all your drives are logged due to the brilliant logic to tracing your vehicle speed and other variables which is unique to our algorithms.

The app pings your location as soon it finds you are driving with a smart way of tracking while recording the drive and logging in the drive with minimal battery usage on your smartphone.

We observe any changes in the speed and take into consideration of wait time for 10 mins in a single journey/drive using network based location services or location services on WI-FI.

Once a journey/drive is detected, the predefined Co2 emissions levels is initiated for the assessing of the Co2 emissions for each of the drive for which you can classify the journey as personal or business.

While travelling to different locations or geographies where your vehicle is not registered, disable the location services.

3. How to delete a drive in fuelsense App and web dashboard ?

Any journey > 10 mph or kph is tracked and hence we advise the use to view periodically and delete the drives you wish to delete

To delete a drive in the fuelsense app, you can follow these simple steps:

· Open the fuelsense on your mobile device and login with your details

· Navigate to the Journey page or section where you can view your recorded drives either for all drives or business or personal.

· Locate the specific drive that you want to delete.

· Look for an option or button that allows you to delete the drive at the right hand corner of each drives. Please note, you have option to delete a drive for maximum of 30 days and a deleted drive is not retrievable.

· Tap on the delete option and the drive is removed from the list of records.

4. Why fuelsense is tracking additional drives or travels in app

Due to the geo tracking and motion tracking algorithm that is sensitive to any motion let it be fast jogging of > 10 KPH or travelling in public transport or even in a supersonic jet or Air bus the smart algorithm starts the tracking of the journey if auto tracking is opt in happens as additional feature

We recommend users to switch on the airplane mode for the flight travels for journey tracking disabled and while travelling in the public transport, we provide you the option to delete the journey or retain it for record your carbon footprint which is in the similar range for car or bike drives mostly higher ! unless you are travelling in a fully electric green transport !

5. Do I need to turn WI-FI on and/or mobile data on for auto-tracking?

Yes, the mobile data or wifi should be enabled for real time tracking and assessing the Co2 emission in the app and the web platform syncs with the journey from app. Additionally, you can add trip by the record a trip button in your web platform which requires WI-FI or mobile data.

Real Time tracking feature of fuelsense use map data to visualize the user's location and track their movement when the moving speed hits > 10 KPH. These maps are typically loaded dynamically from the internet based on the latitude and longitude of the location and require a network connection, either Wi-Fi or mobile data.

Data synchronization: Real Time tracking feature fuelsense syncs data with servers and cloud-based platforms to provide backup, sharing, or analysis features of assessing Co2 for the miles travelled. This synchronization process requires network connectivity to upload or download data.

Therefore, it is advisable to have either Wi-Fi or mobile data enabled on the device for an optimal real time tracking experience, assessing CO2 for each and every individual travel.

6. How long does the trip takes to reflect on the app and web platform ?

Generally, it takes upto 10 -15 minutes for a drive along with assessing the CO2 for each drive for your registered/subscribed vehicle to be processed and appear on the app Journey page and Web platform dashboard.

7. Can you have fuelsense app in multiple devices(mobile)

Would not recommend ! This is simply because when fuelsense app is on multipe devices for the same registered vehicle there is high likelihood of the obtaining conflicting data based on the device settings and that result in variations in the tracked location and assessed CO2 emissions for the subscription. The inconsistency might be frustrating as well. Instead of using multiple devices for the subscription, we advise using a single device of smartphone for each subscription and maintain consistency, improve accuracy and provide a more streamlined and manageable real time tracking experience along with the fuelsense unique feature of Co2 assessment for the individual journey for your registered Vehicle.

8. Do I receive unlimited drives/journeys tracked

Yes, we don’t restrict auto-tracking of your journeys. fuelsense subscription pricing includes unlimited tracking for all your journey and assessing Co2 and offset Co2 as you drive your cars and motorbikes.

9. Can I download the trips/Journey

Yes, you can download the trips and journey for your purposes such as claims for business travels as Employer claims or Tax claims for SME or sole proprietorship with climate pledge of assessing Co2 and offset CO2 all in one app fuelsense by writing to our support team(support@fuelsense.co.in)`}
              </Modal.Body>
            </Modal.Content>
          </Modal>

          <Modal isOpen={modalVisible} onClose={setModalVisible} size={'sm'}>
            <Modal.Content maxH="212">
              <Modal.CloseButton
                onPress={() => {
                  setModalVisible(false);
                  onClose();
                }} />
              <Modal.Header>Sign Out</Modal.Header>
              <Modal.Body>
                <Text fontSize={15}>Are you sure you want to Sign Out of your account?</Text>
              </Modal.Body>
              <Modal.Footer>
                <Button.Group space={2}>
                  <Button
                    variant="outline"
                    borderColor="black"
                    _text={{ color: 'black' }}
                    onPress={() => {
                      setModalVisible(false);
                      onClose();
                    }}>
                    Cancel
                  </Button>
                  <Button
                    backgroundColor={'#000'}
                    onPress={() => {
                      logOut();
                    }}>
                    Yes, Sign Out
                  </Button>
                </Button.Group>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
          {/* cancel modal */}
          <Modal isOpen={cancelModal} onClose={setCancelModal}>
            <Modal.Content maxWidth="100%" w={'100%'} h="60%">
              <Modal.CloseButton
                onPress={() => {
                  setCancelModal(false);
                  onClose();
                }} />
              <Modal.Header>Delete account</Modal.Header>
              <Modal.Body padding={6}>
                <View>
                  <Text style={styles.deleteaccount}>
                    We value your trust and are committed to ensuring transparency
                    and security when it comes to your personal data. Below is our
                    policy regarding account deletion:
                  </Text>

                  <Text style={styles.deleteaccount} fontWeight={'bold'}>
                    1. Right to Delete Your Account
                  </Text>
                  <Text style={styles.deleteaccount}>
                    You have the right to delete your account at any time. Once
                    your account is deleted, all associated data will be
                    permanently removed from our servers, and this action cannot
                    be undone.
                  </Text>

                  <Text style={styles.deleteaccount} fontWeight={'bold'}>
                    2. How to Delete Your Account
                  </Text>
                  <Text style={styles.deleteaccount}>
                    To delete your account, follow these steps:
                  </Text>

                  <Text style={styles.deleteaccount}>
                    {` `} ★ Log into the app.
                  </Text>
                  <Text style={styles.deleteaccount}>
                    {` `} ★ Navigate to Account Settings or Profile Settings.
                  </Text>
                  <Text style={styles.deleteaccount}>
                    {` `} ★ Select the Delete Account option.
                  </Text>
                  <Text style={styles.deleteaccount}>
                    {` `} ★ Confirm your decision by following the prompts.
                  </Text>
                  <Text style={styles.deleteaccount}>
                    If you encounter any issues, you can contact our support team
                    for assistances
                  </Text>
                </View>
              </Modal.Body>
              <Modal.Footer>
                <Button.Group space={2}>
                  <Button
                    variant="outline"
                    borderColor="black"
                    _text={{ color: 'black' }}
                    onPress={() => {
                      setCancelModal(false);
                      onClose();
                    }}>
                    Cancel
                  </Button>
                  <Button
                    variant="solid"
                    background={'red.500'}
                    onPress={() => {
                      onCancelSubscription(getTokenDetail(accessToken).LoginId);
                    }}>
                    <HStack space={2}>
                      <DeleteIcon size="5" color="white" />
                      <Text fontSize="md" color={'white'}>
                        Delete Account
                      </Text>
                    </HStack>
                  </Button>
                </Button.Group>
              </Modal.Footer>
            </Modal.Content>
          </Modal>

          <Modal isOpen={customtagmodelopen}>
            <Modal.Content maxWidth="100%" w="100%" h="auto" maxHeight="60%">
              <Modal.CloseButton
                onPress={() => {
                  setCustomtagmodelopen(false);
                }} />
              <Modal.Header>Add your Custom Trip Tags Here</Modal.Header>
              <Modal.Body>
                <View>
                  <Text ml="1" style={styles.locTitle}>
                    Custom Tags
                  </Text>
                  <CustomTextInput
                    placeHolder="Tags"
                    defaultValue={''}
                    value={tripText}
                    onValueChange={setTripText} />
                </View>
                <Text style={styles.locTitle} ml='1' py='2'>Your Trip Tags :</Text>
                <ScrollView
                  nestedScrollEnabled={true}
                  showsVerticalScrollIndicator={true}
                  style={{
                    marginTop: 10,
                    maxHeight: 300, // Restricts the height of the scrollable area
                  }}
                  contentContainerStyle={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between', // Ensures even spacing between columns
                  }}
                >
                  {getCustomTags.length == 0 ? (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.customnegativetags}>No Custom Trip Tags Found</Text>
                  </View>) :
                    (<>
                      {getCustomTags
                        .slice().map((_, i, arr) => arr[arr.length - 1 - i]).map((item: any, index: number) => (
                          <View key={index} style={styles.custompositivetagsView}>
                            <Text style={styles.custompositivetags}>{item.name}</Text>
                            <Image
                              source={require('../assests/customtripimage.png')}
                              style={{
                                tintColor: 'black', position: 'absolute',
                                top: 5,
                                right: 15,
                                height: 25,
                                width: 25,}}
                              alt="" />
                          </View>
                        ))}
                    </>)}
                </ScrollView>
              </Modal.Body>
              <Modal.Footer>
                <Button.Group space={2}>
                  <Button
                    variant="outline"
                    borderColor="black"
                    _text={{ color: 'black' }}
                    onPress={() => {
                      setCustomtagmodelopen(false);
                      onClose();
                    }}>
                    Cancel
                  </Button>

                  <Button
                    backgroundColor={'#000'}
                    onPress={() => {
                      OnAddCustomTags(getTokenDetail(accessToken).LoginId);
                    }} disabled={tripText == ''}>
                    Add Tags
                  </Button>
                </Button.Group>
              </Modal.Footer>
            </Modal.Content>
          </Modal>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headText: {
    fontSize: 19,
  },
  headerView: {
    margin: 17,
    marginLeft: 25,
  },
  subheaderView: {
    marginLeft: 25,
    marginTop: 1,
  },
  subHeaderText: {
    fontSize: 15,
    fontWeight: '900',
    color: '#000',
  },
  settingsEmail: {
    fontSize: 17,
    marginLeft: 25,
    flexWrap: 'wrap',
    fontWeight: '700',
    width: '90%',
    color: '#000',
    marginTop: -10,
  },
  settingsEmailbuy: {
    fontWeight: 'bold',
    marginBottom: 1,
    color: '#0c6ab3',
    left: 10,
    flexWrap: 'wrap',
    backgroundColor: 'white',
  },

  sideHeading: {
    fontSize: 16,
    marginLeft: 25,
    marginTop: 10,
    backgroundColor: 'white',
  },
  settingsEmailContainer: {
    width: '100%', // or maxWidth: 300
  },
  settingsEmailContainerRate: {
    width: '20%',
    marginRight: 1,
    textAlign: 'center',
  },
  activityindicator: {
    right: 30,
    top: 15,
  },
  informationtext: {
    fontSize: 14,
    marginLeft: 25,
    flexWrap: 'wrap',
    width: '70%',
    color: '#00000070',
    marginTop: -15,
  },
  deleteaccount: {
    lineHeight: 30,
    fontSize: 15,
  },
  customizationheading: {
    fontSize: 16,
    marginTop: -20,
    marginLeft: 10,
    backgroundColor: 'white',
  },
  customtags: {
    fontSize: 16,
    marginTop: -15,
    marginLeft: 10,
    backgroundColor: 'white',
  },
  customtagsunit: {
    fontSize: 16,
    marginTop: -1,
    marginLeft: 10,
    backgroundColor: 'white',
  },
  CustomisationView: {
    backgroundColor: 'white',
    marginLeft: 10,
  },
  CustomisationViewsecond: {
    backgroundColor: 'white',
    marginLeft: 10,
    marginTop: -15,
  },
  container: {
    width: 50, // Total width of the switch
    height: 28, // Height of the switch track
    borderRadius: 14, // Rounded edges for the track
    justifyContent: 'center',
    padding: 2,
  },
  trackOn: {
    backgroundColor: '#f25a93', // Pink track when enabled
  },
  trackOff: {
    backgroundColor: '#e6e8eb', // Gray track when disabled
  },
  thumb: {
    width: 24, // Thumb width
    height: 24, // Thumb height
    borderRadius: 12, // Rounded edges for the thumb
    backgroundColor: '#ffffff', // White thumb
    shadowColor: '#000', // iOS-like shadow
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.5,
    elevation: 3, // Shadow for Android
  },
  custompositivetagsView: {
    width: '48%',
    marginBottom: 15,
    backgroundColor: '#f0f0f0',
    padding: 10,
    // alignItems:'center',
    // justifyContent:'center',
    borderRadius: 5,
  },
  custompositivetags: {
    fontSize: 16,
    fontWeight: '600',
    width: '80%',
    // textAlign: 'center',
    color: '#000'
  },
  customnegativetags: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  image: {
    position: 'absolute',
    top: 5,
    right: 15,
    height: 25,
    width: 25,
  },
  locTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginTop: 5,
  },
});

export default Settings;
