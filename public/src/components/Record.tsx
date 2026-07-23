import {
  Alert,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Appearance,
  Animated,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { IJourneyModel, IPlanReadingModel } from '../models/Models';
import {
  Center,
  Box,
  Heading,
  HStack,
  Text,
  View,
  Stack,
  Select,
  CheckIcon,
  Divider,
  Image,
  Button,
  NativeBaseProvider,
  Pressable,
  ScrollView,
  Spinner,
  Avatar,
  HamburgerIcon,
  Icon,
  Actionsheet,
  useDisclose,
  AlertDialog,
} from 'native-base';
import MapView, { Marker, AnimatedRegion, Polyline } from 'react-native-maps';
import axios from 'axios';
import Geolocation from 'react-native-get-location';
import { HelperConstant } from './HelperConstant';
import CommonServices from '../Services/CommonServices';
import MapViewDirections, {
  MapViewDirectionsMode,
} from 'react-native-maps-directions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import moment from 'moment';
import { getAddressFromLatLng } from '../helpers/getAddressFromLatLng';

type RecordProps = {
  startLocation: { lat: any; lng: any };
  endLocation: { lat: any; lng: any };
  travelledDistance: any;
  startTime: any;
};

type Props = {
  accessToken: any;
  dashboardData: IJourneyModel;
  journeyReading?: Array<IPlanReadingModel>;
  countryCode: any;
  LoginId: any;
  isBackgroundOn?: boolean;
};

function Record({
  accessToken,
  dashboardData,
  journeyReading,
  countryCode,
  LoginId,
  isBackgroundOn,
}: Props) {
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
                fontSize="xl">
                Record
              </Text>
            </View>
          </View>
        </Heading>
        <Basic
          dashboardData={dashboardData}
          countryCode={countryCode}
          LoginId={LoginId}
          isBackgroundOn={isBackgroundOn}
        />
      </Box>
    </Center>
  );
}

type Tracking = {
  startLocation: {
    latitude: any;
    longitude: any;
    latitudeDelta: any;
    longitudeDelta: any;
  };
  endLocation: {
    latitude: any;
    longitude: any;
    latitudeDelta: any;
    longitudeDelta: any;
  };
  trackCoOrdinates: any;
  coOrdinates: any;
};

function Basic({ dashboardData, countryCode, LoginId, isBackgroundOn }: any) {
  let lastLocationLatRef = useRef(0) as any;
  let lastLocationLngRef = useRef(0) as any;
  let isTrack = useRef(false) as any;

  let saveLatRef = useRef(0) as any;
  let saveLngRef = useRef(0) as any;

  let distanceTraveled = useRef(0) as any;
  let TimeOutForLive = 4000;
  let TimeOutForDitsance = 2000;

  let isEndLocationSelected = useRef(false) as any;
  let loginRef = useRef(0) as any;
  let countryRef = useRef('') as any;
  if (LoginId > 0) {
    loginRef.current = LoginId;
  }

  if (countryCode != '') {
    countryRef.current = countryCode;
  }

  const mapRef = useRef() as any;
  const markerRef = useRef() as any;
  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(0);
  const [service, setService] = useState('Drive');
  const [isNotEmmitted, setIsNotEmmitted] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [modePath, setModePath] = useState<MapViewDirectionsMode>('DRIVING');
  const [isBackgroundTrackOn, setISsBackgroundTrackOn] = useState(false);
  const [trackingData, setTrackingData] = useState<Tracking>({
    startLocation: {
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

  const IsBackgroundOff = () => setISsBackgroundTrackOn(false);
  const cancelRef = React.useRef(null);
  const [journeyType] = useState([
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
  ]);

  const mileConverter = 1.6;

  const { isOpen, onOpen, onClose } = useDisclose();

  const GOOGLE_MAPS_APIKEY = 'AIzaSyClEJhfMqEtTy6dcofhkDL1RvfhVTO2wss';

  const callBack = () => {
    if (isTrack.current) {
      setTimeout(() => {
        getLocation();
      }, TimeOutForDitsance);
    }
  };

  const distanceHandler = (location: any) => {
    if (lastLocationLatRef.current == 0) {
      lastLocationLatRef.current = location.latitude;
      lastLocationLngRef.current = location.longitude;
      saveLatRef.current = location.latitude;
      saveLngRef.current = location.longitude;
      callBack();
    } else {
      axios
        .get(
          `https://maps.googleapis.com/maps/api/distancematrix/json?&origins=${lastLocationLatRef.current},${lastLocationLngRef.current}&destinations=${location.latitude},${location.longitude}&key=AIzaSyClEJhfMqEtTy6dcofhkDL1RvfhVTO2wss`,
        )
        .then(async response => {
          let distanceTraveledInMs =
            response.data.rows[0].elements[0].distance?.value;
          if (distanceTraveledInMs > 0) {
            lastLocationLatRef.current = location.latitude;
            lastLocationLngRef.current = location.longitude;
            distanceTraveled.current =
              distanceTraveled.current + parseInt(distanceTraveledInMs);
            callBack();
          } else {
            lastLocationLatRef.current = location.latitude;
            lastLocationLngRef.current = location.longitude;
            saveLatRef.current = location.latitude;
            saveLngRef.current = location.longitude;
            callBack();
          }
        })
        .catch(error => {
          console.error('Error fetching distance data:', error);
        });
    }
  };

  const updateLocation = async (
    distance: any,
    currentLat: any,
    currentLng: any,
  ) => {
    // const startAddress = await getAddressFromLatLng()
    // const endAddress = await getAddressFromLatLng()

    let data = {
      id: 0,
      created: new Date(),
      createdBy: 0,
      modified: new Date(),
      modifiedBy: 0,
      active: true,
      userPlanId: loginRef.current,
      entryDate: new Date(),
      reading: distance / 1000,
      distance: distance / 1000,
      co2Emission: 0,
      readingImagePath: service,
      rowOrder: 1,
      isNotEmmitted: isNotEmmitted,
      name: HelperConstant.personal,
      imageName: service,
      cumulativeCo2Emission: 0,
      uploadFiles: null,
      latitude: `${saveLatRef.current}/${currentLat}`,
      longitude: `${saveLngRef.current}/${currentLng}`,
      startLocation: null,
      endLocation: null,
      parkingExpenses: null,
      tollExpenses: null,
      tripNotes: null,
    };
    CommonServices.post('Journey', 'RecordReading', data, countryRef.current)
      .then(async res => {
        if (res.status === 200) {
          distanceTraveled.current = 0;
          lastLocationLatRef.current = 0;
          lastLocationLngRef.current = 0;
          saveLatRef.current = 0;
          saveLngRef.current = 0;
          isTrack.current = false;
          setIsTracking(false);
          getCurrentPosition();
          Alert.alert('Journey', 'Completed!!!');
        }
      })
      .catch((e: string) => {
        console.log(e);
      });
  };

  const journeyHandler = (type: 'ON' | 'OFF') => {
    if (type == 'ON' && isBackgroundOn == true) {
      return setISsBackgroundTrackOn(true);
    }
    if (
      !(
        trackingData?.startLocation?.latitude &&
        trackingData?.endLocation?.latitude
      )
    ) {
      return Alert.alert('Error!!!', 'Choose destination location');
    }
    if (type == 'OFF') {
      if (distanceTraveled.current > 0) {
        updateLocation(
          distanceTraveled.current,
          lastLocationLatRef.current,
          lastLocationLngRef.current,
        );
      } else {
        getCurrentPosition();
        isTrack.current = false;
        setIsTracking(false);
      }
    } else {
      isTrack.current = true;
      setIsTracking(true);
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: TimeOutForDitsance,
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
          startLocation: {
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
        distanceHandler(location);
      })
      .catch(ex => {
        console.warn(ex);
      });
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

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
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
          startLocation: {
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
        console.warn(ex);
      });
  };

  const animate = (latitude: any, longitude: any) => {
    const newCoOrdinate = { latitude, longitude };
    // if (Platform.OS == "android") {
    if (markerRef.current) {
      markerRef.current.animateMarkerToCoordinate(newCoOrdinate, 7000);
    }
    // }
    // else {
    //     trackingData?.coOrdinates?.timing(newCoOrdinate)?.start();
    // }
  };

  const reCenter = () => {
    mapRef.current.animateToRegion({
      latitude: trackingData.startLocation.latitude,
      longitude: trackingData.startLocation.longitude,
      longitudeDelta: trackingData.startLocation.longitudeDelta,
      latitudeDelta: trackingData.startLocation.latitudeDelta,
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

  useEffect(() => {
    getCurrentPosition();
  }, []);

  useEffect(() => {
    if (isTrack.current) {
      getLocation();
      setIsTracking(isTracking);
    }
  }, [isTracking]);

  const colorScheme = Appearance.getColorScheme();

  if (trackingData.startLocation.latitude == 0) {
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
              <GooglePlacesAutocomplete
                fetchDetails={true}
                // textInputHide={destinationInput}
                placeholder="Choose destination"
                onPress={(data, details = null) => {
                  setTrackingData({
                    ...trackingData,
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
                    backgroundColor: colorScheme == 'dark' ? 'black' : 'white',
                  },
                }}
              />
            </ScrollView>
          </Stack>
        </HStack>
      </Stack>
      <Box height="full">
        {trackingData.startLocation.latitude != 0 ? (
          <TouchableOpacity
            onPress={() => reCenter()}
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
              {countryCode != 'IN' ||
                countryCode != 'Australia' ||
                countryCode != 'Canada' ||
                countryCode != 'FrenchCanada'
                ? 'mi'
                : 'km'}{' '}
              {moment(new Date()).format('hh:mm')}
            </Text>
          </Stack>
          <HStack
            position={'absolute'}
            right={'25%'}
            shadow={1}
            px={3}
            style={{ shadowColor: 'wheat' }}
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
            {isTracking ? null : (
              <>
                <TouchableOpacity
                  onPress={() => {
                    journeyHandler('ON');
                  }}
                  style={{ width: 50, height: 50 }}>
                  <Image
                    h={12}
                    source={require('../assests/start.png')}
                    alt="jorney"
                  />
                </TouchableOpacity>
              </>
            )}
            {isTracking ? (
              <TouchableOpacity
                onPress={() => {
                  journeyHandler('OFF');
                }}
                style={{ width: 50, height: 50 }}>
                <Image
                  h={12}
                  source={require('../assests/stop.png')}
                  alt="jorney"
                />
              </TouchableOpacity>
            ) : null}
          </Stack>
        </HStack>
        {trackingData.startLocation.latitude != 0 ? (
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={trackingData.startLocation}
            mapType="standard">
            <Marker.Animated
              ref={markerRef}
              coordinate={
                trackingData.trackCoOrdinates
                  ? trackingData.trackCoOrdinates
                  : trackingData.coOrdinates
              }
            />

            {trackingData?.startLocation?.latitude != 0 &&
              trackingData?.endLocation?.latitude != 0 ? (
              <>
                <Marker coordinate={trackingData.endLocation} />
                <MapViewDirections
                  mode={modePath}
                  origin={trackingData.startLocation}
                  waypoints={[]}
                  destination={trackingData.endLocation}
                  apikey={GOOGLE_MAPS_APIKEY}
                  strokeWidth={4}
                  strokeColor="#4090fc"
                  optimizeWaypoints={true}
                  onReady={result => {
                    setDistance(result.distance);
                    setTime(result.duration);
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
              </>
            ) : null}
          </MapView>
        ) : null}
        {isBackgroundTrackOn ? (
          <Center>
            <AlertDialog
              leastDestructiveRef={cancelRef}
              isOpen={isBackgroundTrackOn}
              onClose={IsBackgroundOff}>
              <AlertDialog.Content>
                {/* <AlertDialog.Header>Important</AlertDialog.Header> */}
                <AlertDialog.Body>
                  <Text style={styles.modalHeader}>Important</Text>
                  <Text style={styles.modalText}>
                    Background tracking is running.
                  </Text>
                  <Text>
                    Turn off the background tracking feature to record your
                    journey.
                  </Text>
                  <View style={styles.buttonDiv}>
                    <Button.Group space={2}>
                      {/* <Button variant="unstyled" colorScheme="coolGray" onPress={IsBackgroundOff} ref={cancelRef}>
                                            Cancel
                                        </Button> */}
                      <Button colorScheme="emerald" onPress={IsBackgroundOff}>
                        OK
                      </Button>
                    </Button.Group>
                  </View>
                </AlertDialog.Body>
              </AlertDialog.Content>
            </AlertDialog>
          </Center>
        ) : null}
      </Box>
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
  textInputStyle: {
    height: 45,
    color: 'black',
    fontSize: 16,
    backgroundColor: '#cbc5c5',
  },
  attire: {
    position: 'absolute',
    bottom: 10,
    right: 15,
    zIndex: 9999,
    backgroundColor: 'white',
    borderRadius: 10,
    width: 50,
    height: 50,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  modalText: {
    fontWeight: '500',
    fontSize: 15,
    marginVertical: 5,
  },
  buttonDiv: {
    alignItems: 'flex-end',
    marginVertical: 5,
  },
});

export default Record;
