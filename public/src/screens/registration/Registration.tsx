Registration







/* eslint-disable eqeqeq */
/* eslint-disable curly */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-screen-helper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CommonServices from '../../Services/CommonServices';
import { countryData } from '../../core/data';
import Country from '../Country';
import MileageRate from './MileageRate';
import RegistrationForm from './RegistrationForm';
export const mileageRateData = [
  {
    rateId: 1,
    countryCode: 'UK',
    rateLimit: [
      {
        limit: '£0.45/miles',
        message1: 'Business for',
        message2: '10000Miles',
        icon: require('../../assests/diagram.png'),
      },
      {
        limit: '£0.25/miles',
        message1: 'Business for greater',
        message2: 'than 10000Miles',
        icon: require('../../assests/diagram.png'),
      },
    ],
  },
  {
    countryCode: 'USA',
    rateLimit: [
      {
        limit: '$0.70/miles',
        message1: 'Business',
        message2: '',
        icon: require('../../assests/diagram.png'),
      },
      {
        limit: '$0.14/miles',
        message1: 'Charity',
        message2: '',
        icon: require('../../assests/heart1.png'),
      },
      {
        limit: '$0.21/miles',
        message1: 'Medical',
        message2: '',
        icon: require('../../assests/plus1.png'),
      },
      {
        limit: '$0.21/miles',
        message1: 'Moving (military only)',
        message2: '',
        icon: require('../../assests/cars.png'),
      },
    ],
  },
  {
    countryCode: 'Canada',
    rateLimit: [
      {
        limit: '$0.70/Kms',
        message1: 'Business for',
        message2: '5000kms',
        icon: require('../../assests/diagram.png'),
      },
      {
        limit: '$0.64/Kms',
        message1: 'Business for greater',
        message2: 'than 5000kms',
        icon: require('../../assests/diagram.png'),
      },
    ],
  },
  {
    countryCode: 'Australia',
    rateLimit: [
      {
        limit: '$0.88/Kms',
        message1: 'Business',
        message2: '',
        icon: require('../../assests/diagram.png'),
      },
    ],
  },
];
type props = {};

const HelperConstant = {
  gasolineEngine: {
    sizeSmall: 1.4,
    sizeMedium: 2.0,
  },
  dieselEngine: {
    sizeSmall: 1.7,
    sizeMedium: 2.0,
  },
  gasolineEngineLevel: {
    small: 131.7,
    medium: 157.2,
    large: 249.7,
  },
  dieselEngineLevel: {
    small: 135.2,
    medium: 161.1,
    large: 211.9,
  },
  ccRange: [
    {
      minValue: 0,
      maxValue: 125,
      co2: 85.0,
    },
    {
      minValue: 126,
      maxValue: 200,
      co2: 77.8,
    },
    {
      minValue: 201,
      maxValue: 300,
      co2: 93.1,
    },
    {
      minValue: 301,
      maxValue: 400,
      co2: 112.5,
    },
    {
      minValue: 401,
      maxValue: 500,
      co2: 122.0,
    },
    {
      minValue: 501,
      maxValue: 600,
      co2: 139.2,
    },
    {
      minValue: 601,
      maxValue: 700,
      co2: 125.9,
    },
    {
      minValue: 701,
      maxValue: 800,
      co2: 133.4,
    },
    {
      minValue: 801,
      maxValue: 900,
      co2: 127.1,
    },
    {
      minValue: 901,
      maxValue: 1000,
      co2: 154.1,
    },
    {
      minValue: 1001,
      maxValue: 1100,
      co2: 135.6,
    },
    {
      minValue: 1101,
      maxValue: 1200,
      co2: 136.9,
    },
    {
      minValue: 1201,
      maxValue: 1300,
      co2: 136.6,
    },
    {
      minValue: 1301,
      maxValue: 1400,
      co2: 128.7,
    },
    {
      minValue: 1401,
      maxValue: 1500,
      co2: 132.2,
    },
    {
      minValue: 1501,
      maxValue: 1600,
      co2: 170.7,
    },
    {
      minValue: 1601,
      maxValue: 1700,
      co2: 145.7,
    },
    {
      minValue: 1701,
      maxValue: 1800,
      co2: 161.0,
    },
    {
      minValue: 1801,
      maxValue: 1900,
      co2: '',
    },
    {
      minValue: 1901,
      maxValue: 2000,
      co2: '',
    },
    {
      minValue: 2000,
      maxValue: 2100,
      co2: 140.9,
    },
  ],
};
// const findMyCar = () => {
//   if (findcar == "") {
//       setExistingRegNumber("Kindly Enter the Number")
//   }
//   if (findcar != "") {
//       const headers = {
//           "Content-Type": "application/json",
//       };
//       fetch(
//           "/api/auto-registration",
//           {
//               method: "POST",
//               headers: headers,
//               body: JSON.stringify(findcar),
//           }
//       ).then(response => {
//           if (response.status == 200) {
//               response.json().then(resData => {
//                   setSaveValue(resData);
//                   handleModel2();
//               });
//           }
//           else {
//               setExistingRegNumber("We are Adding Soon...");
//           }
//       }).catch(err => { setExistingRegNumber("We are Adding Soon..."); console.log(err) });
//   }
// }

// const findMyCarUs = () => {
//   if (findcar == "") {
//       setExistingVin("Kindly Enter the Number")
//   }
//   if (findcar != "") {
//       const headers = {
//           "Content-Type": "application/json",
//       };
//       fetch(
//           "/api/auto-registrationus",
//           {
//               method: "POST",
//               headers: headers,
//               body: JSON.stringify(findcar),
//           }
//       ).then(response => {
//           if (response.status == 200) {
//               response.json().then(resData => {
//                   if (resData.error) {
//                       setExistingVin("Invalid");
//                   }
//                   if (resData?.decode?.length > 0) {
//                       let data: VehicleProps = {
//                           registrationNumber: resData.decode?.find((x: { label: string; }) => x.label == "VIN")?.value ?? '-',
//                           cO2Emission: (resData.decode?.find((x: { label: string; }) => x.label == "Engine (full)")?.value ?
//                               engineTypeGasoline(resData.decode?.find((x: { label: string; }) => x.label == "Fuel Type - Primary")?.value,
//                                   resData.decode?.find((x: { label: string; }) => x.label == "Engine (full)")?.value) :
//                               resData.decode?.find((x: { label: string; }) => x.label == "CO2 Emission (g/km)")?.value ||
//                               resData.decode?.find((x: { label: string; }) => x.label == "Average CO2 Emission (g/km)")?.value ||
//                               (resData.decode?.find((x: { label: string; }) => x.label == "Engine Displacement (ccm)")?.value)
//                               && EngineCC(resData.decode?.find((x: { label: string; }) => x.label == "Fuel Type - Primary")?.value, resData.decode?.find((x: { label: string; }) => x.label == "Engine Displacement (ccm)")?.value)) ?? 100,
//                           brandName: resData.decode?.find((x: { label: string; }) => x.label == "Make")?.value ?? '-',
//                           brandVariant: resData.decode?.find((x: { label: string; }) => x.label == "Series")?.value ?? '-',
//                           fuelTypeName: resData.decode?.find((x: { label: string; }) => x.label == "Fuel Type - Primary")?.value ?? '-',
//                           brandSeriesName: resData.decode?.find((x: { label: string; }) => x.label == "Model")?.value ?? '-',
//                           ccType: resData.decode?.find((x: { label: string; }) => x.label == "Engine Displacement (ccm)")?.value ?? 0,
//                       }
//                   }
//               });
//           }
//           else {
//               setExistingVin("Invalid")
//           }
//       }).catch(err => { setExistingVin("Invalid"); console.log(err) });
//   }
// }

// const findMyBikeUs = () => {
//   if (findcar == "") {
//       setExistingVin("Kindly Enter the Number")
//   }
//   if (findcar != "") {
//       const headers = {
//           "Content-Type": "application/json",
//       };
//       fetch(
//           "/api/auto-registrationus",
//           {
//               method: "POST",
//               headers: headers,
//               body: JSON.stringify(findcar),
//           }
//       ).then(response => {
//           if (response.status == 200) {
//               response.json().then(resData => {
//                   if (resData.error) {
//                       setExistingVin("Invalid")
//                   }
//                   if (resData?.decode?.length > 0) {
//                       let data: VehicleProps = {
//                           registrationNumber: resData.decode?.find((x: { label: string; }) => x.label == "VIN")?.value ?? '-',
//                           cO2Emission: (resData.decode?.find((x: { label: string; }) => x.label == "Engine Displacement (ccm)")?.value && findBike(resData.decode?.find((x: { label: string; }) => x.label == "Fuel Type - Primary")?.value, resData.decode?.find((x: { label: string; }) => x.label == "Engine Displacement (ccm)")?.value)) ?? 100,
//                           brandName: (resData.decode?.find((x: { label: string; }) => x.label == "Make")?.value) ?? '-',
//                           brandVariant: resData.decode?.find((x: { label: string; }) => x.label == "Series")?.value ?? '-',
//                           fuelTypeName: resData.decode?.find((x: { label: string; }) => x.label == "Fuel Type - Primary")?.value ?? '-',
//                           brandSeriesName: resData.decode?.find((x: { label: string; }) => x.label == "Model")?.value ?? '-',
//                           ccType: resData.decode?.find((x: { label: string; }) => x.label == "Engine Displacement (ccm)")?.value ?? 0,
//                       }
//                       setSaveValueUs(data);
//                       handleModel2();
//                   }
//               });
//           }
//           else {
//               setExistingVin("Invalid")
//           }
//       }).catch(err => { setExistingVin("Invalid"); console.log(err) });
//   }
// }

const engineTypeGasoline = (type: string, co2: string) => {
  let co2Level = Number(co2.slice(0, 4));

  if (type === 'Gasoline') {
    if (co2Level < HelperConstant.gasolineEngine.sizeSmall) {
      return HelperConstant.gasolineEngineLevel.small;
    }
    if (
      co2Level > HelperConstant.gasolineEngine.sizeSmall &&
      co2Level < HelperConstant.gasolineEngine.sizeMedium
    ) {
      return HelperConstant.gasolineEngineLevel.medium;
    }
    if (co2Level > HelperConstant.gasolineEngine.sizeMedium) {
      return HelperConstant.gasolineEngineLevel.large;
    }
  } else {
    if (co2Level < HelperConstant.dieselEngine.sizeSmall) {
      return HelperConstant.dieselEngineLevel.small;
    }
    if (
      co2Level > HelperConstant.dieselEngine.sizeSmall &&
      co2Level < HelperConstant.dieselEngine.sizeMedium
    ) {
      return HelperConstant.dieselEngineLevel.medium;
    }
    if (co2Level > HelperConstant.dieselEngine.sizeMedium) {
      return HelperConstant.dieselEngineLevel.large;
    }
  }
};

const EngineCC = (type: string, engineccm: number) => {
  let engineccCalc = (engineccm / 1000).toString();
  let engineCc = Number(engineccCalc.slice(0, 3));
  if (type === 'Gasoline') {
    if (engineCc < HelperConstant.gasolineEngine.sizeSmall) {
      return HelperConstant.gasolineEngineLevel.small;
    }
    if (
      engineCc > HelperConstant.gasolineEngine.sizeSmall &&
      engineCc < HelperConstant.gasolineEngine.sizeMedium
    ) {
      return HelperConstant.gasolineEngineLevel.medium;
    }
    if (engineCc > HelperConstant.gasolineEngine.sizeMedium) {
      return HelperConstant.gasolineEngineLevel.large;
    }
  }
};

// const findBike = (type: string, cc: number) => {
//   let bikeCo2ByCc;
//   HelperConstant.ccRange.forEach((value, i) => {
//       if (type === "Gasoline") {
//           if (cc >= value.minValue && cc <= value.maxValue) {
//               bikeCo2ByCc = value.co2;
//           }
//           if (cc > value.maxValue) {
//               bikeCo2ByCc = 140.9;
//           }
//       }
//   })
//   return bikeCo2ByCc;
// }

export default function Registration({ }: props) {
  const [regNumber, setRegNumber] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRegisterd, setIsRegistred] = useState<boolean>(false);
  const [isCarFind, setIsCarFind] = useState<boolean>(false);
  const [registerdData, setRegisteredData] = useState<any>();
  const [isMileageScreen, setIsMieageScreen] = useState<boolean>(false);
  const [countryMaster, setCountryMaster] = useState([]);
  const [roudIndex, setRoundIndex] = useState<number>(-1);
  const [customRate, setCustomRate] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [onlaterPressed, setOnLaterPressed] = useState<any>(false);
  const data = mileageRateData?.find(item => item?.countryCode == country);

  const navigation = useNavigation();
  const onGoBackPress = () => {
    navigation.goBack();
  };
  const isUk = country == 'UK';
  const onFindMyCarPress = () => {
    setOnLaterPressed(false);
    setIsLoading(true);
    if (regNumber.length == 0) {
      setIsLoading(false);
      Alert.alert('Missing Information', 'Please Provide Registration Number');
      return;
    }
    if (country == 'UK') {
      CommonServices.postAutoRegistration(regNumber)
        .then(res => {
          if (res.status == 200) {
            setRegisteredData(res.data);
            setIsCarFind(true);
          }
        })
        .catch(e => {
          const code = '500';
          if (e?.includes(code) ?? e?.message?.includes(code)) {
            Alert.alert('Error', 'Internal Server Error');
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      CommonServices.postAutoRegistrationExceptUK(regNumber)
        .then(res => {
          if (res.data?.error == true) {
            setErrorMessage(res.data?.message);
            return;
          } else {
            setErrorMessage('');
          }
          if (res.status == 200) {
            const resData = res.data;

            const data = {
              registrationNumber:
                resData.decode?.find((x: { label: string }) => x.label == 'VIN')
                  ?.value ?? '-',
              cO2Emission:
                (resData.decode?.find(
                  (x: { label: string }) => x.label == 'Engine (full)',
                )?.value
                  ? engineTypeGasoline(
                    resData.decode?.find(
                      (x: { label: string }) =>
                        x.label == 'Fuel Type - Primary',
                    )?.value,
                    resData.decode?.find(
                      (x: { label: string }) => x.label == 'Engine (full)',
                    )?.value,
                  )
                  : resData.decode?.find(
                    (x: { label: string }) => x.label == 'CO2 Emission (g/km)',
                  )?.value ||
                  resData.decode?.find(
                    (x: { label: string }) =>
                      x.label == 'Average CO2 Emission (g/km)',
                  )?.value ||
                  (resData.decode?.find(
                    (x: { label: string }) =>
                      x.label == 'Engine Displacement (ccm)',
                  )?.value &&
                    EngineCC(
                      resData.decode?.find(
                        (x: { label: string }) =>
                          x.label == 'Fuel Type - Primary',
                      )?.value,
                      resData.decode?.find(
                        (x: { label: string }) =>
                          x.label == 'Engine Displacement (ccm)',
                      )?.value,
                    ))) ?? 100,
              brandName:
                resData.decode?.find((x: { label: string }) => x.label == 'Make')
                  ?.value ?? '-',
              brandVariant:
                resData.decode?.find(
                  (x: { label: string }) => x.label == 'Series',
                )?.value ?? '-',
              fuelTypeName:
                resData.decode?.find(
                  (x: { label: string }) => x.label == 'Fuel Type - Primary',
                )?.value ?? '-',
              brandSeriesName:
                resData.decode?.find((x: { label: string }) => x.label == 'Model')
                  ?.value ?? '-',
              ccType:
                resData.decode?.find(
                  (x: { label: string }) =>
                    x.label == 'Engine Displacement (ccm)',
                )?.value ?? 0,
            };
            setRegisteredData(data);
            setIsCarFind(true);
          }
        })
        .catch(e => {
          const code = '500';
          if (e?.includes(code) ?? e?.message?.includes(code)) {
            Alert.alert('Error', 'Internal Server Error');
          } else {
            alert(e?.message ?? e);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const onNoPress = () => {
    setIsRegistred(false);
    setRegNumber('');
    setIsCarFind(false);
  };

  const onYesPress = () => {
    setIsCarFind(false);
    setIsRegistred(true);
    setIsMieageScreen(true);
  };

  const onLaterPress = () => {
    setOnLaterPressed(true);
    setIsRegistred(true);
    setIsMieageScreen(true);
  }


  const onLaterLeftArrowPressedinMileageRate = () => {
    setIsRegistred(false);
    setRegNumber('');
    setIsCarFind(false);
  }

  const onLaterLeftArrowPressedinpersonal = () => {
    setIsCarFind(false);
    setIsRegistred(true);
    setIsMieageScreen(true);
  }

  const onLeftARraowPress = () => {

    if (country != 'IN') {
      setIsCarFind(true);
      setIsRegistred(false);
      setIsMieageScreen(false);
    } else {
      navigation.goBack();
    }
  };

  const onSubmitRatePress = () => {
    if (roudIndex == -1) return;
    setIsCarFind(false);
    setIsRegistred(true);
    setIsMieageScreen(false);
  };

  const getCountryMaster = () => {
    CommonServices.get('Master', 'GetAllCountry')
      .then(res => {
        if (res.status == 200) {
          setCountryMaster(res.data);
        }
      })
      .catch(e => console.log(e));
  };

  useEffect(() => {
    setCountryMaster(countryData);
    getCountryMaster();
  }, []);

  const getValueByLabel = (decodeArray: any, label: string) => {
    const item = decodeArray?.find(element => element.label === label);
    return item ? item.value : '';
  };

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: '#fff' }}
      keyboardDismissMode="interactive"
      enableOnAndroid
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      {/* <SafeAreaView style={{backgroundColor: '#fff'}} /> */}
      {country?.length == 0 && (
        <><TouchableOpacity
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          onPress={onGoBackPress}
          style={{ marginTop: 30 }}
        >
          <Image
            source={require('../../assests/arrow_back.png')}
            style={{ height: 20, width: 20, tintColor: '#000' }} />
        </TouchableOpacity><Country
            data={countryMaster}
            setCountry={setCountry}
            arrowNotRequired={true}
            setIsCarFind={setIsCarFind}
            setIsRegistred={setIsRegistred}
            setIsMieageScreen={setIsMieageScreen} /></>
      )}
      {country?.length != 0 && !isRegisterd && !isCarFind && (
        <View>
          <TouchableOpacity
            activeOpacity={1}
            onPress={onGoBackPress}
            style={styles.arrowContainer}>
            <Image
              source={require('../../assests/arrow_back.png')}
              style={{ height: 20, width: 20, tintColor: '#000' }}
            />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>
              {country == 'UK'
                ? "What's your registration number?"
                : "What's your vin number?"}
            </Text>
            <Text style={styles.headerSubText}>
              We'll look it up for you including Co2 emission.
            </Text>
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              placeholder={isUk ? 'Registration Number' : 'Vin Number'}
              placeholderTextColor="#aaa"
              style={styles.textInput}
              value={regNumber}
              defaultValue={regNumber}
              onChangeText={text => {
                setRegNumber(text.toUpperCase());
              }}
            />
          </View>
          <Text style={{ color: 'red' }}>{errorMessage}</Text>
          {/* <TouchableOpacity
            activeOpacity={1}
            style={styles.buttonContainer}
            onPress={onFindMyCarPress}>
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <View style={styles.buttonContainer}>
                <View>
                  <Image
                    source={require('../../assests/search.png')}
                    style={styles.searchIcon}
                  />
                </View>
                <Text style={styles.buttonText}>Find My Car</Text>
              </View>
            )}
          </TouchableOpacity> */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
            {/* Left button: Later */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onLaterPress}
              style={{
                flex: 1,
                // backgroundColor: 'gray',s
                paddingVertical: 12,
                borderRadius: 10,
                // marginLeft: 10,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                width: 50,
                borderWidth: 1,
                borderColor: '#000',
                // alignItems: 'center',
                // justifyContent: 'center',
                marginRight: 5,
                // borderRadius: 5,
              }}>
              <Text style={{ color: '#000', fontWeight: '600' }}>Add Vehicle Later</Text>
            </TouchableOpacity>
            {/* Right button: Find My Car */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onFindMyCarPress}
              style={{
                flex: 1,
                backgroundColor: '#000',
                paddingVertical: 12,
                borderRadius: 10,
                // marginLeft: 10,
                alignItems: 'center',
                // width: 50,
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <Image
                    source={require('../../assests/search.png')}
                    style={{ height: 18, width: 18, marginRight: 8, tintColor: '#fff' }}
                  />
                  <Text style={{ color: '#fff', fontWeight: '600' }}>Find My Car</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

        </View>
      )}
      {country?.length != 0 && !isRegisterd && isCarFind && (
        <View style={styles.secondContainer}>
          <Text style={styles.headerText}>Here's what we found for you</Text>

          <View style={styles.textButtonContainer}>
            <Text style={styles.textButton}>
              {registerdData?.registrationNumber ?? ''}
            </Text>
          </View>
          <Text style={styles.bikeTitle}>
            {country == 'UK'
              ? registerdData?.make ?? ''
              : registerdData?.brandName ?? ''}
            ,
          </Text>
          <Text style={styles.subText}>
            {country == 'UK'
              ? (registerdData?.yearOfManufacture ?? '') +
              ', ' +
              ((registerdData?.colour ?? '') + ', ') +
              ((registerdData?.fuelType ?? '') + ', ')
              : (registerdData?.brandSeriesName ?? '') +
              ', ' +
              (registerdData?.brandVariant ?? '') +
              ', ' +
              (registerdData?.fuelTypeName ?? '')}
          </Text>
          <Text style={styles.subText}>
            CO2:{' '}
            {country == 'UK'
              ? registerdData?.co2Emissions ?? ''
              : registerdData?.cO2Emission ?? ''}{' '}
            g/km
          </Text>
          <View style={styles.borderStyle2} />
          <Text style={styles.headerSubText}>Are these details correct?</Text>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.confirmationButtonContainer}
              onPress={onYesPress}>
              <Text style={styles.confirmationButtonText}>YES</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.confirmationButtonContainer}
              onPress={onNoPress}>
              <Text style={styles.confirmationButtonText}>NO</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {country?.length != 0 && isMileageScreen && isRegisterd && (
        <View
          style={{
            backgroundColor: '#fff',
            flex: 1,
          }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={onlaterPressed ? onLaterLeftArrowPressedinMileageRate : onLeftARraowPress}
            style={{ marginTop: 30 }}
          >
            <Image
              source={require('../../assests/arrow_back.png')}
              style={{ height: 20, width: 20, tintColor: '#000' }}
            />
          </TouchableOpacity>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>

            <Text
              style={{
                color: '#000',
                fontWeight: '500',
                fontSize: 18,
                flex: 1,
                textAlign: 'center',
              }}>
              Mileage Rate
            </Text>
          </View>
          <MileageRate
            isUk={isUk}
            onCancelPress={onLaterLeftArrowPressedinMileageRate}
            onSubmitRatePress={onSubmitRatePress}
            data={data}
            roudIndex={roudIndex}
            setRoundIndex={setRoundIndex}
            customRate={customRate}
            setCustomRate={setCustomRate}
            setIsCarFind={setIsCarFind}
            setIsRegistred={setIsRegistred}
            setIsMieageScreen={setIsMieageScreen}
          />
        </View>
      )}

      {country?.length != 0 && !isMileageScreen && isRegisterd && (
        <View style={styles.thirdContainer}>
          {country == 'IN' ? null : (
            <><TouchableOpacity
              hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
              onPress={onlaterPressed ? onLaterLeftArrowPressedinpersonal : onLeftARraowPress}
              style={{ marginTop: 30 }}
            >
              <Image
                source={require('../../assests/arrow_back.png')}
                style={{ height: 20, width: 20, tintColor: '#000' }} />
            </TouchableOpacity>
              {(!onlaterPressed) ?
                <View>
                  <Text style={styles.headerTextThird}>Set up Account</Text>
                  <View style={styles.detailContainer}>
                    <Text style={[styles.blueBoldText]}>
                      Vehicle Details
                    </Text>
                    <View style={styles.textContainer}>
                      <Text style={[styles.vehicleSubText]}>Make:</Text>
                      <Text style={[styles.vehicleValueText, { fontWeight: '700' }]}>
                        {registerdData?.make ?? registerdData?.brandName ?? '- -'}
                      </Text>
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={[styles.vehicleSubText]}>
                        {isUk ? 'Year' : 'Model'}:
                      </Text>
                      <Text style={[styles.vehicleValueText]}>
                        {registerdData?.yearOfManufacture ??
                          registerdData?.brandSeriesName ??
                          '- -'}
                      </Text>
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={[styles.vehicleSubText]}>
                        {isUk ? 'Color' : 'Series'}:
                      </Text>
                      <Text style={[styles.vehicleValueText]}>
                        {registerdData?.colour ??
                          registerdData?.brandVariant ??
                          '- -'}
                      </Text>
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={[styles.vehicleSubText]}>Fuel:</Text>
                      <Text style={[styles.vehicleValueText]}>
                        {registerdData?.fuelType ??
                          registerdData?.fuelTypeName ??
                          '- -'}
                      </Text>
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={[styles.vehicleSubText]}>CO2:</Text>
                      <Text style={[styles.vehicleValueText, { fontWeight: '700' }]}>
                        {registerdData?.co2Emissions ?? registerdData?.cO2Emission
                          ? (registerdData?.co2Emissions ??
                            registerdData?.cO2Emission) + ' g/km'
                          : '- -'}
                      </Text>
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={[styles.vehicleSubText]}>Engine CC:</Text>
                      <Text style={[styles.vehicleValueText, { fontWeight: '700' }]}>
                        {registerdData?.engineCapacity ??
                          registerdData?.ccType ??
                          '- -'}
                      </Text>
                    </View>
                  </View>
                </View> : ''}
            </>
          )}
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              flexGrow: 1,
              paddingHorizontal: 0,
              paddingTop: 20,
              backgroundColor: '#fff',
            }}
          >
            <Text style={styles.personalDetail}>Personal Details</Text>
            <RegistrationForm
              onlaterpressed={onlaterPressed}
              registerdData={registerdData}
              country={country}
              data={data}
              roudIndex={roudIndex}
              setRoundIndex={setRoundIndex}
              customRate={customRate}
              setCustomRate={setCustomRate}
              setIsCarFind={setIsCarFind}
              setIsRegistred={setIsRegistred}
              setIsMieageScreen={setIsMieageScreen}
            />
          </ScrollView>
        </View>
      )}
    </KeyboardAwareScrollView>
  );
}

export const styles = StyleSheet.create({
  container: {
    paddingTop: 20 + (Platform.OS == 'ios' ? getStatusBarHeight() : 0),
    paddingBottom: 50,
    backgroundColor: '#fff',
    flexGrow: 1,
    paddingHorizontal: 30,
  },
  headerText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  headerSubText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.2,
    marginVertical: 20,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#c4c4c4',
    height: 40,
    paddingHorizontal: 15,
    color: '#000',
  },
  textInputContainer: {},
  headerTextContainer: { marginHorizontal: 10 },
  buttonContainer: {
    backgroundColor: '#000',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
    borderRadius: 4,
    flexDirection: 'row',
  },
  searchIcon: {
    height: 16,
    width: 16,
    tintColor: '#fff',
  },
  arrowContainer: {
    marginVertical: 20,
    marginLeft: -5,
    marginBottom: 50,
  },
  leftArrow: {
    height: 24,
    width: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '700',
  },
  borderStyle: {
    height: 1,
    backgroundColor: '#d4d4d4',
    marginVertical: 10,
  },
  textButtonContainer: {
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    marginTop: 25,
    marginBottom: 15,
    minWidth: 110,
  },
  secondContainer: {
    marginTop: 50,
  },
  textButton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    padding: 10,
  },
  bikeTitle: {
    color: '#000',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 5,
  },
  subText: {
    color: '#000',
    fontSize: 15,
  },
  confirmationButtonContainer: {
    width: 60,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    borderRadius: 5,
  },
  confirmationButtonText: {
    padding: 8,
    color: '#000',
  },
  borderStyle2: {
    height: 1,
    backgroundColor: '#d4d4d4',
    marginTop: 20,
  },
  thirdContainer: {},
  headerTextThird: {
    color: '#000',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.2,
    textAlign: 'center',
    marginVertical: 10,
  },
  blueBoldText: {
    color: '#000',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 25,
  },
  blueRegularText: {
    color: '#0D6CB1',
    fontSize: 14,
    letterSpacing: 0.2,
  },
  detailContainer: {
    borderWidth: 0.5,
    borderColor: '#000',
    borderRadius: 10,
    backgroundColor: '#f1f1f1',
    padding: 10,
  },
  textContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    marginBottom: 15,
  },
  vehicleSubText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 0.2,
    flex: 1,
    textAlign: 'center',
  },
  vehicleValueText: {
    color: '#4b1cf4',
    fontSize: 14,
    letterSpacing: 0.2,
    flex: 1,
    fontWeight: '700',
    textAlign: 'center',
  },
  personalDetail: {
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.2,
    marginTop: 30,
    marginBottom: 10,
  },
});
