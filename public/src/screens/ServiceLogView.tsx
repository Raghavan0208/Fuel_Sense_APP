/* eslint-disable */
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {Fragment, useCallback, useEffect, useRef, useState} from 'react';
import {
  Actionsheet,
  Box,
  Button,
  Center,
  Divider,
  Heading,
  HStack,
  Modal,
  ScrollView,
  Stack,
  Text,
  useDisclose,
  useToast,
  VStack,
} from 'native-base';
import {View} from 'react-native';
import {IJourneyModel} from '../models/Models';
import CommonServices from '../Services/CommonServices';
import moment, {Moment} from 'moment';
import MonthSelectorCalendar from 'react-native-month-selector';
import {getTokenDetail} from '../components/Helper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {countryCurrency} from '../core/data';
import {G, Text as SvgText} from 'react-native-svg';
import {PieChart} from 'react-native-svg-charts';
import FuelLogEdit from './FuelLogEditModel';
import RNFS from 'react-native-fs';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';
import CustomTextInput from '../components/CustomTextInput';
import CustomDropDown from '../components/CustomDropDown';
import {
  launchCamera,
  launchImageLibrary,
  ImageLibraryOptions,
  CameraOptions,
} from 'react-native-image-picker';
import {PermissionsAndroid} from 'react-native';
import ServiceLogEdit from './ServiceLogEditModel';

type Props = {
  navigation?: any;
  dashboardData?: IJourneyModel;
  setScreen?: any | undefined;
  isdisabled?: any;
  onAdd?: () => void;
};

const Labels = ({slices, totalCost}: any) => {
  return slices.map((slice: any, index: any) => {
    const {pieCentroid, data} = slice;
    const percentage = ((data.value / totalCost) * 100).toFixed(1); // 1 decimal place
    return (
      <G key={index}>
        <SvgText
          x={pieCentroid[0]}
          y={pieCentroid[1]}
          fill="white"
          fontSize={12}
          fontWeight={'900'}
          textAnchor="middle"
          alignmentBaseline="middle">
          {percentage}%
        </SvgText>
      </G>
    );
  });
};

const ServiceLogView = ({navigation, dashboardData}: Props) => {
  const [pickDate, setPickDate] = useState<Moment>();
  const {isOpen, onOpen, onClose} = useDisclose();
  const [show, setShow] = useState(false);
  const showPicker = useCallback((value: any) => setShow(value), []);
  const [checkData, setCheckData] = useState<Array<any>>([]);
  const [countrysymbol, setCountrySymbol] = useState('');

  const animatedHeight = useRef(new Animated.Value(240)).current;
  const [selectedSlice, setSelectedSlice] = useState<any>({
    label: '',
    value: 0,
  });
  const [servicelogeditmodelopen, setservicelogeditmodelopen] = useState(false);
  const [fuellogplanreadingId, setFuelLogPlanReadingId] = useState<any>();
  const [editData, setEditData] = useState<any>();
  const [accesstoken, setAccesstoken] = useState<any>();
  const [countrycode, setCoutryCode] = useState<any>();
  const [servicelogmodelopen, setservicelogmodelopen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('yes');
  const [insured, setInsured] = useState(true);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [insuranceProvider, setInsuranceProvider] = useState<any>('');
  const [serviceCategory, setserviceCategory] = useState<any>('');
  const [serviceComponent, setserviceComponent] = useState<any>('');
  const [serviceType, setserviceType] = useState<any>('');
  const [servicePriority, setservicePriority] = useState<any>('');
  const [serviceCost, setserviceCost] = useState<any>('');
  const [serviceCategoryArray, setServiceCategoryArray] = useState<Array<any>>(
    [],
  );
  const [serviceComponentArray, setServiceComponentArray] = useState<
    Array<any>
  >([]);
  const [serviceTypeArray, setServiceTypeArray] = useState<Array<any>>([]);
  const [servicePriorityArray, setServicePriorityArray] = useState<Array<any>>(
    [],
  );
  const [serviceImageName, setserviceImageName] = useState<any>('');
  const [serviceComponentId, setServiceComponentId] = useState<number | null>(
    null,
  ); // Add this
  const [serviceCategoryId, setServiceCategoryId] = useState<number | null>(
    null,
  ); // Add this
  const [serviceTypeId, setServiceTypeId] = useState<number | null>(null); // Add this
  const [servicePriorityId, setServicePriorityId] = useState<number | null>(
    null,
  ); // Add this
  const [totalInsuranceLogCount, setTotalInsuranceLogCount] = useState<any>();
  const [isSubmitPressed, setIsSubmitPressed] = useState<any>(false);
  const [carId, setCarId] = useState<number>(0);
  const [serviceImage, setServiceImage] = useState<any>(null);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: selectedTab === 'yes' ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [selectedTab]);

  const left = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '50%'],
  });

  const toast = useToast();
  const id = 'report-toast';

  const colorPalette = [
    '#6A0DAD',
    '#00D4FF',
    '#B22222',
    '#FF8C00',
    '#8A2BE2',
    '#90EE90',
    '#FF4500',
    '#FF69B4',
    '#1E90FF',
    '#32CD32',
    '#FF6347',
    '#DC143C',
    '#00FF7F',
    '#4682B4',
    '#9400D3',
    '#FFD700',
  ];

  const groupedData = checkData
    ?.filter(item => item.serviceCost > 0 && item.serviceCategoryName) // ensure valid values
    ?.reduce((acc, item) => {
      const key = item.serviceCategoryName;
      if (!acc[key]) {
        acc[key] = {serviceCategoryName: key, serviceCost: 0};
      }
      acc[key].serviceCost += item.serviceCost;
      return acc;
    }, {});

  const uniqueBrands = Object.values(groupedData);

  const pieChartData = uniqueBrands.map((item: any, index: any) => {
    const color = colorPalette[index % colorPalette.length];
    return {
      value: item.serviceCost,
      svg: {
        fill: color,
        onPress: () =>
          setSelectedSlice({
            label: item.serviceCategoryName,
            value: item.serviceCost,
          }),
      },
      key: `pie-${index}`,
      serviceCategoryName: item.serviceCategoryName,
      color,
    };
  });

  const totalCost = pieChartData.reduce((sum, item) => sum + item.value, 0);

  const pieChartRenderData = pieChartData.map((item, index) => ({
    value: item.value,
    svg: {
      fill: item.color,
      onPress: item.svg.onPress, // ✅ Attach onPress handler
    },
    key: `pie-${index}`,
  }));

  const screenHeight = Dimensions.get('window').height;

  let sumRes = 0;
  checkData?.forEach(num => {
    sumRes += num.totalFuelCost;
  });

  const onLeftArrowPress = () => {
    navigation.navigate('Dashboard');
  };
  const handleImagePick = async () => {
    Alert.alert(
      'Select Image Source',
      'Choose an option',
      [
        {
          text: 'Camera',
          onPress: async () => {
            const hasPermission = await requestCameraPermission();
            if (!hasPermission) {
              return;
            }
            launchCamera(
              {
                mediaType: 'photo',
                quality: 0.7,
              },
              handlePickerResponse,
            );
          },
        },
        {
          text: 'Gallery',
          onPress: async () => {
            const hasPermission = await requestGalleryPermission();
            if (!hasPermission) {
              return;
            }
            launchImageLibrary(
              {
                mediaType: 'photo',
                quality: 0.7,
              },
              handlePickerResponse,
            );
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      {cancelable: true},
    );
  };

  const handlePickerResponse = (response: any) => {
    if (response.didCancel) {
    } else if (response.errorCode) {
    } else if (response.assets && response.assets.length > 0) {
      const pickedImage = response.assets[0];
      setServiceImage(pickedImage);
      setserviceImageName(pickedImage.fileName || 'Selected Image');
    }
  };

  const requestGalleryPermission = async () => {
     if (Platform.OS === 'android' && Platform.Version <= 32) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
      return true;
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs access to your camera',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  // const handleImagePick = async () => {
  //     console.log('Image picker triggered');
  //     const hasPermission = await requestGalleryPermission();
  //     if (!hasPermission) {
  //         console.log('Permission denied');
  //         return;
  //     }
  //     launchImageLibrary(
  //         {
  //             mediaType: 'photo',
  //             quality: 0.7,
  //         },
  //         response => {
  //             if (response.didCancel) {
  //                 console.log('User cancelled image picker');
  //             } else if (response.errorCode) {
  //                 console.log('ImagePicker Error: ', response.errorMessage);
  //             } else if (response.assets && response.assets.length > 0) {
  //                 const pickedImage = response.assets[0];
  //                 setServiceImage(pickedImage);
  //                 setserviceImageName(pickedImage.fileName || 'Selected Image');
  //                 console.log('Image picked:', pickedImage.uri);
  //             }
  //         },
  //     ) as any;
  // };

  // const requestGalleryPermission = async () => {
  //     if (Platform.OS === 'android') {
  //         const granted = await PermissionsAndroid.request(
  //             PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES || PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
  //             {
  //                 title: 'Gallery Permission',
  //                 message: 'App needs access to your photo gallery',
  //                 buttonNeutral: 'Ask Me Later',
  //                 buttonNegative: 'Cancel',
  //                 buttonPositive: 'OK',
  //             },
  //         );

  //         return granted === PermissionsAndroid.RESULTS.GRANTED;
  //     }
  //     return true;
  //   };

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
          setTotalInsuranceLogCount(res.data.responseData.length);
          console.log(res.data.responseData[0].totalServiceCost);
          const filteredData = res.data.responseData.filter(
            (item: any) => item.serviceCategoryName !== null,
          );
          setCheckData(filteredData);
        }
      })
      .catch(e => console.log(e));
  };

  const handleSetCarId = (id: number) => {
    setCarId(id);
    setServiceCategoryId(id);
    GetAllServiceComponent(id);
  };

  const handleSetServiceComponentId = (id: number) => {
    setServiceComponentId(id);
    if (carId && id) {
      getAllServiceType(carId, id);
    }
  };

  const handleSetServiceTypeId = (id: number) => {
    setServiceTypeId(id);
    if (carId && id) {
      getAllServicePriority(carId, serviceComponentId, id);
    }
  };

  const handleSetServicePriorityId = (id: number) => {
    setServicePriorityId(id);
  };

  const GetAllServiceCategory = () => {
    CommonServices.get('Master', 'GetAllServiceCategory', countrycode).then(
      res => {
        if (res.status == 200) {
          setServiceCategoryArray(res.data);
        }
      },
    );
  };

  const GetAllServiceComponent = (servicecategoryid: any) => {
    CommonServices.getWithSingleParam(
      'Master',
      'GetServiceComponent',
      servicecategoryid,
      countrycode,
    ).then(res => {
      if (res.status == 200) {
        setServiceComponentArray(res.data);
      }
    });
  };

  const getAllServiceType = (
    servicecategoryid: any,
    servicecomponentid: any,
  ) => {
    CommonServices.getWithDoubleParam(
      'Master',
      'GetServiceType',
      servicecategoryid,
      servicecomponentid,
      countrycode,
    ).then(res => {
      if (res.status == 200) {
        setServiceTypeArray(res.data);
      }
    });
  };

  const getAllServicePriority = (
    servicecategoryid: any,
    servicecomponentid: any,
    servicetypeid: any,
  ) => {
    CommonServices.getWithTriplevalue(
      'Master',
      'GetServicePriority',
      servicecategoryid,
      servicecomponentid,
      servicetypeid,
      countrycode,
    ).then(res => {
      if (res.status == 200) {
        setServicePriorityArray(res.data);
      }
    });
  };

  let countrySymbole = '';

  useEffect(() => {
    AsyncStorage.getItem('star-zero-token').then(res => {
      if (res) {
        AsyncStorage.getItem('CountryId').then(ress => {
          if (ress) {
            let code = JSON.parse(ress);
            setCoutryCode(code);
            countrySymbole = countryCurrency[code];
            setCountrySymbol(countrySymbole);
            setAccesstoken(res);
            GetServiceLogChart(
              moment(pickDate).format('MM'),
              moment(pickDate).format('YYYY'),
              getTokenDetail(res)?.LoginId,
              code,
            );
            GetAllServiceCategory();
          }
        });
      }
    });
  }, [pickDate, countrySymbole, countrycode]);

  const convertToPdf = async (data: any, fileName: string) => {
    try {
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

  const GetServiceLogExcel = async ({startDate, endDate, loginId}: any) => {
    CommonServices.getWithTripleQueryParam(
      'ServiceLog',
      'GetServiceLogExcel',
      'startDate',
      moment(startDate).format('YYYY-MM-DD'),
      'endDate',
      moment(endDate).format('YYYY-MM-DD'),
      'loginId',
      loginId,
      countrycode,
    )
      .then(async res => {
        if (res?.status === 200) {
          const downloadDir =
            Platform.OS === 'ios'
              ? RNFS.DocumentDirectoryPath
              : RNFS.DownloadDirectoryPath;

          const fileName = `FuelSense_ServiceLog_Report_${moment(
            startDate,
          ).format('YYYY-MM-DDTHH-mm-ss')}_${moment(endDate).format(
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
                    <Box bg="emerald.700" px="4" py="2" rounded="sm" mb={5}>
                      <Text color={'#fff'} fontWeight={'bold'}>
                        Your ServiceLog Excel report has been downloaded
                        successfully.
                      </Text>
                      <Text color={'#fff'} fontWeight={'semibold'}>
                        Kindly check your Downloads folder.
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
                  <Box bg="emerald.700" px="4" py="2" rounded="sm" mb={5}>
                    <Text color={'#fff'} fontWeight={'semibold'}>
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

  const onServiceLogPress = () => {
    setIsSubmitPressed(true);
    let updateddata;
    if (insured == true) {
      updateddata = {
        insuranceprovider: insuranceProvider,
        servicecategory: serviceCategoryId,
        servicecomponent: serviceComponentId,
        servicetype: serviceTypeId,
        servicepriority: servicePriorityId,
        servicecost: serviceCost,
        servicenoteimgname: serviceImageName,
        hasinsured: insured,
        servicelogdate: moment(new Date()).format('YYYY-MM-DD HH:mm'),
        loginid: getTokenDetail(accesstoken)?.LoginId,
      };
    } else {
      updateddata = {
        insuranceprovider: null,
        servicecategory: null,
        servicecomponent: null,
        servicetype: null,
        servicepriority: null,
        servicecost: null,
        servicenoteimgname: null,
        hasinsured: insured,
        servicelogdate: moment(new Date()).format('YYYY-MM-DD HH:mm'),
        loginid: getTokenDetail(accesstoken)?.LoginId,
      };
    }

    CommonServices.post('ServiceLog', 'Create', updateddata, countrycode)
      .then(res => {
        if (res.status == 200) {
          setservicelogmodelopen(false);
          Alert.alert('Success', 'Service Log Added Successfully');
          GetServiceLogChart(
            moment(pickDate).format('MM'),
            moment(pickDate).format('YYYY'),
            getTokenDetail(accesstoken)?.LoginId,
            countrycode,
          );
        }
      })
      .catch(e => {
        Alert.alert('Error', 'Kindly Ensure the data is entered correctly');
        console.log(e);
      });
  };

  const downloadPdfHandler = async ({startDate, endDate, loginId}: any) => {
    CommonServices.getWithTripleQueryParam(
      'ServiceLog',
      'GetServiceLogPDF',
      'startDate',
      moment(startDate).format('YYYY-MM-DD'),
      'endDate',
      moment(endDate).format('YYYY-MM-DD'),
      'loginId',
      loginId,
      countrycode,
    )
      .then(async res => {
        if (res.status === 200 && res.data) {
          const fileName = `FuelSense_ServiceLog_Report-${moment(
            startDate,
          ).format('YYYY-MM-DDTHH-mm-ss')}_${moment(endDate).format(
            'YYYY-MM-DDTHH-mm-ss',
          )}-${new Date().getTime()}`;

          const downloadDir =
            Platform.OS === 'ios'
              ? RNFS.LibraryDirectoryPath
              : RNFS.DownloadDirectoryPath;

          const folderPath = `${downloadDir}/FuelSense`;
          const filePath = `${folderPath}/${fileName}.pdf`;

          try {
            const folderExists = await RNFS.exists(folderPath);
            if (!folderExists) {
              await RNFS.mkdir(folderPath);
            }

            // Save PDF from Base64
            await RNFS.writeFile(filePath, res.data, 'base64');

            if (Platform.OS === 'ios') {
              await Share.open({
                url: filePath,
                title: 'Save your report file',
                type: 'application/pdf',
                failOnCancel: false,
              });
            }

            if (!toast.isActive(id)) {
              toast.show({
                id,
                render: () => (
                  <Box bg="emerald.700" px="4" py="2" rounded="sm" mb={5}>
                    <Text color={'#fff'} fontWeight={'bold'}>
                      Your ServiceLog PDF report has been downloaded
                      successfully.
                    </Text>
                    <Text color={'#fff'} fontWeight={'semibold'}>
                      Kindly check your Downloads folder.
                    </Text>
                  </Box>
                ),
              });
            }
          } catch (error) {
            console.log(error);
            Alert.alert('Error', 'File download failed');
          }
        } else if (res.status === 204) {
          if (!toast.isActive(id)) {
            toast.show({
              id,
              render: () => (
                <Box bg="emerald.700" px="4" py="2" rounded="sm" mb={5}>
                  <Text color={'#FFFFFF'} fontWeight={'semibold'}>
                    No rides available for the given date range
                  </Text>
                </Box>
              ),
            });
          }
        }
      })
      .catch(e => console.log(e));
  };

  const handleEdit = (val: any) => {
    setEditData(val);
    setFuelLogPlanReadingId(val.planReadingId);
    setservicelogeditmodelopen(true);
  };

  return (
    <SafeAreaView>
      <Heading p={Platform.OS == 'android' ? '5' : '0'} pl="3" pt="3" size="lg">
        <View w={'100%'}>
          <Text
            color="coolGray.800"
            textTransform={'uppercase'}
            fontWeight="medium"
            style={styles.headText}>
            <TouchableOpacity onPress={onLeftArrowPress}>
              <Image
                source={require('../assests/arrow_back.png')}
                style={{height: 20, width: 20, tintColor: '#000'}}
              />
            </TouchableOpacity>{' '}
            Service Log Report
          </Text>
        </View>
      </Heading>

      <VStack alignItems="flex-end" width={'100%'}>
        <HStack space={4} justifyContent={'left'}>
          <TouchableOpacity
            onPress={() => {
              setservicelogmodelopen(true);
            }}>
            <View style={styles.plusCard}>
              <Text style={styles.createicon}>
                {/* <Image
                                        source={require('../assests/plus1.png')}
                                        style={{width: 30, height:30}}
                                    />  */}
                + Create Service Log
              </Text>
            </View>
          </TouchableOpacity>
        </HStack>
      </VStack>

      <View style={{minHeight: screenHeight}}>
        <ScrollView
          scrollEnabled={true}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
           maxHeight={'100%'}
          contentContainerStyle={{paddingBottom: 100}}>
          <View style={styles.monthpicker}>
            <HStack
              justifyContent="space-between"
              alignItems="center"
              style={{marginBottom: 5}}>
              <VStack space={1} width={'50%'}>
                <HStack space={1} justifyContent={'left'}>
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View style={{flexDirection: 'row', flex: 1}}>
                      <TouchableOpacity
                        onPress={() => {
                          showPicker(true);
                          onOpen();
                        }}>
                        <HStack>
                          <Text style={styles.reportMonth}>
                            {moment(pickDate).format('MMMM, YYYY')}
                          </Text>
                          <Image
                            source={require('../assests/monthpicker.png')}
                            style={{
                              width: 24,
                              height: 24,
                              marginLeft: 5,
                              marginTop: -3,
                              tintColor: '#000',
                            }}
                            alt="month"
                          />
                        </HStack>
                      </TouchableOpacity>
                    </View>
                  </View>
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
              </VStack>
              {checkData.length > 0 ? (
                <VStack space={1} alignItems="flex-end" width={'50%'}>
                  <HStack space={4} justifyContent={'left'}>
                    <TouchableOpacity
                      onPress={GetServiceLogExcel.bind(null, {
                        startDate: moment(pickDate).startOf('month').toDate(),
                        endDate: moment(pickDate).endOf('month').toDate(),
                        loginId: getTokenDetail(accesstoken)?.LoginId,
                      })}>
                      <View style={styles.iconCard}>
                        <Image
                          source={require('../assests/xls.png')}
                          style={styles.iconImage}
                        />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={downloadPdfHandler.bind(null, {
                        startDate: moment(pickDate).startOf('month').toDate(),
                        endDate: moment(pickDate).endOf('month').toDate(),
                        loginId: getTokenDetail(accesstoken)?.LoginId,
                      })}>
                      <View style={styles.iconCard}>
                        <Image
                          source={require('../assests/pdf.png')}
                          style={styles.iconImage}
                        />
                      </View>
                    </TouchableOpacity>
                  </HStack>
                </VStack>
              ) : (
                ''
              )}
            </HStack>
          </View>
          {checkData.length <= 0 ? (
            <View>
              <Image
                style={{alignItems: 'center'}}
                source={require('../assests/nofueldata.png')}
              />
              <Text style={styles.nodata}>
                No Data available for your account for the selected Month
              </Text>
            </View>
          ) : (
            <View style={{flex: 1}}>
              <View
                style={{
                  alignItems: 'center',
                }}>
                <Stack
                  direction="row"
                  mb="3"
                  mt="1"
                  justifyContent={'flex-start'}>
                  <Center rounded="sm" shadow={'unset'}>
                    <Text style={styles.driveHero}>Total logs</Text>
                    <Text style={styles.contentText}>
                      {totalInsuranceLogCount} Logs
                    </Text>
                  </Center>
                  <Divider mx="2" orientation="vertical" />
                  <Center rounded="sm" shadow={'unset'}>
                    <Text style={styles.driveHero}>Total Service Cost</Text>
                    <Text
                      style={
                        styles.contentText
                      }>{`${countrysymbol} ${checkData[0].totalServiceCost.toFixed(
                      2,
                    )}`}</Text>
                  </Center>
                  <Divider mx="2" orientation="vertical" />
                  <Center rounded="sm" shadow={'unset'}>
                    <Text style={styles.driveHero}>
                      Insured Count:{' '}
                      <Text style={styles.contentText}>
                        {checkData[0].insured}
                      </Text>
                    </Text>
                    <Text style={styles.driveHero}>
                      Not Insured Count:{' '}
                      <Text style={styles.contentText}>
                        {checkData[0].notInsured}
                      </Text>
                    </Text>
                  </Center>
                </Stack>
              </View>
              <View style={{flex: 1}}>
                <ScrollView
                  scrollEnabled={true}
                  nestedScrollEnabled={true}
                  showsVerticalScrollIndicator={true}
                  keyboardShouldPersistTaps="handled"
                  height={450}
                  style={{margin: 10, borderRadius: 10, marginBottom: 30}}>
                  {checkData?.map((val, idx) => {
                    return (
                      <View style={styles.viewSection} key={idx}>
                        <TouchableOpacity
                          style={styles.borderedCard}
                          onPress={() => {
                            handleEdit(val);
                          }}>
                          <View
                            style={[
                              styles.priorityBadge,
                              val.servicePriorityName?.toLowerCase() === 'high'
                                ? styles.high
                                : val.servicePriorityName?.toLowerCase() ===
                                  'medium'
                                ? styles.medium
                                : styles.low,
                            ]}>
                            <Text style={styles.priorityText}>
                              {val.servicePriorityName?.trim()
                                ? val.servicePriorityName
                                : '--'}
                            </Text>
                          </View>
                          <HStack
                            justifyContent="space-between"
                            alignItems="center"
                            style={{marginTop: 10}}>
                            <VStack space={1} width={'50%'}>
                              <Text style={styles.driveTile}>
                                <Text style={styles.labelText}>Category: </Text>
                                {val.serviceCategoryName?.trim()
                                  ? val.serviceCategoryName
                                  : '--'}
                              </Text>
                              <Text style={styles.driveTile}>
                                <Text style={styles.labelText}>
                                  Component:{' '}
                                </Text>
                                {val.serviceComponentName?.trim()
                                  ? val.serviceComponentName
                                  : '--'}
                              </Text>
                              <Text style={styles.driveTile}>
                                <Text style={styles.labelText}>Type: </Text>
                                {val.serviceTypeName?.trim()
                                  ? val.serviceTypeName
                                  : '--'}
                              </Text>
                            </VStack>
                            <VStack
                              space={1}
                              alignItems="flex-end"
                              width={'50%'}>
                              <Text style={styles.driveTile}>
                                <Text style={styles.labelText}>Provider: </Text>
                                {val.insuranceProvider}
                              </Text>
                              <Text style={styles.mileamt}>
                                <Text style={styles.labelText}>Cost: </Text>
                                {countrysymbol} {val.serviceCost?.toFixed(2)}
                              </Text>
                              <Text style={styles.driveTile}>
                                <Text style={styles.labelText}>Date: </Text>
                                {val.serviceLogDate
                                  ? moment(val.serviceLogDate).format(
                                      'DD MMM, YYYY',
                                    )
                                  : '--'}
                              </Text>
                            </VStack>
                          </HStack>
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
              <Animated.View
                style={{
                  minHeight: animatedHeight,
                  overflow: 'hidden',
                }}>
                <Fragment>
                  {selectedSlice.label !== '' && (
                    <View
                      style={{
                        alignItems: 'center',
                        marginTop: 10,
                        marginBottom: 10,
                      }}>
                      <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                        {selectedSlice.label}
                      </Text>
                      <Text style={{fontSize: 14}}>
                        Service Cost: {countrysymbol} {selectedSlice.value}
                      </Text>
                    </View>
                  )}
                  <PieChart
                    padAngle={0.01}
                    style={{height: 250}}
                    labelRadius={90}
                    data={pieChartRenderData}>
                    <Labels totalCost={totalCost} />
                  </PieChart>
                  <View style={styles.legendContainer}>
                    <Stack
                      direction="row"
                      flexWrap="wrap"
                      alignItems="center"
                      justifyContent="center">
                      {pieChartData?.map((item, index) => (
                        <View key={index} style={styles.legendItem}>
                          <View
                            style={[
                              styles.legendColor,
                              {backgroundColor: item.color},
                            ]}
                          />
                          <Text style={styles.legendText}>
                            {item.serviceCategoryName ?? 'Unknown'}:{' '}
                            {countrysymbol} {item.value}
                          </Text>
                        </View>
                      ))}
                    </Stack>
                  </View>
                </Fragment>
              </Animated.View>
            </View>
          )}
        </ScrollView>
        <Modal isOpen={servicelogeditmodelopen}>
          <FuelLogEdit
            setfuellogmodelopen={setservicelogeditmodelopen}
            editData={editData}
            planreadingid={fuellogplanreadingId}
            navigation={navigation}
          />
        </Modal>
        <Modal isOpen={servicelogmodelopen} onClose={() => {
          setservicelogmodelopen(false);
          setIsSubmitPressed(false);
        }}>
          <Modal.Content maxWidth="100%" w="100%" h="80%" maxHeight="80%">
            <Modal.CloseButton />
            <Modal.Header>Add Your Service Log</Modal.Header>

            <Modal.Body>
              <ScrollView showsVerticalScrollIndicator={false}>
                <Text ml="1" style={styles.locTitle}>Do you have an insurance policy? *</Text>

                <View style={styles.toggleSwitchWrapper}>
                  <View style={styles.toggleSwitch}>
                    <Animated.View style={[styles.indicator, { left }]} />

                    <TouchableOpacity
                      style={[styles.option, selectedTab === 'yes' && styles.active]}
                      onPress={() => {
                        setSelectedTab('yes');
                        setInsured(true);
                      }}
                    >
                      <Text style={[styles.optionText, { color: selectedTab === 'yes' ? 'white' : 'black' }]}>
                        Yes, I have
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.option, selectedTab === 'no' && styles.active]}
                      onPress={() => {
                        setSelectedTab('no');
                        setInsured(false);
                      }}
                    >
                      <Text style={[styles.optionText, { color: selectedTab === 'no' ? 'white' : 'black' }]}>
                        No, I haven’t
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {selectedTab === 'yes' && (
                  <>
                    {/* Insurance Provider */}
                    <View style={{ marginBottom: 12 }}>
                      <Text style={styles.locTitle}>Insurance Provider *</Text>
                      <CustomTextInput
                        placeHolder="Insurance Provider"
                        value={insuranceProvider}
                        onValueChange={setInsuranceProvider}
                      />
                      {isSubmitPressed && !insuranceProvider && (
                        <Text style={styles.errorText}>Insurance Provider is Required</Text>
                      )}
                    </View>

                    {/* Service Category */}
                    <View style={{ marginBottom: 12 }}>
                      <Text style={styles.locTitle}>Service Category *</Text>
                      <CustomDropDown
                        data={serviceCategoryArray}
                        placeholder="Service Category"
                        value={serviceCategory}
                        setCarId={handleSetCarId}
                        setValue={setserviceCategory}
                        customStyle={{ paddingLeft: 10 }}
                      />
                      {isSubmitPressed && serviceCategory === '' && (
                        <Text style={styles.errorText}>Service Category is Required</Text>
                      )}
                    </View>

                    {/* Service Component */}
                    <View style={{ marginBottom: 12 }}>
                      <Text style={styles.locTitle}>Service Component *</Text>
                      <CustomDropDown
                        data={serviceComponentArray}
                        placeholder="Service Component"
                        value={serviceComponent}
                        setCarId={handleSetServiceComponentId}
                        setValue={setserviceComponent}
                        customStyle={{ paddingLeft: 10 }}
                      />
                      {isSubmitPressed && serviceComponent === '' && (
                        <Text style={styles.errorText}>Service Component is Required</Text>
                      )}
                    </View>

                    {/* Service Type */}
                    <View style={{ marginBottom: 12 }}>
                      <Text style={styles.locTitle}>Service Type *</Text>
                      <CustomDropDown
                        data={serviceTypeArray}
                        placeholder="Service Type"
                        value={serviceType}
                        setCarId={handleSetServiceTypeId}
                        setValue={setserviceType}
                        customStyle={{ paddingLeft: 10 }}
                      />
                      {isSubmitPressed && serviceType === '' && (
                        <Text style={styles.errorText}>Service Type is Required</Text>
                      )}
                    </View>

                    {/* Service Priority */}
                    <View style={{ marginBottom: 12 }}>
                      <Text style={styles.locTitle}>Service Priority *</Text>
                      <CustomDropDown
                        data={servicePriorityArray}
                        placeholder="Service Priority"
                        value={servicePriority}
                        setCarId={handleSetServicePriorityId}
                        setValue={setservicePriority}
                        customStyle={{ paddingLeft: 10 }}
                      />
                      {isSubmitPressed && servicePriority === '' && (
                        <Text style={styles.errorText}>Service Priority is Required</Text>
                      )}
                    </View>

                    {/* Service Cost */}
                    <View style={{ marginBottom: 12 }}>
                      <Text style={styles.locTitle}>Service Cost *</Text>
                      <CustomTextInput
                        placeHolder="Service Cost"
                        keyboardType="number-pad"
                        value={serviceCost}
                        onValueChange={setserviceCost}
                      />
                      {isSubmitPressed && !serviceCost && (
                        <Text style={styles.errorText}>Service Cost is Required</Text>
                      )}
                    </View>

                    {/* Image Upload */}
                    <View style={{ marginBottom: 12 }}>
                      <Text style={styles.locTitle}>Service Note (image upload)</Text>

                      {serviceImage && (
                        <Image
                          source={{ uri: serviceImage.uri }}
                          style={{ width: 100, height: 100, marginTop: 8, borderRadius: 8 }}
                        />
                      )}

                      <TouchableOpacity onPress={handleImagePick} style={styles.imagePicker}>
                        <Text style={{ color: '#000' }}>
                          {serviceImageName ? serviceImageName : 'Select Image'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}

                {selectedTab === 'no' && (
                  <Text style={styles.noinsurancetext}>
                    Selecting "No, I haven't" will limit this report page to show only your insurance details, excluding any uninsured records.
                  </Text>
                )}
              </ScrollView>
            </Modal.Body>

            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  variant="outline"
                  borderColor="black"
                  _text={{ color: 'black' }}
                  onPress={() => {
                    setservicelogmodelopen(false);
                    setIsSubmitPressed(false);
                  }}
                >
                  Cancel
                </Button>
                <Button backgroundColor={'#000'} onPress={onServiceLogPress}>
                  Add Service Log
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>

        <Modal isOpen={servicelogeditmodelopen}>
          <ServiceLogEdit
            setfuellogmodelopen={setservicelogeditmodelopen}
            editData={editData}
            planreadingid={fuellogplanreadingId}
            navigation={navigation}
          />
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headText: {
    fontSize: 19,
  },
  reportMonth: {
    fontWeight: '800',
    fontSize: 22,
    color: '#000',
    marginBottom: 5,
  },
  monthpicker: {
    marginTop: 12,
    marginBottom: 15,
    marginHorizontal: 20,
  },
  nodata: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  contentText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 20,
  },
  driveHero: {
    fontsize: 12,
    fontWeight: '400',
    marginBottom: 5,
  },
  cardSection: {
    height: 800,
  },
  borderedCard: {
    borderRadius: 10,
    shadowColor: 'unset',
    backgroundColor: '#e8e8e8',
    padding: 20,
    borderLeftWidth: 3,
    borderLeftColor: '#000', // or any color you want
    position: 'relative', // Important for absolute positioning
  },
  viewSection: {
    marginVertical: 8,
    paddingHorizontal: 20,
  },

  driveTile: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
  },
  mileamt: {
    fontSize: 14,
    fontWeight: '900',
    color: '#230578',
  },
  driveRides: {
    fontSize: 13,
    color: '#666',
    fontWeight: '800',
  },

  labelText: {
    fontWeight: '400',
    color: '#000', // or a primary color if you want to make it stand out more
  },
  legendContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 100,
  },

  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 6,
  },
  legendColor: {
    width: 14,
    height: 14,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#dadada',
    marginRight: 6,
  },

  legendText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000', // Or your theme color
  },
  locTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#000',
    marginTop: 5,
  },
  errorText: {
    color: '#ff0000',
    paddingLeft: 5,
    fontSize: 15,
    marginTop: -5,
    marginBottom: 5,
    fontWeight: '400',
  },
  iconCard: {
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  createicon: {
    fontSize: 16,
  },
  plusCard: {
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#000',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginRight: 10,
    marginBottom: 20,
  },
  toggleSwitch: {
    flexDirection: 'row',
    position: 'relative',
    backgroundColor: '#dadada',
    borderRadius: 50,
    overflow: 'hidden',
    width: '70%',
    height: 40,
    maxWidth: 700,
    marginTop: 20,
    marginBottom: 20,
  },
  option: {
    flex: 1,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  active: {},
  optionText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  indicator: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '50%',
    backgroundColor: '#000',
    borderRadius: 50,
    zIndex: 0,
  },
  toggleSwitchWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tab_content: {
    padding: 2,
  },
  noinsurancetext: {
    fontSize: 15,
    color: '#000',
    padding: 15,
    fontWeight: '500',
    backgroundColor: '#ebebeb',
    borderRadius: 10,
  },
  imagePicker: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    backgroundColor: '#f0f0f0',
  },
  priorityBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    paddingVertical: 0.5,
    paddingHorizontal: 8,
    borderRadius: 12,
    zIndex: 1,
  },
  priorityText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  high: {
    backgroundColor: '#109e0a',
  },
  medium: {
    backgroundColor: '#f59e0b',
  },
  low: {
    backgroundColor: '#fd0b0b',
  },
});

export default ServiceLogView;
