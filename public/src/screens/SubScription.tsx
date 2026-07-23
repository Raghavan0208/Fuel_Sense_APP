import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { memo, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ErrorCode,
  initConnection,
  purchaseErrorListener,
  purchaseUpdatedListener,
  useIAP,
} from 'react-native-iap';
import { countryCurrency } from '../core/data';
import CommonServices from '../Services/CommonServices';
// const list = [
//   {
//     vehicleTypeId: 1,
//     name: 'Breeze Basic',
//     displayName: 'Breeze Basic',
//     description:
//       'REAL TIME TRACK (Unlimited Mileage);;Superior Carbon Offsetting (1 metric tonne(tCO2) : 1000000 grams);;9 trees funded annual;;Selected best of Climate projects for Carbon credits & Certification;;~annual mileage 5000 miles (Carbon offset);;Unlimited HMRC compliant Mileage Report ',
//     treeCount: 15,
//     enumName: 'Breeze Basic',
//     amount: 9.99,
//     isMostPopular: false,
//     displayInList: true,
//     rowOrder: 100,
//     treeFrequency: 100000,
//     treesToPlant: 1,
//     finaltreeCount: 6,
//     cO2limit: 1000000,
//     id: 1,
//     created: '2024-07-11T11:15:15.5945068Z',
//     createdBy: null,
//     modified: '2024-07-11T11:15:15.594507Z',
//     modifiedBy: null,
//     active: true,
//   },
//   {
//     vehicleTypeId: 1,
//     name: 'Windy Essential',
//     displayName: 'Windy Essential',
//     description:
//       'REAL TIME TRACK (Unlimited Mileage);;Max Carbon Neutral (3 metric tonne(tCO2) : 3000000 grams);;15 trees funded annual;;Selected best of Climate projects for Carbon credits & Certification;;~annual mileage 12000 miles (Carbon offset);;Unlimited HMRC compliant Mileage Report ',
//     treeCount: 45,
//     enumName: 'Windy Essential',
//     amount: 13.99,
//     isMostPopular: true,
//     displayInList: true,
//     rowOrder: 100,
//     treeFrequency: 250000,
//     treesToPlant: 3,
//     finaltreeCount: 12,
//     cO2limit: 3000000,
//     id: 2,
//     created: '2024-07-11T11:15:15.5945346Z',
//     createdBy: null,
//     modified: '2024-07-11T11:15:15.5945347Z',
//     modifiedBy: null,
//     active: true,
//   },
//   {
//     vehicleTypeId: 1,
//     name: 'Aero Supreme',
//     displayName: 'Aero Supreme',
//     description:
//       'REAL TIME TRACK (Unlimited Mileage);;Ultra Carbon Offsetting (6 metric tonne(tCO2) : 6000000 grams);;45 trees funded annual;;Selected best of Climate projects for Carbon credits & Certification;;~annual mileage 25000 miles (Carbon offset);;Unlimited HMRC compliant Mileage Report ',
//     treeCount: 90,
//     enumName: 'Aero Supreme',
//     amount: 16.99,
//     isMostPopular: false,
//     displayInList: true,
//     rowOrder: 100,
//     treeFrequency: 500000,
//     treesToPlant: 9,
//     finaltreeCount: 14,
//     cO2limit: 6000000,
//     id: 3,
//     created: '2024-07-11T11:15:15.5945477Z',
//     createdBy: null,
//     modified: '2024-07-11T11:15:15.5945478Z',
//     modifiedBy: null,
//     active: true,
//   },
//   {
//     vehicleTypeId: 1,
//     name: 'Air',
//     displayName: 'Air',
//     description:
//       'FREE REAL TIME TRACK;;24/7 Support;;Unlimited HMRC compliant Mileage Report ',
//     treeCount: 0,
//     enumName: 'Air',
//     amount: 0.0,
//     isMostPopular: false,
//     displayInList: true,
//     rowOrder: 100,
//     treeFrequency: 0,
//     treesToPlant: 0,
//     finaltreeCount: 0,
//     cO2limit: 1000000,
//     id: 7,
//     created: '2024-07-11T11:15:15.5945588Z',
//     createdBy: null,
//     modified: '2024-07-11T11:15:15.5945588Z',
//     modifiedBy: null,
//     active: true,
//   },
// ];
const subscriptionSkus = Platform.select({
  ios: ['fuelsense.start', 'fuelsense.smart', 'fuelsense.intelli'],
  android: ['fuelsense.start', 'fuelsense.smart', 'fuelsense.intelli'],
  default: ['fuelsense.start', 'fuelsense.smart', 'fuelsense.intelli'],
});
export const CURR_WIDTH = Dimensions.get('screen').width;
const width = CURR_WIDTH * 0.43;
type props = {
  data?: any;
  country?: any;
  isPlanActive?: any;
  currentPlan?: any;
};
const SubScription = () => {
  const prosp = useRoute<RouteProp<Record<string, props>, string>>();
  const registerdData = prosp?.params?.data;
  const currentPlan = prosp.params.currentPlan;

  const country = prosp?.params?.country;
  const {
    connected,
    subscriptions,
    getSubscriptions,
    requestSubscription,
    finishTransaction,
  } = useIAP();

  const isPressedPurchase = useRef(false);
  const [subscriptionData, setSubScriptionData] = useState<any>();
  const subscriptionDataRef = useRef<any>();
  const [subIndex, setSubIndex] = useState<number>(1);
  const [singleData, setSingleData] = useState<any>();
  const [isDataLoading, setIsDataLoading] = useState<boolean>(true);
  const parts = [
    'Get a 7-day free trial to explore all features.',
    ...(singleData?.description?.split(';;') || []),
  ];

  const navigation = useNavigation();
  const [subLoading, setSubLoading] = useState<boolean>(false);
  const [countrySelection, setCountrySelection] = useState<string>('UK');
  const currDate = useRef<number | undefined | null>();
  const isAleartShowed = useRef<boolean>(false);
  const subScriptionPlan = useRef<string>('');

  useEffect(() => {
    getCountry();
  }, []);

  const getCountry = async () => {
    const countrys = await AsyncStorage.getItem('CountryId');
    const countryCode = country
      ? country
      : countrys
        ? JSON.parse(countrys)
        : 'UK';

    setCountrySelection(countryCode);
  };
  const countrySymbol = countryCurrency[countrySelection];
  useEffect(() => {
    const purchaseUpdateSubscription = purchaseUpdatedListener(
      async purchase => {
        if (isPressedPurchase.current) {
          isPressedPurchase.current = false;
          const receipt = purchase.transactionReceipt;
          const transactionDate = purchase.transactionDate;
          const productId = purchase.productId;
          if (subScriptionPlan.current != productId) {
            console.log('Product Id:[different]', productId);

            return;
          }
          if (receipt) {
            try {
              if (currDate.current && currDate.current > transactionDate) {
                Alert.alert(
                  'Subscription Active',
                  'An active subscription is already associated with another account on this device.',
                );
                setSubLoading(false);
                return;
              }
              await finishTransaction({ purchase, isConsumable: false });
            } catch (error) {
              console.error(
                'An error occurred while completing transaction',
                error,
              );
              let errorMessage =
                'An error occurred while completing the transaction.';
              if (error.code === 'E_FINISH_TRANSACTION_FAILED') {
                errorMessage = 'Failed to finish the transaction.';
              }

              Alert.alert('Transaction Error', errorMessage);
              setSubLoading(false);
            }
            notifySuccessfulPurchase(purchase?.productId);
          }
        }
      },
    );
    const purchaseErrorSubscription = purchaseErrorListener(error => {
      if (error.code != ErrorCode.E_USER_CANCELLED) {
        console.log('Purchase error', error?.message);
        if (isPressedPurchase.current) {
          setSubLoading(false);
          isPressedPurchase.current = false;
          let errorMessage =
            error?.message || 'An unknown error occurred during the purchase.';
          if (error?.code === 'E_NETWORK_ERROR') {
            errorMessage =
              'Network error. Please check your connection and try again.';
          } else if (error?.code === 'E_ITEM_UNAVAILABLE') {
            errorMessage = 'This product is currently unavailable.';
          } else if (error?.code === 'E_ALREADY_OWNED') {
            errorMessage = 'You already own this product.';
          }
          if (!isAleartShowed.current) {
            isAleartShowed.current = true;
            Alert.alert('Purchase Error', errorMessage);
          }
        }
      }
    });
    const fetchProducts = async () => {
      try {
        await initConnection();
        if (connected) {
          await getSubscriptions({
            skus: subscriptionSkus,
          });
        } else {
        }
      } catch (error) {
        alert(error?.message ?? error);
        console.log('Error', error);
      }
    };
    fetchProducts();
    return () => {
      purchaseUpdateSubscription.remove();
      purchaseErrorSubscription.remove();
    };
  }, [connected]);

  const handleBuySubscription = async (productId: string) => {
    setSubLoading(true);
    try {
      isAleartShowed.current = false;
      subScriptionPlan.current = productId;
      const index = subscriptions?.findIndex(
        item => item?.productId == productId,
      );
      const product = subscriptions[index];
      const sku = product.productId;
      const offerToken =
        Platform.OS === 'android'
          ? product?.subscriptionOfferDetails[0]?.offerToken || null
          : null;
      isPressedPurchase.current = true;
      if (__DEV__) {
        // createPayment(sku);
      } else {
        await requestSubscription({
          sku: sku,
          andDangerouslyFinishTransactionAutomaticallyIOS: false,
          ...(offerToken && {
            subscriptionOffers: [{ sku, offerToken }],
          }),
        });
      }
      console.log('[Requested]');
    } catch (error) {
      setSubLoading(false);
      let errorMessage = 'Product is unavailable. Please try again later.';
      if (error?.code === 'E_USER_CANCELLED') {
        errorMessage = 'Purchase cancelled by user.';
        return;
      } else if (error?.code === 'E_NETWORK_ERROR') {
        errorMessage =
          'Network error. Please check your connection and try again.';
      } else if (error?.code === 'E_ALREADY_OWNED') {
        errorMessage = 'You already own this product.';
      } else if (error?.code === 'E_ITEM_UNAVAILABLE') {
        errorMessage = 'This product is currently unavailable.';
      } else if (error?.code == 'E_DEVELOPER_ERROR') {
        errorMessage =
          'Google is indicating that we have some issue connecting to payment.';
      }
      console.log('error', error);
      if (!isAleartShowed.current) {
        isAleartShowed.current = true;
        Alert.alert('Purchase Error', errorMessage);
      }
    }
  };

  const onGoBackPress = () => {
    navigation.goBack();
  };
  const getPlans = async () => {
    const countrys = await AsyncStorage.getItem('CountryId');
    const countryCode = country
      ? country
      : countrys
        ? JSON.parse(countrys)
        : 'UK';

    CommonServices.getWithSingleParam(
      'Master',
      'GetPlans',
      1,
      country ? country : countryCode,
    )
      .then(res => {
        if (res.status == 200) {
          setSubScriptionData(res.data);
          subscriptionDataRef.current = res.data;
          setSingleData(res.data[1]);

          if (currentPlan) {
            const fIndex = res.data?.findIndex(
              item => item?.id == currentPlan?.planId,
            );
            console.log(fIndex, 'f');
            if (fIndex != -1) {
              console.log('find', fIndex);
              setSubIndex(fIndex);
              setSingleData(res.data[fIndex]);
            }
          } else {
            setSingleData(res.data[1]);
          }
        }
      })
      .catch(e => {
        navigation.goBack();
        Alert.alert('Please try again');
      })
      .finally(() => {
        setIsDataLoading(false);
      });
  };
  const onBuyNowpress = (index: number, active?: boolean) => {
    currDate.current = Date.now();
    if (active) {
      Linking.openURL(
        Platform.OS == 'ios'
          ? 'https://apps.apple.com/account/subscriptions'
          : 'https://play.google.com/store/account/subscriptions?package=com.fuelsense.org',
      );
      return;
    }
    setSubIndex(index);
    setSingleData(subscriptionDataRef.current[index]);
    if (index != subIndex) return;

    handleBuySubscription(subscriptionSkus[index]);
  };
  useEffect(() => {
    getPlans();
  }, []);
  const onSubscriptionPress = (ind: number) => {
    setSubIndex(ind);
    setSingleData(subscriptionDataRef.current[ind]);
  };
  const notifySuccessfulPurchase = async productId => {
    createPayment(productId);
  };

  const createPayment = async (productId: string) => {
    try {
      console.log('productId', productId);
      if (registerdData && country) {
        let index = 0;
        if (productId == subscriptionSkus[1]) {
          index = 1;
        }
        if (productId == subscriptionSkus[2]) {
          index = 2;
        }
        console.log(
          'productId 12wqsl,kedjhj',
          subscriptionDataRef.current,
          index,
        );
        const email = registerdData?.email;
        const newPlanDetails = {
          planId: subscriptionDataRef.current?.[index]?.id,
        };
        console.log(
          'aslkdjlaksdlkasd',
          subscriptionDataRef.current?.[index]?.id,
        );

        const updatedData = {
          ...registerdData,
          plan: {
            ...registerdData.plan,
            ...newPlanDetails,
          },
        };
        console.log(';asdlkahjsdahjklsd', updatedData);

        try {
          const createRes = await CommonServices.post(
            'Registration',
            'Create',
            updatedData,
            country || 'UK',
          );
          console.log('createRes', createRes?.data);
          const viewLogin = await CommonServices.getWithQueryParam(
            'Registration',
            'View',
            'loginId',
            createRes?.data,
            country || 'UK',
          );
          console.log('viewLogin', viewLogin?.data?.plan?.id);

          if (viewLogin.status === 200) {
            const paymentData = {
              id: 0,
              created: '2023-07-24T18:47:28.662Z',
              createdBy: 0,
              modified: '2023-07-24T18:47:28.662Z',
              modifiedBy: 0,
              active: true,
              loginId: createRes?.data,
              userPlanId: viewLogin?.data?.plan?.id,
              paymentOrderId: 'FREE',
              transactionId: 'FREE',
              amount: 0,
              failedResponse: '',
              Status: 'Success',
            };
            const payment = await CommonServices.post(
              'Payment',
              'Create',
              paymentData,
              country || 'UK',
            );
            console.log('pay,ment', payment?.data);

            Alert.alert('Success', 'Purchase successful');

            navigation.navigate('Dashboard' as never);
          } else {
            Alert.alert('Error', 'Error in Getting User Details');
          }
        } catch (e) {
          alert(e);
        } finally {
          setSubLoading(false);
        }
      } else {
        try {
          const loginId = await AsyncStorage.getItem('LOGIN_ID');
          const countryCode = await AsyncStorage.getItem('CountryId');
          const code = JSON.parse(countryCode || 'UK');
          const paymentData = {
            id: 0,
            created: '2023-07-24T18:47:28.662Z',
            createdBy: 0,
            modified: '2023-07-24T18:47:28.662Z',
            modifiedBy: 0,
            active: true,
            loginId: Number(loginId),
            userPlanId: Number(loginId),
            paymentOrderId: 'FREE',
            transactionId: 'FREE',
            amount: 0,
            failedResponse: '',
            Status: 'Success',
          };
          const payment = await CommonServices.post(
            'Payment',
            'Create',
            paymentData,
            code,
          );
          Alert.alert('Success', 'Purchase successful');
          navigation.navigate('Dashboard' as never);
        } catch (e) {
          alert(e?.message ?? e);
          console.log('error', e);
        }
      }
    } catch (error) {
      alert(error?.message ?? error);
      console.log('aslkdjalksdj errr', error);
    } finally {
      setSubLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ backgroundColor: '#fff' }} />

      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={onGoBackPress} style={styles.arrowContainer}>
          <Image
            source={require('../assests/arrow_back.png')}
            style={styles.leftArrow}
          />
        </TouchableOpacity>
        <Text style={styles.subscribe}>Buy Subscription</Text>
        <View />
      </View>
      {isDataLoading ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 50,
          }}>
          <ActivityIndicator color={'#000'} size={'large'} />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewStyle}>
          <View style={{ paddingHorizontal: 25 }}>
            <View style={{}}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 26,
                  fontWeight: '600',
                }}>
                {String(singleData?.displayName)}
              </Text>
              {singleData?.displayName == 'Air' ? (
                <Text
                  style={{
                    color: '#000',
                    fontSize: 22,
                    fontWeight: '600',
                    marginBottom: 10,
                  }}>
                  FREE
                </Text>
              ) : (
                <Text
                  style={{
                    color: '#000',
                    fontSize: 24,
                    fontWeight: '600',
                    marginBottom: 10,
                  }}>
                  {countrySymbol + ' ' + singleData?.amount}
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 14,
                      fontWeight: '500',
                    }}>
                    {' '}
                    /month
                  </Text>
                </Text>
              )}

              {parts?.map((item: any, index: any) => (
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginBottom: 10,
                  }}>
                  <View
                    style={{
                      height: 8,
                      width: 8,
                      backgroundColor: '#000',
                      borderRadius: 100,
                    }}
                  />
                  <Text style={{ color: '#000', marginLeft: 10 }}>{item}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.mainBoxContainer}>
            {subscriptionData?.map((item: any, index: any) => {
              const active = item?.id == currentPlan?.planId;

              return (
                <View
                  style={[
                    styles.boxContainer,
                    { borderColor: index == subIndex ? '#0D6CB1' : '#0D6CB150' },
                  ]}>
                  {item?.isMostPopular && (
                    <View
                      style={{
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          backgroundColor: '#FEF3C7',
                          borderRadius: 100,
                          position: 'absolute',
                          top: -10,
                          zIndex: 10,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderColor: '#FCDF6C',
                          borderWidth: 1,
                          paddingHorizontal: 10,
                          padding: 2,
                        }}>
                        <Text
                          style={{
                            fontSize: 10,
                            color: '#000',
                          }}>
                          Most Polular
                        </Text>
                      </View>
                    </View>
                  )}

                  <TouchableOpacity
                    activeOpacity={1}
                    style={{}}
                    onPress={() => onSubscriptionPress(index)}>
                    <View
                      style={{
                        paddingHorizontal: 15,
                        paddingVertical: 15,
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: 125,
                      }}>
                      <View style={{}}>
                        <Text
                          numberOfLines={1}
                          style={{
                            color: '#000',
                            fontSize: 16,
                            fontWeight: '600',
                          }}>
                          {item?.displayName}
                        </Text>
                        {item?.amount == 0 ? (
                          <Text
                            numberOfLines={1}
                            style={{
                              color: '#000',
                              fontSize: 18,
                              fontWeight: '600',
                              marginTop: 5,
                            }}>
                            Free
                          </Text>
                        ) : (
                          <Text
                            numberOfLines={1}
                            style={{
                              color: '#000',
                              fontSize: 16,
                              fontWeight: '600',
                              marginTop: 5,
                            }}>
                            {countrySymbol + ' ' + item?.amount}
                            <Text
                              style={{
                                color: '#000',
                                fontSize: 12,
                                fontWeight: '500',
                              }}>
                              /month
                            </Text>
                          </Text>
                        )}
                      </View>
                      <View
                        style={{
                          alignItems: 'center',
                          marginTop: 15,
                        }}>
                        {index == subIndex && (
                          <TouchableOpacity
                            activeOpacity={index == subIndex ? 0 : 1}
                            disabled={
                              (!active && prosp.params?.isPlanActive) ?? false
                            }
                            onPress={() => onBuyNowpress(index, active)}
                            style={{
                              borderRadius: 100,
                              backgroundColor:
                                !active && prosp.params?.isPlanActive
                                  ? 'grey'
                                  : index == subIndex
                                    ? '#0D6CB1'
                                    : 'transparent',
                              height: 35,
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: 100,
                              borderWidth:
                                !active && prosp.params?.isPlanActive
                                  ? 0
                                  : index == subIndex
                                    ? 0
                                    : 1,
                              borderColor: '#0D6CB1',
                            }}>
                            <Text
                              style={{
                                color:
                                  !active && prosp.params?.isPlanActive
                                    ? '#fff'
                                    : index == subIndex
                                      ? '#fff'
                                      : '#0D6CB1',
                                fontSize: 14,
                                fontWeight: '500',
                              }}>
                              {active ? 'Manage' : 'Subscribe'}
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 40,
            }}
            onPress={() => {
              Linking.openURL('https://www.fuelsense.org/help?terms');
            }}>
            <Text
              style={{
                color: '#0D6CB1',
                fontSize: 12,
                textDecorationStyle: 'solid',
                textDecorationLine: 'underline',
              }}>
              Terms of Use & Privacy Policy
            </Text>
          </TouchableOpacity>
        </ScrollView>
      )}
      {subLoading && (
        <View
          style={{
            position: 'absolute',
            flex: 1,
            backgroundColor: '#00000050',
            height: '100%',
            width: '100%',
            zIndex: 100,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator style={{}} color={'#fff'} size={'large'} />
        </View>
      )}
    </View>
  );
};

export default memo(SubScription);
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  leftArrow: {
    height: 24,
    width: 24,
  },
  arrowContainer: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  subscribe: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    // flex: 1,
    // textAlign: 'center',
    // marginLeft: -30,
  },
  scrollViewStyle: {
    paddingTop: 20,
    paddingBottom: 50,
  },
  boxContainer: {
    borderColor: '#0D6CB1',
    width: width,
    borderRadius: 10,
    maxHeight: 200,
    maxWidth: 200,
    // elevation: 3,
    // shadowColor: '#000',
    // shadowOpacity: 0.2,
    // shadowRadius: 3,
    // shadowOffset: {height: 1, width: 0},
    backgroundColor: '#0D6CB110',
    marginBottom: 10,
    borderWidth: 1,
  },
  mainBoxContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 30,
  },
});
