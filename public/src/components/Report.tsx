/* eslint-disable prettier/prettier */
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  Linking,
  TouchableOpacityProps,
  Pressable,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  IJourneyModel,
  IMileageChartModel,
  IPlanReadingModel,
} from '../models/Models';
import {
  Center,
  Box,
  Heading,
  Text,
  View,
  HStack,
  VStack,
  Image,
  Stack,
  Divider,
  ScrollView,
  useToast,
  Spinner,
  useDisclose,
  Actionsheet,
  Modal,
} from 'native-base';
import {Dimensions} from 'react-native';
import moment, {Moment} from 'moment';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {enGB, registerTranslation} from '@tashi-iu/react-native-paper-dates';
import CommonServices from '../Services/CommonServices';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import MonthSelectorCalendar from 'react-native-month-selector';
import DateRangePicker from 'rn-select-date-range';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import {GestureResponderEvent} from 'react-native-modal';
import PlusInfo, {PlusModalRef} from '../modals/PlusInfo';
import {CURRENT_HIEGHT, CURRENT_WIDTH} from '../screens/LoginScreen';
import {
  countryCurrency,
  countryDistance,
  countryDistanceCaps,
} from '../core/data';

type Props = {
  accessToken: any;
  dashboardData: IJourneyModel;
  journeyReading?: Array<IPlanReadingModel>;
  countryCode: any;
  LoginId: any;
  onAdd?: () => void;
};

const Report = ({
  accessToken,
  dashboardData,
  journeyReading,
  countryCode,
  LoginId,
  onAdd,
}: Props) => {
  const {isOpen, onOpen, onClose} = useDisclose();

  const plusInfoRef = useRef<PlusModalRef>(null);
  const plusViewRef = useRef<any>(null);

  registerTranslation('en-GB', enGB);
  const toast = useToast();
  const id = 'report-toast';
  const [inputDate, setInputDate] = useState(undefined);
  const currentMonth = moment(new Date()).format('YYYY-MM');
  const currentDate = moment(new Date()).format('YYYY-MM-DD');
  const [dataLoaded, setDataLoaded] = useState(false);
  const screenHeight = Dimensions.get('window').height;
  const [segmented, setSegmented] = useState<'3_month' | 'customDate'>(
    '3_month',
  );
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const showPicker = useCallback((value: any) => setShow(value), []);

  const [pickDate, setPickDate] = useState<Moment>();
  const [showModal, setShowModal] = useState(false);

  const reportSegment = [
    {
      segmentTile: 'Last 3 Months',
      segmentValue: '3_month',
    },
    {
      segmentTile: 'Custom date range',
      segmentValue: 'customDate',
    },
  ];

  const [chartData, setChartData] = useState<Array<IMileageChartModel>>([]);
  // const [chartDataBefor3m, setChartDataBefore3m] = useState<
  //   Array<IMileageChartModel>
  // >([]);
  const newDate = new Date();

  const [reportDate, setReportDate] = useState(new Date());
  let dayOne = moment(
    new Date(newDate.getFullYear(), newDate.getMonth(), 1),
  ).format('YYYY-MM-DD');
  var dateBefore3Months = new Date();
  dateBefore3Months.setMonth(dateBefore3Months.getMonth() - 3);

  const [range, setRange] = useState({
    startDate: dateBefore3Months,
    endDate: new Date(),
  });
  const [rangeOpen, setRangeOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState({
    firstDate: dateBefore3Months,
    secondDate: new Date(),
  });

  const onValueChange = useCallback(
    (event: any, newDate: any) => {
      const selectedDate = newDate || date;
      showPicker(false);
      setDate(selectedDate);
      setReportDate(selectedDate);
    },
    [date, showPicker],
  );

  const OnConfirm = () => {
    setShowModal(false);
  };

  const onDismiss = React.useCallback(() => {
    setRangeOpen(false);
  }, [setRangeOpen]);

  const onConfirm = React.useCallback(
    ({startDate, endDate}: any) => {
      setRangeOpen(false);
      setRange({startDate, endDate});
      // console.log(range.startDate, range.endDate);
    },
    [setRangeOpen, setRange],
  );
  const fileUrl =
    'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
  const openLink = async () => {
    try {
      // const url = 'http://starzero.inventsoftlabs.in/plans#personal?openfromapp&redirect_uri=starzero://starzero';
      const url = 'https://www.FuelSense.org/mileage-report/';
      if (await InAppBrowser.isAvailable()) {
        InAppBrowser.openAuth(url, 'fuelSense://fuelsense', {
          // iOS Properties
          ephemeralWebSession: false,
          // Android Properties
          showTitle: false,
          enableUrlBarHiding: true,
          enableDefaultShare: false,
        }).then((response: any) => {
          if (response.type === 'success' && response.url) {
            Linking.openURL(response.url);
          }
        });
      } else Linking.openURL(url);
    } catch (error: any) {}
  };

  const SegmentHandler = (val: '3_month' | 'customDate') => {
    switch (val) {
      case '3_month':
        setSelectedDate({
          firstDate: dateBefore3Months,
          secondDate: new Date(),
        });
        break;
      case 'customDate':
        setSelectedDate({
          firstDate: new Date(),
          secondDate: new Date(),
        });
        break;
      default:
        setSelectedDate({
          firstDate: dateBefore3Months,
          secondDate: new Date(),
        });
    }

    setSegmented(val);
  };

  const GetMileageChart = (
    reportMonth: any,
    reportYear: any,
    loginId: any,
    CountryCode: string,
  ) => {
    CommonServices.getWithTripleQueryParam(
      'Journey',
      'GetMileageChart',
      'reportMonth',
      reportMonth,
      'reportYear',
      reportYear,
      'loginId',
      loginId,
      CountryCode,
    )
      .then(res => {
        if (res.status === 200) {
          console.log('res', res.data);

          setChartData(res.data.responseData);
          setDataLoaded(true);
        }
      })
      .catch(e => console.log(e));
  };

  // const GetMileageChartBefore3Months = (
  //   startDate: any,
  //   endDate: any,
  //   loginId: any,
  //   CountryCode: string,
  // ) => {
  //   CommonServices.getWithTripleQueryParam(
  //     'Journey',
  //     'GetMileageReportData',
  //     'startDate',
  //     moment(startDate).format('YYYY-MM-DD'),
  //     'endDate',
  //     moment(endDate).format('YYYY-MM-DD'),
  //     'loginId',
  //     loginId,
  //     countryCode,
  //   )
  //     .then(async res => {
  //       if (res.status === 200) {
  //         console.log('report data', res.data);

  //         setChartDataBefore3m(res.data.responseData);
  //         setDataLoaded(true);
  //       }
  //     })
  //     .catch(e => console.log(e));
  // };

  let sumRes = 0;
  chartData?.forEach(num => {
    sumRes += num.mileageRate;
  });

  const GenerateChartColor = (
    data: Array<IMileageChartModel>,
    tripName: any,
  ) => {
    const sliceColor = [
      '#1984c5',
      '#22a7f0',
      '#63bff0',
      '#63bff0',
      '#a7d5ed',
      '#e2e2e2',
      '#e1a692',
      '#de6e56',
      '#e14b31',
      '#c23728',
      '#fd7f6f',
    ];
    const idx = data?.findIndex(x => x.tripName == tripName);
    return sliceColor[idx];
  };

  const askForPermission = async () => {
    try {
      if (Platform.OS == 'android') {
        const result = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'App needs access to your storage to read files',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          },
        );

        if (result !== RESULTS.GRANTED) {
          request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then(result => {
            if (result === RESULTS.GRANTED) {
              console.log('Write permission granted');
            }
          });
        }
      }
      // else {
      //     await request(PERMISSIONS.IOS.MEDIA_LIBRARY).then((statuses: any) => {
      //         if (statuses[PERMISSIONS.IOS.MEDIA_LIBRARY] == 'undefined') {
      //             Linking.openURL('app-settings:');
      //         } else {
      //             Linking.openSettings();
      //         }
      //         console.log('MEDIA_LIBRARY', statuses[PERMISSIONS.IOS.MEDIA_LIBRARY]);
      //     });

      // }
    } catch (err) {
      console.log(err);
    }
  };
  const countrySymbole = countryCurrency[countryCode ?? 'UK'];
  const distanceMeter = countryDistance[countryCode ?? 'UK'];
  useEffect(() => {
    GetMileageChart(
      moment(pickDate).format('MM'),
      moment(pickDate).format('YYYY'),
      LoginId,
      countryCode,
    );
    console.log(pickDate);
  }, [pickDate]);

  // useEffect(() => {
  //   GetMileageChartBefore3Months(
  //     moment(dateBefore3Months).format('YYYY-MM-DD'),
  //     moment(new Date()).format('YYYY-MM-DD'),
  //     LoginId,
  //     countryCode,
  //   );
  // }, []);

  useEffect(() => {
    askForPermission();
  }, []);

  const measure: (
    fx: number,
    fy: number,
    width: number,
    height: number,
    px: number,
    py: number,
  ) => void = (fx, fy, width, height, px, py) => {
    console.log(fy);
    plusInfoRef?.current?.show(py);
  };

  const onIButtonPress = useCallback((y: GestureResponderEvent) => {
    plusViewRef.current?.measure(measure);
  }, []);

  return (
    <SafeAreaView>
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
                  Mileage Report
                </Text>
              </View>
            </View>
      </Heading>
      <View style={{height: screenHeight}}>
        <ScrollView
          scrollEnabled={true}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}>
          {/* <View> */}
          <Stack
            direction="row"
            mb="3"
            mt="1"
            space={4}
            justifyContent={'center'}>
            <Center rounded="sm" shadow={'unset'}>
              <Text style={styles.contentText}>
                {!chartData || chartData?.length == 0
                  ? 0
                  : chartData.length}{' '}
                drives
              </Text>
              <Text style={styles.driveHero}>Total drives</Text>
            </Center>
            <Divider mx="2" orientation="vertical" />
            <Center rounded="sm" shadow={'unset'}>
              <Text
                style={
                  styles.contentText
                }>{`${countrySymbole}${sumRes.toFixed(2)}`}</Text>
              <Text style={styles.driveHero}>
                {countryDistanceCaps[countryCode ?? 'UK']} to claim
              </Text>
            </Center>
            <Divider mx="2" orientation="vertical" />
            <Center rounded="sm" shadow={'unset'}>
              <Text style={styles.contentText}>
                {moment(pickDate).format('MMM, YYYY')}
              </Text>
              <Text style={styles.driveHero}>Date range</Text>
            </Center>
          </Stack>

          {/* <Divider /> */}

          {/* </View> */}
          <View style={styles.monthpicker} mb="3">
            <HStack space={1} justifyContent={'left'}>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View style={{flexDirection: 'row', flex: 1}}>
                  <Text style={styles.reportMonth}>
                    {moment(pickDate).format('MMMM, YYYY')}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      showPicker(true);
                      onOpen();
                    }}>
                    <View>
                      <Image
                        source={require('../assests/monthpicker.png')}
                        width={5}
                        height={5}
                        alt="month"
                        style={{tintColor: 'black'}}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
                <Pressable
                  ref={plusViewRef}
                  style={{height: 28, width: 28}}>
                  <TouchableOpacity
                    onPress={onAdd}
                    style={{
                      borderWidth: 2,
                      borderColor: 'black',
                      borderRadius: 100,
                      padding: 2,
                      aspectRatio: 1,
                      height: 24,
                      width: 24,
                    }}>
                    <Image
                      source={require('../assests/plus1.png')}
                      style={{
                        height: '100%',
                        width: '100%',
                      }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={onIButtonPress}
                    style={{
                      position: 'absolute',
                      end: -2,
                      top: -6,
                      borderRadius: 100,
                      backgroundColor: '#000',
                      height: 16,
                      width: 16,
                      paddingLeft: 7,
                    }}>
                    <Text
                      style={{
                        fontSize: 10,
                        height: 14,
                        color: 'white',
                        marginTop: -2,
                      }}>
                      i
                    </Text>
                  </TouchableOpacity>
                </Pressable>
              </View>

              {/* {show && (
                                    // <MonthPicker
                                    //     onChange={onValueChange}
                                    //     value={reportDate}
                                    // />
                                    <MonthSelectorCalendar
                                        monthFormat={'MMM'}
                                        selectedDate={undefined}
                                        onMonthTapped={(date) => console.log({ month: date })}

                                    />
                                )} */}

              <Actionsheet isOpen={isOpen} onClose={onClose}>
                <Actionsheet.Content>
                  <MonthSelectorCalendar
                    monthFormat={'MMM'}
                    selectedDate={pickDate}
                    onMonthTapped={date => setPickDate(date)}
                  />
                </Actionsheet.Content>
              </Actionsheet>
            </HStack>
          </View>
          {!dataLoaded ? (
            <View my={'20'}>
              <HStack space={2} justifyContent="center" alignItems="center">
                <Spinner accessibilityLabel="Loading posts" color={'black'} />
                        <Heading color="black" fontSize="md">
                  Loading
                </Heading>
              </HStack>
            </View>
          ) : null}
          <View style={styles.monthpicker} my="3">
            <HStack space={20} justifyContent={'left'}>
              <HStack justifyContent={'left'}>
                <Text>Total drives</Text>
              </HStack>
              <Divider mx="7" orientation="vertical" />
              <HStack justifyContent={'right'}>
                <Text style={styles.totalRides}>
                  {!chartData || chartData[0]?.totalDriveCount == undefined
                    ? 0
                    : chartData[0]?.totalDriveCount}{' '}
                  drives
                </Text>
              </HStack>
            </HStack>
          </View>
          <View style={chartData?.length <= 1 ? null : styles.cardSection}>
            <ScrollView
              scrollEnabled={true}
              nestedScrollEnabled={true}
              showsVerticalScrollIndicator={false}>
              {chartData?.map((val, idx) => {
                return (
                  <View style={styles.viewSection} key={idx}>
                    <Box style={styles.mileCard}>
                      <HStack space={4}>
                        <Image
                          source={require('../assests/vehicle.png')}
                          alignSelf={'center'}
                          width={'40%'}
                          height={'95%'}
                          alt="vehicle"
                        />
                        <Center>
                          <VStack space={2} justifyContent="center">
                            <Text style={styles.driveTile}>
                              {val.tripName == '' ||
                              val.tripName == undefined
                                ? '--'
                                : val.tripName}
                            </Text>
                            <Text style={styles.driveRides}>
                              {val.driveCount == undefined
                                ? 0
                                : val.driveCount}{' '}
                              drives
                            </Text>
                            <HStack space={6} justifyContent={'center'}>
                              <HStack space={1.5}>
                                <Image
                                  source={require('../assests/location-pin.png')}
                                  alt="mile-icon"
                                  width={5}
                                  style={{tintColor: 'black'}}
                                  height={5}></Image>
                                <Text style={styles.miles}>
                                  {val.totalDistance.toFixed(2)}{' '}
                                  {distanceMeter}
                                </Text>
                              </HStack>
                              <Text style={styles.mileamt}>
                                {countrySymbole}{' '}
                                {val.mileageRate.toFixed(2)}
                              </Text>
                            </HStack>
                          </VStack>
                        </Center>
                      </HStack>
                    </Box>
                  </View>
                );
              })}
            </ScrollView>
          </View>
          {chartData == null || chartData?.length == 0 ? (
            <Image
              style={{
                maxHeight: 300,
                resizeMode: 'contain',
              }}
              source={require('../assests/no-rides.png')}
              alt="no-rides"
            />
          ) : null}
        </ScrollView>
      </View>
      <PlusInfo ref={plusInfoRef} onPress={onAdd} />
    </SafeAreaView>
  );
};

export default Report;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  title: {
    fontSize: 20,
    margin: 20,
  },
  mileCard: {
    borderRadius: 10,
    shadowColor: 'unset',
    backgroundColor: '#F6FAFF',
    padding: 16,
  },
  driveHero: {
    fontsize: 12,
    fontWeight: '400',
  },
  viewSection: {
    margin: 10,
    marginBottom: 1,
  },
  driveTile: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  driveRides: {
    fontWeight: '800',
    fontSize: 16,
  },
  totalRides: {
    fontWeight: '800',
    fontSize: 19,
    color: '#000',
  },
  mileamt: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  miles: {
    fontSize: 14,
    fontWeight: '400',
  },
  reportMonth: {
    fontWeight: '800',
    fontSize: 22,
    color: '#000',
  },
  monthpicker: {
    marginTop: 12,
    marginHorizontal: 10,
  },
  cardSection: {
    height: 800,
  },
  screenView: {
    height: '100%',
  },
  exportSection: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 12,
    margin: 12,
  },
  exportext: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  segmentView: {
    padding: 16,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    color: '#000',
    borderRadius: 10,
  },
  segmentViewActive: {
    padding: 16,
    paddingHorizontal: 24,
    backgroundColor: '#003f88',
    color: '#FFF',
    borderRadius: 10,
  },
  btnText: {
    fontSize: 16,
  },
  reportDate: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#003f88',
    marginVertical: 8,
  },
  dateText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#747688',
  },
  headText: {
    fontSize: 19,
  },
  contentText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 20,
  },
  legendContainer: {
    // flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overFlow: 'auto',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  legendColor: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  legendText: {
    fontSize: 13,
    color: '#000',
  },
  selectedDateContainerStyle: {
    height: 35,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
  selectedDateStyle: {
    fontWeight: 'bold',
    color: 'white',
  },
});
