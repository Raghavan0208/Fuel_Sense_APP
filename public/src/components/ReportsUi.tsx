/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import MonthSelectorCalendar from 'react-native-month-selector';
import {
  Alert,
  Animated,
  Dimensions,
  Easing,
  PermissionsAndroid,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import RNFS from 'react-native-fs';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import React, {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  IJourneyModel,
  IMileageChartModel,
  IPlanReadingModel,
  renderTrip,
} from '../models/Models';
import {
  Actionsheet,
  Box,
  Divider,
  FlatList,
  Image,
  Stack,
  Text,
  useDisclose,
  useToast,
} from 'native-base';
import moment, {Moment} from 'moment';
import {PieChart} from 'react-native-svg-charts';
import {Circle, G, Text as SvgText} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../helpers/StackParams';
import {enGB, registerTranslation} from '@tashi-iu/react-native-paper-dates';
import CommonServices from '../Services/CommonServices';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import axios from 'axios';
import Share from 'react-native-share';
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
  onBack?: () => void;
};

type renderProps = {
  item: renderTrip;
  index: number;
};

const Labels = ({slices}: any) => {
  return slices?.map((slice: any, index: number) => {
    const {labelCentroid, pieCentroid, data} = slice;
    return (
      <G key={index}>
        <SvgText
          key={index}
          x={labelCentroid[0]}
          y={labelCentroid[1]}
          fill={'white'}
          textAnchor={'middle'}
          alignmentBaseline={'middle'}
          fontSize={14}>
          {data.value + '%'}
        </SvgText>
      </G>
    );
  });
};

const data = [
  {
    label: '50%',
    value: 50,
    svg: {
      fill: '#008FFB',
      onPress: () => console.log('50'),
    },
    key: `pie-${1}`,
  },
  {
    label: '25%',
    value: 25,
    svg: {
      fill: '#FEB019',
      onPress: () => console.log('25'),
    },
    key: `pie-${2}`,
  },
  {
    label: '25%',
    value: 25,
    svg: {
      fill: '#F94144',
      onPress: () => console.log('25'),
    },
    key: `pie-${3}`,
  },
];

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ReportSummary'
>;

const ReportsUi = ({
  accessToken,
  dashboardData,
  journeyReading,
  countryCode,
  LoginId,
  onBack,
}: Props) => {
  const {isOpen, onOpen, onClose} = useDisclose();
  registerTranslation('en-GB', enGB);

  const [isPieChartVisible, setIsPieChartVisible] = useState(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const animatedRotation = useRef(new Animated.Value(0)).current;

  const {top, bottom} = useSafeAreaInsets();

  const navigation = useNavigation<HomeScreenNavigationProp>();

  // DATA FROM PREVIOUS SCREEN
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

  const [pickDate, setPickDate] = useState<Moment>(moment());
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

  const milesConverter = 1.609;
  const [chartData, setChartData] = useState<Array<IMileageChartModel>>([]);
  const [chartDataBefor3m, setChartDataBefore3m] = useState<
    Array<IMileageChartModel>
  >([]);

  const [reportDate, setReportDate] = useState(new Date());
  const newDate = new Date();
  const mileConverter = 1.609;
  let dayOne = moment(
    new Date(newDate.getFullYear(), newDate.getMonth(), 1),
  ).format('YYYY-MM-DD');
  var dateBefore3Months = new Date();
  dateBefore3Months.setMonth(dateBefore3Months.getMonth() - 3);
  var dateAfterMonth = new Date();
  dateAfterMonth.setMonth(dateAfterMonth.getMonth() + 1);

  const [range, setRange] = useState({
    startDate: dateBefore3Months,
    endDate: new Date(),
  });
  const [rangeOpen, setRangeOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState({
    firstDate: dateBefore3Months,
    secondDate: new Date(),
  });

  const sumRes = useMemo(() => {
    return chartDataBefor3m
      ?.filter(
        x => moment(x.entryDate).format('M') == moment(pickDate).format('M'),
      )
      .reduce((acc, num) => acc + num.mileageRate, 0);
  }, [chartDataBefor3m, pickDate]);

  const GetMileageChartBefore3Months = (
    startDate: any,
    endDate: any,
    loginId: any,
    CountryCode: string,
  ) => {
    CommonServices.getWithTripleQueryParam(
      'Journey',
      'GetMileageReportData',
      'startDate',
      moment(startDate).format('YYYY-MM-DD'),
      'endDate',
      moment(endDate).format('YYYY-MM-DD'),
      'loginId',
      loginId,
      countryCode,
    )
      .then(async res => {
        if (res.data?.responseStatusCode === 200) {
          console.log('daya', res.data);

          setChartDataBefore3m(res.data.responseData);
          setDataLoaded(true);
        }
      })
      .catch(e => console.log(e));
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
        if (res.data?.responseStatusCode === 200) {
          setChartData(res.data.responseData);
          setDataLoaded(true);
        }
      })
      .catch(e => console.log(e));
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

  useEffect(() => {
    GetMileageChart(
      moment(pickDate).format('MM'),
      moment(pickDate).format('YYYY'),
      LoginId,
      countryCode,
    );
  }, [pickDate]);

  useEffect(() => {
    GetMileageChartBefore3Months(
      moment(dateBefore3Months).format('YYYY-MM-DD'),
      moment().format('YYYY-MM-DD'),
      LoginId,
      countryCode,
    );
  }, []);

  useEffect(() => {
    askForPermission();
  }, []);

  const convertToPdf = async (data: any, fileName: string) => {
    try {
      console.log('load start');
      let file = await RNHTMLtoPDF?.convert({
        html: data,
        fileName: fileName,
        directory: 'Downloads',
      });

      return file;
    } catch (er) {
      console.log('er', er);
    }
  };
  const downloadPdfHandler = async ({startDate, endDate, loginId}: any) => {
    CommonServices.getWithTripleQueryParam(
      'Journey',
      'GetMileageReport',
      'startDate',
      moment(startDate).format('YYYY-MM-DD'),
      'endDate',
      moment(endDate).format('YYYY-MM-DD'),
      'loginId',
      loginId,
      countryCode,
    )
      .then(async res => {
        console.log(
          'dates',
          moment(new Date()).format('YYYY-MM-DD'),
          moment(endDate).format('YYYY-MM-DD'),
        );
        if (res.status === 200) {
          const pdfRes = await axios.post(
            'https://exceltopdf-egovlwku5q-uc.a.run.app',
            {
              fileData: res.data,
            },
            {
              headers: {
                Authorization: 'dgWpK93qKPPAqG8dVD4xreteLMfjjr',
              },
            },
          );

          const downloadDir =
            Platform.OS === 'ios'
              ? RNFS.LibraryDirectoryPath
              : RNFS.DownloadDirectoryPath;

          const fileName = `FuelSense_Mileage_Report-${moment(startDate).format(
            'YYYY-MM-DDTHH-mm-ss',
          )}_${moment(endDate).format(
            'YYYY-MM-DDTHH-mm-ss',
          )}-${new Date().getTime()}`;

          const pdfFile = await convertToPdf(pdfRes.data.pdfBase64, fileName);

          const folderPath = `${downloadDir}/FuelSense`;
          const filePath = `${downloadDir}/${fileName}.pdf`;

          try {
            // Create the folder if it doesn't exist
            const folderExists = await RNFS.exists(folderPath);
            if (!folderExists) {
              await RNFS.mkdir(folderPath);
            }

            const finalFilePath = `${folderPath}/${fileName}.pdf`;

            await RNFS.moveFile(pdfFile?.filePath, finalFilePath);

            if (Platform.OS === 'ios') {
              Share.open({
                url: finalFilePath,
                title: 'Save your report file',
                type: 'application/pdf',
                failOnCancel: false,
              });
            }

            const fileExists = await RNFS.exists(finalFilePath);

            if (!toast.isActive(id)) {
              toast.show({
                id,
                render: () => {
                  return (
                    <Box bg="emerald.600" px="2" py="1" rounded="sm" mb={5}>
                      <Text color={'#FFFFFF'} fontWeight={'bold'}>
                        Your Mileage report has been downloaded successfully.
                      </Text>
                      <Text color={'#FFFFFF'} fontWeight={'semibold'}>
                        Kindly Check your download folder.
                      </Text>
                    </Box>
                  );
                },
              });
            }
          } catch (error) {
            console.log(error);
            Alert.alert('Error', 'File download failed');
          }
        }

        if (res.status === 204) {
          if (!toast.isActive(id)) {
            toast.show({
              id,
              render: () => {
                return (
                  <Box bg="error.500" px="2" py="1" rounded="sm" mb={5}>
                    <Text color={'#FFFFFF'} fontWeight={'semibold'}>
                      No rides available for the given date range
                    </Text>
                  </Box>
                );
              },
            });
          }
        }
      })
      .catch(e => console.log(e));
  };

  const GetMileageReport = async ({startDate, endDate, loginId}: any) => {
    CommonServices.getWithTripleQueryParam(
      'Journey',
      'GetMileageReport',
      'startDate',
      moment(startDate).format('YYYY-MM-DD'),
      'endDate',
      moment(endDate).format('YYYY-MM-DD'),
      'loginId',
      loginId,
      countryCode,
    )
      .then(async res => {
        if (res?.status === 200) {
          // try {
          //   let basePath = `${RNFetchBlob.fs.dirs.DownloadDir}/STARZero`;
          //   const filePath = `${basePath}/STARZero_Mileage_Report-${moment(
          //     startDate,
          //   ).format('YYYY-MM-DDTHH-mm-ss')}_${moment(endDate).format(
          //     'YYYY-MM-DDTHH-mm-ss',
          //   )}.xlsx`;
          //   const exists = await RNFetchBlob.fs.exists(basePath);
          //   let count = 1;

          //   if (exists) {
          //     await RNFetchBlob.fs.writeFile(filePath, res.data, 'base64');
          //   } else {
          //     RNFetchBlob.fs.mkdir(basePath);
          //     await RNFetchBlob.fs.writeFile(filePath, res.data, 'base64');
          //   }
          //   if (!toast.isActive(id)) {
          //     toast.show({
          //       id,
          //       render: () => {
          //         return (
          //           <Box bg="emerald.600" px="2" py="1" rounded="sm" mb={5}>
          //             <Text color={'#FFFFFF'} fontWeight={'bold'}>
          //               Your Mileage report has been downloaded successfully.
          //             </Text>
          //             <Text color={'#FFFFFF'} fontWeight={'semibold'}>
          //               Kindly Check your download folder.
          //             </Text>
          //           </Box>
          //         );
          //       },
          //     });
          //   }
          // } catch (error) {
          //   Alert.alert('Error', 'File download failed');
          // }
          const downloadDir =
            Platform.OS === 'ios'
              ? RNFS.DocumentDirectoryPath
              : RNFS.DownloadDirectoryPath;

          const fileName = `FuelSense_Mileage_Report-${moment(startDate).format(
            'YYYY-MM-DDTHH-mm-ss',
          )}_${moment(endDate).format(
            'YYYY-MM-DDTHH-mm-ss',
          )}-${new Date().getTime()}.xlsx`;

          const folderPath = `${downloadDir}/FuelSense`;
          const filePath = `${downloadDir}/${fileName}`;

          try {
            // Create the folder if it doesn't exist
            const folderExists = await RNFS.exists(folderPath);
            if (!folderExists) {
              await RNFS.mkdir(folderPath);
            }

            const finalFilePath = `${folderPath}/${fileName}`;

            await RNFS.writeFile(filePath, res.data, 'base64');
            await RNFS.moveFile(filePath, finalFilePath);

            if (Platform.OS === 'ios') {
              Share.open({
                url: finalFilePath,
                title: 'Save your report file',
                type: 'application/pdf',
                failOnCancel: false,
              });
            }

            if (!toast.isActive(id)) {
              toast.show({
                id,
                render: () => {
                  return (
                    <Box bg="emerald.600" px="2" py="1" rounded="sm" mb={5}>
                      <Text color={'#FFFFFF'} fontWeight={'bold'}>
                        Your Mileage report has been downloaded successfully.
                      </Text>
                      <Text color={'#FFFFFF'} fontWeight={'semibold'}>
                        Kindly Check your download folder.
                      </Text>
                    </Box>
                  );
                },
              });
            }
          } catch (error) {
            Alert.alert('Error', 'File download failed');
          }
        }

        if (res.status === 204) {
          if (!toast.isActive(id)) {
            toast.show({
              id,
              render: () => {
                return (
                  <Box bg="error.500" px="2" py="1" rounded="sm" mb={5}>
                    <Text color={'#FFFFFF'} fontWeight={'semibold'}>
                      No rides available for the given date range
                    </Text>
                  </Box>
                );
              },
            });
          }
        }
      })
      .catch(e => console.log(e));
  };

  const chartFilteredData = chartData?.filter(x => x);

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

  const chartFilteredDataList = useMemo(() => {
    return chartFilteredData
      ?.filter(x => {
        return x.entryMonth == moment(pickDate).format('M');
      })
      ?.map((item: any, index: number) => ({
        tripName: item.tripName,
        mileageRates: item.mileageRate,
        color: GenerateChartColor(chartData, item.tripName),
        label: item.tripName,
        value: Number(((100 * item.mileageRate) / sumRes).toFixed(1)),
        svg: {
          fill: GenerateChartColor(chartData, item.tripName),
          onPress: () => console.log(item.tripName),
        },
        key: `pie-${index}`,
      }));
  }, [chartFilteredData, pickDate, sumRes]);

  const togglePieChart = useCallback(() => {
    if (!chartFilteredDataList?.filter(val => val?.value > 0).length) {
      return;
    }

    const toValue = isPieChartVisible ? 0 : 300;
    Animated.timing(animatedHeight, {
      toValue,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();

    Animated.timing(animatedRotation, {
      toValue: isPieChartVisible ? 0 : 1,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();

    setIsPieChartVisible(!isPieChartVisible);
  }, [isPieChartVisible, chartFilteredDataList]);

  const rotation = animatedRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const handleItemPress = useCallback(
    (item: renderTrip) => {
      const listData = chartDataBefor3m?.filter(x => {
        return (
          x.tripName == item?.tripName &&
          moment(x.entryDate).format('M') == moment(pickDate).format('M')
        );
      });

      navigation.navigate('ReportSummary', {
        item: item,
        list: listData,
        countryCode: countryCode,
      });
    },
    [navigation, chartDataBefor3m, pickDate],
  );

  const groupedData = chartData?.reduce((acc, item) => {
    const key = item.tripName;
    if (!acc[key]) {
      acc[key] = {...item, driveCount: 0};
    }
    acc[key].driveCount += 1;
    return acc;
  }, {});

  const groupedChartData = Object.values(groupedData);
  const countrySymbole = countryCurrency[countryCode];

  const itemRenderHandler = useCallback(
    ({item, index}: renderProps) => {
      return (
        <Pressable
          onPress={handleItemPress.bind(null, item)}
          key={index}
          style={styles.itemContainer}>
          <Text fontWeight="medium" numberOfLines={2} style={styles.itemText}>
            {item?.tripName}
          </Text>
          <Text
            fontWeight="medium"
            numberOfLines={2}
            style={styles.itemTextDesc}>
            {`${item?.driveCount} Drives`}
          </Text>

          <Image
            source={require('../assests/route.png')}
            style={styles.image}
            alt=""
          />
        </Pressable>
      );
    },
    [handleItemPress],
  );

  const mergedData = chartFilteredDataList.reduce((acc, current) => {
    const existing = acc.find(item => item.tripName === current.tripName);
    if (existing) {
      existing.value += current.value; // Merge the values
      existing.mileageRates += current.mileageRates; // Optionally, you can aggregate mileageRates as well
    } else {
      acc.push({...current});
    }
    return acc;
  }, []);

  return (
    <View style={[styles.root, {paddingTop: top}]}>
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={onBack}>
            <Image
              source={require('../assests/arrow_back.png')}
              height={8}
              width={8}
              style={{marginRight: 8}}
              alt=""
            />
          </TouchableOpacity>
          <Text
            color="coolGray.800"
            textTransform={'uppercase'}
            fontWeight="medium"
            style={styles.headText}>
            Mileage Report
          </Text>
        </View>

        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
            <MonthSelectorCalendar
              monthFormat={'MMM'}
              selectedDate={pickDate}
              onMonthTapped={date => {
                setPickDate(date);
                onClose();
                if (isPieChartVisible) {
                  togglePieChart();
                }
              }}
            />
          </Actionsheet.Content>
        </Actionsheet>

        <Text
          color="#000"
          textTransform={'uppercase'}
          fontWeight="medium"
          onPress={() => {
            showPicker(true);
            onOpen();
          }}
          style={styles.headText}>
          {moment(pickDate).format('MMMM, YYYY')}
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Text fontWeight="bold" style={styles.buttonTitle}>
              {`${chartData?.length ? chartData[0]?.totalDriveCount : 0}`}
            </Text>
            <Text
              textTransform={'uppercase'}
              style={styles.buttonDescription}>{`Total Drives`}</Text>
          </View>
          <Divider
            backgroundColor={'#E9F1FF'}
            width={0.5}
            orientation="vertical"
          />
          <View style={styles.button}>
            <Text fontWeight="bold" style={styles.buttonTitle}>
              {`${
                chartData?.length ? chartData[0]?.totalMilesCount.toFixed(2) : 0
              }`}
            </Text>
            <Text textTransform={'uppercase'} style={styles.buttonDescription}>
              {`Total ` + countryDistanceCaps[countryCode ?? 'UK']}
            </Text>
          </View>
        </View>

        <View style={styles.downloadButtonContainer}>
          <Pressable
            onPress={downloadPdfHandler.bind(null, {
              startDate: moment(pickDate).startOf('month').toDate(),
              endDate: moment(pickDate).endOf('month').toDate(),
              loginId: LoginId,
            })}
            style={[
              styles.downloadButton,
              {backgroundColor: '#FFEEEC', borderColor: '#F1564226'},
            ]}>
            <Image
              source={require('../assests/pdf.png')}
              width={5}
              height={5}
              alt="pdf"
            />

            <Text
              color="#F15642"
              fontWeight="medium"
              style={styles.downloadButtonText}>
              {`Download`}
            </Text>
          </Pressable>
          <Pressable
            onPress={GetMileageReport.bind(null, {
              startDate: moment(pickDate).startOf('month').toDate(),
              endDate: moment(pickDate).endOf('month').toDate(),
              loginId: LoginId,
            })}
            style={[
              styles.downloadButton,
              {
                backgroundColor: '#F6F9FE',
                borderColor: '#E9F1FF',
              },
            ]}>
            <Image
              source={require('../assests/xls.png')}
              width={5}
              height={5}
              tintColor={'2f75b5'}
              style={{tintColor: '2f75b5'}}
              alt="xls"
            />

            <Text
              color="#2f75b5"
              fontWeight="medium"
              style={styles.downloadButtonText}>
              {`Download`}
            </Text>
          </Pressable>
        </View>

        <Divider
          orientation="horizontal"
          height={2}
          backgroundColor={'#F6F9FE'}
        />

        <View
          style={[
            styles.priceContainer,
            {paddingBottom: isPieChartVisible ? 22 : 0},
          ]}>
          <Pressable onPress={togglePieChart} style={styles.price}>
            <View style={styles.priceTexts}>
              <Text
                color="#434343"
                textTransform={'uppercase'}
                fontWeight="medium"
                style={[styles.buttonDescription, {fontSize: 16}]}>
                {`Total Value`}
              </Text>

              <Text
                fontWeight="bold"
                style={[styles.buttonTitle, {color: '#2C2C2C', marginTop: 6}]}>
                {`${countrySymbole}${sumRes ? sumRes?.toFixed(2) : 0}`}
              </Text>
            </View>

            <Animated.Image
              source={require('../assests/downArrow.png')}
              style={{width: 24, height: 24, transform: [{rotate: rotation}]}}
            />
          </Pressable>

          <Animated.View
            style={{
              minHeight: animatedHeight,
              overflow: 'hidden',
            }}>
            {isPieChartVisible ? (
              <Fragment>
                <PieChart
                  padAngle={0.01}
                  style={{height: 240}}
                  labelRadius={90}
                  data={chartFilteredDataList?.filter(x => x.value > 0)}>
                  <Labels />
                </PieChart>
                <View style={styles.legendContainer}>
                  <Stack direction="row" flexWrap={'wrap'}>
                    {chartFilteredDataList
                      ?.filter(item => item.value !== 0) // Filter out items with value 0
                      .map((item, index) => (
                        <Stack key={index} direction="column">
                          <View style={styles.legendItem}>
                            <View
                              style={[
                                styles.legendColor,
                                {backgroundColor: item.color},
                              ]}
                            />
                            <Text style={styles.legendText}>
                              {`${(
                                (100 * item?.mileageRates) /
                                sumRes
                              )?.toFixed(1)}`}{' '}
                              % of {`${item.tripName}`}
                            </Text>
                          </View>
                        </Stack>
                      ))}
                  </Stack>
                </View>
              </Fragment>
            ) : null}
          </Animated.View>
        </View>

        <View style={[styles.listContainer, {paddingBottom: bottom + 80}]}>
          {groupedChartData?.map((item, index) => {
            return itemRenderHandler({
              item: item,
              index: index,
            });
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    height: '100%',
  },

  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 8,
  },

  headText: {
    fontSize: 22,
    marginTop: 8,
  },

  buttonTitle: {
    fontSize: 26,
    color: '#000',
    lineHeight: 30,
  },

  buttonDescription: {
    fontSize: 14,
    color: '#000',
  },

  container: {
    paddingHorizontal: 22,
    paddingTop: 22,
    paddingBottom: 12,
  },

  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F6F9FE',
    borderWidth: 1,
    borderColor: '#E9F1FF',
    marginTop: 22,
    borderRadius: 16,
    marginHorizontal: 22,
  },

  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 75,
  },

  downloadButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    gap: 4,
    borderRadius: 7,
    borderWidth: 1,
  },

  downloadButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginTop: 16,
    borderRadius: 16,
    marginBottom: 16,
    paddingHorizontal: 22,
  },

  downloadButtonText: {
    fontSize: 20,
  },

  priceContainer: {
    backgroundColor: '#F9F9FA',
    marginBottom: 22,
    borderRadius: 15,
    marginHorizontal: 22,
    marginTop: 11,
  },

  price: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#F9F9FA',
    borderRadius: 15,
    alignItems: 'center',
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 12,
  },

  priceTexts: {
    flex: 1,
  },

  itemContainer: {
    backgroundColor: '#F6F9FE',
    height: 75,
    width: '48%',
    // marginHorizontal: 4,
    padding: 8,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
  },

  contentContainerStyle: {
    paddingHorizontal: 22,
    paddingBottom: 100,
  },

  separator: {
    height: 12,
  },

  image: {
    position: 'absolute',
    right: 0,
    height: 75,
    width: 75,
    zIndex: -99,
  },

  itemText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#000',
  },

  itemTextDesc: {
    fontSize: 16,
    color: '#838383',
    marginTop: 2,
  },

  listContainer: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    paddingHorizontal: 22,
    alignItems: 'center',
    gap: 8,
    paddingBottom: 100,
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

  legendContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    overFlow: 'auto',
    marginTop: 12,
  },
});

export default memo(ReportsUi);
