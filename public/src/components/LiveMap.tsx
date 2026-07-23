/* eslint-disable */
import {View} from 'react-native';
import {useEffect, useRef, useState} from 'react';
import Geolocation from 'react-native-get-location';
import notifee, {AndroidColor} from '@notifee/react-native';
import axios from 'axios';
import CommonServices from '../Services/CommonServices';
import {HelperConstant} from './HelperConstant';
import BackgroundService from 'react-native-background-actions';
import {getAddressFromLatLng} from '../helpers/getAddressFromLatLng';
import LocationPermission from './LocationPermission';
import {TripState} from '../store/trip';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  LoginId: any;
  countryCode: any;
  isPersonal?: boolean;
  isTracking?: boolean;
  setIsTracking: any;
};

const LiveMap = ({
  LoginId,
  countryCode,
  isPersonal,
  isTracking,
  setIsTracking,
}: Props) => {
  let TimeOut = 15000;
  // in mins
  let waitTime = 5;
  let findedSpeed = useRef(0) as any;
  let haldTime = useRef(new Date()) as any;
  let speedThreshold = useRef(15) as any;
  let lastLocationLatRef = useRef(0) as any;
  let lastLocationLngRef = useRef(0) as any;
  let sourceAddress = useRef('') as any;
  let destinationAddress = useRef('') as any;
  let saveLatRef = useRef(0) as any;
  let saveLngRef = useRef(0) as any;
  let startTripTimeRef = useRef(null) as any;
  let endTripTimeRef = useRef(null) as any;

  let distanceTraveled = useRef(0) as any;

  let loginRef = useRef(0) as any;
  let countryRef = useRef('') as any;
  if (LoginId > 0) {
    loginRef.current = LoginId;
  }

  if (countryCode != '') {
    countryRef.current = countryCode;
  }

  const sleep = (time: number | undefined | any) =>
    new Promise((resolve: any) => setTimeout(() => resolve(), time));

  const veryIntensiveTask = async (taskDataArguments: any) => {
    const {delay} = taskDataArguments;
    await new Promise(async resolve => {
      for (let i = 0; BackgroundService.isRunning(); i++) {
        getLocation();
        await sleep(delay);
      }
    });
  };
  const options = {
    taskName: 'FuelSense',
    taskTitle: 'FuelSense',
    taskDesc: `Track, Assess and Offset Carbon emissions(Co2)`,
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
    color: '#ff00ff',
    parameters: {
      delay: TimeOut,
    },
  };

  const stop = () => {
    console.log('stop function called');
    if (BackgroundService.isRunning()) {
      console.log('Background functions stopped');
      BackgroundService.stop();
    }
  };

  const bgTrack = async () => {
    console.log('Checking Background service');
    try {
      if (BackgroundService) {
        console.log('Background service is on');
        startTripTimeRef.current = new Date();
        await BackgroundService.start(veryIntensiveTask, options);
        console.log('Background service started working ');
      } else {
        console.error('BackgroundService is not available');
      }
    } catch (error) {
      console.error('Error in bgTrack:', error);
    }
  };

  const uploadTrip = async () => {
    if (
      lastLocationLatRef?.current == null ||
      lastLocationLatRef?.current == 0 ||
      saveLatRef?.current == null ||
      saveLatRef?.current == 0
    )
      return;
    const endLocation = {
      latitude: lastLocationLatRef?.current,
      longitude: lastLocationLngRef?.current,
      latitudeDelta: 0.1922,
      longitudeDelta: 0.1521,
    };
    const startLocation = {
      latitude: saveLatRef?.current,
      longitude: saveLngRef?.current,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
    const travels = [
      {
        latitude: saveLatRef?.current,
        longitude: saveLngRef?.current,
      },
      {
        latitude: lastLocationLatRef?.current,
        longitude: lastLocationLngRef?.current,
      },
    ];
    const data: TripState = {
      isActive: true,
      travelPoints: travels,
      start: startLocation,
      end: endLocation,
      uuid: uuid.v4()?.toString(),
      startTime: moment(startTripTimeRef.current).format('HH:mm:ss'),
      endTime: moment(endTripTimeRef.current).format('HH:mm:ss'),
    };
    const lat = `${lastLocationLatRef?.current}/${saveLatRef?.current}`;
    const lng = `${lastLocationLngRef?.current}/${saveLngRef?.current}`;
    // const lat = `${lastLocationLatRef?.current}/0`;
    // const lng = `${lastLocationLngRef?.current}/0`;

    const id = (lat + '_' + lng).toString();

    try {
      firebase.app();
      await firestore()
        .collection('trips')
        .doc(id?.replaceAll('/', '-'))
        .set(data);
      startTripTimeRef.current = new Date();
      endTripTimeRef.current = 0;
      console.log(
        'Trip Data Uploaded to firebase',
        JSON.stringify(data, null, 2),
      );
    } catch (er) {
      console.log('error in firebase store', er);
    }
  };

  const stopTrack = async () => {
    console.log('Stop button pressed to store data in Journey');

    if (distanceTraveled.current > 0) {
      updateLocation(
        distanceTraveled.current,
        lastLocationLatRef.current,
        lastLocationLngRef.current,
        true,
      );
    } else {
      stop();
    }
  };

  useEffect(() => {
    displayCompletedNotification1();
    if (!isTracking) {
      stopTrack();
    } else if (!BackgroundService.isRunning()) {
      bgTrack();
    }
  }, [isTracking]);

  async function getLocation() {
    // BackgroundTimer.stopBackgroundTimer();
     if(!isTracking){
      return
    }
    const newValue = await AsyncStorage.getItem('ejt');
    console.log('🚀 ~ getAutoOnOffValue ~ LiveMap:', String(newValue).toLowerCase() === 'true');
    if(String(newValue).toLowerCase() === 'false' && isTracking) {
      setIsTracking(false);
      stopTrack();
      return
    }
    Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: TimeOut,
      rationale: {
        title: 'Location permission',
        message: 'The app needs the permission to request your location.',
        buttonPositive: 'Ok',
      },
    })
      .then(newLocation => {
        distanceHandler(newLocation);
      })
      .catch(ex => {
        console.log('geoLocatio Error');
        console.log(ex);
      });
  }

  const distanceHandler = async (location: any) => {
    setIsTracking(true);

    if (lastLocationLatRef.current == 0) {
      console.log('Last location data is ', 0);
      lastLocationLatRef.current = location.latitude;
      lastLocationLngRef.current = location.longitude;
      saveLatRef.current = location.latitude;
      saveLngRef.current = location.longitude;
    } else {
      console.log(
        'this is location',
        lastLocationLatRef.current,
        lastLocationLngRef.current,
        'abcd',
        isTracking,
        location,
      );

      // location.latitude = 13.0576376;
      // location.longitude = 80.2672868;

      axios
        .get(
          `https://maps.googleapis.com/maps/api/distancematrix/json?&origins=${lastLocationLatRef.current},${lastLocationLngRef.current}&destinations=${location.latitude},${location.longitude}&key=AIzaSyClEJhfMqEtTy6dcofhkDL1RvfhVTO2wss`,
        )
        .then(async response => {
          console.log(
            'Data Received from Google Place',
            JSON.stringify(response.data),
          );
          const {startAddress, startTime} = await getSourceAddress();
          const {endAddress, endTime} = await getDestinationAddress();
          console.log('Data Start Address', startAddress);
          console.log('Data end Address', endAddress);
          console.log(
            'Data Start startTime',
            moment(startTime).format('HH:mm:ss'),
          );
          console.log('Data end endTime', moment(endTime).format('HH:mm:ss'));
          // if (__DEV__) {
          //   updateLocation(
          //     distanceTraveled.current,
          //     lastLocationLatRef.current,
          //     lastLocationLngRef.current,
          //   );
          // }
          let distanceTraveledInMs =
            response.data.rows[0].elements[0].distance?.value;

          if (distanceTraveledInMs > 0 || distanceTraveled.current > 0) {
            console.log('Distance travel time or distance of travel changed');
            findedSpeed.current = distanceTraveledInMs / (TimeOut / 1000);

            if (findedSpeed.current > speedThreshold.current) {
              console.log(
                `Calculated journey is ${distanceTraveled.current.toLocaleString()} meters`,
              );
              lastLocationLatRef.current = location.latitude;
              lastLocationLngRef.current = location.longitude;
              haldTime.current = new Date();
              endTripTimeRef = new Date();
              distanceTraveled.current =
                distanceTraveled.current + parseInt(distanceTraveledInMs);
              await BackgroundService.updateNotification({
                taskDesc: `Calculated journey is ${distanceTraveled.current.toLocaleString()} meters`,
              });
            } else {
              let lastHaldDate = new Date(
                haldTime.current.getTime() + waitTime * 60000,
              );
              let currentDate = new Date();
              if (lastHaldDate < currentDate) {
                console.log('5 Minute Over Checking Data');
                if (distanceTraveled.current > 0) {
                  console.log(
                    distanceTraveled.current,
                    ' Yes Travel Data available to store',
                  );
                  updateLocation(
                    distanceTraveled.current,
                    lastLocationLatRef.current,
                    lastLocationLngRef.current,
                  );
                }
              } else {
                console.log(currentDate.getTime(), '-', lastHaldDate.getTime());
                console.log(
                  'Waiting for 5 Minute to Upload Data - ',
                  currentDate.getTime() - lastHaldDate.getTime(),
                );
              }
            }
          } else {
            console.log(
              'Distance travel time or distance of travel new data recorded',
            );

            lastLocationLatRef.current = location.latitude;
            lastLocationLngRef.current = location.longitude;
            saveLatRef.current = location.latitude;
            saveLngRef.current = location.longitude;
            haldTime.current = new Date();
            endTripTimeRef.current = new Date();
          }
        })
        .catch(error => {
          console.error('Error fetching distance data:', error);
        });
    }
  };
  const getSourceAddress = async () => {
    const startAddress = await getAddressFromLatLng(
      saveLatRef.current,
      saveLngRef.current,
    );
    const startTime = startTripTimeRef.current;
    return {startTime, startAddress};
  };
  const getDestinationAddress = async () => {
    const endAddress = await getAddressFromLatLng(
      lastLocationLatRef.current,
      lastLocationLngRef.current,
    );
    const endTime = endTripTimeRef.current;
    return {endTime, endAddress};
  };

  const updateLocation = async (
    distance: any,
    currentLat: any,
    currentLng: any,
    fromStopTracking?: boolean,
  ) => {
    const {startAddress, startTime} = await getSourceAddress();
    const {endAddress, endTime} = await getDestinationAddress();

    let data = {
      id: 0,
      created: new Date(),
      createdBy: 0,
      modified: '2023-08-22T10:03:32.140Z',
      modifiedBy: 0,
      active: true,
      userPlanId: loginRef?.current,
      entryDate: new Date(),
      reading: distance / 1000,
      distance: distance / 1000,
      co2Emission: 0,
      readingImagePath: 'imageTest',
      rowOrder: 1,
      isNotEmmitted: false,
      name: isPersonal ? HelperConstant.personal : HelperConstant.business,
      imageName: 'imgtest',
      cumulativeCo2Emission: 0,
      uploadFiles: null,
      latitude: `${saveLatRef.current}/${currentLat}`,
      longitude: `${saveLngRef.current}/${currentLng}`,
      startLocation: startAddress,
      endLocation: endAddress,
      parkingExpenses: null,
      tollExpenses: null,
      tripNotes: null,
      startJourneyTime: moment(startTime).format('HH:mm:ss'),
      endJourneyTime: moment().format('HH:mm:ss'),
    };
    console.log('data in json formate', JSON.stringify(data, null, 2));

    CommonServices.post('Journey', 'RecordReading', data, countryRef.current)
      .then(async res => {
        if (res.status === 200) {
          console.log(
            'Successfully recorded Data',
            JSON.stringify(data, null, 2),
          );
          uploadTrip();
          // Remove watcher for updating the api
          distanceTraveled.current = 0;
          haldTime.current = new Date();
          lastLocationLatRef.current = 0;
          lastLocationLngRef.current = 0;
          saveLatRef.current = 0;
          saveLngRef.current = 0;
          startTripTimeRef.current = new Date();
          endTripTimeRef.current = 0;
          await BackgroundService?.updateNotification({
            taskDesc: `Journey Updated`,
          });
          setTimeout(async () => {
            await BackgroundService?.updateNotification({
              taskDesc: `Track, Assess and Offset Carbon emissions(Co2)`,
            });
          }, 10000);
          displayCompletedNotification(
            'Trip Completed',
            `Total distance you traveled, is ${distance?.toLocaleString()} meters`,
          );
          if (fromStopTracking) {
            console.log('The Data Stored from Stop button');
            stop();
          }
        }
      })
      .catch((e: string) => {
        console.log(e);
      });
  };

  async function displayCompletedNotification1() {
    try {
      await notifee?.requestPermission();
    } catch (error) {
      console.error('Error in displayCompletedNotification1:', error);
    }
  }
  async function displayCompletedNotification(title: string, body: string) {
    // Create a channel required for Android Notifications
    const channelId = await notifee.createChannel({
      id: '123',
      name: 'Trip',
    });

    await notifee?.requestPermission();
    await notifee?.cancelDisplayedNotification(channelId, 'Trip is completed');

    // Display a notification
    const notificationId = notifee?.displayNotification({
      title: title,
      body: body,
      android: {
        channelId,
        asForegroundService: false,
        color: AndroidColor.WHITE,
        colorized: true,
        smallIcon: 'ic_favicon',
      },
    });
    return notificationId;
  }

  return <View></View>;
};

export default LiveMap;
