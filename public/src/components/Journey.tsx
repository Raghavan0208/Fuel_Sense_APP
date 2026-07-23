/* eslint-disable */
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import {
  Avatar,
  Box,
  Button,
  Center,
  DeleteIcon,
  Divider,
  FavouriteIcon,
  Heading,
  HStack,
  Image,
  InfoIcon,
  Modal,
  Pressable,
  Spacer,
  Spinner,
  Switch,
  Text,
  useToast,
  View,
  VStack,
} from 'native-base';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { SwipeListView } from 'react-native-swipe-list-view';
import { IJourneyModel, IPlanReadingModel } from '../models/Models';
import CommonServices from '../Services/CommonServices';
import { HelperConstant } from './HelperConstant';
import CalendarFilter from './CalenderFilterModal';
import JourneyEditModal from './JourneyModal/JourneyEditModal';
import {
  countryCurrency,
  countryDistance,
  countryDistanceCaps,
} from '../core/data';
import { useNavigation } from '@react-navigation/native';
import CustomTextInput from './CustomTextInput';
import CustomDropDown from './CustomDropDown';

type Props = {
  accessToken: any;
  dashboardData: IJourneyModel;
  countryCode: any;
};

function Journey({ accessToken, dashboardData, countryCode }: Props) {
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
          p={Platform.OS == 'android' ? '5' : '0'}
          pl="3"
          pt="3"
          size="lg">
          <View w={'100%'}>
            <View style={{}}>
              <Text
                color="coolGray.800"
                textTransform={'uppercase'}
                fontWeight="medium"
                style={styles.headText}>
                Journey
              </Text>
            </View>
          </View>
        </Heading>
        <Basic dashboardData={dashboardData} countryCode={countryCode} />
      </Box>
    </Center>
  );
}

function Basic({ dashboardData, countryCode }: any) {
  console.log('dashboardData', dashboardData);
  const [listData, setListData] = useState<Array<IPlanReadingModel>>([]);
  const [isPersonal, setIsPersonal] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const mapRef = useRef() as any;
  const markers = useRef([]) as any;
  const markerPoints = useRef<any>([]);
  const [journeyReading, setJourneyReading] = useState<
    Array<IPlanReadingModel>
  >([]);
  const [load, setLoad] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState('1');
  const [listData2, setListData2] = useState<Array<IPlanReadingModel>>([]);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [journeyDetail, setJourneyDetail] = useState<any>();
  const [totalDrives, setTotalDrives] = useState<number>(0);
  const [milesToClaim, setMilesToClaim] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [dataItemModel, setDataItemModel] = useState({} as IPlanReadingModel);
  const [selectedName, setSelectedName] = useState('');
  const [selectedItemId, setSelectedItemId] = useState<any>(0);
  const [selectedtoggle, setSelectedToggle] = useState<any>(0);
  const navigation = useNavigation();
  const [isreviewdisabled, setIsReviewDisabled] = useState(false);
  const [isUnReviewdisabled, setIsUnReviewDisabled] = useState(false);
  const [fuellogmodelopen, setfuellogmodelopen] = useState(false);
  const [fuelogDistance, setFuelLogDistance] = useState<any>('');
  const [costPerGallon, setCostperGallon] = useState<any>();
  const [isSubmitPressed, setIsSubmitPressed] = useState<any>(false);
  const [fuelQuantity, setFuelQuantity] = useState<any>();
  const [fuelBrandArray, setFuelBrandArray] = useState<Array<any>>([]);
  const [fuelBrand, setFuelBrand] = useState<any>();
  const [totalFuelCost, setTotalFuelCost] = useState<any>();
  const [lastMPG, setLastMPG] = useState<any>();
  const [fuellogplanreadingId, setFuelLogPlanReadingId] = useState<any>();

  const [fuelTypeArray, setFuelTypeArray] = useState<Array<any>>([]);
  const [fuelType, setFuelType] = useState<any>();

  useEffect(() => {
    getJourneyDetails(dashboardData.id, countryCode);

    const quantity = parseFloat(fuelQuantity) || 0;
    const distance = parseFloat(fuelogDistance) || 0;

    const totalCost = (parseFloat(costPerGallon) || 0) * quantity;
    setTotalFuelCost(totalCost.toFixed(2));

    if (quantity > 0) {
      const totalLastMPG = distance / quantity;
      setLastMPG(totalLastMPG.toFixed(2));
    } else {
      setLastMPG('0.00');
    }

  }, [costPerGallon, fuelQuantity, fuelogDistance, dashboardData.id]);

  const toast = useToast();
  const options = [
    {
      name: 'Business',
      icon: require('../assests/bag.png'),
    },
    {
      name: HelperConstant.personal,
      icon: require('../assests/home.png'),
    },
  ];

  const resetForm = () => {
    setFuelLogDistance('');
    setCostperGallon('');
    setFuelQuantity('');
    setFuelBrand('');
    setFuelType('');
    setTotalFuelCost('');
    setLastMPG('');
  };

  const updateFuelLogStatus = () => {
    CommonServices.postWithQueryParam("Journey", "UpdateFuelLogstatus", "planreadingid", fuellogplanreadingId, countryCode).then((res) => {
      if (res.status == 200) {
        getJourneyDetails(dashboardData.id, countryCode);
        // setopenSnack(true);
        // setOpenFuelLogCreation(false);
        // getJourneyDetails();
      }
    })
  }

  const onSubmitPress = () => {
    setIsSubmitPressed(true);

    const data = {
      fuellogdate: moment(new Date()).format("YYYY-MM-DD HH:mm"),
      planreadingid: fuellogplanreadingId,  // Replace with actual value
      userplanid: dashboardData.id,      // Replace with actual value
      distance: fuelogDistance,
      costpergallon: costPerGallon,
      fuelquantity: fuelQuantity,
      fuelBrand: fuelBrand,
      fueltype: fuelType,
      totalfuelcost: totalFuelCost,
      lastmpg: lastMPG
    };
    CommonServices.post("FuelLog", "Create", data, countryCode).then((res) => {
      if (res.status === 200) {
        setfuellogmodelopen(false);
        updateFuelLogStatus();
        Alert.alert('Success', 'Fuel Log Added Successfully');
        getJourneyDetails(dashboardData.id, countryCode);
      }
    })
      .catch(e => {
        Alert.alert('Error', 'Kindly Ensure the data is entered correctly');
        console.error('Error posting data:', e.response?.data || e.message);
      });
  }

  useEffect(() => {
    // getJourneyDetails(dashboardData.id, countryCode);
    setLoad(load);
    console.log(listData);
    setTotalDrives(listData?.length);
    let sumOfMiles = 0;
    let totalAmount = 0;
    let reviewedjourney = 0;

    listData?.map(item => {
      sumOfMiles += Number(item?.distance);

      if (item && item?.name != 'Personal') {
        totalAmount +=
          Number(item?.distance) * item?.userVehicleDetails?.rateValue;
        reviewedjourney = item.id;
        setSelectedToggle(reviewedjourney);
      }
    });

    setMilesToClaim(sumOfMiles);
    setTotalAmount(totalAmount);

  }, [load, editModal, listData]);


  // const handleRowClick = (clickedIndex: any) => {
  //   const totalDistancecalc = listData
  //     .slice(-(clickedIndex + 1))
  //     .reduce((sum, item) => sum + (item.distance || 0), 0).toFixed(2);
  //   setFuelLogDistance(totalDistancecalc);
  // };

  const handleRowClick = (clickedIndex: number) => {
    const previousFuelLogIndexes = listData.reverse()
      .map((item, index) => ({ ...item, index }))
      .filter(item => item.isFuelLogAdded)
      .map(item => item.index);

    const lastFuelLogIndex = previousFuelLogIndexes.reverse().find(index => index < clickedIndex);

    console.log(clickedIndex, lastFuelLogIndex);
    console.log(listData[clickedIndex]?.distance)
    if (lastFuelLogIndex !== undefined) {
      let distanceDiff;

      if (listData[lastFuelLogIndex]?.distance > listData[clickedIndex]?.distance) {
        distanceDiff = ((listData[lastFuelLogIndex]?.distance || 0) - (listData[clickedIndex]?.distance || 0)).toFixed(2);
      }
      if (listData[lastFuelLogIndex]?.distance < listData[clickedIndex]?.distance) {
        distanceDiff = ((listData[clickedIndex]?.distance || 0) - (listData[lastFuelLogIndex]?.distance || 0)).toFixed(2);
      }
      setFuelLogDistance(distanceDiff);
    } else {
      let defaultdata = listData[clickedIndex]?.distance.toFixed(2);
      setFuelLogDistance(defaultdata);
    }
  };

  const radioHandler = (value: any) => {
    setSelectedRadio(value);
    if (value == '1') {
      setListData(listData2);
    }
    if (value == '2') {
      let filterData = listData2.filter(
        (x: { name: string }) =>
          // x.name.includes('Business'),
          x.name !== 'Personal',
      );
      setListData(filterData);
    }
    if (value == '3') {
      let filterData = listData2.filter((x: { name: string }) =>
        x.name.includes('Personal'),
      );
      setListData(filterData);
    }
  };

  const distanceMeter = countryDistance[countryCode ?? 'UK'];
  const countryDistanceCapitalize = countryDistanceCaps[countryCode ?? 'UK'];
  const countrySymbole = countryCurrency[countryCode];

  const getJourneyDetails = (userPlanId: any, country: string) => {
    console.log('userPlanId', userPlanId, country);
    CommonServices.getWithQueryParam(
      'Journey',
      'GetAllPlanReading',
      'userplanid',
      userPlanId,
      country,
    )
      .then(res => {
        if (res.status === 200) {
          console.log('Journey data:', res.data);
          setJourneyReading(res.data);
          setListData(res.data);
          setListData2(res.data);
          setDataLoaded(true);
        }
      })
      .catch((e: string) => {
        console.log(e);
      });
  };

  const updateReviewed = (planreadingid: any) => {
    CommonServices.postWithQueryParam(
      'Journey',
      'UpdatePlanReadingReviewed',
      'planreadingid',
      planreadingid,
      countryCode,
    ).then(res => {
      if (res.status === 200) {
        setModalVisible(false);
        setDataLoaded(false);
        getJourneyDetails(dashboardData.id, countryCode);
      }
    });
  };

  // useEffect(() => {
  //   // getJourneyDetails(dashboardData.id, countryCode);
  //   // setLoad(load);
  // }, [load, editModal]);

  const viewRow = async (dataItem: any) => {
    let togglevalue = 0;

    if (dataItem != '') {
      setDataItemModel(dataItem);
    } else {
      setDataItemModel('' as any);
    }
    setSelectedToggle(dataItem?.id);
    setSelectedItemId(dataItem?.id);
    setSelectedName(dataItem?.name);

    togglevalue = dataItem?.id;
    setSelectedToggle(togglevalue);

    setIsReviewDisabled(dataItem?.isReviewed);
    setIsUnReviewDisabled(dataItem?.isReviewed);

    const firebaseId = (dataItem?.latitude + '_' + dataItem?.longitude)
      ?.toString()
      ?.replaceAll('/', '-');

    try {
      const doc = await firestore().collection('trips').doc(firebaseId).get();
      if (doc.exists) {
        const data = doc.data();

        let findedObj = listData.find(x => x?.id == dataItem?.id);
        let selectedJourney = [
          {
            _id: '1',
            name: 'source',
            latitude: Number(data?.start?.latitude),
            longitude: Number(data?.start?.longitude),
            color: 'green',
            location: findedObj?.startLocation,
          },
          {
            _id: '2',
            name: 'destination',
            latitude: Number(data?.end?.latitude),
            longitude: Number(data?.end?.longitude),
            color: 'red',
            location: findedObj?.endLocation,
          },
        ];
        if (findedObj?.latitude != '') {
          markers.current = selectedJourney;
          mapRef.current?.fitToElements(true);
          markerPoints.current = data?.travelPoints || [];
          setModalVisible(true);
        }
      } else {
        if (dataItem && dataItem.latitude && dataItem.longitude) {
          // Given object with latitude and longitude strings
          let latitude = dataItem?.latitude;
          let longitude = dataItem?.longitude;

          // Split latitude and longitude by '/'
          let latBeforeSlash = latitude.split('/')[0];
          let latAfterSlash = latitude.split('/')[1];

          let longBeforeSlash = longitude.split('/')[0];
          let longAfterSlash = longitude.split('/')[1];

          let findedObj = listData.find(x => x?.id == dataItem?.id);
          let selectedJourney = [
            {
              _id: '1',
              name: 'source',
              latitude: Number(latBeforeSlash),
              longitude: Number(longBeforeSlash),
              color: 'green',
              location: findedObj?.startLocation,
            },
            {
              _id: '2',
              name: 'destination',
              latitude: Number(latAfterSlash),
              longitude: Number(longAfterSlash),
              color: 'red',
              location: findedObj?.endLocation,
            },
          ];

          if (findedObj?.latitude && findedObj?.latitude != '') {
            markers.current = selectedJourney;
            mapRef.current?.fitToElements(true);
            markerPoints.current =
              [
                {
                  latitude: Number(latBeforeSlash),
                  longitude: Number(longBeforeSlash),
                },
                {
                  latitude: Number(latAfterSlash),
                  longitude: Number(longAfterSlash),
                },
              ] || [];
            setModalVisible(true);
          }
        }
      }
    } catch (er) {
      console.log('er', er);
    }
  };


  const getAllFuelBrand = () => {
    CommonServices.get("Master", "GetAllFuelBrand", countryCode).then(res => {
      if (res.status === 200) {
        setFuelBrandArray(res.data);
      }
    }).catch((e: string) => {
      console.log(e);
    });
  }


  const getFuelType = () => {
    CommonServices.get("Master", "GetAllFuelType", countryCode).then(res => {
      if (res.status === 200) {
        setFuelTypeArray(res.data)
      }
    }).catch(e => console.log(e));
  }


  const deleteRow = () => {
    setDataLoaded(false);
    CommonServices.postWithQueryParam(
      'Journey',
      'DeleteJourney',
      'id',
      deleteId,
      countryCode,
    )
      .then(res => {
        if (res.status == 200) {
          setDeleteModal(false);
          setLoad(!load);
        }
      })
      .catch(e => console.log(e));
  };

  // const onRowDidOpen = (rowKey: any) => {
  //   // console.log('This row opened', rowKey);
  // };

  const onCartEditPress = (itemData: any) => {
    setJourneyDetail(itemData);
    setEditModal(true);
  };
  const editHandler = (value: boolean, id: number) => {
    setDataLoaded(false);
    let name = value ? HelperConstant.personal : HelperConstant.business;
    setIsPersonal(!isPersonal);
    CommonServices.postWithDoubleQueryParam(
      'Journey',
      'UpdateReadingName',
      'name',
      name,
      'id',
      id,
      countryCode,
    )
      .then(res => {
        if (res.status == 200) {
          setLoad(!load);
        }
      })
      .catch(e => console.log(e));
  };

  const editHandlerPopup = (value: boolean, id: number, recentname: any) => {
    setDataLoaded(false);
    let name = value ? recentname : HelperConstant.business;
    setIsPersonal(!isPersonal);
    CommonServices.postWithDoubleQueryParam(
      'Journey',
      'UpdateReadingName',
      'name',
      recentname,
      'id',
      id,
      countryCode,
    )
      .then(res => {
        if (res.status == 200) {
          setLoad(!load);
          setModalVisible(false);
        }
      })
      .catch(e => console.log(e));
  };

  const GOOGLE_MAPS_APIKEY = 'AIzaSyClEJhfMqEtTy6dcofhkDL1RvfhVTO2wss';

  const actionHandler = (createdDate: string) => {
    let future = new Date(createdDate);
    future.setDate(future.getDate() + 30);

    if (future <= new Date()) {
      return true;
    }
    return false;
  };

  const onFuellogOdometerClicked = (indexValue: any, planreadingId: any) => {
    setfuellogmodelopen(true);
    getAllFuelBrand();
    getFuelType();
    handleRowClick(indexValue);
    setFuelLogPlanReadingId(planreadingId);
  }

  const renderItem = useMemo(
    () =>
      ({ item, index }: any) => {
        const tableIndex = (listData.length - 1) - index;
        return (
          <>
            <Box key={index}>
              <Pressable
                _dark={{
                  bg: 'coolGray.800',
                }}
                _light={{
                  bg: 'white',
                  shadow: 10,
                }}>
                <Box pl="4" pr="5" py="2">
                  <HStack alignItems="center" space={3}>
                    {item.isFuelLogAdded == true ? <Image source={require('../assests/fuellogsuccess2.png')} width={7} height={7} style={{ tintColor: 'green' }} alt='fuellogadded' /> :
                      <TouchableOpacity
                        onPress={() => {
                          onFuellogOdometerClicked(tableIndex, item.id);
                        }}>
                        <Image
                          // mr="3"
                          source={require('../assests/milesjourney.png')}
                          alt="jorney"
                          width={7}
                          height={7}
                        />
                      </TouchableOpacity>
                    }
                    <VStack>
                      <HStack alignItems="center" space={4}>
                        <Image
                          style={{ height: 23, width: 23 }}
                          source={require('../assests/bag.png')}
                          alt="jorney"
                        />
                        <Switch
                          disabled={actionHandler(item.created)}
                          style={{ marginLeft: -18, marginRight: -15 }}
                          defaultIsChecked={
                            item.name == HelperConstant.personal ? true : false
                          }
                          size="sm"
                          onValueChange={e => editHandler(e, item.id)}
                        />
                        <Image
                          style={{ height: 23, width: 23 }}
                          source={require('../assests/home.png')}
                          alt="jorney"
                        />
                        {item.isReviewed == true ? (
                          <Image
                            width={'10'}
                            height={8}
                            // right={'2'}
                            left={'1'}
                            source={require('../assests/starimage.png')}
                            alt="reviewed"
                          />
                        ) : (
                          ''
                        )}
                      </HStack>
                      <Text
                        color="coolGray.600"
                        _dark={{
                          color: 'warmGray.200',
                        }}>
                        {item.distance} {distanceMeter}
                      </Text>
                    </VStack>

                    <Image
                      position={'absolute'}
                      right={'20'}
                      width={'16'}
                      source={require('../assests/journeyco2.png')}
                      alt="co2"
                      tintColor={'#dadada'}
                    />
                    <Text
                      fontSize="xs"
                      fontWeight={'bold'}
                      position={'absolute'}
                      right={'24'}
                      bottom={3}
                      color={'#0f2c4a'}>
                      {' '}
                      {item.co2Emission}g
                    </Text>
                    <Text
                      fontSize="xs"
                      fontWeight={'bold'}
                      position={'absolute'}
                      right={'20'}
                      bottom={-5}>
                      CO2
                    </Text>
                    <Spacer />
                    <Text
                      fontSize="xs"
                      color="coolGray.800"
                      fontWeight={'bold'}
                      _dark={{
                        color: 'warmGray.50',
                      }}
                      alignSelf="flex-start">
                      {moment(item.entryDate).format('L')}
                    </Text>
                    {actionHandler(item.created) ? (
                      <Box position={'absolute'} right={0}>
                        <Pressable
                          onPress={() =>
                            Alert.alert(
                              'Info',
                              'If you wish to modify or delete your Journey, you must do so within 30 days of adding it',
                            )
                          }>
                          <InfoIcon />
                        </Pressable>
                      </Box>
                    ) : null}
                  </HStack>
                </Box>
                <Divider />
              </Pressable>
            </Box>

            {/* <View>
              <Switch
                disabled={actionHandler(item.created)}
                style={{ marginLeft: -18, marginRight: -15 }}
                defaultIsChecked={item.name == HelperConstant.personal ? true : false}
                size="sm"
                onValueChange={e => {
                  setSelectedToggle(item.id);
                  console.log(togglevalue); // Update the selected toggle
                  editHandlerPopup(e, togglevalue);
                }} />
            </View> */}

            {/* <View style={styles.containerswitch}>
                    {options.map((option, index) => (
                      <React.Fragment key={index}>
                        <TouchableOpacity
                          key={index}
                          style={[
                            styles.option,
                            selectedName === option.name && styles.selectedOption,
                          ]}
                          onPress={(e: any) => editHandlerPopup(e, 809)}
                        >
                          <Text
                            style={[
                              styles.text,
                              selectedName === option.name && styles.selectedText,
                            ]}
                          >
                            <Image
                              style={{ height: 20, width: 20 }}
                              source={option.icon}
                              alt="jorney"
                            /> {` `} {option.name}
                          </Text>
                        </TouchableOpacity>
                        {index < options.length - 1 && <View style={styles.separator} />}
                      </React.Fragment>
                    ))}
                  </View> */}
          </>
        );
      },
    [listData],
  );

  function getTimeDifference(startTime: any, endTime: any) {
    const [startHours, startMinutes, startSeconds] = startTime
      .split(':')
      .map(Number);
    const [endHours, endMinutes, endSeconds] = endTime.split(':').map(Number);

    // Convert everything to total seconds
    const startTotalSeconds =
      startHours * 3600 + startMinutes * 60 + startSeconds;
    const endTotalSeconds = endHours * 3600 + endMinutes * 60 + endSeconds;

    // Calculate the difference
    let diffSeconds = endTotalSeconds - startTotalSeconds;

    // Convert back to hours, minutes, and seconds
    const hours = Math.floor(diffSeconds / 3600);
    diffSeconds %= 3600;
    const minutes = Math.floor(diffSeconds / 60);
    const seconds = diffSeconds % 60;

    return `${hours} hours ${minutes} minutes ${seconds} seconds`;
  }

  const renderHiddenItem = useMemo(
    () => (data: any, rowMap: any) =>
    (
      <HStack flex="1" pl="3">
        <Pressable
          w="70"
          ml="auto"
          bg={data.item?.latitude == '' ? 'coolGray.50' : 'coolGray.200'}
          justifyContent="center"
          onPress={() => viewRow(data?.item)}
          // onPress={() => navigation.navigate("JourneyDetails", { journeyDetail: data?.item, listData, damoovToken })}
          _pressed={{
            opacity: 0.5,
          }}>
          <VStack alignItems="center" space={2}>
            <Image
              source={require('../assests/showpass.png')}
              width={4}
              height={4}
              alt="dateofjourney"
            />
            <Text
              fontSize="xs"
              fontWeight="medium"
              color={
                data.item?.latitude == '' ? 'coolGray.200' : 'coolGray.800'
              }>
              View
            </Text>
          </VStack>
        </Pressable>
        <Pressable
          w="70"
          bg={actionHandler(data.item.created) ? 'blue.100' : 'blue.200'}
          disabled={actionHandler(data.item.created)}
          justifyContent="center"
          onPress={() => onCartEditPress(data?.item)}
          _pressed={{
            opacity: 0.5,
          }}>
          <VStack alignItems="center" space={2}>
            <Image
              source={require('../assests/report.png')}
              width={5}
              style={{ tintColor: 'black' }}
              height={5}
              alt="dateofjourney"
            />
            <Text color="black" fontSize="xs" fontWeight="medium">
              Edit
            </Text>
          </VStack>
        </Pressable>
        <Pressable
          w="70"
          bg={actionHandler(data.item.created) ? 'red.200' : 'red.500'}
          disabled={actionHandler(data.item.created)}
          justifyContent="center"
          onPress={() => {
            setDeleteId(data.item.id);
            setDeleteModal(true);
          }}
          _pressed={{
            opacity: 0.5,
          }}>
          <VStack alignItems="center" space={2}>
            <DeleteIcon size="4" color="white" />
            <Text color="white" fontSize="xs" fontWeight="medium">
              Delete
            </Text>
          </VStack>
        </Pressable>
      </HStack>
    ),
    [listData],
  );

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

  return (
    <Box bg="white" mt={'5'} flex="1" mb={'20'}>
      <View style={styles.headerContainer}>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.reportMonth}>{totalDrives} drives</Text>
          <Text style={styles.miles}>Total drives</Text>
        </View>
        <View style={{ height: 50, width: 1, backgroundColor: '#aaa' }} />
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.reportMonth}>{milesToClaim.toFixed(2)}</Text>
          <Text style={styles.miles}>Total {countryDistanceCapitalize}</Text>
        </View>
        <View style={{ height: 50, width: 1, backgroundColor: '#aaa' }} />
        <TouchableOpacity activeOpacity={1} style={{ alignItems: 'center' }}>
          <Text style={styles.reportMonth}>
            {' '}
            {countrySymbole + ' ' + totalAmount.toFixed(2)}
          </Text>
          <Text style={styles.miles}>Total Amount</Text>
        </TouchableOpacity>
      </View>
      <CalendarFilter
        setListData2={setListData2}
        setListData={setListData}
        journeyReading={journeyReading}
      />
      <JourneyEditModal
        setShowModal={setEditModal}
        isUpdate={() => setDataLoaded(false)}
        showModal={editModal}
        country={countryCode}
        data={journeyDetail}
      />

      <View w={'100%'}>
        <HStack space={3} justifyContent="center" pb="4">
          <Pressable onPress={() => radioHandler('1')}>
            <Center
              h="10"
              w="24"
              bg={selectedRadio == '1' ? '#4f4f4f' : '#dadada'}
              rounded="md"
              // color={selectedRadio == '1' ? '#fff' : '#000'}
              shadow={selectedRadio == '1' ? '0' : '5'}>
              <Text color={selectedRadio == '1' ? 'white' : 'black'}>All</Text>
            </Center>
          </Pressable>
          <Pressable onPress={() => radioHandler('2')}>
            <Center
              h="10"
              w="24"
              bg={selectedRadio == '2' ? '#4f4f4f' : '#dadada'}
              rounded="md"
              shadow={selectedRadio == '2' ? '0' : '5'}>
              <Text color={selectedRadio == '2' ? 'white' : 'black'}>Business</Text>
            </Center>
          </Pressable>
          <Pressable onPress={() => radioHandler('3')}>
            <Center
              h="10"
              w="24"
              bg={selectedRadio == '3' ? '#4f4f4f' : '#dadada'}
              rounded="md"
              shadow={selectedRadio == '3' ? '0' : '5'}>
              <Text color={selectedRadio == '3' ? 'white' : 'black'}>Personal</Text>
            </Center>
          </Pressable>
        </HStack>
      </View>
      <VStack style={{ flex: 1 }}>
        <SwipeListView
          data={listData}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-210}
          previewRowKey={'0'}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          // onRowDidOpen={onRowDidOpen}
          keyExtractor={item => item?.id?.toString()}
          showsVerticalScrollIndicator={false}
        />
      </VStack>

      {/* delete modal */}
      <Modal isOpen={deleteModal} onClose={setDeleteModal} size={'sm'}>
        <Modal.Content maxH="212">
          <Modal.CloseButton
            onPress={() => {
              setDeleteModal(false);
            }}
          />
          <Modal.Header>Delete Journey </Modal.Header>
          <Modal.Body>
            <Text fontSize={15}>
              This Journey will permanently delete, Do you want to continue?
            </Text>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="outline"
                borderColor="black"
                _text={{ color: 'black' }}
                onPress={() => {
                  setDeleteModal(false);
                }}>
                Cancel
              </Button>
              <Button
                backgroundColor={'#000'}
                onPress={() => {
                  deleteRow();
                }}>
                Yes, Proceed
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      {/* Journey View */}
      <Modal isOpen={modalVisible} onClose={setModalVisible} size={'md'}>
        <Modal.Content h={'container'} w="600">
          <Modal.Header>
            <Modal.CloseButton
              onPress={() => {
                setModalVisible(false);
              }}
              style={{ marginTop: -10, marginRight: -10 }}
            />
            <View style={styles.headerContainerPopup}>
              {/* <View style={{ alignItems: 'center' }}>
                <Text style={styles.miles}> Date</Text>
                <Image
                  source={require('../assests/dateofjourney.png')}
                  width={5}
                  height={5}
                  alt="dateofjourney"
                />
                <Text style={styles.locTextpopup}> {moment(dataItemModel?.entryDate).format('DD/MM/YYYY')}</Text>
              </View> */}

              <View style={{ alignItems: 'center' }}>
                <Text style={styles.miles}> Co2</Text>
                <Image
                  source={require('../assests/co2.png')}
                  width={5}
                  height={5}
                  alt="dateofjourney"
                />
                <Text style={styles.locTextpopup}>
                  {dataItemModel?.co2Emission}g
                </Text>
              </View>

              <View style={{ height: 50, width: 1, backgroundColor: '#aaa' }} />
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.miles}>
                  {' '}
                  {/* {countryCode == 'UK' ? 'Miles' : 'KMs'} */}
                  {countryDistanceCapitalize}
                </Text>
                <Image
                  source={require('../assests/milesjourney.png')}
                  width={5}
                  height={5}
                  alt="miles"
                />
                <Text style={styles.locTextpopup}>
                  {dataItemModel?.distance}
                </Text>
              </View>

              <View style={{ height: 50, width: 1, backgroundColor: '#aaa' }} />
              <TouchableOpacity
                activeOpacity={1}
                style={{ alignItems: 'center' }}>
                <Text style={styles.miles}> Amount</Text>
                <Image
                  source={require('../assests/amountjourney.png')}
                  width={5}
                  height={5}
                  alt="Amount"
                />
                <Text style={styles.locTextpopup}>
                  {countrySymbole + ' '}
                  {dataItemModel.name == HelperConstant.personal
                    ? '0.00'
                    : (
                      Number(dataItemModel?.distance) *
                      dataItemModel?.userVehicleDetails?.rateValue
                    ).toFixed(2)}
                </Text>
              </TouchableOpacity>
            </View>
          </Modal.Header>
          <Modal.Body h="300">
            <MapView
              ref={mapRef}
              style={styles.map}
              initialRegion={{
                latitude: markers.current[0]?.latitude,
                longitude: markers.current[0]?.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}>
              {markers.current.map(
                (marker: any, i: React.Key | null | undefined) => (
                  <Marker
                    pinColor={marker.color}
                    key={i}
                    identifier={marker._id}
                    coordinate={{
                      latitude: marker.latitude,
                      longitude: marker.longitude,
                    }}
                    focusable
                    title={marker.name}
                  />
                ),
              )}
              {/* <Polyline
                coordinates={[
                  {
                    latitude: markers.current[0]?.latitude,
                    longitude: markers.current[0]?.longitude,
                  },
                  {
                    latitude: markers.current[1]?.latitude,
                    longitude: markers.current[1]?.longitude,
                  },
                ]}
                strokeColor="#4090fc" // fallback for when `strokeColors` is not supported by the map-provider
                strokeWidth={4}
              /> */}

              {markerPoints?.current?.length ? (
                <MapViewDirections
                  mode={'DRIVING'}
                  origin={{
                    latitude: markers.current[0]?.latitude,
                    longitude: markers.current[0]?.longitude,
                  }}
                  destination={{
                    latitude:
                      markerPoints?.current[markerPoints?.current?.length - 1]
                        ?.latitude,
                    longitude:
                      markerPoints?.current[markerPoints?.current?.length - 1]
                        ?.longitude,
                  }}
                  apikey={GOOGLE_MAPS_APIKEY}
                  waypoints={markerPoints.current || undefined}
                  strokeWidth={5}
                  strokeColor="#4090fc"
                  optimizeWaypoints={true}
                  onReady={result => {
                    //   setDistance(result.distance);
                    //   setTime(result.duration);
                    mapRef.current?.fitToElements(result.coordinates, {
                      edgePadding: {
                        // right: 30,
                        // bottom: 300,
                        // left: 30,
                        // top: 100,
                      },
                    });
                  }}
                />
              ) : (
                <></>
              )}
            </MapView>
          </Modal.Body>
          {markers.current[0]?.location == '' &&
            markers.current[1]?.location == '' ? (
            <></>
          ) : (
            <>
              <View style={styles.location}>
                <HStack alignItems="flex-end" justifyContent="space-between" w="100%" mb='2'>
                  <Text style={styles.locTextpopup}>
                    {' '}
                    {moment(dataItemModel?.entryDate).format(
                      'dddd, DD MMMM YYYY',
                    )}
                  </Text>
                  {dataItemModel.isFuelLogAdded == true ?
                    <Text style={{ fontSize: 20 }}>
                      ⛽
                    </Text> : ''}
                </HStack>
              </View>
              <View>
                <VStack space={4} alignItems="center">
                  <HStack space={5} justifyContent={'center'}>
                    <Center
                      w="95%"
                      h="auto"
                      p="1.5"
                      bg="gray.100"
                      rounded="md"
                      shadow={3}
                      alignItems={'flex-start'}>
                      <HStack>
                        <Image
                          source={require('../assests/location-pin-green.png')}
                          width={5}
                          height={5}
                          alt="startlocation"
                        />
                        <Text ml="1" style={styles.locTitle}>
                          Start Location
                        </Text>
                      </HStack>
                      <Text style={styles.locText}>
                        {markers.current[0]?.location}
                      </Text>
                      {/* {dataItemModel?.startJourneyTime && (
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginStart: -5,
                          }}>
                          <Text ml="1" style={styles.locTitle}>
                            Start Time:
                          </Text>
                          <Text style={styles.locText}>
                            {dataItemModel?.startJourneyTime}
                          </Text>
                        </View>
                      )} */}
                    </Center>
                  </HStack>
                  <HStack space={5} justifyContent={'center'}>
                    <Center
                      w="95%"
                      h="auto"
                      p="1.5"
                      bg="gray.100"
                      rounded="md"
                      shadow={3}
                      alignItems={'flex-start'}>
                      <HStack>
                        <Image
                          source={require('../assests/location-pin-red.png')}
                          width={5}
                          height={5}
                          alt="startlocation"
                        />
                        <Text ml="1" style={styles.locTitle}>
                          End Location
                        </Text>
                      </HStack>
                      <Text style={[styles.locText]}>
                        {markers.current[1]?.location}
                      </Text>
                      {/* {dataItemModel?.endJourneyTime && (
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginStart: -5,
                          }}>
                          <Text ml="1" style={styles.locTitle}>
                            End Time:
                          </Text>
                          <Text style={styles.locText}>
                            {dataItemModel?.endJourneyTime}
                          </Text>
                        </View>
                      )} */}
                    </Center>
                    {/* <Center w="20" h="16" p="1.5" bg="gray.100" rounded="md" shadow={3} >13:22</Center> */}
                  </HStack>
                  {/* {dataItemModel?.startJourneyTime &&
                  dataItemModel?.endJourneyTime ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginStart: -5,
                      }}>
                      <Text ml="1" style={styles.locTitle}>
                        Time Traveled:
                      </Text>
                      <Text style={styles.locText}>
                        {getTimeDifference(
                          dataItemModel?.startJourneyTime,
                          dataItemModel?.endJourneyTime,
                        )}
                      </Text>
                    </View>
                  ) : null} */}
                  <View style={styles.containerswitch}>
                    {options.map((option, index) => (
                      <React.Fragment key={index}>
                        <TouchableOpacity
                          key={index}
                          style={[
                            styles.option,
                            (selectedName === HelperConstant.personal &&
                              option.name === HelperConstant.personal) ||
                              (selectedName !== HelperConstant.personal &&
                                option.name === 'Business')
                              ? styles.selectedOption
                              : null,
                          ]}
                          onPress={(e: any) => {
                            setSelectedName(option.name);
                            editHandlerPopup(e, selectedtoggle, option.name);
                          }}>
                          <Text
                            style={[
                              styles.text,
                              (selectedName === HelperConstant.personal &&
                                option.name === HelperConstant.personal) ||
                                (selectedName !== HelperConstant.personal &&
                                  option.name === 'Business')
                                ? styles.selectedText
                                : null,
                            ]}>
                            <Image
                              style={{ height: 20, width: 20 }}
                              source={option.icon}
                              alt="journey"
                            />{' '}
                            {` `} {option.name}
                          </Text>
                        </TouchableOpacity>
                        {index < options.length - 1 && (
                          <View style={styles.separator} />
                        )}
                      </React.Fragment>
                    ))}
                  </View>
                  <HStack justifyContent={'center'}>
                    <Pressable>
                      <Button.Group margin={5} mt={-1}>
                        <Button
                          backgroundColor={'black'}
                          size={'lg'}
                          isDisabled={isreviewdisabled}
                          width={'50%'}
                          onPress={() => {
                            updateReviewed(selectedItemId);
                            setIsReviewDisabled(true);
                          }}>
                          Reviewed
                        </Button>
                        <Button
                          backgroundColor={'black'}
                          width={'50%'}
                          size={'lg'}
                          _text={{ color: 'white' }}
                          isDisabled={!isUnReviewdisabled}
                          onPress={() => {
                            updateReviewed(selectedItemId);
                            setIsUnReviewDisabled(true);
                          }}>
                          Unreviewed
                        </Button>
                      </Button.Group>
                    </Pressable>
                  </HStack>
                </VStack>
              </View>

              {/* <View style={styles.location}>
                <HStack>
                  <Image
                    source={require('../assests/location-pin-green.png')}
                    width={5}
                    height={5}
                    alt="startlocation" />
                  <Text ml="1" style={styles.locTitle}>
                    Start Location
                  </Text>
                </HStack>
                <Text style={styles.locText}>{markers.current[0]?.location}</Text>
                <HStack>
                  <Image
                    source={require('../assests/location-pin-red.png')}
                    width={5}
                    height={5}
                    alt="endlocation" />
                  <Text ml="1" style={styles.locTitle}>
                    End Location
                  </Text>
                </HStack>
                <Text style={styles.locText}>{markers.current[1]?.location}</Text>
              </View> */}
            </>
          )}
        </Modal.Content>
      </Modal>

      <Modal isOpen={fuellogmodelopen}>
        <Modal.Content maxWidth="100%" w="100%" h="auto" maxHeight="100%">
          <Modal.CloseButton
            onPress={() => {
              setfuellogmodelopen(false);
              setIsSubmitPressed(false);
              resetForm();
            }} />
          <Modal.Header> Add Fuel Log for this Journey</Modal.Header>
          <Modal.Body>
            <Text ml="1" style={styles.locTitle}>
              Distance
            </Text>
            <View style={{ marginBottom: 3 }}>
              <CustomTextInput
                placeHolder="Distance"
                defaultValue={''}
                editable={false}
                textInputStyle={{
                  backgroundColor: '#eeeeee',
                  borderRadius: 10,
                }}
                value={fuelogDistance}
              />
            </View>

            <View style={{ marginBottom: 3 }}>
              <Text ml="1" style={styles.locTitle}>
                Cost Per Gallon *
              </Text>
              <CustomTextInput
                keyboardType={'number-pad'}
                placeHolder="Cost Per Gallon"
                value={costPerGallon}
                onValueChange={setCostperGallon}
              />
              {isSubmitPressed && !costPerGallon ? (
                <Text style={styles.errorText}>
                  Cost is Required
                </Text>
              ) : (
                ''
              )}
            </View>

            <View style={{ marginBottom: 3 }}>
              <Text ml="1" style={styles.locTitle}>
                Fuel Quantity Litre/Gallon *
              </Text>
              <CustomTextInput
                placeHolder="Fuel Quantity"
                value={fuelQuantity}
                keyboardType={'number-pad'}
                onValueChange={setFuelQuantity}
              />
              {isSubmitPressed && !fuelQuantity ? (
                <Text style={styles.errorText}>
                  Fuel Quantity is Required
                </Text>
              ) : (
                ''
              )}
            </View>

            <View style={{ marginBottom: 3 }}>
              <Text ml="1" style={styles.locTitle}>
                Fuel Brand *
              </Text>
              <CustomDropDown
                data={fuelBrandArray}
                placeholder={'Fuel Brand'}
                value={fuelBrand}
                setValue={setFuelBrand}
                customStyle={{ paddingLeft: 10 }}
              />
              {isSubmitPressed && (fuelBrand == null) ? (
                <Text style={styles.errorText}>Fuel Brand is Required</Text>
              ) : (
                ''
              )}
            </View>

            <View style={{ marginBottom: 3 }}>
              <Text ml="1" style={styles.locTitle}>
                Fuel Type *
              </Text>
              <CustomDropDown
                data={fuelTypeArray}
                value={fuelType}
                placeholder={'Fuel Type'}
                setValue={setFuelType}
                customStyle={{ paddingLeft: 10 }}
              />
              {isSubmitPressed && (fuelType == null) ? (
                <Text style={styles.errorText}>Fuel Type is Required</Text>
              ) : (
                ''
              )}
            </View>


            <Text ml="1" style={styles.locTitle}>
              Total Fuel Cost
            </Text>
            <View style={{ marginBottom: 3 }}>

              <CustomTextInput
                placeHolder="Total Fuel Cost"
                value={totalFuelCost}
                editable={false}
                textInputStyle={{
                  backgroundColor: '#eeeeee',
                  borderRadius: 10,
                }}
                keyboardType={'number-pad'}
                onValueChange={setTotalFuelCost}
              />
            </View>

            <Text ml="1" style={styles.locTitle}>
              Last MPG <Text style={{ fontSize: 13, fontWeight: '500' }}>(Miles Per Gallon)</Text>
            </Text>
            <View style={{ marginBottom: 3 }}>
              <CustomTextInput
                textInputStyle={{
                  backgroundColor: '#eeeeee',
                  borderRadius: 10,
                }}
                placeHolder="Last MPG"
                value={lastMPG}
                editable={false}
                keyboardType={'number-pad'}
                onValueChange={setLastMPG}
              />
            </View>

          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="outline"
                borderColor="black"
                _text={{ color: 'black' }}
                onPress={() => {
                  setfuellogmodelopen(false);
                  setIsSubmitPressed(false);
                  resetForm();
                }}>
                Cancel
              </Button>
              <Button
                backgroundColor={'#000'}
                onPress={() => {
                  onSubmitPress();
                }}
              >
                Add Fuel Log
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      {/* <SwipeListView data={listData} renderItem={renderItem} rightOpenValue={-130} previewRowKey={'0'} previewOpenValue={-40} previewOpenDelay={3000} onRowDidOpen={onRowDidOpen} /> */}
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, //the container will fill the whole screen.
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  location: {
    margin: 15,
  },
  locText: {
    fontSize: 14,
    fontWeight: '600',
    // padding: 5,
    color: '#000',
  },
  locTextpopup: {
    fontSize: 16,
    fontWeight: '800',
    padding: 1,
    color: '#000',
  },
  locTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
    marginBottom: 3,
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerContainerPopup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: -5,
  },
  orderdetails: {
    marginBottom: 5,
  },
  headText: {
    fontSize: 19,
  },
  arrowContainer: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
  },
  leftArrow: {
    height: 24,
    width: 24,
  },
  containerswitch: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 1,
    margin: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  option: {
    flex: 1,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedOption: {
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 14,
    color: '#a2a2a2',
  },
  selectedText: {
    color: '#000',
    fontWeight: 'bold',
  },
  separator: {
    width: 1,
    backgroundColor: '#ccc',
  },
  errorText: {
    color: '#ff0000',
    paddingLeft: 5,
    fontSize: 15,
    marginTop: -5,
    marginBottom: 5,
    fontWeight: '400',
  },
});

export default Journey;
