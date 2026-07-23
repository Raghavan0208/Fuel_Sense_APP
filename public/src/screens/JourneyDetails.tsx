import {
  ImageSourcePropType,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Image} from 'native-base';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import firestore from '@react-native-firebase/firestore';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {countryDistance} from '../core/data';

interface UserVehicleDetails {
  loginId: number;
  firstName: string;
  lastName: string;
  registrationNumber: string;
  registrationDate: string | null;
  vehicleTypeId: number;
  brandVariantId: number;
  fuelTypeId: number;
  cO2Emission: number;
  vehicleType: string | null;
  brandName: string | null;
  brandVariant: string | null;
  fuelTypeName: string | null;
  emissionType: string | null;
  brandId: number;
  brandSeriesId: number;
  brandSeriesName: string | null;
  ccType: number;
  rateId: number;
  rateName: string;
  rateValue: number;
  isDefault: boolean;
  totalDriveCount: number;
  totalMilesCount: number;
  totalMileageRates: number;
  userLogin: any;
  id: number;
  created: string;
  createdBy: number;
  modified: string;
  modifiedBy: number;
  active: boolean;
}

// TypeScript interface for the journeyDetail props
interface JourneyDetailProps {
  userPlanId: number;
  entryDate: string;
  reading: number;
  distance: number;
  co2Emission: number;
  readingImagePath: string;
  isNotEmmitted: boolean | null;
  rowOrder: number | null;
  name: string;
  imageName: string | null;
  cumulativeCo2Emission: number;
  cumulativeDistance: number | null;
  uploadFiles: any;
  latitude: string;
  longitude: string;
  parkingExpenses: number;
  tollExpenses: number;
  tripNotes: string;
  startLocation: string;
  endLocation: string;
  unit: string;
  isReviewed: boolean;
  userVehicleDetails: UserVehicleDetails;
  requestDetails: any;
  id: number;
  created: string;
  createdBy: number;
  modified: string;
  modifiedBy: number;
  active: boolean;
}
interface JourneyDetailProps {
  journeyDetail: JourneyDetailProps;
}
const GOOGLE_MAPS_APIKEY = 'AIzaSyClEJhfMqEtTy6dcofhkDL1RvfhVTO2wss';

const JourneyDetails = ({route, navigation}: any) => {
  const {
    journeyDetail,
    listData,
    damoovToken,
    TripId,
    countryCode,
  }: {
    journeyDetail: JourneyDetailProps;
    listData: JourneyDetailProps;
    damoovToken: string;
    TripId: any;
    countryCode: any;
  } = route?.params ?? {};
  const mapRef = useRef(null);
  const [markers, setMarkers] = useState([]);
  const [markerPoints, setMarkerPoints] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const bottomSheetRef = useRef(null);
  const snapPoints = ['10%', '30%', '60%'];
  const [tripData, setTripData] = useState();
  const [origin, setOrigin] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [destination, setDestination] = useState({
    latitude: 0,
    longitude: 0,
  });

  const fetchTripDetail = () => {
    setIsLoading(true);
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: `Bearer ${JSON.parse(damoovToken)}`,
      },
      body: JSON.stringify({
        IncludeDetails: true,
        IncludeStatistics: true,
        IncludeScores: true,
        IncludeWaypoints: true,
        IncludeEvents: true,
        Locale: 'EN',
        UnitSystem: 'Si',
      }),
    };
    fetch(`https://api.telematicssdk.com/trips/get/v1/${TripId}`, options)
      .then(res => res.json())
      .then(res => {
        setIsLoading(false);
        setTripData(res?.Result);
        setOrigin({
          latitude: res?.Result?.Trip?.Waypoints[0]?.Lat,
          longitude: res?.Result?.Trip?.Waypoints[0]?.Long,
        });
        setDestination({
          latitude:
            res?.Result?.Trip?.Waypoints[
              res?.Result?.Trip?.Waypoints.length - 1
            ]?.Lat,
          longitude:
            res?.Result?.Trip?.Waypoints[
              res?.Result?.Trip?.Waypoints.length - 1
            ]?.Long,
        });
      })
      .catch(err => {
        setIsLoading;
        console.error(err);
      });
  };

  useEffect(() => {
    if (mapRef.current && origin.latitude && destination.latitude) {
      mapRef.current.fitToCoordinates([origin, destination], {
        edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
        animated: true,
      });
    }
  }, [origin, destination]);

  useEffect(() => {
    if (damoovToken) {
      fetchTripDetail();
    }
  }, []);

  const distanceMeter = countryDistance[countryCode ?? 'UK'];

  const renderContent = useCallback(
    () => (
      <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.detailsCard}>
          <View style={styles.locationContainer}>
            <View style={styles.locationItem}>
              <Image
                source={require('../assests/location-pin-green.png')}
                width={5}
                height={5}
                alt="startlocation"
              />
              <Text style={styles.location}>Start Location</Text>
            </View>
            <Text style={styles.locationText}>
              {tripData?.Trip?.Data?.Addresses?.Start?.Full}
            </Text>
            <View style={[styles.locationItem, {marginTop: 8}]}>
              <Image
                source={require('../assests/location-pin-red.png')}
                width={5}
                height={5}
                alt="startlocation"
              />
              <Text style={styles.location}>End Location</Text>
            </View>
            <Text style={styles.locationText}>
              {tripData?.Trip?.Data?.Addresses?.End?.Full}
            </Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Distance</Text>
              <Text style={styles.statValue}>
                {tripData?.Trip?.Statistics?.Mileage.toFixed(1)} {distanceMeter}
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Duration</Text>
              <Text style={styles.statValue}>
                {tripData?.Trip?.Statistics?.DurationMinutes.toFixed(1)} Mins
              </Text>
            </View>
          </View>
          {tripData?.Trip?.Scores && (
            <View style={styles.scoreContainer}>
              <ScoreItem
                label={'Acceleration Score'}
                value={parseInt(tripData?.Trip?.Scores?.Acceleration)}
                icon={require('../assests/AccelerationScrore.png')}
              />
              <ScoreItem
                label={'Braking Score'}
                value={parseInt(tripData?.Trip?.Scores?.Braking)}
                icon={require('../assests/BrakingScrore.png')}
              />
              <ScoreItem
                label={'Phone Distraction Score'}
                value={parseInt(tripData?.Trip?.Scores?.PhoneUsage)}
                icon={require('../assests/phoneDistractionScrore.png')}
              />
              <ScoreItem
                label={'Speeding Score'}
                value={parseInt(tripData?.Trip?.Scores?.Speeding)}
                icon={require('../assests/speedingScrore.png')}
              />
              <ScoreItem
                label={'Cornering Score'}
                value={parseInt(tripData?.Trip?.Scores?.Cornering)}
                icon={require('../assests/corneringScore.png')}
              />
            </View>
          )}
        </View>
      </BottomSheetScrollView>
    ),
    [journeyDetail, tripData],
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            mr="3"
            source={require('../assests/arrow_back.png')}
            style={styles.backButton}
            alt="jorney"
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Journey Details</Text>
      </View>

      {isLoading ? (
        <View style={styles.centerContent}>
          <Text>Loading...</Text>
        </View>
      ) : error ? (
        <View style={styles.centerContent}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <>
          {origin.latitude !== 0 && destination.latitude !== 0 && (
            <MapView
              ref={mapRef}
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              initialRegion={{
                latitude: origin.latitude,
                longitude: origin.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}>
              <Marker
                coordinate={origin}
                title={tripData?.Data?.Addresses?.Start?.Full || 'Start'}
                // pinColor="green"
              >
                <Image
                  source={require('../assests/location-pin-green.png')}
                  width={5}
                  height={5}
                  alt="startlocation"
                />
              </Marker>
              <Marker
                coordinate={destination}
                title={tripData?.Data?.Addresses?.End?.Full || 'End'}>
                <Image
                  source={require('../assests/location-pin-red.png')}
                  width={5}
                  height={5}
                  alt="startlocation"
                />
              </Marker>
              <Polyline
                coordinates={tripData?.Trip?.Waypoints?.map(item => ({
                  latitude: item?.Lat,
                  longitude: item?.Long,
                }))}
                strokeWidth={3}
                strokeColor="#00b300"
              />
            </MapView>
          )}

          {/* {renderContent()} */}

          <BottomSheet
            ref={bottomSheetRef}
            index={1}
            snapPoints={snapPoints}
            enablePanDownToClose={false}>
            {renderContent()}
          </BottomSheet>
        </>
      )}
    </SafeAreaView>
  );
};

interface ScoreItemProps {
  label: string;
  value: number;
  icon: ImageSourcePropType;
}

const ScoreItem: React.FC<ScoreItemProps> = ({label, value, icon}) => {
  const fillStar = require('../assests/fillStarIcon.png');
  const blackStar = require('../assests/StarIcon.png');
  const getFilledStars = (value: number): number => {
    if (value >= 0 && value <= 20) return 1;
    if (value > 20 && value <= 40) return 2;
    if (value > 40 && value <= 60) return 3;
    if (value > 60 && value <= 80) return 4;
    if (value > 80 && value <= 100) return 5;
    return 0;
  };

  const filledStars = getFilledStars(value);

  return (
    <View style={styles.containerScore}>
      <View style={styles.labelContainer}>
        <Image source={icon} style={styles.icon} />
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.starsContainer}>
        {[...Array(5)].map((_, index) => (
          <Image
            key={index}
            source={index < filledStars ? fillStar : blackStar}
            style={styles.star}
          />
        ))}
      </View>
    </View>
  );
};

export default JourneyDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  backButton: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  location: {
    marginStart: 10,
    color: 'black',
    fontWeight: '700',
    fontSize: 18,
  },
  map: {
    flex: 1,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 12,
    resizeMode: 'contain',
  },
  star: {
    width: 24,
    height: 24,
    marginLeft: 4,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#FF4444',
    textAlign: 'center',
  },
  detailsCard: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  locationContainer: {
    marginBottom: 16,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  locationText: {
    fontSize: 14,
    marginStart: 10,
    color: 'rgb(69,120,180)',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E5E5',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  divider: {
    width: 1,
    backgroundColor: '#E5E5E5',
  },
  statLabel: {
    fontSize: 14,
    color: 'black',
    fontWeight: '600',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  scoreContainer: {
    marginTop: 16,
  },
  scoreItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  scoreLabel: {
    fontSize: 14,
    color: '#666',
  },
  scoreValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  containerScore: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginLeft: 12,
    color: '#4A4A4A',
  },
  starsContainer: {
    flexDirection: 'row',
  },
});
