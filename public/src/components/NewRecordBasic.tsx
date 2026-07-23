import moment from 'moment';
import {
  Actionsheet,
  Avatar,
  Box,
  Heading,
  HStack,
  Image,
  Spinner,
  Stack,
  Text,
  useDisclose,
} from 'native-base';
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {Alert, Appearance, StyleSheet, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from 'react-native-google-places-autocomplete';
import MapView, {AnimatedRegion, MapMarker, Marker} from 'react-native-maps';
import MapViewDirections, {
  MapViewDirectionsMode,
} from 'react-native-maps-directions';
import Geolocation from 'react-native-get-location';
import axios from 'axios';
import BackgroundTimer from 'react-native-background-timer';
import uuid from 'react-native-uuid';
import {useDispatch, useSelector} from 'react-redux';
import {
  stateAddTravelPoint,
  stateEndTrip,
  stateInitTrip,
  stateIsTripActive,
  stateTrip,
  TripState,
} from '../store/trip';
import {HelperConstant} from './HelperConstant';
import CommonServices from '../Services/CommonServices';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import {getAddressFromLatLng} from '../helpers/getAddressFromLatLng';
import {Platform} from 'react-native';
import {countryDistance} from '../core/data';

type DefLocationType = {
  latitude: any;
  longitude: any;
  latitudeDelta: any;
  longitudeDelta: any;
};

type Tracking = {
  startLocation: DefLocationType;
  currentLocation: DefLocationType;
  endLocation: DefLocationType;
  trackCoOrdinates: any;
  coOrdinates: any;
};

const GOOGLE_MAPS_APIKEY = 'AIzaSyClEJhfMqEtTy6dcofhkDL1RvfhVTO2wss';
const mileConverter = 1.6;
const colorScheme = Appearance.getColorScheme();
const journeyType = [
  {
    Id: 1,
    Name: 'Drive',
  },
  {
    Id: 2,
    Name: 'Train',
  },
  {
    Id: 3,
    Name: 'Bus',
  },
  {
    Id: 4,
    Name: 'Flight',
  },
  {
    Id: 5,
    Name: 'Cycling',
  },
  {
    Id: 6,
    Name: 'Marathon',
  },
  {
    Id: 7,
    Name: 'Run',
  },
  {
    Id: 8,
    Name: 'Walk',
  },
  {
    Id: 9,
    Name: 'Hike',
  },
];
const TimeOutForDistance = 15000;

const NewRecord: React.FC<any> = ({
  dashboardData,
  countryCode,
  LoginId,
  isBackgroundOn,
  isManualRecordOn,
  setIsManualRecordOn,
}) => {
  let isEndLocationSelected = useRef<boolean>(false);
  const mapRef = useRef<MapView>(null);
  const markerRef = useRef<MapMarker>(null);
  const placesRef = useRef<GooglePlacesAutocompleteRef>(null);
  const destinationReachedShown = useRef<boolean>(false);
  let loginRef = useRef(0) as any;
  let countryRef = useRef('') as any;
  const lastRecordLocationRef = useRef<Partial<DefLocationType>>({
    latitude: 0,
    longitude: 0,
  });

  if (LoginId > 0) {
    loginRef.current = LoginId;
  }

  console.log('countryCode:::', countryCode);

  if (countryCode != '') {
    countryRef.current = countryCode;
  }

  const dispatch = useDispatch();
  const isTrackingActive = useSelector(stateIsTripActive);
  const currentTripData = useSelector(stateTrip);

  useEffect(() => {
    destinationReachedShown.current = false;
  }, [isTrackingActive]);

  const [trackingData, setTrackingData] = useState<Tracking>({
    startLocation: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    currentLocation: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    endLocation: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.1922,
      longitudeDelta: 0.1521,
    },
    coOrdinates: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.1922,
      longitudeDelta: 0.1521,
    },
    trackCoOrdinates: undefined,
  });
  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(0);
  const [service, setService] = useState('Drive');
  const [isNotEmmitted, setIsNotEmmitted] = useState(false);
  const [modePath, setModePath] = useState<MapViewDirectionsMode>('DRIVING');
  const [isJourneyStarted, setIsJourneyStarted] = useState(false);

  const {isOpen, onOpen, onClose} = useDisclose();

  const reCenter = () => {
    mapRef.current?.animateToRegion({
      latitude: trackingData.currentLocation.latitude,
      longitude: trackingData.currentLocation.longitude,
      longitudeDelta: trackingData.currentLocation.longitudeDelta,
      latitudeDelta: trackingData.currentLocation.latitudeDelta,
    });
  };

  const modeSwitching = (mode: any) => {
    if (mode == 'Drive' || 'Bus') {
      setModePath('DRIVING');
    }
    if (mode == 'Train') {
      setModePath('TRANSIT');
    }
    if (mode == 'Cycling') {
      setModePath('BICYCLING');
    }
    if (
      mode == 'Marathon' ||
      mode == 'Run' ||
      mode == 'Walk' ||
      mode == 'Hike'
    ) {
      setModePath('WALKING');
    }
  };

  const journeyTypehandler = (value: any) => {
    setService(value);
    modeSwitching(value);
    if (
      value == 'Run' ||
      value == 'Hike' ||
      value == 'Walk' ||
      value == 'Marathon' ||
      value == 'Cycling'
    ) {
      setIsNotEmmitted(true);
    }
    onClose();
  };

  const animate = (latitude: any, longitude: any) => {
    const newCoOrdinate = {latitude, longitude};
    if (Platform.OS === 'android' && markerRef.current) {
      markerRef.current.animateMarkerToCoordinate(newCoOrdinate, 1000);
    } else {
    }
  };

  const distanceHandler = (startLocation: Partial<DefLocationType>) => {
    const origin = `${startLocation.latitude},${startLocation.longitude}`;
    const destination = `${lastRecordLocationRef.current?.latitude},${lastRecordLocationRef.current?.longitude}`;

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${GOOGLE_MAPS_APIKEY}`;

    axios
      .get(url)
      .then(async response => {
        let distanceTraveledInMs =
          response.data.rows[0].elements[0].distance?.value;

        console.log('distanceTraveledInMs', distanceTraveledInMs);

        if (distanceTraveledInMs > 500) {
          console.log('traveled distance', distanceTraveledInMs);
          lastRecordLocationRef.current = startLocation;
          dispatch(
            stateAddTravelPoint({
              latitude: startLocation.latitude,
              longitude: startLocation.longitude,
            }),
          );
        }

        //   if (distanceTraveledInMs > 0) {
        //     lastLocationLatRef.current = location.latitude;
        //     lastLocationLngRef.current = location.longitude;
        //     distanceTraveled.current =
        //       distanceTraveled.current + parseInt(distanceTraveledInMs);
        //     callBack();
        //   } else {
        //     lastLocationLatRef.current = location.latitude;
        //     lastLocationLngRef.current = location.longitude;
        //     saveLatRef.current = location.latitude;
        //     saveLngRef.current = location.longitude;
        //     callBack();
        //   }
      })
      .catch(error => {
        console.error('Error fetching distance data:', error);
      });
  };

  const startJourney = () => {
    animate(
      trackingData?.currentLocation.latitude,
      trackingData.currentLocation.longitude,
    );
  };

  const checkCurrentDistance = useCallback(() => {
    Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: TimeOutForDistance,
      rationale: {
        title: 'Location permission',
        message: 'The app needs the permission to request your location.',
        buttonPositive: 'Ok',
      },
    })
      .then(location => {
        animate(location.latitude, location.longitude);

        distanceHandler({
          latitude: location?.latitude,
          longitude: location?.longitude,
        });

        setTrackingData({
          ...trackingData,
          currentLocation: {
            latitude: location?.latitude,
            longitude: location?.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
          coOrdinates: new AnimatedRegion({
            latitude: location?.latitude,
            longitude: location?.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }),
        });
      })
      .catch(ex => {
        console.log('cordinatio error');

        console.warn(ex);
      });
  }, [distanceHandler, animate, trackingData, TimeOutForDistance]);

  const startTimer = useCallback(() => {
    BackgroundTimer?.runBackgroundTimer(() => {
      checkCurrentDistance();
    }, 15000);
  }, [checkCurrentDistance]);

  useEffect(() => {
    if (isTrackingActive) {
      startTimer();
    } else {
      BackgroundTimer.stopBackgroundTimer();
    }

    return () => {
      BackgroundTimer.stopBackgroundTimer();
    };
  }, [isTrackingActive]);

  const updateLocation = async (trip: TripState, lat: any, lng: any) => {
    // TRIP TRAVEL POINTS

    const startAddress = await getAddressFromLatLng(
      trip?.start?.latitude,
      trip?.start?.longitude,
    );

    const endAddress = await getAddressFromLatLng(
      trip?.end?.latitude,
      trip?.end?.longitude,
    );

    const origin = `${trip?.start?.latitude},${trip?.start?.longitude}`;
    const destination = `${trip?.end?.latitude},${trip?.end?.longitude}`;

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${GOOGLE_MAPS_APIKEY}`;

    const response = await axios.get(url);
    let distanceTraveledInMs =
      response.data.rows[0].elements[0].distance?.value;

    let data = {
      id: 0,
      created: new Date(),
      createdBy: 0,
      modified: new Date(),
      modifiedBy: 0,
      active: true,
      userPlanId: loginRef.current,
      entryDate: new Date(),
      reading: distanceTraveledInMs / 1000,
      distance: distanceTraveledInMs / 1000,
      co2Emission: 0,
      readingImagePath: service,
      rowOrder: 1,
      isNotEmmitted: isNotEmmitted,
      name: HelperConstant.personal,
      imageName: service,
      cumulativeCo2Emission: 0,
      uploadFiles: null,
      latitude: lat,
      longitude: lng,
      startLocation: startAddress,
      endLocation: endAddress,
      parkingExpenses: null,
      tollExpenses: null,
      tripNotes: null,
    };

    CommonServices.post('Journey', 'RecordReading', data, countryRef.current)
      .then(async res => {
        if (res.status === 200) {
          Alert.alert('Journey', 'Completed!!!');
        }
      })
      .catch((e: string) => {
        console.log(e);
      });
  };

  const uploadTrip = useCallback(
    async (trip: TripState) => {
      const lat = `${trip?.end?.latitude}/${trackingData?.currentLocation?.latitude}`;
      const lng = `${trip?.end?.longitude}/${trackingData?.currentLocation?.longitude}`;

      const id = (lat + '_' + lng).toString();
      console.log('longitude', lng);
      console.log('latitude', lat);
      console.log('id of that', id);

      try {
        console.log('firebase data', trip);

        firebase.app();
        await firestore()
          .collection('trips')
          .doc(id?.replaceAll('/', '-'))
          .set(trip);
      } catch (er) {
        console.log(er);
      } finally {
        updateLocation(trip, lat, lng);
      }
    },
    [updateLocation, trackingData],
  );

  const deg2rad = (deg: any) => {
    return deg * (Math.PI / 180);
  };

  const getDistanceFromLatLonInKm = (
    lat1: any,
    lon1: any,
    lat2: any,
    lon2: any,
  ) => {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  };

  const isDestinationReached = useCallback(() => {
    const distInKm = getDistanceFromLatLonInKm(
      trackingData?.currentLocation?.latitude,
      trackingData?.currentLocation?.longitude,
      trackingData?.endLocation?.latitude,
      trackingData?.endLocation?.longitude,
    );

    return distInKm < 0.05;
  }, [trackingData, getDistanceFromLatLonInKm]);

  useEffect(() => {
    if (isTrackingActive) {
      if (isDestinationReached() && !destinationReachedShown.current) {
        destinationReachedShown.current = true;
        Alert.alert(
          'Destination Reached',
          'You have reached destination, are you still driving Shall I end the Record?',
          [
            {
              text: 'Yes',
              style: 'default',
              onPress: () => {
                uploadTrip({
                  ...currentTripData,
                  travelPoints: [
                    ...currentTripData?.travelPoints,
                    {
                      latitude: trackingData?.currentLocation?.latitude,
                      longitude: trackingData?.currentLocation?.longitude,
                    },
                  ],
                });
                dispatch(stateEndTrip());
                setTrackingData(prev => {
                  return {
                    ...prev,
                    endLocation: {
                      latitude: 0,
                      longitude: 0,
                      latitudeDelta: 0.1922,
                      longitudeDelta: 0.1521,
                    },
                  };
                });
                setDistance(0);
                setTime(0);
                placesRef.current?.setAddressText('');
              },
            },
            {
              text: 'No',
              style: 'destructive',
            },
          ],
        );
      }
    }
  }, [trackingData?.currentLocation]);

  const journeyHandler = useCallback(
    (type: 'ON' | 'OFF') => {
      if (type === 'ON') {
        if (
          !(
            trackingData?.currentLocation?.latitude &&
            trackingData?.endLocation?.latitude
          )
        ) {
          return Alert.alert('Error!!!', 'Choose destination location');
        }

        const totalDist = getDistanceFromLatLonInKm(
          trackingData?.currentLocation?.latitude,
          trackingData?.currentLocation?.longitude,
          trackingData?.endLocation?.latitude,
          trackingData?.endLocation?.longitude,
        );

        if (totalDist < 0.5) {
          return Alert.alert(
            'Error!!!',
            'Journey does not have optimum distance to start',
          );
        }

        startJourney();
        lastRecordLocationRef.current = trackingData.startLocation;
        dispatch(
          stateInitTrip({
            isActive: true,
            travelPoints: [],
            start: trackingData?.startLocation,
            end: trackingData?.endLocation,
            uuid: uuid.v4()?.toString(),
          }),
        );
        return;
      }

      if (type === 'OFF' && currentTripData?.travelPoints?.length) {
        if (isDestinationReached()) {
          uploadTrip({
            ...currentTripData,
            travelPoints: [
              ...currentTripData?.travelPoints,
              {
                latitude: trackingData?.currentLocation?.latitude,
                longitude: trackingData?.currentLocation?.longitude,
              },
            ],
          });
          dispatch(stateEndTrip());
          setTrackingData(prev => {
            return {
              ...prev,
              endLocation: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0.1922,
                longitudeDelta: 0.1521,
              },
            };
          });
          setDistance(0);
          setTime(0);
          placesRef.current?.setAddressText('');
        } else {
          Alert.alert(
            'Destination not reached!!!',
            'Journey started, destination not reached Do you want to record this journey?',
            [
              {
                text: 'Yes',
                style: 'default',
                onPress: () => {
                  placesRef.current?.setAddressText('');
                  console.log('yes press');
                  uploadTrip({
                    ...currentTripData,
                    travelPoints: [
                      ...currentTripData?.travelPoints,
                      {
                        latitude: trackingData?.currentLocation?.latitude,
                        longitude: trackingData?.currentLocation?.longitude,
                      },
                    ],
                  });
                  dispatch(stateEndTrip());
                  setTrackingData(prev => {
                    return {
                      ...prev,
                      endLocation: {
                        latitude: 0,
                        longitude: 0,
                        latitudeDelta: 0.1922,
                        longitudeDelta: 0.1521,
                      },
                    };
                  });
                  setDistance(0);
                  setTime(0);
                  placesRef.current?.setAddressText('');
                },
              },
              {
                text: 'No',
                style: 'destructive',
                onPress: () => {
                  console.log('no press');
                  dispatch(stateEndTrip());
                  setTrackingData(prev => {
                    return {
                      ...prev,
                      endLocation: {
                        latitude: 0,
                        longitude: 0,
                        latitudeDelta: 0.1922,
                        longitudeDelta: 0.1521,
                      },
                    };
                  });
                  setDistance(0);
                  setTime(0);
                  placesRef.current?.setAddressText('');
                },
              },
            ],
          );
        }
      } else if (type === 'OFF') {
        dispatch(stateEndTrip());
        setTrackingData(prev => {
          return {
            ...prev,
            endLocation: {
              latitude: 0,
              longitude: 0,
              latitudeDelta: 0.1922,
              longitudeDelta: 0.1521,
            },
          };
        });
        setDistance(0);
        setTime(0);
        placesRef.current?.setAddressText('');
      }
    },
    [
      startJourney,
      trackingData,
      currentTripData,
      isDestinationReached,
      currentTripData?.travelPoints,
    ],
  );

  const getInitialLocation = () => {
    Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: TimeOutForDistance,
      rationale: {
        title: 'Location permission',
        message: 'The app needs the permission to request your location.',
        buttonPositive: 'Ok',
      },
    })
      .then(location => {
        animate(location.latitude, location.longitude);
        setTrackingData({
          ...trackingData,
          currentLocation: {
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
          coOrdinates: new AnimatedRegion({
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }),
        });
      })
      .catch(ex => {
        console.log('cordinatio error3');

        console.warn(ex);
      });
  };

  useEffect(() => {
    getInitialLocation();
  }, []);

  useEffect(() => {
    if (
      isTrackingActive &&
      currentTripData?.end &&
      trackingData?.currentLocation
    ) {
      setTrackingData(prev => {
        return {
          ...prev,
          endLocation: {...prev?.endLocation, ...currentTripData?.end},
        };
      });
    }
  }, [currentTripData, trackingData.currentLocation]);

  if (trackingData.currentLocation.latitude == 0) {
    return (
      <HStack space={2} justifyContent="center">
       <Spinner accessibilityLabel="Loading posts" color={'black'} />
               <Heading color="black" fontSize="md">
          Loading
        </Heading>
      </HStack>
    );
  }
  const onJourneyStartPress = () => {
    console.log('record status', isManualRecordOn);

    setIsManualRecordOn && setIsManualRecordOn(true);
    journeyHandler('ON');
  };
  const onJourneyEndPress = () => {
    console.log('redocdfsdf status', isManualRecordOn);

    setIsManualRecordOn && setIsManualRecordOn(false);
    journeyHandler('OFF');
  };

  return (
    <Box
      height={'82%'}
      rounded="lg"
      overflow="hidden"
      borderColor="coolGray.200"
      _web={{
        shadow: 2,
        borderWidth: 0,
      }}>
      <Stack
        px="4"
        space={3}
        position={'absolute'}
        top={3}
        left={0}
        zIndex={999}>
        <HStack>
          <Stack space={2} width={'100%'}>
            <ScrollView keyboardShouldPersistTaps={'handled'}>
              {trackingData.currentLocation?.latitude ? (
                <GooglePlacesAutocomplete
                  ref={placesRef}
                  fetchDetails={true}
                  // textInputHide={destinationInput}
                  placeholder="Choose destination"
                  onPress={(data, details = null) => {
                    setTrackingData({
                      ...trackingData,
                      startLocation: trackingData?.currentLocation,
                      endLocation: {
                        latitude: details?.geometry.location.lat,
                        longitude: details?.geometry.location.lng,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                      },
                    });
                    isEndLocationSelected.current = true;
                  }}
                  query={{
                    key: GOOGLE_MAPS_APIKEY,
                    language: 'en',
                  }}
                  styles={{
                    textInput: styles.textInputStyle,
                    powered: {
                      display: 'none',
                      height: 1,
                    },
                    row: {
                      padding: 13,
                      height: 44,
                      flexDirection: 'row',
                      backgroundColor:
                        colorScheme == 'dark' ? 'black' : 'white',
                    },
                  }}
                />
              ) : (
                <></>
              )}
            </ScrollView>
          </Stack>
        </HStack>
      </Stack>
      <Box height={'full'}>
        {trackingData.currentLocation.latitude != 0 ? (
          <TouchableOpacity
            onPress={reCenter}
            style={{
              position: 'absolute',
              top: 70,
              right: 15,
              zIndex: 9999,
              backgroundColor: 'white',
              borderRadius: 10,
              width: 50,
              height: 50,
            }}>
            <Image
              h={'12'}
              source={require('../assests/recenter.png')}
              alt="jorney"
            />
          </TouchableOpacity>
        ) : null}

        <HStack
          px={5}
          space={3}
          position={'absolute'}
          bottom={1}
          background={'white'}
          p={2}
          borderRadius={10}
          left={'7%'}
          width={'86%'}
          zIndex={999}>
          <Stack mt={1}>
            <Text fontSize={'15px'} fontWeight={'500'}>
              {time.toFixed(0)} Min
            </Text>
            <Text fontSize={'8px'} fontWeight={'500'}>
              {countryCode != 'IN' ||
              countryCode != 'Australia' ||
              countryCode != 'Canada' ||
              countryCode != 'FrenchCanada'
                ? (distance / mileConverter).toFixed(2)
                : distance.toFixed(2)}{' '}
              {countryDistance[countryCode ?? 'UK']}{' '}
              {moment(new Date()).format('hh:mm')}
            </Text>
          </Stack>
          <HStack
            position={'absolute'}
            right={'25%'}
            shadow={1}
            px={3}
            style={{shadowColor: 'wheat'}}
            borderRadius={50}>
            <Stack mt={1}>
              {service == 'Drive' ? (
                <Avatar
                  background={'transparent'}
                  source={require('../assests/drive.png')}></Avatar>
              ) : null}
              {service == 'Train' ? (
                <Avatar
                  background={'transparent'}
                  source={require('../assests/train.png')}></Avatar>
              ) : null}
              {service == 'Bus' ? (
                <Avatar
                  background={'transparent'}
                  source={require('../assests/bus.png')}></Avatar>
              ) : null}
              {service == 'Flight' ? (
                <Avatar
                  background={'transparent'}
                  source={require('../assests/flight.png')}></Avatar>
              ) : null}
              {service == 'Cycling' ? (
                <Avatar
                  background={'transparent'}
                  source={require('../assests/cycle.png')}></Avatar>
              ) : null}
              {service == 'Marathon' ? (
                <Avatar
                  background={'transparent'}
                  source={require('../assests/marathon.png')}></Avatar>
              ) : null}
              {service == 'Run' ? (
                <Avatar
                  background={'transparent'}
                  source={require('../assests/run.png')}></Avatar>
              ) : null}
              {service == 'Walk' ? (
                <Avatar
                  background={'transparent'}
                  source={require('../assests/walk.png')}></Avatar>
              ) : null}
              {service == 'Hike' ? (
                <Avatar
                  background={'transparent'}
                  source={require('../assests/hike.png')}></Avatar>
              ) : null}
            </Stack>
            <Box>
              <Actionsheet isOpen={isOpen} onClose={onClose}>
                <Actionsheet.Content>
                  {journeyType.map((val, i) => (
                    <Actionsheet.Item
                      key={i}
                      onPress={() => journeyTypehandler(val.Name)}
                      disabled={val.Name == 'Flight' ? true : false}>
                      {val.Name}
                    </Actionsheet.Item>
                  ))}
                </Actionsheet.Content>
              </Actionsheet>
            </Box>
            <Stack>
              <TouchableOpacity onPress={() => onOpen()}>
                <Text ml={2} fontWeight={'600'} fontSize={'25px'}>
                  ...
                </Text>
              </TouchableOpacity>
            </Stack>
          </HStack>
          <Stack position={'absolute'} right={0} mt={1}>
            {isTrackingActive ? null : (
              <>
                <TouchableOpacity
                  onPress={onJourneyStartPress}
                  style={{width: 50, height: 50}}>
                  <Image
                    h={12}
                    source={require('../assests/start.png')}
                    alt="jorney"
                  />
                </TouchableOpacity>
              </>
            )}
            {isTrackingActive ? (
              <TouchableOpacity
                onPress={onJourneyEndPress}
                style={{width: 50, height: 50}}>
                <Image
                  h={12}
                  source={require('../assests/stop.png')}
                  alt="jorney"
                />
              </TouchableOpacity>
            ) : null}
          </Stack>
        </HStack>

        {trackingData?.currentLocation?.latitude !== 0 ? (
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={trackingData.currentLocation}
            mapType="standard">
            <Marker.Animated
              ref={markerRef}
              coordinate={
                trackingData.trackCoOrdinates
                  ? trackingData.trackCoOrdinates
                  : trackingData.coOrdinates
              }
            />

            {trackingData?.currentLocation?.latitude !== 0 &&
            trackingData?.endLocation?.latitude !== 0 ? (
              <>
                <Marker coordinate={trackingData.endLocation} />
                <MapViewDirections
                  mode={modePath}
                  origin={trackingData.currentLocation}
                  waypoints={[]}
                  destination={trackingData.endLocation}
                  apikey={GOOGLE_MAPS_APIKEY}
                  strokeWidth={4}
                  strokeColor="#4090fc"
                  optimizeWaypoints={true}
                  onReady={result => {
                    console.log('coords change', result?.coordinates);
                    setDistance(result.distance);
                    setTime(result.duration);
                    mapRef.current?.fitToCoordinates(result?.coordinates, {
                      animated: true,
                      edgePadding: {
                        right: 100,
                        bottom: 100,
                        left: 30,
                        top: 100,
                      },
                    });
                    // mapRef.current?.fitToElements(result.coordinates, {
                    //   edgePadding: {
                    //     // right: 30,
                    //     // bottom: 300,
                    //     // left: 30,
                    //     // top: 100,
                    //   },
                    // })
                  }}
                />
              </>
            ) : (
              <></>
            )}
          </MapView>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};

export default memo(NewRecord);

const styles = StyleSheet.create({
  textInputStyle: {
    height: 45,
    color: 'black',
    fontSize: 16,
    backgroundColor: '#cbc5c5',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
