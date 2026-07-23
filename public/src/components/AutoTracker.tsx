/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import { Box, Image } from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert,
    PermissionsAndroid,
    Platform,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    ActivityIndicator,
    Animated,
} from 'react-native';
import axios from 'axios';
import moment from 'moment';
import { getTokenDetail } from './Helper';
import CommonServices from '../Services/CommonServices';
import { IJourneyModel,IPlanReadingModel } from '../models/Models';
import { countryDistance } from '../core/data';
import { useNavigation } from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import { InteractionManager } from 'react-native';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';


// Try to import geolocation service
// let Geolocation = null;
let MapView = null;
let Marker = null;
let Polyline = null;
let AsyncStorage = null;
let AnimatedRegion = null;

// try {
//     Geolocation = require('react-native-geolocation-service').default || require('react-native-geolocation-service');
// } catch (e) {
//     console.warn('react-native-geolocation-service not available, using fallback');
// }

try {
    const Maps = require('react-native-maps');
    MapView = Maps.default || Maps.MapView || Maps;
    Marker = Maps.Marker;
    Polyline = Maps.Polyline;
    AnimatedRegion = Maps.AnimatedRegion;
} catch (e) {
    console.warn('react-native-maps not available');
}

try {
    AsyncStorage = require('@react-native-async-storage/async-storage').default || require('@react-native-async-storage/async-storage');
} catch (e) {
    console.warn('@react-native-async-storage/async-storage not available');
}

const { width, height } = Dimensions.get('window');

// Configuration constants
const GOOGLE_MAPS_API_KEY = 'AIzaSyClEJhfMqEtTy6dcofhkDL1RvfhVTO2wss';
const TimeOut = 10000; // 10 seconds
const waitTime = 5; // 5 minutes wait time for auto-stop

const AutoTracker = () => {
    // State management
    const [location, setLocation] = useState(null);
    const [isTracking, setIsTracking] = useState(false);
    const isTrackingRef = useRef(false);

    useEffect(() => {
        isTrackingRef.current = isTracking;
    }, [isTracking]);


    const [journey, setJourney] = useState({
        id: null,
        startTime: null,
        endTime: null,
        startLocation: null,
        endLocation: null,
        startAddress: '',
        endAddress: '',
        distance: 0,
        maxSpeed: 0,
        avgSpeed: 0,
        duration: 0,
        route: [],
    });
   const [journeyReading, setJourneyReading] = useState<
        Array<IPlanReadingModel>
      >([]);
    const [isAutoMode, setIsAutoMode] = useState(true);
    const [currentSpeed, setCurrentSpeed] = useState(0);
    const [locationError, setLocationError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [useNativeGeolocation, setUseNativeGeolocation] = useState(false);
    const [trackingStatus, setTrackingStatus] = useState('Waiting to start...');
    const [mapRegion, setMapRegion] = useState(null);
    const [followUserLocation, setFollowUserLocation] = useState(true);
    const [accessToken, setAccessToken] = useState<any>();
    const [country, setCountry] = useState('');
    const [loginIdfordata, setLoginidData] = useState<any>();
    // Refs for location tracking and animation
    const watchId = useRef(null);
    const lastLocation = useRef(null);
    const speedHistory = useRef([]);
    const lastLocationLatRef = useRef(0);
    const lastLocationLngRef = useRef(0);
    const saveLatRef = useRef(0);
    const saveLngRef = useRef(0);
    const distanceTraveled = useRef(0);
    const speedThreshold = useRef(2); // 2 m/s threshold
    const findedSpeed = useRef(0);
    const haldTime = useRef(new Date());
    const startTripTimeRef = useRef(new Date());
    const endTripTimeRef = useRef(new Date());
    const locationInterval = useRef(null);
    const mapRef = useRef(null);
    const markerRef = useRef(null);
    const animatedCoordinate = useRef(null);
    const routeAnimationValue = useRef(new Animated.Value(0));

    const autoStartThreshold = 5; // km/h to auto-start tracking
    const autoStopDuration = 300000; // 5 minutes of no movement to auto-stop
    const [dashboardData, setDashboardData] = useState<IJourneyModel>(
        {} as IJourneyModel,
    );

    const navigation = useNavigation();
    // Default region
    const defaultRegion = {
        latitude: 37.7749,
        longitude: -122.4194,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    };

    // Initialize animated coordinate
    useEffect(() => {
        if (AnimatedRegion) {
            animatedCoordinate.current = new AnimatedRegion({
                latitude: defaultRegion.latitude,
                longitude: defaultRegion.longitude,
                latitudeDelta: 0,
                longitudeDelta: 0,
            });
        }
    }, []);

    // Request location permissions
    const requestLocationPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const permissions = [
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
                ];

                const granted = await PermissionsAndroid.requestMultiple(permissions);
                const fineLocationGranted = granted[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] === 'granted';
                const coarseLocationGranted = granted[PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION] === 'granted';

                return fineLocationGranted || coarseLocationGranted;
            } catch (err) {
                console.warn(err);
                return false;
            }
        }
        return true;
    };

    // Get address from coordinates using Google Geocoding API
    const getAddressFromLatLng = async (lat, lng) => {
        try {
            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`
            );

            if (response.data.results && response.data.results.length > 0) {
                return response.data.results[0].formatted_address;
            }
            return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
        } catch (error) {
            console.error('Error getting address:', error);
            return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
        }
    };

    // Get source address and time
    const getSourceAddress = async () => {
        const startAddress = await getAddressFromLatLng(
            saveLatRef.current,
            saveLngRef.current,
        );
        const startTime = startTripTimeRef.current;
        return { startTime, startAddress };
    };

    // Get destination address and time
    const getDestinationAddress = async () => {
        const endAddress = await getAddressFromLatLng(
            lastLocationLatRef.current,
            lastLocationLngRef.current,
        );
        const endTime = endTripTimeRef.current;
        return { endTime, endAddress };
    };

    useEffect(() => {
        AsyncStorage.getItem('star-zero-token').then((res: any) => {
            if (res == null) {
            }
            if (res) {
                AsyncStorage.getItem('CountryId').then((ress: any) => {
                    if (ress) {
                        let code = JSON.parse(ress);
                        setAccessToken(res);
                        setCountry(code);
                        const loginId = getTokenDetail(res)?.LoginId;
                        AsyncStorage.setItem('LOGIN_ID', loginId);
                        setLoginidData(loginId)
                        GetDashboard(code, loginId);
                    }
                });
            }
        });
    }, [accessToken]);

    // Animate vehicle movement to new location
    const animateVehicleToLocation = (newLocation) => {
        if (animatedCoordinate.current && newLocation) {
            const newCoordinate = {
                latitude: parseFloat(newLocation.latitude),
                longitude: parseFloat(newLocation.longitude),
            };

            animatedCoordinate.current.timing({
                ...newCoordinate,
                duration: 2000,
                useNativeDriver: false,
            }).start();

            // Animate map to follow vehicle if enabled
            if (followUserLocation && mapRef.current) {
                mapRef.current.animateToRegion({
                    ...newCoordinate,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }, 2000);
            }
        }
    };

    // Animate route drawing
    const animateRouteDrawing = () => {
        routeAnimationValue.current.setValue(0);
        Animated.timing(routeAnimationValue.current, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
        }).start();
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
          setJourneyReading(res.data);
        }
      })
      .catch((e: string) => {
        console.log(e);
      });
  };


    useEffect(() => {       
        console.log('Journey Reading data fetched');
    }, [journeyReading]);

    // Get current location using enhanced method with animation
    const getLocation = () => {
        console.log('📍 getLocation triggered');
        if (!Geolocation) {
            console.warn('Geolocation not available, using native fallback');
            return;
        }

        Geolocation.getCurrentPosition(
            (newLocation) => {
                const locationData = {
                    latitude: newLocation.coords.latitude,
                    longitude: newLocation.coords.longitude,
                    timestamp: newLocation.timestamp,
                    speed: newLocation.coords.speed ? newLocation.coords.speed * 3.6 : 0,
                    accuracy: newLocation.coords.accuracy,
                };

                setLocation(locationData);
                setLocationError(null);
                setIsLoading(false);

                // Animate vehicle to new location
                animateVehicleToLocation(locationData);

                // Update map region
                if (!mapRegion || followUserLocation) {
                    setMapRegion({
                        latitude: locationData.latitude,
                        longitude: locationData.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    });
                }

                distanceHandler(newLocation.coords);
            },
            (error) => {
                console.log('Geolocation Error:', error);
                setLocationError(`Location error: ${error.message}`);
                setIsLoading(false);
            },
            {
                enableHighAccuracy: true,
                timeout: TimeOut,
                maximumAge: 10000,
                distanceFilter: 10,
                forceRequestLocation: true,
                forceLocationManager: true,
                showLocationDialog: true,
            } as any
        );
    };

    const distanceMeter = countryDistance[country ?? 'UK'];

    // Distance handler using Google Distance Matrix API logic with enhanced visuals
    const distanceHandler = async (locationCoords) => {
        console.log('distanceHandlerisTracking', isTrackingRef.current);

        if (!isTrackingRef.current) return;

        setTrackingStatus('Calculating distance...');

        // Ensure coordinates are numbers
        const currentLat = parseFloat(locationCoords.latitude);
        const currentLng = parseFloat(locationCoords.longitude);

        if (isNaN(currentLat) || isNaN(currentLng)) {
            console.warn('Invalid coordinates received:', locationCoords);
            return;
        }

        if (lastLocationLatRef.current === 0) {
            console.log('Last location data is', 0);
            lastLocationLatRef.current = currentLat;
            lastLocationLngRef.current = currentLng;
            saveLatRef.current = currentLat;
            saveLngRef.current = currentLng;
            startTripTimeRef.current = new Date();
            setTrackingStatus('Journey started - tracking movement');
        } else {
            console.log(
                'this is location',
                lastLocationLatRef.current,
                lastLocationLngRef.current,
                'tracking:',
                isTracking,
                locationCoords,
            );

            try {
                const response = await axios.get(
                    `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${lastLocationLatRef.current},${lastLocationLngRef.current}&destinations=${currentLat},${currentLng}&key=${GOOGLE_MAPS_API_KEY}`,
                );

                console.log('Data Received from Google Distance Matrix:', JSON.stringify(response.data));

                const { startAddress, startTime } = await getSourceAddress();
                const { endAddress, endTime } = await getDestinationAddress();

                console.log('Start Address:', startAddress);
                console.log('End Address:', endAddress);
                console.log('Start Time:', moment(startTime).format('HH:mm:ss'));
                console.log('End Time:', moment(endTime).format('HH:mm:ss'));

                let distanceTraveledInMs = response.data.rows[0].elements[0].distance?.value || 0;

                if (distanceTraveledInMs > 0 || distanceTraveled.current > 0) {
                    console.log('Distance travel time or distance of travel changed');
                    findedSpeed.current = distanceTraveledInMs / (TimeOut / 1000);

                    if (findedSpeed.current > speedThreshold.current) {
                        console.log(`Calculated journey is ${distanceTraveled.current.toLocaleString()} meters`);

                        lastLocationLatRef.current = currentLat;
                        lastLocationLngRef.current = currentLng;
                        haldTime.current = new Date();
                        endTripTimeRef.current = new Date();
                        distanceTraveled.current = distanceTraveled.current + parseInt(distanceTraveledInMs);

                        // Update journey state with addresses and animate route
                        setJourney(prev => {
                            const updatedJourney = {
                                ...prev,
                                distance: distanceTraveled.current / 1000,
                                endLocation: {
                                    latitude: currentLat,
                                    longitude: currentLng,
                                },
                                startAddress,
                                endAddress,
                                duration: new Date().getTime() - startTripTimeRef.current.getTime(),
                                route: [...prev.route, {
                                    latitude: currentLat,
                                    longitude: currentLng,
                                }],
                            };

                            // Animate route drawing when new point is added
                            if (updatedJourney.route.length > prev.route.length) {
                                animateRouteDrawing();
                            }

                            return updatedJourney;
                        });

                        setCurrentSpeed(findedSpeed.current * 3.6);
                        setTrackingStatus(`🚗 Traveling - ${(distanceTraveled.current / 1000).toFixed(2)} km`);

                    } else {
                        let lastHaltDate = new Date(haldTime.current.getTime() + waitTime * 60000);
                        let currentDate = new Date();

                        if (lastHaltDate < currentDate) {
                            console.log('5 Minute Over Checking Data');
                            if (distanceTraveled.current > 0) {
                                console.log(distanceTraveled.current, 'Yes Travel Data available to store');
                                updateLocation(
                                    distanceTraveled.current,
                                    lastLocationLatRef.current,
                                    lastLocationLngRef.current,
                                );
                            }
                        } else {
                            console.log(currentDate.getTime(), '-', lastHaltDate.getTime());
                            console.log('Waiting for 5 Minute to Upload Data -', currentDate.getTime() - lastHaltDate.getTime());
                            setTrackingStatus(`⏸️ Waiting - last moved ${Math.round((currentDate.getTime() - haldTime.current.getTime()) / 60000)} min ago`);
                        }
                    }
                } else {
                    console.log('Distance travel time or distance of travel new data recorded');

                    lastLocationLatRef.current = currentLat;
                    lastLocationLngRef.current = currentLng;
                    saveLatRef.current = currentLat;
                    saveLngRef.current = currentLng;
                    haldTime.current = new Date();
                    endTripTimeRef.current = new Date();
                    setTrackingStatus('📍 Location updated - monitoring movement');
                }

            } catch (error) {
                console.error('Error fetching distance data:', error);
                setTrackingStatus('❌ Error calculating distance');
            }
        }
    };
    const GetDashboard = (country: string, LoginId: any) => {
        CommonServices.getWithQueryParam(
            'Journey',
            'GetDashboard',
            'loginId',
            LoginId,
            country,
        )
            .then(res => {
                if (res.status == 200) {
                    setDashboardData(res.data);
                    console.log('Dashboard Data:', res.data.id);
                    getJourneyDetails(res.data.id, country);
                }
            })
            .catch(e => console.log(e));
    };

    // Update location and save journey
    const updateLocation = async (distance: any, currentLat: any, currentLng: any, fromStopTracking = false) => {
        console.log('updateLocation');

        const { startAddress, startTime } = await getSourceAddress();
        const { endAddress, endTime } = await getDestinationAddress();

        let data = {
            id: 0,
            createdBy: 0,
            modified: '2023-08-22T10:03:32.140Z',
            modifiedBy: 0,
            active: true,
            userPlanId: dashboardData.id,
            entryDate: new Date(),
            reading: distance / 1000,
            distance: distance / 1000,
            latitude: `${saveLatRef.current}/${currentLat}`,
            longitude: `${saveLngRef.current}/${currentLng}`,
            startLocation: startAddress,
            endLocation: endAddress,
            startJourneyTime: moment(startTime).format('HH:mm:ss'),
            endJourneyTime: moment(endTime).format('HH:mm:ss'),
            startTime: startTime,
            endTime: endTime,
            duration: endTime.getTime() - startTime.getTime(),
            co2Emission: 0,
            readingImagePath: 'imageTest',
            rowOrder: 1,
            isNotEmmitted: false,
            name: 'Business',
            imageName: 'imgtest',
            cumulativeCo2Emission: 0,
            cumulativeDistance: 0,
            uploadFiles: null,
            unit: distanceMeter,
            UserVehicleDetails: null,
            RequestDetails: null,
        };

        console.log('Journey data in JSON format:', JSON.stringify(data, null, 2));


        try {
           
            CommonServices.post('Journey', 'RecordReading', data, country)
                .then(res => {
                    console.log('Response from server:', res.status, res.data);
                    if (res?.status === 200) {
                         Alert.alert(
                            '🏁 Journey Completed!',
                            `🟢 From: ${startAddress}\n🔴 To: ${endAddress}\n\n📏 Distance: ${(distance / 1000).toFixed(2)} km\n⏰ Duration: ${moment.duration(data.duration).humanize()}`,
                            [{ text: 'Great!', style: 'default' }]
                        );
                    }
                })
                .catch(e => {
                    console.error('Error posting data:', e.response?.data || e.message);
                }).finally(() => {
                 // Reset tracking variables
                        distanceTraveled.current = 0;
                        haldTime.current = new Date();
                        lastLocationLatRef.current = 0;
                        lastLocationLngRef.current = 0;
                        saveLatRef.current = 0;
                        saveLngRef.current = 0;
                        startTripTimeRef.current = new Date();
                        endTripTimeRef.current = new Date();

                         setJourney({
                            id: null,
                            startTime: null,
                            endTime: null,
                            startLocation: null,
                            endLocation: null,
                            startAddress: '',
                            endAddress: '',
                            distance: 0,
                            maxSpeed: 0,
                            avgSpeed: 0,
                            duration: 0,
                            route: [],
                        });

                    if (fromStopTracking) {
                        console.log('fromStopTrackingFalse');

                        setIsTracking(false);
                        setTrackingStatus('🛑 Journey stopped');
                        getJourneyDetails(dashboardData.id, country);
                    }
                });

        } catch (error) {
            console.error('Error saving journey:', error);
            Alert.alert('Error', 'Failed to save journey data');
        }
    };

    console.log('isTracking##', isTracking);

    // Format duration
    const formatDuration = (ms) => {
        const minutes = Math.floor(ms / 60000);
        const hours = Math.floor(minutes / 60);
        if (hours > 0) {
            return `${hours}h ${minutes % 60}m`;
        }
        return `${minutes}m`;
    };

    // Retry location with proper cleanup
    const retryLocation = () => {
        console.log('Retrying location...');
        stopLocationTracking();
        setLocationError(null);
        setIsLoading(true);
        startLocationTracking();
    };


    // Toggle follow user location
    const toggleFollowUser = () => {
        setFollowUserLocation(!followUserLocation);
        if (!followUserLocation && location && mapRef.current) {
            mapRef.current.animateToRegion({
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }, 1000);
        }
    };

    // Center map on journey route
    const centerOnRoute = () => {
        if (journey.route && journey.route.length > 1 && mapRef.current) {
            mapRef.current.fitToCoordinates(journey.route, {
                edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                animated: true,
            });
        }
    };

    // Initialize tracking on component mount
    
    useFocusEffect(
        useCallback(() => {
            console.log('Screen focused: start tracking');
            startLocationTracking();

            return () => {
            console.log('Screen unfocused: stop tracking');
            stopLocationTracking();
            };
        }, [])
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

        return ` ${hours} hours ${minutes} minutes`;
    }

      // Start location tracking with enhanced error handling
    const startLocationTracking = async () => {
        setIsLoading(true);
        setLocationError(null);

        const hasPermission = await requestLocationPermission();
        if (!hasPermission) {
            setLocationError('Location permission denied');
            setIsLoading(false);
            Alert.alert('Permission Error', 'Location permission is required');
            return;
        }

        // Check if Google Play Services are available by testing Geolocation
        if (Geolocation && !useNativeGeolocation) {
            try {
                // Test if Geolocation service is working
                Geolocation.getCurrentPosition(
                    (success) => {
                        console.log('Geolocation service test successful');
                        startPeriodicLocationUpdates();
                    },
                    (error) => {
                        setIsLoading(false);
                        console.log('Geolocation service test failed:', error);
                        setLocationError("Location error: " + error.message);
                    },
                   {
                    enableHighAccuracy: true,
                    timeout: 30000,         // 30 seconds
                    maximumAge: 1000,
                    forceLocationManager: true,
                    distanceFilter: 0
                    } as any,
                );
            } catch (error) {
            }
        } else {
           
        }
    };

    // Start periodic location updates using react-native-geolocation-service
    const startPeriodicLocationUpdates = () => {
        getLocation();
        locationInterval.current = setInterval(() => {
            if(locationInterval.current) {
                getLocation();
            }
        }, TimeOut);
    };

    // Stop location tracking
    const stopLocationTracking = () => {
        console.log('🛑 stopLocationTracking called');
        
        if (locationInterval.current) {
            console.log('🧹 Clearing location interval');
            clearInterval(locationInterval.current);
            locationInterval.current = null;
        }

        if (watchId.current !== null) {
            console.log('🧹 Clearing watchPosition');
            Geolocation.clearWatch(watchId.current);
            watchId.current = null;
        }
    };

      // Start journey with enhanced visuals
    const startJourney = async () => {

        if (
            !location ||
            typeof location.latitude !== 'number' ||
            typeof location.longitude !== 'number' ||
            isNaN(location.latitude) ||
            isNaN(location.longitude)
        ) {
            Alert.alert('Location Error', 'Cannot start journey without location data');
            return;
        }

        console.log('Starting journey from location:', location);


        setIsTracking(true);
        console.log('startJourneyTraing', isTracking);

        startTripTimeRef.current = new Date();

        let startAddress = 'Unknown';
        try {
            startAddress = await getAddressFromLatLng(location.latitude, location.longitude);
        } catch (err) {
            console.warn('Failed to get address:', err);
        }
        // const startAddress = await getAddressFromLatLng(location.latitude, location.longitude);

        setJourney({
            id: Date.now().toString(),
            startTime: new Date(),
            endTime: null,
            startLocation: {
                latitude: location.latitude,
                longitude: location.longitude,
            },
            endLocation: null,
            startAddress,
            endAddress: '',
            distance: 0,
            maxSpeed: 0,
            avgSpeed: 0,
            duration: 0,
            route: [location],
        });

        // Reset tracking variables
        distanceTraveled.current = 0;
        lastLocationLatRef.current = 0;
        lastLocationLngRef.current = 0;
        saveLatRef.current = location.latitude;
        saveLngRef.current = location.longitude;
        speedHistory.current = [];

        setTrackingStatus('🚀 Journey started - waiting for movement');

        // Animate map to show start location
        if (mapRef.current && location) {
            mapRef.current.animateToRegion({
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }, 1000);
        }

        Alert.alert('🚀 Journey Started!', `🟢 Starting from: ${startAddress}`, [{ text: 'Let\'s Go!', style: 'default' }]);
    };

    // Stop journey
    const stopJourney = async () => {
        if (!isTracking) return;

        setTrackingStatus('🛑 Stopping journey...');

        if (distanceTraveled.current > 0) {
            await updateLocation(
                distanceTraveled.current,
                lastLocationLatRef.current || location?.latitude || 0,
                lastLocationLngRef.current || location?.longitude || 0,
                true
            );
        } else {
            setIsTracking(false);
            console.log('stopJourneysetIsTrackingFalse');

            setTrackingStatus('🛑 Journey stopped');
            Alert.alert('Journey Stopped', 'No significant movement detected');
        }
    };


    // Render map content with enhanced interactive features
    const renderMapContent = () => {
        if (!MapView) {
            return (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>Maps not available. Install react-native-maps.</Text>
                </View>
            );
        }

        if (isLoading) {
            return (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#2196f3" />
                    <Text style={styles.loadingText}>🛰️ Getting your location...</Text>
                    {useNativeGeolocation && (
                        <Text style={styles.subText}>Using native geolocation</Text>
                    )}
                </View>
            );
        }

        if (locationError) {
            return (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>❌ {locationError}</Text>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.retryButton} onPress={retryLocation}>
                            <Text style={styles.retryButtonText}>🔄 Retry</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }



        // Use current location if available, otherwise use default region
        const currentMapRegion = mapRegion || (location ? {
            latitude: parseFloat(location.latitude) || 37.7749,
            longitude: parseFloat(location.longitude) || -122.4194,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        } : defaultRegion);

        return (
            <View style={styles.mapWrapper}>
                <MapView
                    ref={mapRef}
                    style={styles.map}
                    region={currentMapRegion}
                    showsUserLocation={false} // We'll use custom markers
                    followsUserLocation={false} // We handle this manually
                    showsMyLocationButton={false}
                    showsCompass={true}
                    showsScale={true}
                    mapType="standard"
                    onRegionChangeComplete={(region) => {
                        if (!followUserLocation) {
                            setMapRegion(region);
                        }
                    }}
                >
                    {/* Start location marker */}
                    {journey.startLocation && (
                        <Marker
                            coordinate={{
                                latitude: parseFloat(journey.startLocation.latitude) || 37.7749,
                                longitude: parseFloat(journey.startLocation.longitude) || -122.4194,
                            }}
                            title="🟢 Start Location"
                            description={journey.startAddress}
                            pinColor="green"
                            identifier="start"
                        />
                    )}

                    {/* Animated vehicle marker */}
                    {location && animatedCoordinate.current && (
                        <Marker.Animated
                            ref={markerRef}
                            coordinate={animatedCoordinate.current}
                            title={isTracking ? "🚗 Vehicle (Tracking)" : "📍 Current Location"}
                            description={`Speed: ${currentSpeed.toFixed(1)} km/h`}
                            anchor={{ x: 0.5, y: 0.5 }}
                            flat={true}
                        >
                            <View style={styles.vehicleMarker}>
                                <Text style={styles.vehicleIcon}>
                                    {isTracking ? '🚗' : '📍'}
                                </Text>
                                {isTracking && (
                                    <View style={styles.speedBadge}>
                                        <Text style={styles.speedText}>{currentSpeed.toFixed(0)}</Text>
                                    </View>
                                )}
                            </View>
                        </Marker.Animated>
                    )}

                    {/* End location marker */}
                    {journey.endLocation && (
                        <Marker
                            coordinate={{
                                latitude: parseFloat(journey.endLocation.latitude) || 37.7749,
                                longitude: parseFloat(journey.endLocation.longitude) || -122.4194,
                            }}
                            title="🔴 Current End Location"
                            description={journey.endAddress}
                            pinColor="red"
                            identifier="end"
                        />
                    )}

                    {/* Animated journey route */}
                    {journey.route && journey.route.length > 1 && (
                        <Polyline
                            coordinates={journey.route.map(point => ({
                                latitude: parseFloat(point.latitude) || 37.7749,
                                longitude: parseFloat(point.longitude) || -122.4194,
                            }))}
                            strokeColor="#FF4444"
                            strokeWidth={4}
                            lineDashPattern={[5, 10]}
                        />
                    )}
                </MapView>

                {/* Map controls */}
                <View style={styles.mapControls}>
                    <TouchableOpacity
                        style={[styles.controlButton, followUserLocation && styles.activeControlButton]}
                        onPress={toggleFollowUser}
                    >
                        <Text style={styles.controlButtonText}>
                            {followUserLocation ? '📍' : '🔍'}
                        </Text>
                    </TouchableOpacity>

                    {journey.route && journey.route.length > 1 && (
                        <TouchableOpacity
                            style={styles.controlButton}
                            onPress={centerOnRoute}
                        >
                            <Text style={styles.controlButtonText}>🗺️</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        );
    };

    const screenHeight = Dimensions.get('window').height;

    return (
        <View style={{ minHeight: screenHeight }}>
            <View style={styles.container}>
                {/* Map View */}
                <View style={styles.mapContainer}>
                    {renderMapContent()}
                </View>

                {/* Control Panel */}
                <ScrollView style={styles.controlPanel}>
                    {/* Status Display */}
                    <View style={styles.statusContainer}>
                        <Text style={styles.statusText}>
                            Status: {isTracking ? '🟢 Tracking' : '🔴 Stopped'}
                        </Text>
                        <Text style={styles.statusText}>
                            Mode: {isAutoMode ? '🤖 Auto' : '👤 Manual'}
                        </Text>
                        <Text style={styles.statusText}>
                            Speed: {currentSpeed.toFixed(1)} km/h
                        </Text>
                        <Text style={[styles.statusText, locationError ? styles.errorStatus : styles.successStatus]}>
                            Location: {locationError ? 'Error' : location ? 'Active' : 'Searching...'}
                        </Text>
                        <Text style={styles.subText}>
                            Method: {useNativeGeolocation ? 'Native Geolocation' : 'RN Geolocation Service'}
                        </Text>
                        <Text style={styles.trackingStatus}>
                            {trackingStatus}
                        </Text>

                        {/* Show helpful info when using fallback */}
                        {useNativeGeolocation && (
                            <Text style={styles.fallbackInfo}>
                                ℹ️ Using fallback method due to Google Play Services issues
                            </Text>
                        )}

                        {/* Show accuracy info */}
                        {location && location.accuracy && (
                            <Text style={styles.accuracyInfo}>
                                📡 Accuracy: ±{Math.round(location.accuracy)}m
                            </Text>
                        )}
                    </View>

                    {/* Journey Locations Display */}
                    {(journey.startAddress || journey.endAddress) && (
                        <View style={styles.locationsContainer}>
                            <Text style={styles.locationsTitle}>🗺️ Journey Details</Text>

                            {journey.startAddress && (
                                <View style={styles.locationItem}>
                                    <Text style={styles.locationLabel}>🟢 Start:</Text>
                                    <Text style={styles.locationName}>{journey.startAddress}</Text>
                                </View>
                            )}

                            {journey.endAddress && (
                                <View style={styles.locationItem}>
                                    <Text style={styles.locationLabel}>🔴 Current End:</Text>
                                    <Text style={styles.locationName}>{journey.endAddress}</Text>
                                </View>
                            )}
                        </View>
                    )}

                    {/* Journey Stats */}
                    {isTracking && (
                        <View style={styles.statsContainer}>
                            <Text style={styles.statsTitle}>📊 Current Journey</Text>
                            <Text>📏 Distance: {journey.distance.toFixed(2)} km</Text>
                            <Text>⏰ Duration: {formatDuration(journey.duration)}</Text>
                            <Text>⚡ Current Speed: {currentSpeed.toFixed(1)} km/h</Text>
                            <Text>📐 Calculated Distance: {(distanceTraveled.current / 1000).toFixed(2)} km</Text>
                            <Text>🛣️ Route Points: {journey.route.length}</Text>
                            {journey.startAddress && (
                                <Text>🟢 From: {journey.startAddress.length > 50 ? journey.startAddress.substring(0, 50) + '...' : journey.startAddress}</Text>
                            )}
                        </View>
                    )}

                    {/* Control Buttons */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.startButton, (!location || isTracking) && styles.disabledButton]}
                            onPress={startJourney}
                            disabled={!location || isTracking}
                        >
                            <Text style={styles.buttonText}>🚀 Start Journey</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, styles.stopButton, !isTracking && styles.disabledButton]}
                            onPress={stopJourney}
                            disabled={!isTracking}
                        >
                            <Text style={styles.buttonText}>🛑 Stop Journey</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, styles.modeButton]}
                            onPress={() => setIsAutoMode(!isAutoMode)}
                        >
                            <Text style={styles.buttonText}>
                                {isAutoMode ? '👤 Manual' : '🤖 Auto'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Journey History */}
                    <View style={styles.historyContainer}>
                        <Text style={styles.historyTitle}>📚 Recent Journeys</Text>
                         {journeyReading.slice(0, 5).map((trip: any, index: any) => (
                            <View key={trip.id || index} style={styles.historyItem}>
                                <Text style={styles.historyDate}>
                                    {`📅 ${new Date(trip.startTime || trip.created).toLocaleDateString()} : `}
                                    {(trip.startJourneyTime && trip.endJourneyTime )??
                                        `⏰ ${trip.startJourneyTime} - ${trip.endJourneyTime}`
                                    }
                                </Text>

                                {trip.startLocation && (
                                    <Text style={styles.historyLocation}>
                                        🟢 From: {trip.startLocation.length > 40 ? trip.startLocation.substring(0, 40) + '...' : trip.startLocation}
                                    </Text>
                                )}
                                {trip.endLocation && (
                                    <Text style={styles.historyLocation}>
                                        🔴 To: {trip.endLocation.length > 40 ? trip.endLocation.substring(0, 40) + '...' : trip.endLocation}
                                    </Text>
                                )}

                                <Text>📏 Distance: {trip.distance.toFixed(2)} km</Text>
                                <Text>⏰ Duration: { getTimeDifference(
                                    trip?.startJourneyTime,
                                    trip?.endJourneyTime,
                                )}
                                </Text>
                            </View>
                        ))}
                        {journeyReading.length === 0 && (
                            <Text style={styles.noHistoryText}>🆕 No journeys recorded yet - start your first journey!</Text>
                        )}
                    </View>
                    {accessToken && (
                         <View pointerEvents="auto" style={{ position: 'absolute', bottom: 70, right: 15, zIndex: 999 }}>
                        <TouchableOpacity
                            onPress={() => {
                            console.log("Send screenName:", 'Journey');

                               (navigation as any).navigate('Dashboard', {
                                    screenName: 'Journey',
                                    });
                            }}
                            style={{
                                position: 'absolute',
                                bottom: 70, // Adjust to stay above tab bar
                                right: 15,
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
                                source={require('../assests/arrow_back.png')} // Replace with actual icon
                                style={{ width: 24, height: 24, tintColor: 'white' }}
                            />
                        </TouchableOpacity>
                         </View>
                    )}
                    <View>
                        <Box px="4" py="20"></Box>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    mapContainer: {
        flex: 1,
        height: height * 0.5,
    },
    mapWrapper: {
        flex: 1,
        position: 'relative',
    },
    map: {
        flex: 1,
    },
    mapControls: {
        position: 'absolute',
        top: 20,
        right: 20,
        flexDirection: 'column',
        gap: 10,
    },
    controlButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 25,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    activeControlButton: {
        backgroundColor: '#2196f3',
    },
    controlButtonText: {
        fontSize: 20,
    },
    vehicleMarker: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    vehicleIcon: {
        fontSize: 30,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 2,
    },
    speedBadge: {
        backgroundColor: '#FF4444',
        borderRadius: 10,
        paddingHorizontal: 6,
        paddingVertical: 2,
        marginTop: -5,
    },
    speedText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
        fontWeight: '400',
    },
    subText: {
        fontSize: 12,
        color: '#999',
        marginTop: 5,
        fontWeight: '400',
    },
    trackingStatus: {
        fontSize: 14,
        fontStyle: 'italic',
        color: '#666',
        marginTop: 4,
        fontWeight: '400',
    },
    fallbackInfo: {
        fontSize: 12,
        color: '#ff9800',
        marginTop: 4,
        fontStyle: 'italic',
    },
    accuracyInfo: {
        fontSize: 12,
        color: '#4caf50',
        marginTop: 2,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffebee',
        padding: 20,
    },
    errorText: {
        color: '#d32f2f',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 10,
    },
    retryButton: {
        backgroundColor: '#2196f3',
        padding: 12,
        borderRadius: 6,
        marginHorizontal: 5,
    },
    retryButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    controlPanel: {
        flex: 1,
        padding: 16,
        backgroundColor: 'white',
    },
    statusContainer: {
        backgroundColor: '#e8f4fd',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
    },
    statusText: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 4,
    },
    errorStatus: {
        color: '#d32f2f',
    },
    successStatus: {
        color: '#2e7d32',
    },
    locationsContainer: {
        backgroundColor: '#fff3e0',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
    },
    locationsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#f57c00',
    },
    locationItem: {
        marginBottom: 8,
    },
    locationLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#e65100',
    },
    locationName: {
        fontSize: 14,
        color: '#333',
        marginTop: 2,
        fontWeight: '400',
    },
    statsContainer: {
        backgroundColor: '#f0f8f0',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
    },
    statsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#2e7d32',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    button: {
        flex: 1,
        padding: 12,
        borderRadius: 6,
        marginHorizontal: 4,
        alignItems: 'center',
    },
    startButton: {
        backgroundColor: '#4caf50',
    },
    stopButton: {
        backgroundColor: '#f44336',
    },
    modeButton: {
        backgroundColor: '#2196f3',
    },
    disabledButton: {
        backgroundColor: '#cccccc',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
    },
    historyContainer: {
        marginTop: 16,
    },
    historyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    historyItem: {
        backgroundColor: '#f8f8f8',
        padding: 12,
        borderRadius: 6,
        marginBottom: 8,
    },
    historyDate: {
        fontWeight: 'bold',
        marginBottom: 4,
    },
    historyLocation: {
        fontSize: 14,
        color: '#555',
        marginBottom: 2,
        fontWeight: '400',
    },
    noHistoryText: {
        textAlign: 'center',
        color: '#666',
        fontStyle: 'italic',
        fontWeight: '400',
    },
});

export default AutoTracker;