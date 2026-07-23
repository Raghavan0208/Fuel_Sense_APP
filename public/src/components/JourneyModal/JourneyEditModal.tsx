/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, { memo, useEffect, useRef, useState } from 'react';
import {
  Appearance,
  GestureResponderEvent,
  ScrollView,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Modal from 'react-native-modal';
import { CURRENT_HIEGHT, CURRENT_WIDTH } from '../../screens/LoginScreen';
import CustomTextInput from '../CustomTextInput';
import ModalFooter from './ModalFooter';
import ModalHeader from './ModalHeader';
import CustomDropDown from '../CustomDropDown';
import {
  countryCurrency,
  countryDistance,
} from '../../core/data';
import moment from 'moment';
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from 'react-native-google-places-autocomplete';
import CommonServices from '../../Services/CommonServices';
import { Text } from 'native-base';
type props = {
  showModal: boolean;
  setShowModal: (a: boolean) => void;
  isUpdate: (a: boolean) => void;
  mainContainer?: StyleProp<ViewStyle> | undefined;
  bodyContainer?: StyleProp<ViewStyle> | undefined;
  onBackGroundPress?: ((event: GestureResponderEvent) => void) | undefined;
  country?: any;
  data?: any;
  accessToken?: any;
};

const JourneyEditModal = ({
  showModal,
  setShowModal,
  mainContainer,
  onBackGroundPress,
  isUpdate,
  bodyContainer,
  country,
  data,
  accessToken,
}: props) => {
  const [startLocation, setStartLocation] = useState<any>();
  const [endLocation, setEndLocation] = useState<any>();
  const [customRate, setCustomRate] = useState<string | null | undefined>();
  const [tripType, setTripType] = useState<string | null | undefined>();
  const [distance, setDistance] = useState<string | undefined | null>();
  const [parkingExpense, setParkingExpense] = useState<
    string | undefined | null
  >();
  const [tollExpense, setTollExpense] = useState<string | undefined | null>();
  const [tripNotes, setTripNotes] = useState<string | undefined | null>();
  const [journeyDate, setJourneyDate] = useState<string | undefined | null>();
  const [dataLat, setDataLat] = useState<any>();
  const [dataLong, setDataLong] = useState<any>();
  const locationInputRef = useRef<GooglePlacesAutocompleteRef>(null);
  const endLocationInputRef = useRef<GooglePlacesAutocompleteRef>(null);
  const [getCustomTags, setgetCustomTags] = useState<Array<any>>([]);

  const GOOGLE_MAPS_APIKEY = 'AIzaSyClEJhfMqEtTy6dcofhkDL1RvfhVTO2wss';

  useEffect(() => {
    const rate =
      data?.userVehicleDetails?.rateValue &&
        data?.userVehicleDetails?.rateValue > 0
        ? String(data?.userVehicleDetails?.rateValue)
        : '';
    fetchAndConcatTags(data?.userVehicleDetails?.loginId);
    setJourneyDate(data?.entryDate);
    setStartLocation(data?.startLocation);
    locationInputRef.current?.setAddressText(data?.startLocation);
    setEndLocation(data?.endLocation);
    endLocationInputRef.current?.setAddressText(data?.endLocation);
    setCustomRate(rate);
    setTripNotes(data?.tripNotes);
    setTripType(data?.name);
    setDataLat(data?.latitude);
    setDataLong(data?.longitude);
    setDistance(JSON.stringify(data?.reading || data?.distance));
    setParkingExpense(JSON.stringify(data?.parkingExpenses));
    setTollExpense(JSON.stringify(data?.tollExpenses));
  }, [data]);

  const onBackPress = () => {
    setShowModal(false);
  };
  const onCancelPress = () => {
    setShowModal(false);
  };
  const onStartLocationPress = (data: any, details: any) => {
    setLocationOnChange(true, details);
    setStartLocation(data.description);
  };
  const onEndLocationPress = (data: any, details: any) => {
    setLocationOnChange(false, details);
    setEndLocation(data.description);
  };

  const deg2rad = (deg: any) => {
    return deg * (Math.PI / 180);
  };

  const setLocationOnChange = (isStart: boolean, details: any) => {
    let latitude = dataLat;
    let longitude = dataLong;

    // Split latitude and longitude by '/'
    let latBeforeSlash = latitude.split('/')[0];
    let latAfterSlash = latitude.split('/')[1];

    let longBeforeSlash = longitude.split('/')[0];
    let longAfterSlash = longitude.split('/')[1];

    if (isStart) {
      latitude = details.geometry.location.lat + '/' + latAfterSlash;
      longitude = details.geometry.location.lng + '/' + longAfterSlash;
    } else {
      latitude = latBeforeSlash + '/' + details.geometry.location.lat;
      longitude = longBeforeSlash + '/' + details.geometry.location.lng;
    }

    setDataLat(latitude);
    setDataLong(longitude);

    const dist = getDistanceFromLatLonInKm(
      Number(latitude.split('/')[0]),
      Number(longitude.split('/')[0]),
      Number(latitude.split('/')[1]),
      Number(longitude.split('/')[1]),
    );

    setDistance(dist.toFixed(2));
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

  const fetchAndConcatTags = (loginid: any) => {
    // Use Promise.all to fetch both sets of data simultaneously
    Promise.all([
      CommonServices.get('Master', 'GetAllDefaultTags', country),
      CommonServices.getWithSingleParam(
        'CustomTags',
        'GetCustomTagsByLoginid',
        loginid,
        country,
      ),
    ])
      .then(([defaultTagsRes, customTagsRes]) => {
        // Check if both responses are successful
        if (defaultTagsRes?.status === 200 && customTagsRes?.status === 200) {
          // Concatenate the data from both responses
          const combinedTags = [...defaultTagsRes.data, ...customTagsRes.data];
          setgetCustomTags(combinedTags); // Update the state with the combined data
        } else {
          console.error('One or both responses failed', {
            defaultTagsRes,
            customTagsRes,
          });
        }
      })
      .catch(e => {
        // Handle any errors that occurred in either request
        console.error('Error fetching tags:', e.response?.data || e.message);
      });
  };

  const onConfirmPress = () => {
    const editData = {
      Name: tripType,
      EntryDate: journeyDate,
      StartLocation: startLocation,
      EndLocation: endLocation,
      ParkingExpenses: parkingExpense !== '0' ? parkingExpense : null,
      TollExpenses: tollExpense !== '0' ? tollExpense : null,
      TripNotes: tripNotes || null,
      Latitude: dataLat,
      Longitude: dataLong,
      UserPlanId: data.userPlanId,
      Reading: distance || null,
      Distance: distance || null,
      unit: distanceMeter,
      isFuelLogAdded: data?.isFuelLogAdded,
      isReviewed: data?.isReviewed,
      readingImagePath: 'imageTest',
    };
    CommonServices.postWithMultipleQueryParam(
      'Journey',
      'Edit',
      'id',
      data.id,
      editData,
      country,
    )
      .then((res: any) => {
        if (res.status == 200) {
          setShowModal(false);
          isUpdate(true);
          // navigation.navigate('Journey' as never)
          // setDeleteModal(false);
          // setLoad(!load);
        }
      })
      .catch(e => console.log(e));
    // if (!tripType || tripType.length == 0) {
    //   Alert.alert('Missing Info.', 'Please Enter Trip Type of your choice');
    //   return;
    // }
    // if (!startLocation) {
    //   Alert.alert('Missing Info.', 'Please Enter Start Location');
    //   return;
    // }
    // if (!endLocation) {
    //   Alert.alert('Missing Info.', 'Please Enter End Location');
    //   return;
    // }

    // setShowModal(false);
  };

  const currency = countryCurrency[country ?? 'UK'];
  const distanceMeter = countryDistance[country ?? 'UK'];

  return (
    <Modal
      backdropTransitionOutTiming={500}
      isVisible={showModal}
      useNativeDriver
      useNativeDriverForBackdrop
      backdropOpacity={0.5}
      style={{ margin: 0, paddingHorizontal: 30 }}>
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.container, mainContainer]}
        onPress={onBackGroundPress ? onBackGroundPress : onBackPress}>
        <TouchableOpacity activeOpacity={1} style={{}}>
          <View style={[styles.subContainer, bodyContainer]}>
            <ModalHeader title="Edit Your Journey" />
            <ScrollView
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{ paddingBottom: 30, paddingTop: 10 }}>
              <Text ml="1" style={styles.locTitle}>
                Date
              </Text>
              <CustomTextInput
                placeHolder={'Date'}
                textInputStyle={{ backgroundColor: '#d9d9d9', borderRadius: 10 }}
                defaultValue={moment(journeyDate).format('DD/MM/YYYY') ?? ''}
                value={moment(journeyDate).format('DD/MM/YYYY') ?? ''}
                editable={false}
              />
              <Text ml="1" style={styles.locTitle}>
                Trip Type
              </Text>
              <CustomDropDown
                data={getCustomTags}
                placeholder="Trip Type"
                value={tripType ?? ''}
                setValue={setTripType}
                customStyle={{ paddingLeft: 10 }}
              />
              <Text ml="1" style={styles.locTitle}>
                Start Location
              </Text>
              <GooglePlacesAutocomplete
                ref={locationInputRef}
                fetchDetails={true}
                placeholder={'Enter Start Location'}
                onPress={(data, details) => onStartLocationPress(data, details)}
                autoFocus={false} // Ensure autoFocus is off
                query={{
                  key: GOOGLE_MAPS_APIKEY,
                  language: 'en',
                }}
                styles={{
                  textInput: {
                    height: 46,
                    borderRadius: 10,
                    borderWidth: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderColor: '#aaa',
                    marginTop: 8,
                  },
                  powered: {
                    display: 'none',
                    height: 1,
                  },
                  row: {
                    padding: 13,
                    height: 44,
                    flexDirection: 'row',
                    backgroundColor:
                      Appearance.getColorScheme() === 'dark'
                        ? 'black'
                        : 'white',
                  },
                }}
              />
              {/* <LocationInput
                placeholder="Enter Start Location"
                onPress={(data, details) => onStartLocationPress(data, details)}
                location={startLocation}
                ref={locationInputRef} // Pass the ref to LocationInput
              /> */}
              <Text ml="1" style={styles.locTitle}>
                End Location
              </Text>
              <GooglePlacesAutocomplete
                ref={endLocationInputRef}
                fetchDetails={true}
                placeholder={'Enter End Location'}
                onPress={(data, details) => onEndLocationPress(data, details)}
                autoFocus={false} // Ensure autoFocus is off
                query={{
                  key: GOOGLE_MAPS_APIKEY,
                  language: 'en',
                }}
                styles={{
                  textInput: {
                    height: 46,
                    borderRadius: 10,
                    borderWidth: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderColor: '#aaa',
                    marginTop: 8,
                  },
                  powered: {
                    display: 'none',
                    height: 1,
                  },
                  row: {
                    padding: 13,
                    height: 44,
                    flexDirection: 'row',
                    backgroundColor:
                      Appearance.getColorScheme() === 'dark'
                        ? 'black'
                        : 'white',
                  },
                }}
              />
              {/* <LocationInput
                placeholder="Enter End Location"
                onPress={(data, details) => onEndLocationPress(data, details)}
                location={endLocation}
                ref={endLocationInputRef} // Pass the ref to LocationInput
              /> */}
              {customRate ? (
                <>
                  <Text ml="1" style={styles.locTitle}>
                    Rate
                  </Text>
                  <CustomTextInput
                    placeHolder={`Custom Rate (${currency}/${distanceMeter})`}
                    defaultValue={customRate ?? ''}
                    value={customRate ?? ''}
                    editable={false}
                    textInputStyle={{
                      backgroundColor: '#d9d9d9',
                      borderRadius: 10,
                    }}
                    onValueChange={setCustomRate}
                    keyboardType="phone-pad"
                  />
                </>
              ) : null}
              <Text ml="1" style={styles.locTitle}>
                Distance
              </Text>
              <CustomTextInput
                placeHolder={`Distance (In ${distanceMeter})`}
                defaultValue={distance ?? ''}
                value={distance ?? ''}
                editable={false}
                textInputStyle={{ backgroundColor: '#d9d9d9', borderRadius: 10 }}
                onValueChange={setDistance}
              />
              <Text ml="1" style={styles.locTitle}>
                Parking Expenses
              </Text>
              <CustomTextInput
                placeHolder="Parking Expenses"
                defaultValue={parkingExpense ?? ''}
                value={parkingExpense ?? ''}
                onValueChange={setParkingExpense}
              />
              <Text ml="1" style={styles.locTitle}>
                Toll Expenses
              </Text>
              <CustomTextInput
                placeHolder="Toll Expenses"
                defaultValue={tollExpense ?? ''}
                value={tollExpense ?? ''}
                onValueChange={setTollExpense}
              />
              <Text ml="1" style={styles.locTitle}>
                Trip Notes
              </Text>
              <CustomTextInput
                placeHolder="Trip Notes"
                defaultValue={tripNotes ?? ''}
                value={tripNotes ?? ''}
                onValueChange={setTripNotes}
                multiline
              />
            </ScrollView>
            <ModalFooter
              onCancelPress={onCancelPress}
              onConfirmPress={onConfirmPress}
            />
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default memo(JourneyEditModal);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainer: {
    width: CURRENT_WIDTH * 0.9,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    maxHeight: CURRENT_HIEGHT * 0.9,
  },
  locTitle: {
    color: '#000000',
    fontWeight: '500',
  },
});
