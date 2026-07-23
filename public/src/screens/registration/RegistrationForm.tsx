/* eslint-disable quotes */
/* eslint-disable eqeqeq */
/* eslint-disable prettier/prettier */
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { memo, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  Image,
  Linking,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import CustomDatePicker from '../../components/CustomDatePicker';
import CustomDropDown from '../../components/CustomDropDown';
import CustomTextInput from '../../components/CustomTextInput';
import { emailValidator } from '../../helpers/emailValidator';
import { IVehicleRegistrationModel } from '../../models/Models';
import CommonServices from '../../Services/CommonServices';

type props = {
  onlaterpressed?: any;
  registerdData?: IVehicleRegistrationModel;
  country?: string;
  setRoundIndex: (a: number) => void | undefined;
  roudIndex: number;
  data?: any;
  setCustomRate: (a: string) => void | undefined;
  customRate?: string | undefined;
  setIsCarFind: (a: boolean) => void;
  setIsRegistred: (a: boolean) => void;
  setIsMieageScreen: (a: boolean) => void;
};
const RegistrationForm = ({
  onlaterpressed,
  registerdData,
  country,
  roudIndex,
  customRate,
  setIsCarFind,
  setIsRegistred,
  setIsMieageScreen,
}: props) => {
  const [firstName, setfirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [ownerFirstName, setOwnerFirstName] = useState<string>('');
  const [ownerLastName, setOwnerLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [conditionAgreed, setConditionAgreed] = useState<boolean>(false);
  const [isSubmited, setIsSubmited] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [postalCode, setPostalCode] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [firstForm, setFirstForm] = useState<boolean>(true);
  const [vehicalFuelType, setVehicalFuelType] = useState<any>();
  const [vehicleType, setVehicleType] = useState<any>();
  const [brandType, setBrandType] = useState<any>();
  const [registrationNo, setRegistrationNo] = useState<string>('');
  const [regiDate, setRegiDate] = useState<string>('');
  const [make, setMake] = useState<string>('');
  const [modal, setModal] = useState<string>('');
  const [fuelTypes, setFuelTypes] = useState<string>('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [carId, setCarId] = useState<number>(0);
  const [carModalId, setCarMoadalId] = useState<number>(0);
  const [fuelTypeId, setFuelTypeId] = useState<number>(0);

  useEffect(() => {
    setModal('');
    CommonServices.getWithSingleParam(
      'Master',
      'GetBrandSeriesByBrandId',
      carId,
      country ?? 'UK',
    )
      .then(res => {
        if (res?.data) {
          setBrandType(res.data);
        }
      })
      .catch(e => {
        console.log('Error', e);
      });
  }, [carId]);
  useEffect(() => {
    CommonServices.get('Master', 'GetAllFuelType', country)
      .then(res => {
        if (res?.data) {
          setVehicalFuelType(res?.data);
        }
      })
      .catch(e => {
        console.log('Error', e);
      });
    CommonServices.getWithSingleParam(
      'Master',
      'GetBrandByVehicleTypeId',
      1,
      country ?? 'UK',
    )
      .then(res => {
        if (res?.data) {
          setVehicleType(res?.data);
        }
      })
      .catch(e => {
        console.log('Error', e);
      });
  }, []);

  const firstNameRef = useRef<TextInput>(null);
  const lastNameRef = useRef<TextInput>(null);
  const ownerFirstNameRef = useRef<TextInput>(null);
  const ownerLastNameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const mobileNumberRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const postalCodeRef = useRef<TextInput>(null);
  const addressRef = useRef<TextInput>(null);
  const registrationNoRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const onHardwareBackPress = () => {
      if (country == 'IN') {
        return false;
      } else {
        setIsCarFind(false);
        setIsRegistred(true);
        setIsMieageScreen(true);
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onHardwareBackPress,
    );

    return () => {
      backHandler.remove(); // Cleanup the event listener on component unmount
    };
  }, []);
  const onRegisterPress = async () => {
    console.log("reggistreddata", registerdData);
    const mileageRateData = [
      {
        rateId: 1,
        rateName: 'Standard',
        description:
          'The Standard rates are pre-populated based on the latest tax guidelines.',
        textToShow: 'standard',
        rateValue:
          country == 'Australia'
            ? 0.88
            : country == 'Canada'
              ? 0.7
              : country == 'USA'
                ? 0.70
                : country == 'UK'
                  ? 0.45
                  : 0,
      },
      {
        rateId: 2,
        rateName: 'Custom',
        description: 'You can enter your own custom rate in this below field.',
        textToShow: 'custom',
      },
      {
        rateId: 3,
        rateName: 'No',
        description:
          'No reimbursement rate set. Mileage tracking will be recorded without any reimbursement calculations for the tax year.',
      },
    ];
    const data1 = mileageRateData[roudIndex];
    const rateId = data1?.rateId;

    let rateValues = 0;
    if (rateId == 1) {
      const rate = data1?.rateValue ?? 0;
      rateValues = Number(rate);
    } else if (rateId == 2) {
      rateValues = Number(customRate);
    } else {
      rateValues = 0;
    }
    const rateName = data1?.rateName;
    setIsLoading(true);
    setIsSubmited(true);
    console.log('rate Name', rateName);
    console.log('rate value', rateValues);
    console.log('rate Id', rateId);
    const emailError = emailValidator(email);
    if (email.length > 0 && emailError) {
      setIsLoading(false);
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    // if (mobileNumber?.length < 10) {
    //   setIsLoading(false);
    //   Alert.alert(
    //     'Invalid Mobile Number',
    //     'Please enter a valid 10-digit mobile number.',
    //   );
    //   return;
    // }
    if (
      country == 'IN' &&
      (make.length === 0 || fuelTypes.length === 0 || modal.length === 0)
    ) {
      setIsLoading(false);
      Alert.alert(
        'Missing Information',
        'Please fill in all the required fields to register.',
      );
      return;
    }
    if (
      firstName.length === 0 ||
      lastName.length === 0 ||
      email.length === 0 ||
      password.length === 0
      //  ||
      // mobileNumber.length === 0
    ) {
      setIsLoading(false);
      Alert.alert(
        'Missing Information',
        'Please fill in all the required fields to register.',
      );
      return;
    }
    if (!conditionAgreed) {
      setIsLoading(false);
      Alert.alert(
        'Agreement Required',
        'Please agree to the terms and conditions and privacy policy.',
      );
      return;
    }

    const brandseriesname = (country == 'UK') ? (registerdData?.make + " " + registerdData?.colour) : registerdData?.brandSeriesName;
    const brandvariant = (country == 'UK' ? registerdData?.make + "-" + registerdData?.colour : registerdData?.brandVariant);

    const data = {
      registrationNumber:
        country == 'IN'
          ? registrationNo
          : registerdData?.registrationNumber ?? '',
      taxStatus: registerdData?.taxStatus ?? '',
      motStatus: registerdData?.motStatus ?? '',
      make:
        country == 'IN'
          ? make
          : registerdData?.make ?? registerdData?.brandName ?? '',
      yearOfManufacture: registerdData?.yearOfManufacture ?? '',
      engineCapacity:
        registerdData?.engineCapacity ?? registerdData?.ccType ?? '',
      co2Emissions:
        registerdData?.co2Emissions ?? registerdData?.cO2Emission ?? 0,
      fuelType:
        country == 'IN'
          ? fuelTypes
          : registerdData?.fuelType ?? registerdData?.fuelTypeName ?? '',
      markedForExport: registerdData?.markedForExport ?? '',
      colour: registerdData?.colour ?? '',
      typeApproval: registerdData?.typeApproval ?? '',
      dateOfLastV5CIssued: registerdData?.dateOfLastV5CIssued ?? '',
      motExpiryDate: registerdData?.motExpiryDate ?? '',
      wheelplan: registerdData?.wheelplan ?? '',
      monthOfFirstRegistration: registerdData?.monthOfFirstRegistration ?? '',
      vehicle: {
        id: 0,
        rateName: rateName ?? '',
        rateId: rateId,
        rateValue: rateValues ?? 0,
        created: new Date().toISOString(),
        createdBy: 0,
        modified: new Date().toISOString(),
        modifiedBy: 0,
        active: true,
        loginId: 0,
        firstName: firstName,
        lastName: lastName,
        registrationNumber:
          country == 'IN'
            ? registrationNo
            : registerdData?.registrationNumber ?? '',
        registrationDate:
          country == 'IN' && regiDate?.length != 0 ? regiDate : null,
        // vehicleTypeId: country == 'IN' ? carId : 1,
        // because of these carId these is not working for india
        vehicleTypeId: 1,
        brandVariantId: 1303,
        fuelTypeId: country == 'IN' ? fuelTypeId : 1,
        cO2Emission:
          registerdData?.co2Emissions ?? registerdData?.cO2Emission ?? 0,
        isNewVehicle: true,
        startingReading: 0,
        vehicleType: null,
        brandName:
          country == 'IN'
            ? make
            : registerdData?.make ?? registerdData?.brandName ?? '',
        brandVariant:
          country == 'IN' ? modal : brandvariant ?? '',
        // fuelType: country == 'IN' ? fuelTypes : '',
        emissionType: '',
        fuelTypeName:
          country == 'IN'
            ? fuelTypes
            : registerdData?.fuelType ?? registerdData?.fuelTypeName ?? '',
        brandId: country == 'IN' ? carId : 1,
        brandSeriesId: country == 'IN' ? carModalId : 1,
        brandSeriesName:
          country == 'IN' ? modal : brandseriesname ?? '',
        ccType: 0,
      },
      firstName: firstName,
      lastName: lastName,
      email: email?.trim().toLowerCase(),
      address: address ?? '',
      postalCode: postalCode ?? '',
      isAddLater: onlaterpressed,
      // countryId: 1,
      loginDetail: {
        id: 0,
        created: new Date().toISOString(),
        createdBy: 0,
        modified: new Date().toISOString(),
        modifiedBy: 0,
        active: true,
        userName: email?.trim().toLowerCase(),
        passWord: password,
        salt: 'string',
        ivKey: 'string',
        userRoleId: 0,
      },
      plan: {
        id: 0,
        created: new Date().toISOString(),
        createdBy: 0,
        modified: new Date().toISOString(),
        modifiedBy: 0,
        active: true,
        userVehicleId: 1,
        planId: 7,
        statusId: 1,
        purchaseDate: new Date().toISOString(),
        treeLimit: 0,
        planAmount: 0,
        maximumEmission: 0,
        currentEmission: 0,
        statusName: '',
        planName: '',
        planDescription: '',
        isNewVehicle: true,
      },
      userLogin: {
        id: 0,
        created: new Date().toISOString(),
        createdBy: 0,
        modified: new Date().toISOString(),
        modifiedBy: 0,
        active: true,
        userName: email.trim().toLowerCase(),
        salt: 'string',
        ivKey: 'string',
        userRoleId: 0,
      },
    };
    if (mobileNumber != '' && mobileNumber != null) {
      data['mobileNumber'] = mobileNumber;
    }
    try {
      console.log(email);

      const userNameRes = await CommonServices.getWithSingleParam(
        'Registration',
        'RegisteredUserName',
        email?.trim().toLowerCase(),
        country ?? 'UK',
      );
      console.log('userNameRes', userNameRes?.data);

      let phoneNumRes: any = '';
      if (mobileNumber != '') {
        console.log(mobileNumber);

        phoneNumRes = await CommonServices.getWithSingleParam(
          'Registration',
          'RegisteredMobileNo',
          mobileNumber,
          country ?? 'UK',
        );
        console.log('phoneNumRes', phoneNumRes?.data);
      }

      if (
        userNameRes?.data?.length == 0 &&
        (phoneNumRes?.data?.length == 0 || phoneNumRes?.length == 0)
      ) {
        console.log(JSON.stringify(data));
        navigation.navigate('Subscription', {
          data: data,
          country: country,
        });
      } else {
        Alert.alert(
          'Error',
          mobileNumber?.length == 0
            ? 'Email Already Exist'
            : email?.trim().toLowerCase()?.length == 0
              ? 'Phone Number Already Exist'
              : 'Email or Phone Number Already Exist',
        );
      }
      setIsLoading(false);
    } catch (error) {
      Alert.alert('Error', 'Phone Number or Email Already Exist');
      setIsLoading(false);
    }

    setIsLoading(false);
  };
  const onEyeBallPress = () => {
    setShowPassword(!showPassword);
  };

  const onCheckBoxPress = () => {
    setConditionAgreed(!conditionAgreed);
  };

  const focusLastName = () => {
    lastNameRef.current?.focus();
  };

  const focusOwnerFirstName = () => {
    ownerFirstNameRef.current?.focus();
  };

  const focusOwnerLastName = () => {
    ownerLastNameRef.current?.focus();
  };

  const focusEmail = () => {
    emailRef.current?.focus();
  };

  const focusMobileNumber = () => {
    mobileNumberRef.current?.focus();
  };

  const focusPassword = () => {
    passwordRef.current?.focus();
  };
  const onPasswordSubmit = () => { };
  const onAddressSubmit = () => { };

  const onTermsConditionPress = async () => {
    try {
      const url = 'https://fuelsense.org/help?terms';
      if (await InAppBrowser.isAvailable()) {
        InAppBrowser.openAuth(url, 'fuelsense://fuelsense', {
          // iOS Properties
          ephemeralWebSession: false,
          // Android Properties
          showTitle: false,
          enableUrlBarHiding: true,
          enableDefaultShare: false,
        }).then(response => {
          if (response.type === 'success' && response.url) {
            Linking.openURL(response.url);
          }
        });
      } else Linking.openURL(url);
    } catch (error: any) { }
  };

  const onNextPress = () => {
    setFirstForm(false);
  };
  const onBackPress = () => {
    setFirstForm(true);
  };

  return (
    <View>
      {country == 'IN' ? (
        <View>
          {firstForm ? (
            <View>
              <CustomTextInput
                placeHolder="First Name"
                value={firstName}
                defaultValue={firstName}
                onValueChange={setfirstName}
                setRef={firstNameRef}
                onSubmitEditing={focusLastName}
                isSubmited={isSubmited}
                icon={require('../../assests/profile.png')}
              />
              <CustomTextInput
                placeHolder="Last Name"
                value={lastName}
                defaultValue={lastName}
                onValueChange={setLastName}
                setRef={lastNameRef}
                onSubmitEditing={() => emailRef.current?.focus()}
                isSubmited={isSubmited}
                icon={require('../../assests/profile.png')}
              />

              <CustomTextInput
                placeHolder="Email"
                keyboardType="email-address"
                value={email}
                defaultValue={email}
                onValueChange={setEmail}
                setRef={emailRef}
                onSubmitEditing={() => mobileNumberRef.current?.focus()}
                isSubmited={isSubmited}
                icon={require('../../assests/email.png')}
              />
              <CustomTextInput
                placeHolder="Mobile Number"
                keyboardType="phone-pad"
                value={mobileNumber}
                defaultValue={mobileNumber}
                onValueChange={setMobileNumber}
                setRef={mobileNumberRef}
                onSubmitEditing={() => passwordRef.current?.focus()}
                maxLength={10}
                icon={require('../../assests/telephone.png')}
              />
              <CustomTextInput
                placeHolder="Password"
                secureTextEntry={!showPassword}
                defaultValue={password}
                value={password}
                onValueChange={setPassword}
                setRef={passwordRef}
                onImagePress={onEyeBallPress}
                onSubmitEditing={() => postalCodeRef.current?.focus()}
                passwordVisible={showPassword}
                isSubmited={isSubmited}
                icon={require('../../assests/passwordimage.png')}
              />
              <CustomTextInput
                placeHolder="Postal Code(Optional)"
                // secureTextEntry={!showPassword}
                defaultValue={postalCode}
                value={postalCode}
                onValueChange={setPostalCode}
                setRef={postalCodeRef}
                onSubmitEditing={() => addressRef.current?.focus()}
                // onImagePress={onEyeBallPress}
                // passwordVisible={showPassword}
                icon={require('../../assests/mailbox.png')}
              />

              <CustomTextInput
                placeHolder="Address(Optional)"
                // secureTextEntry={!showPassword}
                defaultValue={address}
                value={address}
                onValueChange={setAddress}
                onSubmitEditing={onAddressSubmit}
                setRef={addressRef}
                // onImagePress={onEyeBallPress}
                // passwordVisible={showPassword}
                icon={require('../../assests/address.png')}
              />
            </View>
          ) : (
            <View>
              <CustomTextInput
                placeHolder="Owner's First Name (optional)"
                value={ownerFirstName}
                defaultValue={ownerFirstName}
                onValueChange={setOwnerFirstName}
                setRef={ownerFirstNameRef}
                onSubmitEditing={focusOwnerLastName}
                // isSubmited={isSubmited}
                icon={require('../../assests/profile.png')}
              />

              <CustomTextInput
                placeHolder="Owner's Last Name (optional)"
                value={ownerLastName}
                defaultValue={ownerLastName}
                onValueChange={setOwnerLastName}
                setRef={ownerLastNameRef}
                onSubmitEditing={() => registrationNoRef.current?.focus()}
                // isSubmited={isSubmited}
                icon={require('../../assests/profile.png')}
              />
              <CustomTextInput
                placeHolder="Registration Number(Optional)"
                value={registrationNo}
                defaultValue={registrationNo}
                onValueChange={setRegistrationNo}
                setRef={registrationNoRef}
                // onSubmitEditing={() => registrationNoRef.current?.focus()}
                icon={require('../../assests/online-registration.png')}
              />
              <CustomDatePicker
                regiDate={regiDate}
                setRegiDate={setRegiDate}
                isDatePicker={isDatePickerVisible}
                setIsDatePicker={setDatePickerVisibility}
              />
              <CustomTextInput
                editable={false}
                onPress={() => setDatePickerVisibility(!isDatePickerVisible)}
                placeHolder="Registration Date(Optional)"
                value={
                  regiDate?.length == 0
                    ? ''
                    : moment(regiDate).utc().format('YYYY-MM-DD')
                }
                defaultValue={
                  regiDate?.length == 0
                    ? ''
                    : moment(regiDate).utc().format('YYYY-MM-DD')
                }
                // onValueChange={setRegiDate}
                // onSubmitEditing={focusEmail}
                icon={require('../../assests/calendar.png')}
              />

              <CustomDropDown
                data={vehicleType}
                placeholder="Make"
                value={make}
                setValue={setMake}
                imageSrc={require('../../assests/cars.png')}
                setCarId={setCarId}
              />
              <CustomDropDown
                data={brandType}
                placeholder="Model"
                value={modal}
                setValue={setModal}
                imageSrc={require('../../assests/plastic.png')}
                setCarId={setCarMoadalId}
              />
              <CustomDropDown
                data={vehicalFuelType}
                placeholder="Fuel Type"
                value={fuelTypes}
                setValue={setFuelTypes}
                imageSrc={require('../../assests/oil.png')}
                setCarId={setFuelTypeId}
              />
            </View>
          )}

          {!firstForm && (
            <View style={styles.conditionContainer}>
              <TouchableOpacity
                activeOpacity={1}
                hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
                onPress={onCheckBoxPress}>
                <Image
                  source={
                    conditionAgreed
                      ? require('../../assests/checkbox.png')
                      : require('../../assests/unchecked.png')
                  }
                  tintColor={conditionAgreed ? '#000' : '#000'}
                  style={styles.checkBoxStyle}
                />
              </TouchableOpacity>
              <Text style={[styles.agreementText]} numberOfLines={2}>
                I agree to the{' '}
                <Text
                  onPress={onTermsConditionPress}
                  style={styles.coloredAgreementText}>
                  terms and condition
                </Text>{' '}
                and{' '}
                <Text
                  onPress={onTermsConditionPress}
                  style={styles.coloredAgreementText}>
                  privacy policy
                </Text>
              </Text>
            </View>
          )}

          <View
            style={[
              styles.buttonContainer,
              {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
              },
            ]}>
            {!firstForm && (
              <TouchableOpacity
                activeOpacity={1}
                onPress={onBackPress}
                style={[styles.registerButtonContainer, { marginRight: 10 }]}>
                <Text style={styles.registerText}>Back</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              activeOpacity={1}
              onPress={firstForm ? onNextPress : onRegisterPress}
              style={styles.registerButtonContainer}>
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.registerText}>
                  {firstForm ? 'Next' : 'REGISTER'}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View>
          <CustomTextInput
            placeHolder="First Name"
            value={firstName}
            defaultValue={firstName}
            onValueChange={setfirstName}
            setRef={firstNameRef}
            onSubmitEditing={focusLastName}
            isSubmited={isSubmited}
            icon={require('../../assests/profile.png')}
          />
          <CustomTextInput
            placeHolder="Last Name"
            value={lastName}
            defaultValue={lastName}
            onValueChange={setLastName}
            setRef={lastNameRef}
            onSubmitEditing={focusOwnerFirstName}
            isSubmited={isSubmited}
            icon={require('../../assests/profile.png')}
          />

          <CustomTextInput
            placeHolder="Owner's First Name (optional)"
            value={ownerFirstName}
            defaultValue={ownerFirstName}
            onValueChange={setOwnerFirstName}
            setRef={ownerFirstNameRef}
            onSubmitEditing={focusOwnerLastName}
            // isSubmited={isSubmited}
            icon={require('../../assests/profile.png')}
          />

          <CustomTextInput
            placeHolder="Owner's Last Name (optional)"
            value={ownerLastName}
            defaultValue={ownerLastName}
            onValueChange={setOwnerLastName}
            setRef={ownerLastNameRef}
            onSubmitEditing={focusEmail}
            // isSubmited={isSubmited}
            icon={require('../../assests/profile.png')}
          />
          <CustomTextInput
            placeHolder="Email"
            keyboardType="email-address"
            value={email}
            defaultValue={email}
            onValueChange={setEmail}
            setRef={emailRef}
            onSubmitEditing={focusMobileNumber}
            isSubmited={isSubmited}
            icon={require('../../assests/emailimage.png')}
          />
          <CustomTextInput
            placeHolder="Mobile Number"
            keyboardType="phone-pad"
            value={mobileNumber}
            defaultValue={mobileNumber}
            onValueChange={setMobileNumber}
            setRef={mobileNumberRef}
            onSubmitEditing={focusPassword}
            maxLength={10}
            icon={require('../../assests/mobileimage.png')}
          />
          <CustomTextInput
            placeHolder="Password"
            secureTextEntry={!showPassword}
            defaultValue={password}
            value={password}
            onValueChange={setPassword}
            setRef={passwordRef}
            onImagePress={onEyeBallPress}
            onSubmitEditing={onPasswordSubmit}
            passwordVisible={showPassword}
            isSubmited={isSubmited}
            icon={require('../../assests/passwordimage.png')}
          />

          <View style={styles.conditionContainer}>
            <TouchableOpacity
              activeOpacity={1}
              hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
              onPress={onCheckBoxPress}>
              <Image
                source={
                  conditionAgreed
                    ? require('../../assests/checkbox.png')
                    : require('../../assests/unchecked.png')
                }
                tintColor={conditionAgreed ? '#000' : '#000'}
                style={styles.checkBoxStyle}
              />
            </TouchableOpacity>
            <Text style={[styles.agreementText]} numberOfLines={2}>
              I agree to the{' '}
              <Text
                onPress={onTermsConditionPress}
                style={styles.coloredAgreementText}>
                terms and condition
              </Text>{' '}
              and{' '}
              <Text
                onPress={onTermsConditionPress}
                style={styles.coloredAgreementText}>
                privacy policy
              </Text>
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={onRegisterPress}
              style={styles.registerButtonContainer}>
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.registerText}>REGISTER</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default memo(RegistrationForm);
export const styles = StyleSheet.create({
  checkBoxStyle: {
    height: 24,
    width: 24,
    borderRadius: 10,
  },
  conditionContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  agreementText: {
    fontSize: 14,
    color: '#000',
    marginLeft: 5,
  },
  coloredAgreementText: {
    color: '#4b1cf4',
    fontSize: 14,
  },
  registerButtonContainer: {
    backgroundColor: '#000',
    justifyContent: 'center',
    borderRadius: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { height: 1, width: 0 },
    height: 35,
    width: 100,
    alignItems: 'center',
  },
  buttonContainer: {
    alignItems: 'flex-end',
    marginTop: 30,
    marginBottom: 10,
  },
  registerText: {
    color: '#fff',
    padding: 5,
    paddingHorizontal: 10,
  },
});
