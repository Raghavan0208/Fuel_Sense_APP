/* eslint-disable */
import {
  Box,
  Button,
  Image,
  Modal,
  ScrollView,
  Stack,
  Text,
  useDisclose,
  VStack,
} from 'native-base';
import { useCallback,useEffect, useRef, useState } from 'react';
import {
  Alert,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import Dashboard from '../components/Dashboard';
import { getTokenDetail } from '../components/Helper';
import Journey from '../components/Journey';
import LiveMap from '../components/LiveMap';
import NewRecord from '../components/NewRecord';
import ReportsUi from '../components/ReportsUi';
import Settings from './Settings';
import { IJourneyModel, IPlanReadingModel } from '../models/Models';
import CommonServices from '../Services/CommonServices';
import LoginScreen from './LoginScreen';
import TimeOutModal from './TimeOutModal';
import Report from '../components/Report';
import { useRoute } from '@react-navigation/native';

import {
  check,
  openSettings,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';
import moment from 'moment';
import { promptForEnableLocationIfNeeded } from 'react-native-android-location-enabler';

type RecordProps = {
  startLocation: { lat: any; lng: any };
  endLocation: { lat: any; lng: any };
  travelledDistance: any;
  startTime: any;
};

function MainScreen({ navigation }: any) {
  const [accessToken, setAccessToken] = useState<any>();
  const [screen, setScreen] = useState<
    | 'Journey'
    | 'Dashboard'
    | 'Settings'
    | 'login'
    | 'Record'
    | 'Report'
    | 'ReportsUI'
  >('Dashboard');
  const [dashboardData, setDashboardData] = useState<IJourneyModel>(
    {} as IJourneyModel,
  );
  // const [type, setType] = useState('');
  // const [inOutValue, setInOutValue] = useState(false);
  const [isPlanGet, setIsPlanGet] = useState(false);
  const [isAutoInPressed, setIsAutoInPressed] = useState(false);
  const isPlanActive = useRef(true);
  const currentPlan = useRef(null);
  const [journeyReading, setJourneyReading] =
    useState<Array<IPlanReadingModel>>();
  const [modalVisible, setModalVisible] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const [country, setCountry] = useState('');
  const [isPersonal, setIsPersonal] = useState(true);
  const [helpModal, setHelpModal] = useState(false);
  const [isTracking, setIsTracking] = useState<boolean>(false);
  const [showTimeOutModal, setShowTimeOutModal] = useState<boolean>(false);
  const isFirstTime = useRef<boolean>(true);
  const { isOpen, onOpen, onClose } = useDisclose();
  const isFocused = useIsFocused();
  const [update, setUpdate] = useState(false);
  const [isManualRecordOn, setIsManualRecordOn] = useState<boolean>(false);
  const [resetInOut, setResetInOut] = useState(0);
  const [selectedTab, setSelectedTab] = useState<'Journey' | 'Dashboard' | 'Settings' | 'login' | 'Record' | 'Report'>('Dashboard');
  useFocusEffect(() => {
    checkBackLocation();
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setUpdate(v => !v);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [screen]);

  const routerHandler = (
    screen:
      | 'Journey'
      | 'Dashboard'
      | 'Settings'
      | 'login'
      | 'Record'
      | 'Report',
  ) => {
    // if (screen == 'Settings') {
    //   onOpen();
    // } else {
    setScreen(screen);
    setSelectedTab(screen);
    // }
  };

    const route = useRoute();
    useFocusEffect(
      useCallback(() => {
        const screenName = route?.params?.screenName;
        if (screenName) {
          console.log("Received screenName:", screenName);
          setScreen(screenName);
        }
      }, [route?.params?.screenName])
    );

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
          setJourneyReading(res.data);
        }
      })
      .catch((e: string) => {
        console.log(e);
      });
  };

  const GetDashboard = (country: string, LoginId: any) => {
    console.log('GetDashboard called with country:', country, 'LoginId:', LoginId);
    CommonServices.getWithQueryParam(
      'Journey',
      'GetDashboard',
      'loginId',
      LoginId,
      country,
    )
      .then(res => {
        console.log('Dashboard data:', res.status);
        if (res.status == 200) {
          setDashboardData(res.data);
          getJourneyDetails(res.data.id, country);
        }
      })
      .catch(e => console.log(e));
  };

  useEffect(() => {
    ViewLogin();
  }, [isFocused, screen, update]);

  const getOneYearDate = (date: any) => {
    var numOfYears = 1;
    var expireDate = new Date(date);
    expireDate.setFullYear(expireDate.getFullYear() + numOfYears);
    expireDate.setDate(expireDate.getDate() - 1);

    return expireDate;
  };

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
      // if (planId == 7 && currDate > date) {
      //   isPlanActive.current = false;
      //   setShowTimeOutModal(true);
      // }
      // if (planId != 7 && currDate > date) {
      //   isPlanActive.current = false;
      //   setShowTimeOutModal(true);
      // }
      setIsPlanGet(true);
    } catch (e) {
      console.log('Error', e);
    } finally {
      console.log('true');
    }
  };

  const checkBackLocation = async () => {
    const bkPermission =
      Platform.OS == 'ios'
        ? PERMISSIONS.IOS.LOCATION_ALWAYS
        : PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION;
    const checkPer = await check(bkPermission);
    if (checkPer == RESULTS.GRANTED) {
      const data: any = await AsyncStorage.getItem('ejt');
      const isTracking = JSON.parse(data)
      setIsTracking(isTracking)

      // if (isTracking) {

      //   setIsTracking(true);
      // } else {
      //   console.log('false');
      // }
    }
  };

  useEffect(() => {
    AsyncStorage.getItem('star-zero-token').then(res => {
      if (res == null) {
      }
      if (res) {
        AsyncStorage.getItem('CountryId').then(ress => {
          if (ress) {
            isFirstTime.current = false;
            let code = JSON.parse(ress);
            setAccessToken(res);
            setCountry(code);
            const loginId = getTokenDetail(res)?.LoginId;
            AsyncStorage.setItem('LOGIN_ID', loginId);
            GetDashboard(code, loginId);
          }
        });
      }
    });
  }, [accessToken]);

    const requestEnableGPSAndGetLocation = async () => {
      try {
        if(Platform.OS === 'android') {
         const enableResult = await promptForEnableLocationIfNeeded();
          console.log('enableResult', enableResult);
          if(enableResult === 'enabled' || enableResult === 'already-enabled') {
               navigation.navigate('AutoTracker');
            }
        }else{
          navigation.navigate('AutoTracker');
        }
         
         
      } catch (err) {
          const error = err as Error;
          console.log('❌ GPS not enabled:', error.message);
          Alert.alert('Location Required', error.message || 'Please enable GPS to continue.');
      }
  };

  const onBackModalPress = () => {
    // setShowTimeOutModal(false);
  };

  const onUpgradePress = () => {
    setShowTimeOutModal(false);
    navigation.navigate('Subscription', { required: true });
  };
  // console.log('isTracking && !isManualRecordOn', isTracking && !isManualRecordOn);


  return (
    <Box height={'100%'} background={'white'}>
      <TimeOutModal
        onBackGroundPress={onBackModalPress}
        setShowModal={setShowTimeOutModal}
        showModal={showTimeOutModal}
        onUpgradePress={onUpgradePress}
      />
      {/* {isAutoInPressed && (
        <LocationPermission
          allowAllTime
          onPermissionGranted={() => trankingHelper()}
          onPermissionDenied={onPermissionDenied}
        />
      )} */}

      <View>
        {accessToken ? (
          <View>
            {/* {info ?
              <Alert maxW="400" status="info" colorScheme="info">
                <VStack space={2} flexShrink={1} w="100%">
                  <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
                    <HStack flexShrink={1} space={2} alignItems="center">
                      <Alert.Icon />
                      <Text fontSize="sm" fontWeight="medium" color="coolGray.800">
                        Your Journey will be AutoTracked when App is Open.
                      </Text>
                    </HStack>
                  </HStack>
                </VStack>
              </Alert>
              :
              null
            } */}
            <LiveMap
              isTracking={isTracking && !isManualRecordOn}
              setIsTracking={(c: boolean) => {
                setIsTracking(c);
                setTimeout(() => {
                  setResetInOut(v => v + 1);
                }, 0);
              }}
              LoginId={dashboardData?.id}
              countryCode={country}
              isPersonal={isPersonal}
            />
            <Box
              rounded="xl"
              height={'full'}
              backgroundColor="white"
              _text={{
                fontSize: 'md',
                fontWeight: 'medium',
                color: 'white',
                textAlign: 'center',
              }}>
              <View>
                <Box>
                  {screen == 'Dashboard' ? (
                    <Dashboard
                      navigation={navigation}
                      accessToken={accessToken}
                      dashboardData={dashboardData}
                      journeyReading={journeyReading}
                      countryCode={country}
                      isPersonal={isPersonal}
                      setIsPersonal={setIsPersonal}
                    />
                  ) : screen == 'Journey' ? (
                    <Journey
                      accessToken={accessToken}
                      dashboardData={dashboardData}
                      countryCode={country}
                    />
                  ) : screen == 'Record' ? (
                    <NewRecord
                      LoginId={dashboardData.id}
                      accessToken={accessToken}
                      dashboardData={dashboardData}
                      countryCode={country}
                      isBackgroundOn={isTracking}
                      isManualRecordOn={isManualRecordOn}
                      setIsManualRecordOn={setIsManualRecordOn}
                      setScreen={setScreen}
                      setIsTracking={setIsTracking}
                    />
                  ) : // <Record
                    //   LoginId={dashboardData.id}
                    //   accessToken={accessToken}
                    //   dashboardData={dashboardData}
                    //   countryCode={country}
                    //   isBackgroundOn={isTracking}
                    // />
                    screen == 'ReportsUI' ? (
                      <ReportsUi
                        LoginId={getTokenDetail(accessToken).LoginId}
                        accessToken={accessToken}
                        dashboardData={dashboardData}
                        countryCode={country}
                        onBack={setScreen?.bind(null, 'Report')}
                      />
                    ) : screen == 'Report' ? (
                      <Report
                        LoginId={getTokenDetail(accessToken).LoginId}
                        accessToken={accessToken}
                        dashboardData={dashboardData}
                        countryCode={country}
                        onAdd={setScreen?.bind(null, 'ReportsUI')}
                      />
                    ) : screen == 'Settings' ? (
                      <Settings navigation={navigation} dashboardData={dashboardData}
                        accessToken={accessToken} setAccessToken={setAccessToken}
                        countryCode={country} setScreen={setScreen} setCountry={setCountry} />
                    ) : <></>}
                </Box>
              </View>
            </Box>
          </View>
        ) : (
          <ScrollView height={'100%'}>
            <LoginScreen
              navigation={navigation}
              setAccessToken={setAccessToken}
              setScreen={setScreen}
            />
          </ScrollView>
        )}
      </View>
      <>
       
      </>
      {accessToken ? (
        <Box
          ml="2"
          position="absolute"
          height="70"
          borderRadius={10}
          shadow="9"
          width="96%"
          bottom="4"
          backgroundColor="white"
        >
          <VStack mt="1">
            <Stack direction="row" mb="2.5" mt="1.5">
              {[
                { name: 'Dashboard', image: require('../assests/dashboardimage.png') },
                { name: 'Journey', image: require('../assests/journeyimage.png') },
                { name: 'Report', image: require('../assests/reportimage.png') },
                { name: 'Record', image: require('../assests/recordimage.png') },
                { name: 'Settings', image: require('../assests/settingsImage.png') },
              ].map(tab => (
                <VStack key={tab.name} width="20%" alignItems="center">
                  <TouchableOpacity onPress={() => routerHandler(tab.name as any)}>
                    <>
                      <Image
                        source={tab.image}
                        alignSelf="center"
                        width="6"
                        height="6"
                        alt={tab.name}
                        style={{
                          marginBottom: 4,
                          tintColor: selectedTab === tab.name ? 'purple' : 'black',
                        }}
                      />
                      <Text
                        fontWeight="small"
                        color={selectedTab === tab.name ? 'purple.900' : 'black'}
                      >
                        {tab.name}
                      </Text>
                    </>
                  </TouchableOpacity>
                </VStack>
              ))}
            </Stack>
          </VStack>
          {accessToken && (
            <TouchableOpacity
              onPress={async () => {
              requestEnableGPSAndGetLocation();
              }}
                style={{
                  position: 'absolute',
                  bottom: 150,
                  right: 20,
                  backgroundColor: 'black',
                  padding: 16,
                  borderRadius: 30,
                  elevation: 5,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.3,
                  shadowRadius: 4,
                }}
              >
              <Image
              alt='Journey'
                source={require('../assests/recenter.png')} // Replace with actual icon
                style={{ width: 24, height: 24, tintColor: 'white' }}
              />
            </TouchableOpacity>
          )}

        </Box>

      ) : null}
    </Box>
  );
}

export default MainScreen;
