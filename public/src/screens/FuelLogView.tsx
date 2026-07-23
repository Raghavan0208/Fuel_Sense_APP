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

const FuelLogView = ({navigation, dashboardData}: Props) => {
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
  const [fuellogmodelopen, setfuellogmodelopen] = useState(false);
  const [fuellogplanreadingId, setFuelLogPlanReadingId] = useState<any>();
  const [editData, setEditData] = useState<any>();
  const [accesstoken, setAccesstoken] = useState<any>();
  const [countrycode, setCoutryCode] = useState<any>();

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
    ?.filter(item => item.costperGallon > 0 && item.fuelBrand) // ensure valid values
    ?.reduce((acc, item) => {
      const key = item.fuelBrand;
      if (!acc[key]) {
        acc[key] = {fuelBrand: key, costperGallon: 0};
      }
      acc[key].costperGallon += item.costperGallon;
      return acc;
    }, {});

  const uniqueBrands = Object.values(groupedData);

  const pieChartData = uniqueBrands.map((item: any, index: any) => {
    const color = colorPalette[index % colorPalette.length];
    return {
      value: item.costperGallon,
      svg: {
        fill: color,
        onPress: () =>
          setSelectedSlice({
            label: item.fuelBrand,
            value: item.costperGallon,
          }),
      },
      key: `pie-${index}`,
      fuelBrand: item.fuelBrand,
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
          console.log('hi', res.data.responseData);
          setCheckData(res.data.responseData);
        }
      })
      .catch(e => console.log(e));
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
            GetFuelLogChart(
              moment(pickDate).format('MM'),
              moment(pickDate).format('YYYY'),
              getTokenDetail(res)?.LoginId,
              code,
            );
          }
        });
      }
    });
  }, [pickDate, countrySymbole]);

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

  const GetFuelLogExcel = async ({startDate, endDate, loginId}: any) => {
    console.log(startDate, endDate);
    CommonServices.getWithTripleQueryParam(
      'FuelLog',
      'GetFuelLogExcel',
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

          const fileName = `FuelSense_FuelLog_Report_${moment(startDate).format(
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
                    <Box bg="emerald.700" px="4" py="2" rounded="sm" mb={5}>
                      <Text color={'#fff'} fontWeight={'bold'}>
                        Your FuelLog Excel report has been downloaded
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

  const downloadPdfHandler = async ({startDate, endDate, loginId}: any) => {
    CommonServices.getWithTripleQueryParam(
      'FuelLog',
      'GetFuelLogPDF',
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
          const fileName = `FuelSense_FuelLog_Report-${moment(startDate).format(
            'YYYY-MM-DDTHH-mm-ss',
          )}_${moment(endDate).format(
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
                      Your FuelLog PDF report has been downloaded successfully.
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
      .catch(e => {
        console.log('PDF download error:', e);
        Alert.alert('Error', 'Something went wrong while downloading the PDF');
      });
  };

  const handleEdit = (val: any) => {
    setEditData(val);
    setFuelLogPlanReadingId(val.planReadingId);
    setfuellogmodelopen(true);
  };

  return (
    <SafeAreaView>
      <Heading p={Platform.OS == 'android' ? '7' : '0'} pt="3" size="lg">
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
            Fuel Log Report
          </Text>
        </View>
      </Heading>

      <View style={{minHeight: screenHeight}}>
        <ScrollView
          scrollEnabled={true}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={true}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{paddingBottom: 100}}>
          <View style={styles.monthpicker}>
            <HStack
              justifyContent="space-between"
              alignItems="center"
              style={{marginBottom: 20}}>
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
                      onPress={GetFuelLogExcel.bind(null, {
                        startDate: moment(pickDate).startOf('month').toDate(),
                        endDate: moment(pickDate).endOf('month').toDate(),
                        loginId: getTokenDetail(accesstoken).LoginId,
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
                        loginId: getTokenDetail(accesstoken).LoginId,
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
              <Stack
                direction="row"
                mb="3"
                mt="1"
                space={4}
                justifyContent={'center'}>
                <Center rounded="sm" shadow={'unset'}>
                  <Text style={styles.driveHero}>Total logs</Text>
                  <Text style={styles.contentText}>
                    {!checkData || checkData?.length == 0
                      ? 0
                      : checkData.length}{' '}
                    Logs
                  </Text>
                </Center>
                <Divider mx="2" orientation="vertical" />
                <Center rounded="sm" shadow={'unset'}>
                  <Text style={styles.driveHero}>Total Fuel Cost</Text>
                  <Text
                    style={
                      styles.contentText
                    }>{`${countrysymbol} ${checkData[0].totalFuelCost.toFixed(
                    2,
                  )}`}</Text>
                </Center>
                <Divider mx="2" orientation="vertical" />
                <Center rounded="sm" shadow={'unset'}>
                  <Text style={styles.driveHero}>Total Fuel Quantity</Text>

                  <Text style={styles.contentText}>
                    {checkData[0].totalFuelQuantity}
                  </Text>
                </Center>
              </Stack>
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
                          <HStack
                            justifyContent="space-between"
                            alignItems="center">
                            <VStack space={1} width={'50%'}>
                              <Text style={styles.driveTile}>
                                <Text style={styles.labelText}>Brand: </Text>
                                {val.fuelBrand?.trim() ? val.fuelBrand : '--'}
                              </Text>
                              <Text style={styles.driveTile}>
                                <Text style={styles.labelText}>Type: </Text>
                                {val.fuelType?.trim() ? val.fuelType : '--'}
                              </Text>
                            </VStack>
                            <VStack
                              space={1}
                              alignItems="flex-end"
                              width={'50%'}>
                              <Text style={styles.mileamt}>
                                <Text style={styles.labelText}>
                                  Cost Per Gallon:{' '}
                                </Text>
                                {countrysymbol} {val.costperGallon?.toFixed(2)}
                              </Text>
                              <Text style={styles.driveTile}>
                                <Text style={styles.labelText}>Date: </Text>
                                {val.fuelLogDate
                                  ? moment(val.fuelLogDate).format(
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
                        Cost Per Gallon: {selectedSlice.value}
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
                            {item.fuelBrand ?? 'Unknown'}: {item.value}
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
        <Modal isOpen={fuellogmodelopen}>
          <FuelLogEdit
            setfuellogmodelopen={setfuellogmodelopen}
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
});

export default FuelLogView;
