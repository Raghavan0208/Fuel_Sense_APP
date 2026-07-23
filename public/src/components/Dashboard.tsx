/* eslint-disable prettier/prettier */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import { useEffect, useState, useRef } from 'react';
import {
  Pressable,
  Text,
  Box,
  HStack,
  Spacer,
  Button,
  Center,
  Heading,
  View,
  Image,
  ScrollView,
  VStack,
  AddIcon,
  Progress,
  Actionsheet,
  useDisclose,
  ChevronRightIcon,
  Spinner,
  KeyboardAvoidingView,
  FavouriteIcon,
} from 'native-base';
import {
  Alert,
  Dimensions,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { IJourneyModel, IPlanReadingModel } from '../models/Models';
import { getTokenDetail, thousandSeparator } from './Helper';
import { HelperConstant } from './HelperConstant';
import Swiper from 'react-native-swiper';
import { DataTable } from 'react-native-paper';
import { countryCurrency, countryDistance } from '../core/data';
import moment from 'moment';
import CommonServices, {
  damoovRefreshToken,
  fetchToken,
} from '../Services/CommonServices';
import React from 'react';
import {
  check,
  openSettings,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomSwitch from './CustomSwitch';
// import TelematicsSdk from 'react-native-telematics';

// import { BarChart } from "react-native-chart-kit";
import {
  checkBackGroundLocationPermission,
  checkLocationPermission,
  checkMotionPermission,
  requestNearbyDevicesPermission,
} from '../utils/Utils';
import { BarChart } from 'react-native-gifted-charts';
import CustomTextInput from './CustomTextInput';
import CustomDropDown from './CustomDropDown';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import axios from 'axios';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DateTimePickerButton from './DateTimePickerButton';

type Props = {
  accessToken: any;
  dashboardData: IJourneyModel;
  journeyReading?: Array<IPlanReadingModel>;
  countryCode: any;
  isPersonal: boolean;
  setIsPersonal: any;
  navigation?: any;
};

function Dashboard({
  accessToken,
  dashboardData,
  journeyReading,
  countryCode,
  isPersonal,
  setIsPersonal,
  navigation,
}: Props) {
  // if (!dashboardData) {
  //     return <View><Text>Loadig</Text></View>
  // }
  const screenHeight = Dimensions.get('window').height;
  return (
    <Center h="100%">
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
        w="100%">
        <Heading
          p={Platform.OS == 'android' ? '1' : '0'}
          pl="3"
          pt="3"
          size="lg">
          <View w={'100%'}>
            <Text
              color="coolGray.800"
              textTransform={'uppercase'}
              fontWeight="medium"
              style={styles.headText}>
              Dashboard
            </Text>
          </View>
        </Heading>
        <View style={{ height: screenHeight }}>
          <ScrollView
            scrollEnabled={true}
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}>
            <Basic
              navigation={navigation}
              isPersonal={isPersonal}
              setIsPersonal={setIsPersonal}
              accessToken={accessToken}
              dashboardData={dashboardData}
              journeyReading={journeyReading}
              countryCode={countryCode}
            />
          </ScrollView>
        </View>
      </Box>
    </Center>
  );
}

type emmissionProps =
  | 'FuelSense_START_Car'
  | 'FuelSense_SMART_Car'
  | 'FuelSense_Intelli_Car'
  | 'FuelSense_START_Bike'
  | 'FuelSense_SMART_Bike'
  | 'FuelSense_Intelli_Bike';

type emmissionPropsUKUS =
  | 'FuelSense_START_Car'
  | 'FuelSense_SMART_Car'
  | 'FuelSense_Intelli_Car'
  | 'FuelSense_START_Bike'
  | 'FuelSense_SMART_Bike'
  | 'FuelSense_Intelli_Bike';

function Basic({
  accessToken,
  dashboardData,
  journeyReading,
  countryCode,
  navigation,
}: any) {
  const MAX_POINTS_IN =
    HelperConstant.co2_Emmission_Based_Id[
    `${dashboardData?.planName?.replaceAll(' ', '_')}_${dashboardData?.vehicleTypeName
    }` as emmissionProps
    ];
  const MAX_POINTS_UK_US =
    HelperConstant.co2_Emmission_Based_Id_UK_US[
    `${dashboardData?.planName?.replaceAll(' ', '_')}_${dashboardData?.vehicleTypeName
    }` as emmissionPropsUKUS
    ];

  let IndiaValue =
    HelperConstant.co2_Emmission_Based_Id[
      `${dashboardData?.planName?.replaceAll(' ', '_')}_${dashboardData?.vehicleTypeName
      }` as emmissionProps
    ] <=
      Math.ceil(
        journeyReading && journeyReading?.length > 0
          ? journeyReading[journeyReading?.length - 1]?.cumulativeCo2Emission
          : 0,
      )
      ? HelperConstant.co2_Emmission_Based_Id[
      `${dashboardData?.planName?.replaceAll(' ', '_')}_${dashboardData?.vehicleTypeName
      }` as emmissionProps
      ]
      : Math.ceil(
        journeyReading && journeyReading?.length > 0
          ? journeyReading[journeyReading?.length - 1]?.cumulativeCo2Emission
          : 0,
      );
  let UKUSValue =
    HelperConstant.co2_Emmission_Based_Id_UK_US[
      `${dashboardData?.planName?.replaceAll(' ', '_')}_${dashboardData?.vehicleTypeName
      }` as emmissionPropsUKUS
    ] <=
      Math.ceil(
        journeyReading && journeyReading.length > 0
          ? journeyReading[journeyReading?.length - 1]?.cumulativeCo2Emission
          : 0,
      )
      ? HelperConstant.co2_Emmission_Based_Id_UK_US[
      `${dashboardData?.planName?.replaceAll(' ', '_')}_${dashboardData?.vehicleTypeName
      }` as emmissionPropsUKUS
      ]
      : Math.ceil(
        journeyReading && journeyReading.length > 0
          ? journeyReading[journeyReading?.length - 1]?.cumulativeCo2Emission
          : 0,
      );

  const fillbar =
    ((countryCode == 'IN' ? IndiaValue : UKUSValue) /
      (countryCode == 'IN' ? MAX_POINTS_IN : MAX_POINTS_UK_US)) *
    100;

  const getOneYearDate = (date: any) => {
    var numOfYears = 1;
    var expireDate = new Date(date);
    expireDate.setFullYear(expireDate.getFullYear() + numOfYears);
    expireDate.setDate(expireDate.getDate() - 1);

    return expireDate;
  };

  const screenWidth = Dimensions.get('window').width;

  const [isTracking, setIsTracking] = useState<boolean>(false);
  const [isAuto, setIsAuto] = useState<boolean>(false);

  const [chartData, setChartData] = useState<Array<any>>([]);
  const [listData, setListData] = useState<Array<IPlanReadingModel>>([]);
  const [totalAmount, setTotalAmount] = useState<any>(0);
  const [totalMiles, setTotalMiles] = useState<any>(0);
  const [isAutoInPressed, setIsAutoInPressed] = useState(false);
  const [resetInOut, setResetInOut] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclose();
  const [resetInOutDriveSmart, setResetInOutDriveSmart] = useState(0);
  const [isDriveSmart, setIsDriveSmart] = useState<boolean>(false);
  const [selectedYear, setSelectedYear] = useState<any>('');
  const [isOpenYear, setIsOpenYear] = useState(false);
  const [allYears, setAllYears] = useState<string[]>([]);
  const [yearytotalamount, setYearlytotalamount] = useState<any>();
  const [currentBalanceGrowth, setCurrentBalanceGrowth] = useState<any>(0);
  const [currentBalance, setCurrentBalance] = useState<any>(0);
  const [previousMonthdata, setPreviousMonthData] = useState<any>();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [checkData, setCheckData] = useState<Array<any>>([]);
  const [openManualEntryModel, setOpenManualEntryModel] = useState(false);
  const [entryDate, setEntryDate] = useState<any>('');
  const [tripType, setTripType] = useState<any>('');
  const [isSubmitPressed, setIsSubmitPressed] = useState<any>(false);
  const [fromCurrentMonth, setFromCurrentMOnth] = useState<any>('');
  const [toCurrentMonth, setToCurrentMOnth] = useState<any>('');

  const [distance, setDistance] = useState<any>();
  const [parkingExpense, setParkingExpense] = useState<any>();
  const [tollExpense, setTollExpense] = useState<any>();
  const [startJourneyTime, setStartJourneyTime] = useState(null);
  const [endJourneyTime, setEndJourneyTime] = useState(null);
  const [isStartPickerVisible, setStartPickerVisible] = useState(false);
  const [isEndPickerVisible, setEndPickerVisible] = useState(false);
  const [tripNotes, setTripNotes] = useState<any>();
  const [startLocationDescription, setStartLocationDescription] = useState('');
  const [endLocationDescription, setEndLocationDescription] = useState('');
  const [startLocation, setStartLocation] = useState<any>('');
  const [endLocation, setEndLocation] = useState<any>('');
  const mapRef = useRef<any>(null);
  const openSecondActionSheet = () => setIsOpenYear(true);
  const closeSecondActionSheet = () => setIsOpenYear(false);
  const [getCustomTags, setgetCustomTags] = useState<Array<any>>([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const { bottom } = useSafeAreaInsets();
  const [fueldata, setFuelData] = useState<Array<any>>([]);
  const [servicedata, setServiceData] = useState<Array<any>>([]);

  const [totallastMPG, setTotalLastMpg] = useState<any>();
  const [totalserviceCost, setTotalServiceCost] = useState<any>();
  const [totalfuellogforentiremonth, setfuellogforentiremonth] =
    useState<any>(0);
  const [monthwiseviewamount, setmonthwiseviewamount] = useState<any>(0);

  useEffect(() => {
    const fetchDistance = async () => {
      if (startLocation && endLocation) {
        try {
          const originValue = `${startLocation.latitude},${startLocation.longitude}`;
          const destinationValue = `${endLocation.latitude},${endLocation.longitude}`;
          const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${originValue}&destinations=${destinationValue}&key=${GOOGLE_MAPS_APIKEY}`;

          const response = await axios.get(url);
          const distanceTraveledInMeters =
            response?.data?.rows[0]?.elements[0]?.distance?.value;

          if (distanceTraveledInMeters) {
            const distanceInKilometers = distanceTraveledInMeters / 1000; // Convert meters to kilometers
            setDistance(distanceInKilometers); // Convert meters to kilometers
          }
        } catch (error) {
          console.error('Error fetching distance:', error);
        }
      }
    };

    fetchDistance();
  }, [startLocation, endLocation]); // Run when either location changes

  const handlePlaceSelect = async (data: any, details: any, isStart: any) => {
    if (isStart) {
      setStartLocationDescription(data?.description);
    }
    if (!isStart) {
      setEndLocationDescription(data?.description);
    }
    if (details && details.geometry && details.geometry.location) {
      if (isStart) {
        setStartLocation({
          latitude: details.geometry.location.lat,
          longitude: details.geometry.location.lng,
        });
      } else {
        setEndLocation({
          latitude: details.geometry.location.lat,
          longitude: details.geometry.location.lng,
        });
      }
    } else {
      console.error('Invalid location details:', details);
    }
  };

  const GetFuelLogChart = (
    reportMonth: any,
    reportYear: any,
    loginId: any,
    countryCode: any,
  ) => {
    CommonServices.getWithTripleQueryParam(
      'FuelLog',
      'GetFuelLogView',
      'reportMonth',
      reportMonth,
      'reportYear',
      reportYear,
      'loginId',
      loginId,
      countryCode,
    )
      .then(res => {
        if (res.status === 200) {
          setFuelData(res.data.responseData);
          let sumRes = 0;
          res.data.responseData?.forEach((num: any) => {
            sumRes += num.lastMPG;
          });
          setTotalLastMpg(sumRes);
        }
      })
      .catch(e => console.log(e));
  };

  const fetchAndConcatTags = (loginid: any) => {
    Promise.all([
      CommonServices.get('Master', 'GetAllDefaultTags', countryCode),
      CommonServices.getWithSingleParam(
        'CustomTags',
        'GetCustomTagsByLoginid',
        loginid,
        countryCode,
      ),
    ])
      .then(([defaultTagsRes, customTagsRes]) => {
        if (defaultTagsRes?.status === 200 && customTagsRes?.status === 200) {
          const combinedTags = [...defaultTagsRes.data, ...customTagsRes.data];
          setgetCustomTags(combinedTags);
        } else {
          console.error('One or both responses failed', {
            defaultTagsRes,
            customTagsRes,
          });
        }
      })
      .catch(e => {
        // Handle any errors that occurred in either request
        console.error('Error fetching tags:', e.response?.data || e.message);
      });
  };

  const GetServiceLogChart = (
    reportMonth: any,
    reportYear: any,
    loginId: any,
    countryCode: any,
  ) => {
    CommonServices.getWithTripleQueryParam(
      'ServiceLog',
      'GetServiceLogView',
      'reportMonth',
      reportMonth,
      'reportYear',
      reportYear,
      'loginId',
      loginId,
      countryCode,
    )
      .then(res => {
        if (res.status === 200) {
          setServiceData(res.data.responseData);
          let sumRes = 0;
          res.data.responseData?.forEach((num: any) => {
            sumRes += num.serviceCost;
          });
          setTotalServiceCost(sumRes);
        }
      })
      .catch(e => console.log(e));
  };

  useEffect(() => {
    setSelectedYear('');
    setDataLoaded(false);
    // getDefaultTags();
    // getCustomTagsByLoginid(getTokenDetail(accessToken).LoginId);
    GetTwelveMonths(getTokenDetail(accessToken)?.LoginId, '', countryCode);
    getJourneyDetails(dashboardData.id, countryCode);
    updateSdkStatus();
    GetFuelLogChart(
      moment(new Date()).format('MM'),
      moment(new Date()).format('YYYY'),
      getTokenDetail(accessToken)?.LoginId,
      countryCode,
    );
    GetServiceLogChart(
      moment(new Date()).format('MM'),
      moment(new Date()).format('YYYY'),
      getTokenDetail(accessToken)?.LoginId,
      countryCode,
    );
  }, [dashboardData.id, countryCode]);

  useEffect(() => {
    let sumres = 0;
    checkData?.forEach(num => {
      sumres += num.totalDistance;
      setfuellogforentiremonth(sumres);
    });
    if (!checkData || checkData.length === 0) return;
    if (!selectedYear) {
      const monthAggregates = {} as any;
      const yearAggregates = {} as any;
      const uniqueYears = new Set(allYears);
      checkData.forEach((item: any) => {
        if (item) {
          const MonthName = item?.monthName;
          const distance = Number(item?.distance);
          const rateValue = item?.rateValue;
          const entryYear = item?.entryYear;
          uniqueYears.add(item?.entryYear);
          var totalAmount = 0;
          // if (item && item?.tripName != 'Personal') {
          //   totalAmount = distance * rateValue;
          // }

          if (monthAggregates[MonthName]) {
            monthAggregates[MonthName].sumOfMiles += distance;
            monthAggregates[MonthName].totalAmount += item.totalDistance;
            monthAggregates[MonthName].entryYear = entryYear;
          } else {
            monthAggregates[MonthName] = {
              monthName: MonthName,
              sumOfMiles: distance,
              totalAmount: item.totalDistance,
              entryYear: entryYear,
            };
          }
          if (yearAggregates[entryYear]) {
            yearAggregates[entryYear] += item.totalDistance;
          } else {
            yearAggregates[entryYear] = item.totalDistance;
          }
        }
      });
      const currentMonthName = moment().format('MMM'); // Get current month (e.g., "Feb")
      const currentMonthTotalAmount =
        monthAggregates[currentMonthName]?.totalAmount || 0;
      setCurrentBalance(currentMonthTotalAmount);

      const findAvailableMonth = (startOffset: number) => {
        let offset = startOffset;
        while (offset < 12) {
          let monthToCheck = moment().subtract(offset, 'months').format('MMM');
          if (monthAggregates[monthToCheck]?.totalAmount > 0) {
            return monthToCheck;
          }
          offset++;
        }
        return null;
      };

      const firstComparisonMonth = findAvailableMonth(1);
      const secondComparisonMonth = firstComparisonMonth
        ? findAvailableMonth(
          moment().diff(moment(firstComparisonMonth, 'MMM'), 'months') + 1,
        )
        : null;
      setPreviousMonthData(firstComparisonMonth);
      setPreviousMonthData(secondComparisonMonth);

      if (firstComparisonMonth && secondComparisonMonth) {
        setFromCurrentMOnth(firstComparisonMonth);
        setToCurrentMOnth(secondComparisonMonth);
      } else {
        setToCurrentMOnth(moment(new Date()).format('MMM'));
      }

      const firstMonthTotalAmount = firstComparisonMonth
        ? monthAggregates[firstComparisonMonth]?.totalAmount || 0
        : 0;
      const secondMonthTotalAmount = secondComparisonMonth
        ? monthAggregates[secondComparisonMonth]?.totalAmount || 0
        : 0;

      const percentageChangeGrowth =
        secondMonthTotalAmount !== 0
          ? ((firstMonthTotalAmount - secondMonthTotalAmount) /
            firstMonthTotalAmount) *
          100
          : 0;
      setCurrentBalanceGrowth(percentageChangeGrowth);
      setDataLoaded(true);
    }
  }, [checkData]);

  const getMonthWithYear = (monthAbbreviation: string) => {
    if (!monthAbbreviation) return '';

    let monthIndex = moment().month(monthAbbreviation).month();
    let year = moment().year();
    if (monthIndex > moment().month()) {
      year -= 1;
    }
    return `${monthAbbreviation} ${year}`;
  };

  const updateSdkStatus = async () => {
    try {
      // const isEnabled = await TelematicsSdk.getStatus();
      // setIsDriveSmart(isEnabled);
      // setIsTracking(JSON.parse(newValue));
      const newValue = await AsyncStorage.getItem('ejt');
      console.log('🚀 ~ getAutoOnOffValue ~ Dashboard:', String(newValue).toLowerCase() === 'true');
      setIsTracking(String(newValue).toLowerCase() === 'true');
    } catch (error: any) {
      console.log(error);
    }
  };

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

  const enableSDK = async () => {
    try {
      const deviceToken: any = await AsyncStorage.getItem('deviceToken');
      const res = JSON.parse(deviceToken);
      if (res?.DeviceToken) {
        const { Token } = res?.AccessToken;
        // const isEnabled = await TelematicsSdk.enable(res?.DeviceToken);

        const createdDate = moment(res?.created);
        const tenDaysAgo = moment().add(10, 'days');
        // if (isEnabled) {
        //   if (createdDate.isAfter(tenDaysAgo)) {
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
    console.log('Disabling SDK');
    try {
      // await TelematicsSdk.disable();
      updateSdkStatus();
    } catch (error: any) {
      console.error('Disable SDK Error:', error);
    }
  };

  let totalfuelcostforentiremonth = 0;

  const GetTwelveMonths = (loginId: any, year: string, CountryCode: string) => {
    CommonServices.getWithDoubleQueryParam(
      'Journey',
      'GetTwelveMonths',
      'loginId',
      loginId,
      'year',
      year,
      CountryCode,
    )
      .then(res => {
        if (res.status === 200) {
          setCheckData(res.data.responseData);
          res.data?.responseData.forEach((item: any) => {
            totalfuelcostforentiremonth += item.totalDistance;
            setmonthwiseviewamount(totalfuelcostforentiremonth);
          });
          const monthAggregates = {} as any;
          const yearAggregates = {} as any;
          const uniqueYears = new Set(allYears);
          res.data?.responseData.forEach((item: any) => {
            if (item) {
              const MonthName = item?.monthName;
              const distance = Number(item?.distance);
              const rateValue = item?.rateValue;
              const entryYear = item?.entryYear;
              uniqueYears.add(item?.entryYear);
              var totalAmount = 0;
              // if (item && item?.tripName != 'Personal') {
              //   totalAmount = item.totalDistance;
              // }
              const key = `${MonthName}_${entryYear}`;

              if (monthAggregates[key]) {
                monthAggregates[key].sumOfMiles += distance;
                monthAggregates[key].totalAmount += item.totalDistance;
              } else {
                monthAggregates[key] = {
                  monthName: MonthName,
                  entryYear: entryYear,
                  sumOfMiles: distance,
                  totalAmount: item.totalDistance,
                };
              }

              if (yearAggregates[entryYear]) {
                yearAggregates[entryYear] += item.totalDistance;
              } else {
                yearAggregates[entryYear] = item.totalDistance;
              }
            }
          });

          const formattedData = Object.values(monthAggregates);
          const totalAmountByYear = Object.entries(yearAggregates).map(
            ([year, total]) => ({
              year,
              totalAmount: total,
            }),
          );
          setChartData(formattedData);
          setAllYears(Array.from(uniqueYears));
          setYearlytotalamount(totalAmountByYear);
          setDataLoaded(true);
        }
      })
      .catch(e => console.log(e));
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
          setListData(res?.data);
          let sumOfMiles = 0;
          let totalAmount = 0;
          res.data?.map((item: any) => {
            sumOfMiles += Number(item?.distance);
            if (item && item?.name != 'Personal') {
              totalAmount +=
                Number(item?.distance) * item?.userVehicleDetails?.rateValue;
            }
          });
          setTotalAmount(totalAmount);
          setTotalMiles(sumOfMiles);
        }
      })
      .catch((e: string) => {
        console.log(e);
      });
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

              if (ask == RESULTS.GRANTED) {
                resolve();
              } else {
                openSettings();
                // if (ask == RESULTS.BLOCKED) {
                //   openSettings();
                // } else {
                //   reject();
                // }
              }
            },
          },
        ],
      );
    });
  };

  const trackingHandler = async (types: 'click' | 'change', value: boolean) => {
    try {
      if (value) {
        const bkPermission =
          Platform.OS == 'ios'
            ? PERMISSIONS.IOS.LOCATION_ALWAYS
            : PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION;
        const checkPer = await check(bkPermission);
        if (checkPer != RESULTS.GRANTED) {
          await askBackGroundPermission();
        }
        // const granted = await check(
        //   Platform.OS == 'ios'
        //     ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        //     : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        // );

        // if (granted != RESULTS.GRANTED) {

        //   await askLocationPermission();
        // } else {

        // }
      } else {
        console.log('without value', value);
      }
      setIsAutoInPressed(true);
      // setType(types);
      // setInOutValue(value);
      try {
        if (types == 'change') {
          setIsTracking(value);
          await AsyncStorage.setItem('ejt', JSON.stringify(value));
        }
        if (types == 'click') {
          // const newValue = !value;
          // await AsyncStorage.setItem('ejt', JSON.stringify(newValue));
          // setIsTracking(newValue);
        }
        // onClose();
      } catch (error) {
        // console.error('Error in trackingHandler:', error);
      }
    } catch (error) {
      onPermissionDenied();
      // console.error(error);
    }
    setTimeout(() => {
      setResetInOut(v => v + 1);
    }, 0);
  };

  const onPermissionDenied = async () => {
    setIsTracking(false);
    await AsyncStorage.setItem('ejt', JSON.stringify(false));
    // onClose();
    setIsAutoInPressed(false);
  };

  const countrySymbole = countryCurrency[countryCode];
  const distanceMeter = countryDistance[countryCode ?? 'UK'];

  const allMonths = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const formattedMonth = allMonths.map(month => {
    const matchingMonthData = chartData.filter(
      item => item.monthName === month,
    );
    const totalForMonth = matchingMonthData.reduce(
      (sum, entry) => sum + (entry.totalAmount || 0),
      0,
    );

    return {
      monthName: month,
      totalAmount: totalForMonth,
    };
  });

  const yAxisLabels = ['5k', '4k', '3k', '2k', '1k', '0']; // Top 10k, bottom 0k

  const data = formattedMonth.map(item => ({
    value: item.totalAmount,
    label: item.monthName,
  }));

  if (!dataLoaded) {
    return (
      <HStack space={2} justifyContent="center">
        <Spinner accessibilityLabel="Loading posts" color={'black'} />
        <Heading color="black" fontSize="md">
          Loading
        </Heading>
      </HStack>
    );
  }

  const onCancelPress = () => {
    setOpenManualEntryModel(false);
    setIsSubmitPressed(false);
    setEndLocation(null);
    setStartLocation(null);
  };

  const onSubmitPress = () => {
    setIsSubmitPressed(true);
    if (
      tripType.length === 0 ||
      startLocation.length === 0 ||
      endLocation === 0
    ) {
      Alert.alert(
        'Missing Information',
        'Please fill in all the required fields to register.',
      );
    } else {
      let data = {};
      data = {
        id: 0,
        created: new Date(),
        createdBy: 0,
        modified: '2023-08-22T10:03:32.140Z',
        modifiedBy: 0,
        active: true,
        userPlanId: dashboardData.id,
        entryDate: new Date(),
        reading: distance,
        distance: distance,
        co2Emission: 0,
        readingImagePath: 'imageTest',
        rowOrder: 1,
        isNotEmmitted: false,
        name: tripType,
        imageName: 'imgtest',
        cumulativeCo2Emission: 0,
        cumulativeDistance: 0,
        uploadFiles: null,
        latitude: `${startLocation?.latitude}/${endLocation?.latitude}`,
        longitude: `${startLocation?.longitude}/${endLocation?.longitude}`,
        parkingExpenses: parkingExpense,
        tollExpenses: tollExpense,
        IsNotEmmitted: false,
        tripNotes: tripNotes,
        unit: distanceMeter,
        startLocation: startLocationDescription,
        endLocation: endLocationDescription,
        UserVehicleDetails: null,
        RequestDetails: null,
        startJourneyTime: moment(startJourneyTime).format('HH:mm:ss'),
        endJourneyTime: moment(endJourneyTime).format('HH:mm:ss'),
      };

      CommonServices.post('Journey', 'RecordReading', data, countryCode)
        .then(res => {
          if (res?.status === 200) {
            setIsSubmitPressed(false);
            GetTwelveMonths(
              getTokenDetail(accessToken)?.LoginId,
              '',
              countryCode,
            );
            getJourneyDetails(dashboardData.id, countryCode);
            Alert.alert('Success', 'Journey Added Successfully');
            setOpenManualEntryModel(false);
          }
        })
        .catch(e => {
          console.error('Error posting data:', e.response?.data || e.message);
        });
    }
  };

  const onFuelLogViewPress = () => {
    navigation.navigate('FuelLogView');
  };

  const onServiceLogViewPress = () => {
    navigation.navigate('ServiceLogView');
  };

  const onInsuranceLogViewPress = () => {
    navigation.navigate('InsuranceLogView');
  };

  const GOOGLE_MAPS_APIKEY = 'AIzaSyClEJhfMqEtTy6dcofhkDL1RvfhVTO2wss';
  const screenHeight = Dimensions.get('window').height;
  return (
    <View style={{ height: screenHeight }}>
      <ScrollView
        scrollEnabled={true}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        maxHeight={'100%'}
        contentContainerStyle={{
          paddingBottom: 100,
        }}>
        <View p="3">
          <Text style={styles.userName} mb={3}>
            Hello, {getTokenDetail(accessToken)?.Email.split('@')[0]}
          </Text>

          <View style={{ marginBottom: 20 }}>
            <VStack space={1} width={'100%'}>
              <HStack space={4}>
                <TouchableOpacity
                  onPress={() => {
                    fetchAndConcatTags(getTokenDetail(accessToken)?.LoginId);
                    setOpenManualEntryModel(true);
                    setEntryDate(
                      moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                    );
                  }}>
                  <View style={styles.iconCard}>
                    <Image
                      source={require('../assests/location.png')}
                      alt="Manual Entry"
                      style={{ width: 28, height: 28, tintColor: '#9c27b0' }}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={onFuelLogViewPress}>
                  <View style={styles.iconCard}>
                    <Image
                      source={require('../assests/fueltankimg.png')}
                      alt="Fuellog"
                      style={{ width: 28, height: 28, tintColor: '#1976d2' }}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={onServiceLogViewPress}>
                  <View style={styles.iconCard}>
                    <Image
                      source={require('../assests/serviceimg.png')}
                      alt="servicelog"
                      style={{ width: 28, height: 28, tintColor: '#2e7d32' }}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={onInsuranceLogViewPress}>
                  <View style={styles.iconCard}>
                    <Image
                      source={require('../assests/insuranceimg.png')}
                      alt="insurancelog"
                      style={{ width: 28, height: 28, tintColor: '#ed6c02' }}
                    />
                  </View>
                </TouchableOpacity>
              </HStack>
            </VStack>
          </View>
          {/* <Pressable>
            <Button.Group margin={5} mt={1}>
              <Button
                backgroundColor={'#dadada'}
                size={'md'}
                width={'33%'}
                h="10"
                onPress={onFuelLogViewPress}
                left={-5}
                _text={{
                  color: 'black',
                  fontWeight: '600',
                  fontSize: '15',
                }}
              >
                Fuel Log
              </Button>
              <Button
                backgroundColor={'#dadada'}
                width={'34%'}
                onPress={onServiceLogViewPress}
                h="10"
                _text={{
                  color: 'black',
                  fontWeight: '600',
                  fontSize: '15',
                }}
                size={'md'}>
                Service Log
              </Button>
              <Button
                backgroundColor={'#dadada'}
                width={'33%'}
                onPress={onInsuranceLogViewPress}
                h="10"
                _text={{
                  color: 'black',
                  fontWeight: '600',
                  fontSize: '15',
                }}
                size={'md'}>
                Insurance Log
              </Button>
            </Button.Group>
          </Pressable> */}

          <Center
            h="56"
            w="100%"
            bg="white"
            borderWidth="0.5"
            rounded="8"
            borderColor="coolGray.300"
            overflow="hidden" // Ensures rounded corners are respected
          >
            <VStack>
              <Swiper
                showsButtons={false}
                dotStyle={styles.dot}
                activeDotStyle={styles.activeDot}
                dotColor="#ccc"
                activeDotColor="#000"
                loop={false}
                style={styles.swiper}
                autoplay={false}
                autoplayTimeout={5}>
                <View style={styles.slide}>
                  <Text style={styles.text}>
                    <Text style={{ fontSize: 20, fontWeight: '500' }}>
                      {countrySymbole}
                    </Text>{' '}
                    {totalfuellogforentiremonth.toFixed(2)}
                  </Text>
                  <Text style={styles.textHeading}>Amount</Text>
                </View>
                <View style={styles.slide}>
                  <Text style={styles.text}>
                    {thousandSeparator(totalMiles.toFixed(2))}
                    <Text style={{ fontSize: 20, fontWeight: '500' }}>
                      {' '}
                      {distanceMeter}
                    </Text>
                  </Text>

                  {/* <Text style={styles.text}>
                    {thousandSeparator(totalMiles.toFixed(2))} {distanceMeter}
                  </Text> */}
                  <Text style={styles.textHeading}>Distance</Text>
                </View>
                <View style={styles.slide}>
                  <Text style={styles.text}>
                    {thousandSeparator(
                      Math.round(countryCode == 'IN' ? IndiaValue : UKUSValue),
                    )}{' '}
                    <Text style={{ fontSize: 20, fontWeight: '500' }}> g</Text>
                  </Text>
                  <Text style={styles.textHeading}>Co2</Text>
                </View>
              </Swiper>
              <HStack justifyContent={'center'}>
                <Pressable>
                  <Button.Group margin={5} mt={1}>
                    <Button
                      backgroundColor={'#dadada'}
                      size={'md'}
                      width={'50%'}
                      h="10"
                      onPress={() => onOpen()}
                      left={-5}
                      _text={{
                        color: 'black',
                        fontWeight: '600',
                        fontSize: '15',
                      }}
                      leftIcon={<AddIcon size={3} color="black" />}>
                      Add Money
                    </Button>
                    <Button
                      backgroundColor={'#dadada'}
                      width={'50%'}
                      onPress={() => onOpen()}
                      h="10"
                      _text={{
                        color: 'black',
                        fontWeight: '600',
                        fontSize: '15',
                      }}
                      leftIcon={<AddIcon size={3} color="black" />}
                      size={'md'}>
                      Add Offset
                    </Button>
                  </Button.Group>
                </Pressable>
              </HStack>
            </VStack>
          </Center>
        </View>

        <View p="3" width={'100%'}>
          <Box
            rounded="8"
            px="4"
            py="2"
            borderWidth="0.5"
            borderColor="coolGray.300">
            <HStack alignItems="center" space={1}>
              {dashboardData.vehicleTypeName == 'Car' && (
                <Image
                  mr="3"
                  width={'20'}
                  height={'20'}
                  source={require('../assests/car_dashboard.png')}
                  alt="jorney"
                />
              )}
              {dashboardData.vehicleTypeName == 'Bike' && (
                <Image
                  mr="3"
                  width={'16'}
                  height={'16'}
                  source={require('../assests/bike_dashboard.png')}
                  alt="jorney"
                />
              )}

              {(dashboardData.brandName == 'undefined' || dashboardData.brandName == '' || dashboardData.brandName == 'Audi' || dashboardData.brandName == null) ?
                <TouchableOpacity style={styles.fab} onPress={() => {
                  navigation.navigate('AddVehicle');
                }}>
                  <AddIcon name="plus" size={15} color="white" />
                </TouchableOpacity> :
                <VStack space={2} style={styles.vehicleinfostack}>
                  {countryCode == 'UK' ?
                    <>
                      <Text style={styles.vehicleinfotext}>
                        {dashboardData?.brandSeriesName}
                      </Text>
                      <Text style={styles.vehicleinfotextsub}>
                        {dashboardData?.brandName}
                      </Text>
                    </> :
                    <>
                      <Text style={styles.vehicleinfotext}>
                        {dashboardData?.brandName} {dashboardData?.brandSeriesName}
                      </Text><Text style={styles.vehicleinfotextsub}>
                        {dashboardData?.brandVariantName}
                      </Text>
                    </>}
                  <Text style={styles.vehicleinfotextsub}>
                    Valid:{' '}
                    {moment(getOneYearDate(dashboardData?.purchaseDate)).format(
                      'DD MMM, YYYY',
                    )}
                  </Text>
                </VStack>
              }
            </HStack>
          </Box>
        </View>

        <View p="3" width={'100%'}>
          <Box px="4" py="2">
            <VStack space={2} style={styles.vehicleinfostack}>
              <Text style={styles.planinfohead}>{dashboardData.planName}</Text>
              <HStack space={'24'}>
                <Text style={styles.planinfosub}>
                  {countryCode == 'IN' ? MAX_POINTS_IN : MAX_POINTS_UK_US} g Co2
                  ={' '}
                  {(countryCode == 'IN' ? MAX_POINTS_IN : MAX_POINTS_UK_US) /
                    1000000}
                  T Co2
                </Text>

                <Text style={styles.planinfosub} fontWeight={'bold'}>
                  {thousandSeparator(
                    Math.round(countryCode == 'IN' ? IndiaValue : UKUSValue),
                  )}{' '}
                  g
                </Text>
              </HStack>
              <Progress
                bg="#dadada"
                _filledTrack={{
                  bg: '#000',
                }}
                value={fillbar}
                size="sm"
                width="100%"
              />
            </VStack>
          </Box>
        </View>

        <View p="3" width={'100%'}>
          <HStack space={1} justifyContent="center">
            <Box
              rounded="8"
              width="32"
              px="4"
              py="2"
              borderWidth="0.5"
              borderColor="coolGray.300">
              <VStack space={2} style={styles.vehicleinfoplan}>
                <Text style={styles.vehicleinfotext}>Last MPG</Text>
                <Text style={styles.infoblock}>{totallastMPG?.toFixed(2)}</Text>
              </VStack>
            </Box>
            <Box
              rounded="8"
              width="32"
              px="4"
              py="2"
              borderWidth="0.5"
              borderColor="coolGray.300">
              <VStack space={2} style={styles.vehicleinfoplan}>
                <Text style={styles.vehicleinfotext}>Service count</Text>
                <Text style={styles.infoblock}>{servicedata.length}</Text>
              </VStack>
            </Box>
            <Box
              rounded="8"
              width="32"
              px="4"
              py="2"
              borderWidth="0.5"
              borderColor="coolGray.300">
              <VStack space={2} style={styles.vehicleinfoplan}>
                <Text style={styles.vehicleinfotext}>Service cost</Text>
                <Text style={styles.infoblock}>
                  {countrySymbole} {totalserviceCost?.toFixed(2)}
                </Text>
              </VStack>
            </Box>
          </HStack>
        </View>

        {chartData.length != 0 && (
          <>
            <>
              <View p="5" width={'100%'}>
                <Text style={styles.planinfohead} mb="4">
                  Last 12 Months Fuel Cost
                </Text>
                <DataTable
                  style={{
                    borderWidth: 0.5, // Border for all sides
                    borderColor: '#aeaeae',
                    borderRadius: 10,
                  }}>
                  <DataTable.Header
                    style={{
                      backgroundColor: '#E0E0E0',
                      borderTopRightRadius: 10,
                      borderTopLeftRadius: 10,
                    }}>
                    <DataTable.Title style={{ paddingLeft: 20 }}>
                      <Text style={{ fontSize: 15, fontWeight: '500' }}>
                        Month
                      </Text>
                    </DataTable.Title>
                    <DataTable.Title numeric style={{ paddingRight: 20 }}>
                      <Text style={{ fontSize: 15, fontWeight: '500' }}>
                        Amount ({countrySymbole})
                      </Text>
                    </DataTable.Title>
                  </DataTable.Header>
                  {chartData?.map((item, index) => (
                    <DataTable.Row
                      key={`${item.monthName}_${item.entryYear}_${index}`}>
                      <DataTable.Cell style={{ paddingLeft: 20 }}>
                        <Text
                          style={{
                            fontSize: 15,
                          }}>{`${item.monthName}, ${item.entryYear}`}</Text>
                      </DataTable.Cell>
                      <DataTable.Cell numeric style={{ paddingRight: 20 }}>
                        <Text style={{ fontSize: 15 }}>
                          {' '}
                          {countrySymbole} {item.totalAmount.toFixed(2)}
                        </Text>
                      </DataTable.Cell>
                    </DataTable.Row>
                  ))}
                </DataTable>
              </View>
              <View p="4" width={'100%'}>
                <HStack
                  alignItems="flex-end"
                  justifyContent="space-between"
                  w="100%"
                  mb="4">
                  <Text style={styles.planinfohead}>Month Wise View</Text>

                  <HStack alignItems="flex-end" space={2}>
                    <TouchableOpacity
                      onPress={openSecondActionSheet}
                      style={styles.yearSelector}>
                      <HStack alignItems="center" space={2}>
                        {allYears.length !== 0 && (
                          <Image
                            source={require('../assests/calendar.png')}
                            style={styles.filterIcon}
                            alt="img"
                          />
                        )}
                        <Text style={styles.yearText}>
                          {selectedYear ? selectedYear : 'Select the Year'}
                        </Text>
                      </HStack>
                    </TouchableOpacity>

                    <Actionsheet
                      isOpen={isOpenYear}
                      onClose={closeSecondActionSheet}>
                      <Actionsheet.Content>
                        <Box w="100%" h={60} px={4} justifyContent="center">
                          <Text fontSize="16" color="gray.500">
                            Select the Year
                          </Text>
                        </Box>
                        {allYears.map(year => (
                          <Actionsheet.Item
                            key={year}
                            onPress={() => {
                              setSelectedYear(year);
                              closeSecondActionSheet();
                              setDataLoaded(false);
                              GetTwelveMonths(
                                getTokenDetail(accessToken)?.LoginId,
                                year,
                                countryCode,
                              );
                            }}>
                            {year}
                          </Actionsheet.Item>
                        ))}
                      </Actionsheet.Content>
                    </Actionsheet>
                  </HStack>
                </HStack>

                <Box
                  rounded="8"
                  borderWidth="0.5"
                  px="2"
                  py="2"
                  borderColor="coolGray.100">
                  <Text style={styles.infoblock} mb="5" pt="1" pl="1">
                    Total Amount
                  </Text>
                  {selectedYear ? (
                    yearytotalamount?.map((item: any) => (
                      <Text
                        key={item.year}
                        style={styles.planinfohead}
                        mb="5"
                        pt="1"
                        pl="1">
                        {countrySymbole + ' ' + item.totalAmount.toFixed(2)}
                      </Text>
                    ))
                  ) : (
                    <Text style={styles.planinfohead} mb="5" pt="1" pl="1">
                      {countrySymbole + ' ' + monthwiseviewamount.toFixed(2)}
                    </Text>
                  )}
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {/* Static Y-Axis Labels */}
                    <View style={styles.yAxisLabelsContainer}>
                      {yAxisLabels.map((label, index) => (
                        <Text key={index} style={styles.yAxisLabel}>
                          {countrySymbole} {label}
                        </Text>
                      ))}
                    </View>

                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      style={{ paddingLeft: 1 }}>
                      <BarChart
                        width={screenWidth + 60}
                        data={data.map((item, index) => ({
                          ...item,
                          frontColor:
                            index === selectedIndex ? '#4f4f4f' : '#4f4f4f', // highlight selected
                        }))}
                        // roundedTop
                        frontColor="#4f4f4f"
                        height={200}
                        maxValue={5000} // Set a constant max value for the Y-axis
                        barWidth={20}
                        barBorderRadius={3}
                        isAnimated
                        yAxisIndicesColor={'transparent'}
                        yAxisTextStyle={{ color: '#287ab8', fontSize: 12 }}
                        yAxisColor={'#287ab8'}
                        hideYAxisText
                        onPress={(item: any, index: any) => {
                          setSelectedIndex(index);
                        }}
                        renderTooltip={(item: any) =>
                          selectedIndex !== null ? (
                            <View
                              style={{
                                position: 'absolute',
                                backgroundColor: '#fff',
                                padding: 6,
                                borderRadius: 4,
                                borderColor: '#ccc',
                                borderWidth: 1,
                                top: -40,
                              }}>
                              <Text style={{ fontSize: 12 }}>
                                {countrySymbole + ' ' + item.value.toFixed(2)}
                              </Text>
                            </View>
                          ) : null
                        }
                        yAxisThickness={0.1}
                        xAxisThickness={0.1}
                        xAxisLabelTextStyle={{
                          fontSize: 10,
                        }}
                      />
                    </ScrollView>
                  </View>
                </Box>
              </View>
            </>
            <View p="4" width={'100%'} style={{ paddingBottom: bottom + 80 }}>
              <Box
                rounded="8"
                px="4"
                py="2"
                borderWidth="0.5"
                borderColor="coolGray.300">
                <HStack alignItems="center" space={1}>
                  <VStack space={2} style={styles.vehicleinfostack}>
                    <HStack space={'1'}>
                      <Text style={styles.planinfosub}>Current Balance</Text>
                      <Text fontWeight={'bold'}>
                        {toCurrentMonth && fromCurrentMonth
                          ? `${getMonthWithYear(
                            toCurrentMonth,
                          )} to ${getMonthWithYear(fromCurrentMonth)}`
                          : getMonthWithYear(toCurrentMonth)}
                      </Text>
                      {/* ) : (
                        ''
                      )} */}
                    </HStack>
                    <Text style={styles.planinfohead}>
                      {countrySymbole} {currentBalance.toFixed(2)}{' '}
                      <Text style={{ fontSize: 11, fontWeight: '400' }}>
                        (for {moment().format('MMM YYYY')})
                      </Text>
                    </Text>

                    <HStack alignItems="end" space={2}>
                      <Image
                        alt="filter"
                        source={require('../assests/Trendingup.png')} // Adjust the path as needed
                        style={[
                          styles.filterIcon,
                          {
                            tintColor:
                              currentBalanceGrowth > 0
                                ? 'green'
                                : currentBalanceGrowth < 0
                                  ? 'red'
                                  : 'gray',
                          },
                        ]}
                        mt="0.5"
                      />
                      <Text
                        style={[
                          styles.growthtext,
                          {
                            color:
                              currentBalanceGrowth > 0
                                ? 'green'
                                : currentBalanceGrowth < 0
                                  ? 'red'
                                  : 'gray',
                          },
                        ]}>
                        Growth: {currentBalanceGrowth.toFixed(2)}%
                      </Text>
                    </HStack>
                  </VStack>
                </HStack>
              </Box>
            </View>
          </>
        )}

        {chartData.length == 0 && (
          <Box style={styles.withoutview}>
            <Text style={styles.withoutjourneyheading}>
              Your vehicle details are here! To access complete journey data,
              Create a journey now.{' '}
              <Text
                style={styles.withoutjourneysubheading}
                onPress={() => {
                  fetchAndConcatTags(getTokenDetail(accessToken)?.LoginId);
                  setOpenManualEntryModel(true);
                  setEntryDate(
                    moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                  );
                }}>
                Click here to create your journey
              </Text>
            </Text>
          </Box>
        )}
        <Box>
          <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content p={4}>
              <HStack>
                <Actionsheet.Item
                // onPress={() => {
                //   trackingHandler('click', isTracking);
                // }}
                >
                  Auto Opt IN/OUT
                </Actionsheet.Item>
                <View style={{ position: 'absolute', right: 10, top: 15 }}>
                  <CustomSwitch
                    key={resetInOut}
                    value={isTracking}
                    onValueChange={(val: any) => trackingHandler('change', val)}
                    onText={'IN'}
                    offText={'OUT'}
                  />
                </View>
              </HStack>
              {/* <HStack>
                <Actionsheet.Item>DriveSMART ON/OFF</Actionsheet.Item>
                <Spacer />
                <View style={{ position: 'absolute', right: 10, top: 15 }}>
                  <CustomSwitch
                    key={resetInOutDriveSmart}
                    value={isDriveSmart}
                    onValueChange={handleSwitchChange}
                    onText={'ON'}
                    offText={'OFF'}
                  />
                </View>
              </HStack> */}
              <HStack justifyContent="space-between" alignItems="center">
                <Actionsheet.Item
                  onPress={() => {
                    fetchAndConcatTags(getTokenDetail(accessToken)?.LoginId);
                    setOpenManualEntryModel(true);
                    setEntryDate(
                      moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                    );
                  }}>
                  <Text style={{ fontSize: 16 }} ml="7">
                    Manual Entry
                  </Text>
                </Actionsheet.Item>
                <ChevronRightIcon mr="10" size="4" />
              </HStack>
            </Actionsheet.Content>
          </Actionsheet>
        </Box>

        <Modal
          visible={openManualEntryModel}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setOpenManualEntryModel(false)}>
          <KeyboardAvoidingView
            style={styles.modalContainer}
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  setOpenManualEntryModel(false);
                  setIsSubmitPressed(false);
                  setEndLocation(null);
                  setStartLocation(null);
                }}>
                <Text style={styles.closeText}>X</Text>
              </TouchableOpacity>
              <Text style={styles.header}>Create Your Trip Record</Text>
              <ScrollView
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingTop: 10,
                  flexGrow: 1,
                }}>
                <Text ml="1" style={styles.locTitle}>
                  Entry Date *
                </Text>
                <CustomTextInput
                  placeHolder={`Date`}
                  textInputStyle={{
                    backgroundColor: '#edecec',
                    borderRadius: 10,
                  }}
                  defaultValue={entryDate}
                  value={entryDate}
                  editable={false}
                />
                <Text ml="1" style={styles.locTitle}>
                  Trip Type *
                </Text>
                <CustomDropDown
                  data={
                    getCustomTags
                    //     countryCode == 'UK'
                    // ? TripCatagoryUK
                    // : countryCode == 'IN'
                    // ? TripcategoryIn
                    // : TripCategory
                  }
                  placeholder="Trip Type"
                  value={tripType}
                  setValue={setTripType}
                  customStyle={{ paddingLeft: 10 }}
                />
                {isSubmitPressed && tripType.length === 0 ? (
                  <Text style={styles.errorText}>Trip Type is Required</Text>
                ) : (
                  ''
                )}
                <Text ml="1" style={styles.locTitle} mb="2">
                  Location *
                </Text>
                <View height={screenWidth * 0.36} mb={4}>
                  <MapView
                    ref={mapRef}
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    region={{
                      latitude: startLocation
                        ? startLocation.latitude
                        : 37.7749,
                      longitude: startLocation
                        ? startLocation.longitude
                        : -122.4194,
                      latitudeDelta: 0.5, // Reduced delta for better zoom
                      longitudeDelta: 0.5,
                    }}>
                    {/* Start Location Marker */}
                    {startLocation && (
                      <Marker coordinate={startLocation}>
                        <Image
                          source={require('../assests/location-pin-green.png')}
                          style={{ width: 30, height: 30 }}
                          alt="Start Location"
                        />
                      </Marker>
                    )}

                    {/* End Location Marker */}
                    {endLocation && (
                      <Marker coordinate={endLocation}>
                        <Image
                          source={require('../assests/location-pin-red.png')}
                          style={{ width: 30, height: 30 }}
                          alt="End Location"
                        />
                      </Marker>
                    )}
                    {startLocation && endLocation && (
                      <MapViewDirections
                        origin={startLocation}
                        destination={endLocation}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={5}
                        strokeColor="#4090fc"
                        optimizeWaypoints={true}
                      />
                    )}
                  </MapView>
                </View>
                <Text ml="1" style={styles.locTitle}>
                  Start Location *
                </Text>
                <GooglePlacesAutocomplete
                  placeholder="Type your Start Location"
                  fetchDetails={true}
                  onPress={(data, details) => {
                    handlePlaceSelect(data, details, true);
                  }}
                  query={{
                    key: GOOGLE_MAPS_APIKEY,
                    language: 'en',
                  }}
                  styles={{
                    textInputContainer: {
                      backgroundColor: '#fcfcfc', // White background
                      borderRadius: 10, // Rounded corners
                      borderWidth: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderColor: '#aaa',
                      marginTop: 8,
                      marginBottom: 8,
                    },
                    textInput: {
                      height: 38,
                      fontSize: 14,
                      paddingHorizontal: 12, // Inner padding for text
                      borderRadius: 10, // Rounded text box
                      backgroundColor: '#fcfcfc', // Light grey background
                      // textAlign: 'start', // Center the placeholder text
                      color: '#000',
                      paddingTop: 10,
                      fontWeight: '400',
                    },
                    predefinedPlacesDescription: {
                      color: '#1faadb', // Suggestion text color
                    },
                    poweredContainer: {
                      display: 'none', // Hide "Powered by Google" branding if needed
                    },
                  }}
                />
                {isSubmitPressed && !startLocation ? (
                  <Text style={styles.errorText}>
                    Start location is Required
                  </Text>
                ) : (
                  ''
                )}
                <Text ml="1" style={styles.locTitle}>
                  End Location *
                </Text>
                <GooglePlacesAutocomplete
                  placeholder="Type your End Location"
                  fetchDetails={true}
                  onPress={(data, details) => {
                    handlePlaceSelect(data, details, false);
                  }}
                  query={{
                    key: GOOGLE_MAPS_APIKEY,
                    language: 'en',
                  }}
                  styles={{
                    textInputContainer: {
                      backgroundColor: '#fcfcfc', // White background
                      borderRadius: 10, // Rounded corners
                      borderWidth: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderColor: '#aaa',
                      marginTop: 8,
                      marginBottom: 8,
                    },
                    textInput: {
                      height: 38,
                      fontSize: 14,
                      paddingHorizontal: 12, // Inner padding for text
                      borderRadius: 10, // Rounded text box
                      backgroundColor: '#fcfcfc', // Light grey background
                      // textAlign: 'start', // Center the placeholder text
                      color: '#000',
                      paddingTop: 10,
                      fontWeight: '400',
                    },
                    predefinedPlacesDescription: {
                      color: '#1faadb', // Suggestion text color
                    },
                    poweredContainer: {
                      display: 'none', // Hide "Powered by Google" branding if needed
                    },
                  }}
                />
                {isSubmitPressed && !endLocation ? (
                  <Text style={styles.errorText}>End location is Required</Text>
                ) : (
                  ''
                )}
                <Text ml="1" style={styles.locTitle}>
                  {`Distance * (in ${distanceMeter})`}
                </Text>
                <CustomTextInput
                  placeHolder={`Distance * (in ${distanceMeter})`} // Update units as needed
                  value={distance?.toFixed(2) || ''}
                  textInputStyle={{
                    backgroundColor: '#edecec',
                    borderRadius: 10,
                  }}
                  editable={false} // Make it non-editable
                />
                <Text ml="1" style={styles.locTitle}>
                  Parking Expenses
                </Text>
                <CustomTextInput
                  placeHolder="Parking Expenses"
                  defaultValue={''}
                  value={parkingExpense}
                  onValueChange={setParkingExpense}
                />
                <Text ml="1" style={styles.locTitle}>
                  Toll Expenses
                </Text>
                <CustomTextInput
                  placeHolder="Toll Expenses"
                  defaultValue={''}
                  value={tollExpense}
                  onValueChange={setTollExpense}
                />
                <Text ml="1" style={styles.locTitle}>
                  Start Journey Time
                </Text>
                <DateTimePickerButton
                  label="Select Start Time"
                  value={startJourneyTime}
                  onConfirm={(date: any) => setStartJourneyTime(date)}
                />
                {/* {isSubmitPressed && !startJourneyTime ? (
                  <Text style={styles.errorText}>
                    Start startJourneyTime is Required
                  </Text>
                ) : (
                  ''
                )} */}

                <Text ml="1" style={styles.locTitle}>
                  End Journey Time
                </Text>
                <DateTimePickerButton
                  label="Select End Time"
                  value={endJourneyTime}
                  onConfirm={(date: any) => setEndJourneyTime(date)}
                />
                {/* {isSubmitPressed && !endJourneyTime ? (
                  <Text style={styles.errorText}>
                    Start endJourneyTime is Required
                  </Text>
                ) : (
                  ''
                )} */}
                <Text ml="1" style={styles.locTitle}>
                  Trip Notes
                </Text>
                <CustomTextInput
                  placeHolder="Trip Notes"
                  defaultValue={''}
                  value={tripNotes}
                  onValueChange={setTripNotes}
                  multiline
                />
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={onCancelPress}
                    style={styles.cancelButton}>
                    <Text style={[styles.buttonText, { color: '#F88379' }]}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <View
                    style={{ height: 25, width: 1, backgroundColor: 'gray' }}
                  />
                  <TouchableOpacity
                    onPress={onSubmitPress}
                    style={styles.confirmButton}>
                    <Text style={[styles.buttonText, { color: '#7ec8e3' }]}>
                      Submit
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headText: {
    fontSize: 19,
  },
  points: {
    textAlign: 'center',
    color: '#7591af',
    fontSize: 16,
    fontWeight: '900',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#152d44',
    padding: 50,
  },
  pointsDelta: {
    color: '#4c6479',
    fontSize: 50,
    fontWeight: '100',
  },
  pointsDeltaActive: {
    color: '#fff',
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfo: {
    flex: 1,
    marginLeft: 10,
  },
  userName: {
    fontWeight: '900',
    fontSize: 20,
    color: '#000',
  },
  userFollowers: {
    color: '#999',
  },
  themecolor: {
    color: '#0c6ab3',
  },
  swiper: {
    height: 'auto',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff',
  },
  text: {
    color: '#000',
    fontSize: 25,
    fontWeight: '900',
    marginBottom: 10,
    paddingTop: 15,
  },
  textHeading: {
    color: '#000',
    fontSize: 15,
    fontWeight: '400',
    paddingBottom: 40,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginHorizontal: 3,
    backgroundColor: '#00000014',
  },
  // filterIcon: {
  //   height: 15,
  //   width: 15,
  // },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    marginHorizontal: 3,
    backgroundColor: '#000',
  },
  vehicleinfostack: {
    width: '100%',
    overflow: 'hidden', // Ensure text doesn't overflow
    flexShrink: 1, // Allow text to shrink
  },
  vehicleinfotext: {
    fontSize: 18,
    fontWeight: 'bold',
    flexWrap: 'wrap',
  },
  vehicleinfotextsub: {
    fontSize: 15,
    flexWrap: 'wrap',
  },
  containerbar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  yAxisLabelsContainer: {
    marginRight: 10,
  },
  yAxisLabel: {
    fontSize: 12,
    color: 'black',
    height: 40, // Adjust for even spacing
    textAlign: 'right',
  },
  // planinfohead: {
  //   fontSize: 19,
  //   fontWeight: 'bold',
  //   flexWrap: 'wrap',
  //   width: '100%',
  // },
  planinfosub: {
    fontSize: 15,
    flexWrap: 'wrap',
    marginBottom: 10,
    width: '50%',
  },
  vehicleinfoplan: {
    width: '100%',
    overflow: 'hidden', // Ensure text doesn't overflow
    flexShrink: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  infoblock: {
    fontSize: 17,
    flexWrap: 'wrap',
    marginBottom: 10,
    fontWeight: '400',
  },
  growthtext: {
    fontSize: 15,
    fontWeight: '400',
  },
  locTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#003f88',
    marginTop: 5,
  },
  containermap: {
    flex: 1,
    height: '20%',
    padding: 10,
  },
  textInput: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  autocompleteContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
  },
  textInputContainer: {
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: 'row',
    backgroundColor: '#aeaeae',
    alignItems: 'center',
    borderColor: '#aaa',
    marginTop: 10,
  },
  textInputStyle: {
    flex: 1,
    paddingHorizontal: 12,
    color: '#000',
    paddingVertical: 0,
    fontSize: 14,
    fontWeight: '500',
  },
  errorText: {
    color: '#ff0000',
    paddingLeft: 5,
    fontSize: 15,
    marginTop: -5,
    marginBottom: 5,
    fontWeight: '400',
  },
  withoutjourneyheading: {
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 28,
    color: 'black',
  },
  withoutjourneysubheading: {
    fontWeight: '800',
    fontSize: 16,
    lineHeight: 28,
    color: '#000',
  },
  withoutview: {
    alignItems: 'center',
    borderRadius: 10,
    padding: 4,
    marginTop: 20,
    backgroundColor: '#fff9ee',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    height: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  scrollContainer: {
    paddingBottom: 30,
  },

  mapContainer: {
    height: 200,
    marginVertical: 10,
  },

  marker: {
    width: 30,
    height: 30,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  cancelButton: {
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  confirmButton: {
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
  },
  iconCard: {
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  planinfohead: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  filterIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  yearSelector: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    borderRadius: 6,
  },
  yearText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 0,
    backgroundColor: 'grey',
    width: 40,
    height: 40,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Adds shadow for Android
    shadowColor: '#000', // Adds shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
});

export default Dashboard;
