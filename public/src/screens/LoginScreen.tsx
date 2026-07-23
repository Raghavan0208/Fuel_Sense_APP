/* eslint-disable */
import { getBottomSpace } from 'react-native-iphone-screen-helper';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Image,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Linking,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text } from 'react-native-paper';
import CommonServices, { fetchToken } from '../Services/CommonServices';
import { theme } from '../core/theme';
import { emailValidator } from '../helpers/emailValidator';
import { passwordValidator } from '../helpers/passwordValidator';
import Video, { VideoRef } from 'react-native-video';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';
import { useNavigation } from '@react-navigation/native';
import Country from './Country';
export const CURRENT_HIEGHT = Dimensions.get('window').height;
export const CURRENT_WIDTH = Dimensions.get('window').width;
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import { Modal } from 'native-base';

type Props = {
  setAccessToken: any;
  setScreen: any;
  navigation: any;
};

export default function LoginScreen({
  setAccessToken,
  setScreen,
  navigation,
}: Props) {
  const [isSplashScreen, setIsSplashScreen] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [countryErr, setCountryErr] = useState('');
  const [loginErr, setLoginErr] = useState('');
  const [country, setCountry] = useState('');
  const [countryMaster, setCountryMaster] = useState([]);
  const [isSubmited, setIsSubmited] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [csPress, setCsPress] = useState<boolean>(false);
  const [cancelModal, setCancelModal] = useState(false);
  const videoRef = useRef<VideoRef>(null);
  const navigaiton = useNavigation();


  const uploadDeviceToken = async (email: string, deviceToken: any, res: string,): Promise<void> => {
    const deviceTokenWithCreated = {
      ...deviceToken,
      created: new Date().toISOString(),
    }
    try {
      firebase.app();
      const res = await firestore()
        .collection('users')
        .doc(deviceToken?.DeviceToken.replaceAll('/', '-'))
        .set({
          created: new Date().toISOString(),
          email: email,
          deviceToken: deviceTokenWithCreated,
        });
    } catch (er) {
      console.log(er);
    } finally {
      saveData(res, deviceTokenWithCreated)
    }
  };

  const handleLogin = async (email: string, res: any): Promise<void> => {
    try {
      const userQuery = await firestore()
        .collection('users')
        .where('email', '==', email)
        .get();
      const updatednewDeviceToken = {
        "created": "2024-12-31T08:13:55.232Z",
        "deviceToken": {
          "DeviceToken": "e2a23feb-ea79-44b0-9a59-e6dda609c4f5",
          "AccessToken": {
            "Token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlMmEyM2ZlYi1lYTc5LTQ0YjAtOWE1OS1lNmRkYTYwOWM0ZjUiLCJqdGkiOiJmNTg3ZmJjNC1iNzcxLTRjNDMtODYwNi04NDcxZGQyNjMxZmUiLCJpYXQiOjE3MzU2MzI4MzYsIlNka0VuYWJsZUxvZ2dpbmciOiJGYWxzZSIsIlNka0VuYWJsZVRyYWNraW5nIjoiVHJ1ZSIsIlNka0NsaWVudElkIjoic3RyaW5nIiwiU2RrRW5hYmxlZCI6IlRydWUiLCJTZGtTZXR0aW5nc1VyaSI6Imh0dHBzOi8vYXBpLnRlbGVtYXRpY3NzZGsuY29tL3NldHRpbmdzL2Jhc2UiLCJJbnN0YW5jZUlkIjoiZTQwMmNkOTczOGNhNDEzMmFlZDMyMDg0MmVkNGFlOGQiLCJEZXZpY2VUb2tlbiI6ImUyYTIzZmViZWE3OTQ0YjA5YTU5ZTZkZGE2MDljNGY1IiwiQ29tcGFueUlkIjoiMWFkYmYwNzM1MWE5NDg3ZDk2MDVjMmI5YTY0OTExZmMiLCJBcHBJZCI6IjBiOWRjZmE2Mjk4MzRiNmFiZDIxMThkODE0NTY4YzQ0IiwiSXNBZG1pbiI6IkZhbHNlIiwiU2RrIjoiVHJ1ZSIsIm5iZiI6MTczNTYzMjgzNCwiZXhwIjoxNzM2NDk2ODM0LCJpc3MiOiJ3ZWJBcGkiLCJhdWQiOiJodHRwczovL3VzZXIudGVsZW1hdGljc3Nkay5jb20ifQ.XyhiMv8ncEgSDMoU6cxD5PLTy2v-coxZKDfpHuissbHfcM0vUHQylM8IiyOsTcB6T9dX_ACHOzIng6AipTdyUAnIQUNA_0euOpS-8veSAApW7vEGfotx70aU4se0QDiD9CrxS9Q7hYzkiuNfzmB-eTIKfeChfE6ipIna3c0-x99MfwyeeQeoV5EGMGysQQDjM_QBSp6R1BtDEaN0s5rPQHthXffLA2-LjvZ0vs9Umi3SfUZS1Mvhb2pk0NH3EZ4iJn63Vj9pBPRbSpRAAqPHpOWFIXtlGn-6Kpn9oHU_AOrye1VIMnBMV77p0aSSxQvWnJGo4KCmi5bRuJ-opLCzEw",
            "ExpiresIn": 864000
          },
          "created": "2024-12-31T08:13:55.230Z",
          "RefreshToken": "mF3Y+GtEbtKRxI9SReESjT9ftDbCsVG6FmLQznK0mj8="
        },
        "email": "bhaveshs@gmail.com"
      }
      uploadDeviceToken(email, updatednewDeviceToken, res)


      // if (!userQuery.empty) {
      //   const userDoc = userQuery.docs[0];
      //   const userData = userDoc.data();
      //   if (userData?.deviceToken) {
      //     const createdDate = moment(userData?.created);
      //     const ExpiresIn = userData?.deviceToken?.AccessToken?.ExpiresIn
      //     console.log("🚀 ~ handleLogin ~ ExpiresIn:", ExpiresIn)
      //     const Token = userData?.deviceToken?.AccessToken?.Token
      //     const RefreshToken = userData?.deviceToken?.RefreshToken
      //     console.log("🚀 ~ handleLogin ~ Token:", Token)
      //     console.log('isTokenExpired(createdDate, ExpiresIn)', isTokenExpired(createdDate, ExpiresIn));
      //     try {
      //       if (isTokenExpired(createdDate, ExpiresIn)) {
      //         const newDeviceToken = await damoovRefreshToken(RefreshToken, Token);
      //         console.log("🚀 ~ handleLogin@@@ ~ newDeviceToken:", newDeviceToken)
      //         const updatednewDeviceToken = {
      //           ...newDeviceToken?.Result,
      //           DeviceToken: userData?.deviceToken?.DeviceToken
      //         }
      //         if (newDeviceToken?.status == 200) {
      //           console.log("🚀 ~ handleLogin ~ updatednewDeviceToken:", JSON.stringify(updatednewDeviceToken))
      //           uploadDeviceToken(email, updatednewDeviceToken, res)
      //         } else {
      //           fetchDeviceToken(email, res)
      //         }
      //       } else {
      //         console.log('userData?.deviceToken', userData?.deviceToken);
      //         saveData(res, userData?.deviceToken)
      //       }
      //     } catch (error) {
      //       console.error("Token refresh failed:", error);

      //     }

      //   } else {
      //     fetchDeviceToken(email, res)
      //   }
      //   console.log('User data:', JSON.stringify(userData, null, 2));
      // } else {
      //   fetchDeviceToken(email, res)
      //   console.log('No user found with the provided userName');
      // }
    } catch (error) {
      console.error('Error retrieving user:', error);
    }
  };

  const fetchDeviceToken = (userName: string, response: string) => {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        InstanceId: 'e402cd97-38ca-4132-aed3-20842ed4ae8d',
        InstanceKey: '0dbb9e89-2e53-40ff-834c-00220ee8dbbe',
        'content-type': 'application/json'
      },
      body: JSON.stringify({ UserFields: { ClientId: 'string', Email: userName } })
    };

    fetch('https://user.telematicssdk.com/v1/Registration/create', options)
      .then(res => res.json())
      .then(res => {
        if (res?.Result?.DeviceToken) {
          uploadDeviceToken(userName, res?.Result, response)
        }
      })
      .catch(err => console.error(err));
  }

  const saveData = async (res: any, deviceToken: string) => {

    setLoginErr('');
    await AsyncStorage.setItem('star-zero-token', JSON.stringify(res.data));
    await AsyncStorage.setItem('CountryId', JSON.stringify(country));
    await AsyncStorage.setItem("authorization", JSON.stringify(res.data.token))
    await AsyncStorage.setItem("deviceToken", JSON.stringify(deviceToken))
    await fetchToken(deviceToken?.DeviceToken);
    setIsLoading(false);
    setAccessToken(res.data);
    setScreen('Dashboard');
  }

  const onLoginPressed = () => {
    setIsLoading(true);
    setLoginErr('');
    setIsSubmited(true);
    const emailError = emailValidator(email);
    const passwordError = passwordValidator(password);
    if (email?.length > 0 && emailError) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      setIsLoading(false);
      return;
    }
    if (passwordError) {
      setIsLoading(false);

      return;
    }
    if (country == '') {
      setIsLoading(false);
      return setCountryErr('Select Country');
    }
    setCountryErr('');
    CommonServices.postWithDoubleParam(
      'loginModel',
      'authenticateinapp',
      email,
      password,
      country,
    )
      .then(res => {
        if (res.status === 200) {
          if (
            res.data == 'Not Valid User' ||
            res.data == 'Invalid Credentials'
          ) {
            setIsLoading(false);

            return setLoginErr(res.data);
          }
          if (res.data == 'Plan is inactive') {
            setIsLoading(false);

            return setLoginErr(
              'Payment not complete, Complete at FuelSense.org',
            );
          } else {
            handleLogin(email, res)
            // setIsLoading(false);

            // setLoginErr('');
            // console.log("response::::", JSON.stringify(res))
            // AsyncStorage.setItem("authorization", res.data.token)
            // setAccessToken(res.data);
            // AsyncStorage.setItem('star-zero-token', JSON.stringify(res.data));
            // AsyncStorage.setItem('CountryId', JSON.stringify(country));
            // setScreen('Dashboard');
          }
        }
      })
      .catch(e => console.log('Errro', e))
      .finally(() => {
        // setIsLoading(false);
      });
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

  const openLink = async () => {
    try {
      // const url = 'http://starzero.inventsoftlabs.in/plans#personal?openfromapp&redirect_uri=starzero://starzero';
      const url =
        'https://www.fuelsense.org/plans#personal?openfromapp&redirect_uri=fuelsense://fuelsense';
      if (await InAppBrowser.isAvailable()) {
        InAppBrowser.openAuth(url, 'starzero://starzero', {
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
  const onEyeBallPress = () => {
    setShowPassword(!showPassword);
  };
  const onChooseCountryPress = () => {
    setCsPress(true);
  };
  // const getDeepLink = (path = '') => {
  //   const scheme = 'starzero';
  //   const prefix =
  //     Platform.OS === 'android' ? `${scheme}://starzero/` : `${scheme}://`;
  //   return prefix + path;
  // }

  // const openLink = async () => {
  //   const loginUrl = 'http://starzero.inventsoftlabs.in/plans#personal?openfromapp/';
  //     // const url = 'https://www.starzero.org/plans#personal?openfromapp';
  //   const redirectUrl = getDeepLink();
  //   const url = `${loginUrl}?redirect_url=${redirectUrl}`;
  //   try {
  //     if (await InAppBrowser.isAvailable()) {
  //       const result = await InAppBrowser.openAuth(url, redirectUrl, {
  //         showTitle: true,
  //         enableUrlBarHiding: true,
  //         enableDefaultShare: true,
  //         headers: {
  //           "ok": "ok",
  //         }
  //       });
  //       Alert.alert('Response', JSON.stringify(result));
  //     } else {
  //       Alert.alert('InAppBrowser is not supported :/');
  //     }
  //   } catch (error) {
  //     Alert.alert('Something’s wrong with the app :(');
  //   }
  // }

  const onLeftArrowPress = () => {
    setIsSplashScreen(true);
    setEmail('');
    setPassword('');
    setIsSubmited(false);
    setIsLoading(false);
  };

  useEffect(() => {
    getCountryMaster();
  }, []);

  return (
    <View style={{}}>
      {!isSplashScreen && <SafeAreaView style={{ backgroundColor: '#fff' }} />}
      {isSplashScreen && !csPress && (
        <View style={styles.container}>
          <View
            style={{
              flex: 1,
              height: CURRENT_HIEGHT,
              justifyContent: 'space-between',
              width: CURRENT_WIDTH,
            }}>
            <View style={{ flex: 1 }} />
            <View style={{ marginHorizontal: 20, marginBottom: 50 }}>
              <View style={{ alignItems: 'center'}}>
                <Image
                  source={require('../assests/favicon.png')}
                  style={{ height: 80, width: 100 }}
                />
              </View>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 22,
                  fontWeight: '800',
                  textAlign: 'center',
                  marginVertical: 10,
                }}>
                Welcome to FuelSense
              </Text>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 16,
                  fontWeight: '600',
                  textAlign: 'center',
                  marginVertical: 10,
                  marginBottom: 30,

                }}>
                Together! No matter what, the distance
              </Text>
              <CustomButton
                isLoading={isLoading}
                containerStyle={{ marginBottom: getBottomSpace() }}
                title="Get Started With Us"
                onButtonPress={() => setIsSplashScreen(false)}
              />
            </View>
          </View>
          <Video
            source={require('../assests/fuelsensevideo.mp4')}
            ref={videoRef}
            style={styles.video}
            repeat={true}
            resizeMode="cover"
            muted={false}
            rate={1.0}
            playInBackground
          />
        </View>
      )}
      {!isSplashScreen && !csPress && (
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 20,
            paddingTop: 20,
            backgroundColor: '#fff',
          }}
      >
          <TouchableOpacity
            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
            onPress={onLeftArrowPress}
            style={{ marginTop: 30 }}>
            <Image
              source={require('../assests/arrow_back.png')}
              style={{ height: 20, width: 20, tintColor: '#000' }}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: '#000',
              fontWeight: '700',
              fontSize: 22,
              marginTop: 20,
            }}>
            Welcome back,
          </Text>

          <Text
            style={{
              color: '#000',
              fontSize: 15,
              marginTop: 5,
              fontWeight: '600',
              lineHeight: 25
            }}>
            Every great journey begins with a sign-in. Let’s create something amazing together!
          </Text>

          <View style={{ marginTop: 0, alignItems: 'center' }}>
            <Image
              source={require('../assests/loginpage1.png')}
              style={{ height: 300, width: 400, resizeMode: 'contain' }}
              alt="" />
          </View>

          <View style={{ marginTop: 0 }}>
            {loginErr ?
              <Text style={{ textAlign: 'center', marginBottom: 20, color: 'red', fontSize: 15 }}>
                 {loginErr}
              </Text> : ""}
            <CustomTextInput
              value={email}
              defaultValue={email}
              placeHolder="Email"
              onValueChange={setEmail}
              icon={require('../assests/emailimage.png')}
              isSubmited={isSubmited}
              keyboardType="email-address"
            />
            <CustomTextInput
              value={password}
              defaultValue={password}
              placeHolder="Password"
              onValueChange={setPassword}
              icon={require('../assests/passwordimage.png')}
              secureTextEntry={!showPassword}
              onImagePress={onEyeBallPress}
              passwordVisible={showPassword}
              isSubmited={isSubmited}
            />
            <TouchableOpacity activeOpacity={1} onPress={onChooseCountryPress}>
              <View
                style={{
                  height: 45,
                  borderWidth: 1,
                  borderColor: '#969696',
                  borderRadius: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: 15,
                  marginTop: 5,
                }}>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    source={require('../assests/choosecountry.png')}
                    style={{
                      height: 25,
                      width: 25,
                      marginRight: 8,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      color: country?.length === 0 ? '#969696' : '#000',
                    }}>
                    {country?.length === 0 ? 'Choose Country' : country}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <CustomButton
            isLoading={isLoading}
            title="Start Now"
            onButtonPress={onLoginPressed}
            containerStyle={{ marginTop: 30 }}
          />
          <View
            style={{
              flex: 1,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                marginTop: 15,
              }}>
              <Text style={{ textAlign: 'center', fontSize: 16 }}>
                New here? {' '}
                <Text
                  onPress={() => navigation.navigate('Registration')}
                  style={{
                    color: theme.colors.primary,
                    fontWeight: '700',
                  }}>
                  Create an account
                </Text>
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 12, marginTop: 20 }}>
            <Image
              source={require('../assests/instagram.png')}
              style={{
                height: 25,
                width: 25,
              }}
            />
            <Image
              source={require('../assests/facebook.png')}
              style={{
                height: 25,
                width: 25,
              }}
            />
            <Image
              source={require('../assests/twitter.png')}
              style={{
                height: 25,
                width: 25,
              }}
            />
          </View>
        </ScrollView>
      )}
      <Modal isOpen={csPress}>
        <Modal.Content maxWidth="100%" w="100%" h="auto" maxHeight="60%">
          <Modal.CloseButton
            onPress={() => {
              setCsPress(false);
            }} />
          {/* <Modal.Header style={{alignItems:'center'}}>Country List</Modal.Header> */}
          <Modal.Body>
            <Country
              data={countryMaster}
              setCsPress={setCsPress}
              setCountry={setCountry}
              setIsCarFind={setCancelModal}
              setIsMieageScreen={setCancelModal}
              setIsRegistred={setCancelModal}
            />
          </Modal.Body>
        </Modal.Content>
      </Modal>

      {/* {csPress && (
        <Country
          data={countryMaster}
          setCsPress={setCsPress}
          setCountry={setCountry}
          setIsCarFind={setCancelModal}
          setIsMieageScreen={setCancelModal}
          setIsRegistred={setCancelModal}
        />
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 15,
    color: '#dc3545',
    fontWeight: '600',
    backgroundColor: 'rgb(239, 202, 202)',
    padding: 5,
    borderRadius: 5,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: -2,
  },
});
{
  /* <Background>
<Logo />
<Header>Welcome back.</Header>
{loginErr ? (
  <View style={styles.forgotPassword}>
    <Text style={styles.forgot}>{loginErr}</Text>
  </View>
) : null}
<TextInput
  label="Email"
  returnKeyType="next"
  value={email.value}
  onChangeText={(text: any) => setEmail({value: text, error: ''})}
  error={!!email.error}
  errorText={email.error}
  autoCapitalize="none"
  autoCompleteType="email"
  textContentType="emailAddress"
  keyboardType="email-address"
/>
<TextInput
  label="Password"
  returnKeyType="done"
  value={password.value}
  onChangeText={(text: any) => setPassword({value: text, error: ''})}
  error={!!password.error}
  errorText={password.error}
  secureTextEntry
/>

<Select
  selectedValue={country}
  minWidth="100%"
  accessibilityLabel="Choose Country"
  placeholder="Choose Country"
  _selectedItem={{
    bg: 'teal.600',
    endIcon: <CheckIcon size="5" />,
  }}
  mt={1}
  onValueChange={itemValue => setCountry(itemValue)}>
  {countryMaster.map((val: any, i: number) => (
    <Select.Item
      key={i}
      label={val.countryCode}
      value={val.countryCode}
    />
  ))}
</Select>
{countryErr ? (
  <BaseText color={'danger.700'}>{countryErr}</BaseText>
) : null}
<Button mode="contained" onPress={onLoginPressed}>
  Login
</Button>
<View style={styles.row}>
  <Text>Don’t have an account? </Text>
  <TouchableOpacity
    onPress={() => navigation.navigate('Registration')}>
    {/* <TouchableOpacity onPress={() => { openLink() }}> */
}
{
  /* <TouchableOpacity onPress={() => { Platform.OS == "android" ? openLink() : navigation.navigate('Subscription') }}> */
}
//     <Text style={styles.link}>Sign up</Text>
//   </TouchableOpacity>
// </View>
// <Modal isOpen={cancelModal} onClose={setCancelModal} size={'sm'}>
//   <Modal.Content w={'96'} maxH="212">
//     <Modal.CloseButton
//       onPress={() => {
//         setCancelModal(false);
//       }}
//     />
//     <Modal.Header>Don’t have an account?</Modal.Header>
//     <Modal.Body>
//       <BaseText textAlign={'center'}>
//         Please register on the following website (
//         https://www.starzero.org/plans ) to obtain your login
//         credentials.
//       </BaseText>
//     </Modal.Body>
//   </Modal.Content>
// </Modal>
// </Background> */}
