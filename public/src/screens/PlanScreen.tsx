// import React, { Component, useEffect, useRef, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   FlatList,
//   TextInput,
//   Platform,
//   EmitterSubscription,
//   Button,
//   Alert,
//   BackHandler,
//   Linking,
// } from "react-native";
// import styles from "./PlanScreenStyles";
// import { AppButton, AppContainer, AppHeader } from "../../Component";
// // import {Button, Platform} from 'react-native'
// import {
//   Color,
//   Const,
//   Fonts,
//   Loader,
//   Responsive,
//   Screen,
//   Storage,
//   Utility,
// } from "../../Helper";
// import { ApiEndPoints, ApiServices } from "../../APIServices";
// import HTMLRender from "react-native-render-html";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import moment from "moment";
// import Payment from "../../Component/Payment";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import {
//   PurchaseError,
//   requestSubscription,
//   useIAP,
//   purchaseErrorListener,
//   purchaseUpdatedListener,
//   validateReceiptIos,
// } from "react-native-iap";
// import { constants } from "../../common/constants";

// var payload = {};
// const loc_global: any = global;
// const PlanScreen = (props: any) => {
//   const { navigation, route, commonActions } = props;
//   const [typePlan, setTypePlan] = useState("1");
//   const [Plan, setPlan] = useState([]);
//   const [referCode, setReferCode] = useState("");
//   const [openIndex, setOpenIndex] = useState(-1);
//   const [currentPlan, setCurrentPlan] = useState(null);
//   const [eferralAppliedSts, setReferralAppliedSts] = useState("0");
//   const conditionId = 1;
//   const categoryId = 0;
//   const [tokenStore, setTokenStore] = useState("");

//   const {
//     connected,
//     subscriptions,
//     getSubscriptions,
//     finishTransaction,
//     purchaseHistory,
//     getPurchaseHistory,
//   } = useIAP();

//   useEffect(() => {
//     planDetailsSub();
//   }, []);

//   useEffect(() => {
//     const purchaseUpdateSubscription = purchaseUpdatedListener(
//       async (purchase) => {
//         const receipt = purchase.transactionReceipt;
//         if (receipt) {
//           if (Platform.OS === "ios") {
//             const isTestEnvironment = _DEV_;
//             //send receipt body to apple server to validete
//             const appleReceiptResponse = await validateReceiptIos(
//               {
//                 "receipt-data": receipt,
//                 passwsord: "d64a1cab3a7b493584838279c5db1cd0",
//               },
//               isTestEnvironment
//             );

//             //if receipt is valid
//             if (appleReceiptResponse) {
//               const { status } = appleReceiptResponse;
//               if (status) {
//                 await storeSubscriptionRecord(purchase);
//               }
//             }
//             return;
//           } else {
//             try {
//               await finishTransaction({ purchase, isConsumable: false });
//               await storeSubscriptionRecord(purchase);
//             } catch (error) {
//               console.error(
//                 "An error occurred while completing transaction",
//                 error
//               );
//             }
//           }
//         }
//       }
//     );
//     const purchaseErrorSubscription = purchaseErrorListener((error) =>
//       console.error("Purchase error", error.message)
//     );
//     handleGetSubscriptions();
//     handleGetPurchaseHistory();
//     return () => {
//       purchaseUpdateSubscription.remove();
//       purchaseErrorSubscription.remove();
//     };
//   }, [connected]);

//   const handleGetSubscriptions = async () => {
//     try {
//       Loader.isLoading(true);
//       await getSubscriptions({ skus: constants.subPlans });
//     } catch (error) {
//       console.error("Error fetching subscriptions:", error);
//     } finally {
//       Loader.isLoading(false);
//     }
//   };

//   const handleGetPurchaseHistory = async () => {
//     try {
//       await getPurchaseHistory();
//     } catch (error) {
//       console.error("Error fetching purchase history:", error);
//     }
//   };

//   const handleBuySubscription = async (
//     productId: string,
//     offerToken?: string
//   ) => {
//     try {
//       Loader.isLoading(true);
//       await requestSubscription({
//         sku: productId,
//         ...(offerToken && {
//           subscriptionOffers: [{ sku: productId, offerToken }],
//         }),
//       });
//     } catch (error) {
//       if (error instanceof PurchaseError) {
//         Alert.alert([${error.code}]: ${error.message});
//         console.log({ message: [${error.code}]: ${error.message}, error });
//       } else {
//         console.log({ message: "handleBuySubscription", error });
//       }
//     } finally {
//       Loader.isLoading(false);
//     }
//   };

//   const storeSubscriptionRecord = async (purchase: any) => {
//     Loader.isLoading(true);
//     payload = {
//       ...payload,
//       userId: loc_global?.userData?.userData?.userId || "",
//       forMonth: typePlan,
//       platformBy: Platform.OS === "ios" ? "1" : "0",
//       purchaseID: purchase?.transactionId || "",
//       transactionId: purchase?.transactionId || "",
//       productID: purchase?.productId || "",
//       transactionDate: new Date().toISOString(),
//       amount: purchase?.transactionPrice
//         ? ${purchase?.transactionPrice} ${purchase?.transactionCurrency}
//         : "",
//     };
//     console.log("PAYLOAD: " + payload);
//     try {
//       const response = await ApiServices(
//         "post",
//         JSON.stringify(payload),
//         ApiEndPoints.create_for_subscriptions
//       );
//       console.log("RESPONSE: " + response);
//       if (response.statusCode === 200) {
//         Alert.alert(response?.data?.msgTitle, response?.data?.msgDesc, [
//           {
//             text: "Ok",
//             onPress: () => {},
//           },
//         ]);
//         Loader.isLoading(false);
//         navigation.reset({
//           index: 0,
//           routes: [{ name: Screen.LaunchingScreen }],
//         });
//       } else {
//         Loader.isLoading(false);
//         Utility.showDangerToast(
//           response?.message || response?.data?.message || response?.data
//         );
//       }
//     } catch (error) {
//       console.error("Error storing subscription record:", error);
//     }
//   };

//   const tagsStyles = {
//     em: { fontSize: Responsive.font(4), lineHeight: 22 }, // Set font size for <em> tag
//     p: { fontSize: Responsive.font(4), lineHeight: 22 }, // CSS styles for <p> tag
//     ul: { fontSize: Responsive.font(4), lineHeight: 22 }, // CSS styles for <ul> tag
//     li: { fontSize: Responsive.font(4), lineHeight: 22 }, // CSS styles for <li> tag
//     h1: { fontSize: Responsive.font(6), lineHeight: 22 },
//     h2: { fontSize: Responsive.font(5), lineHeight: 22 },
//     h3: { fontSize: Responsive.font(4), lineHeight: 22 },
//     strong: { fontWeight: "bold" },
//   };

//   const handleOpen = ({ index }) => {
//     setOpenIndex((prevIndex) => (prevIndex === index ? -1 : index));
//   };

//   //refral api
//   const referralValitation = ({ index }) => {
//     if (referCode == "") {
//       Utility.showDangerToast("Please enter refer code");
//       return;
//     }
//     const payload = JSON.stringify({
//       userId: loc_global?.userData?.userData?.userId,
//       referralCode: referCode,
//     });
//     Loader.isLoading(true);
//     ApiServices("post", payload, ApiEndPoints.applyReferralCode)
//       .then((response: any) => {
//         if (response.data.status == "error") {
//           Utility.showDangerToast(response.data.message);
//           setReferralAppliedSts("0");
//         } else {
//           Utility.showSuccessToast(response.data.message);
//           setReferralAppliedSts("1");
//           handleOpen({ index });
//         }
//       })
//       .finally(() => {
//         Loader.isLoading(false);
//       });
//   };

//   const planDetailsSub = () => {
//     Loader.isLoading(true);
//     ApiServices("get", null, ApiEndPoints.subCriptionPlan_details, null)
//       .then((response: any) => {
//         if (response?.statusCode === 401) {
//           navigation.replace(Screen.LoginScreen);
//           Storage.logout();
//           AsyncStorage.removeItem("@coin");
//         } else {
//           console.log(response.data);
//           setPlan(response?.data);
//         }
//       })
//       .finally(() => {
//         Loader.isLoading(false);
//       });
//   };

//   const renderFree = ({ item, index }) => {
//     const htmlString = item?.planDesc;
//     const isOpen = openIndex === index;
//     const standard = item?.planTitle.toLowerCase()?.includes("standard");
//     const premium = item?.planTitle.toLowerCase()?.includes("premium");
//     const monthlyStandard = subscriptions.find(
//       (subscription) =>
//         subscription.productId ===
//         Platform.select({
//           ios: "standardMonthlyPlan",
//           android: "standard_monthly",
//         })
//     );
//     const monthlyPremium = subscriptions.find(
//       (subscription) =>
//         subscription.productId ===
//         Platform.select({
//           ios: "premiumMonthlyPlan",
//           android: "premium_monthly",
//         })
//     );
//     const yearlyStandard = subscriptions.find(
//       (subscription) =>
//         subscription.productId ===
//         Platform.select({
//           ios: "standardAnnualPlan",
//           android: "standard_yearly",
//         })
//     );
//     const yearlyPremium = subscriptions.find(
//       (subscription) =>
//         subscription.productId ===
//         Platform.select({
//           ios: "premiumAnnualPlan",
//           android: "premium_yearly",
//         })
//     );
//     const getIsPurchased = (plan) => {
//       const p = purchaseHistory?.find((s) => s?.productId === plan?.productId);
//       return p?.productId === plan?.productId;
//     };
//     const getPlanDetails = (standard, monthly, yearly) => ({
//       title: standard ? monthly?.title : yearly?.title,
//       name: standard ? monthly?.name : yearly?.name,
//       localizedPrice: standard
//         ? monthly?.localizedPrice
//         : yearly?.localizedPrice,
//       formattedPrice: standard
//         ? monthly?.subscriptionOfferDetails?.[0]?.pricingPhases
//             ?.pricingPhaseList?.[0]?.formattedPrice
//         : yearly?.subscriptionOfferDetails?.[0]?.pricingPhases
//             ?.pricingPhaseList?.[0]?.formattedPrice,
//       isPurchased: standard ? getIsPurchased(monthly) : getIsPurchased(yearly),
//     });

//     const getLabel = (planDetails, interval) =>
//       `${Platform.OS === "ios" ? planDetails.title : planDetails.name}\n${
//         planDetails.localizedPrice ?? planDetails.formattedPrice
//       }/${interval}`;

//     const handlePress = (plan, interval) => {
//       setTypePlan(interval === "Month" ? "1" : "12");
//       payload = {
//         ...payload,
//         planId: item.planId,
//       };
//       if (Platform.OS === "ios") {
//         handleBuySubscription(plan?.productId);
//       } else {
//         handleBuySubscription(
//           plan?.productId,
//           (plan?.subscriptionOfferDetails &&
//             plan?.subscriptionOfferDetails[0]?.offerToken) ||
//             null
//         );
//       }
//     };

//     const owned = purchaseHistory.find((s) =>
//       constants.subPlans?.includes(s?.productId)
//     );

//     return (
//       <View style={styles.montlyplanView}>
//         <View style={styles.standardPriceMainView}>
//           <View style={styles.standerView}>
//             <Text style={styles.standerText}>{item?.planTitle}</Text>
//           </View>
//           {/* <View style={styles.priceview}>
//             <Text style={styles.priceText}>
//               ${typePlan == 12 ? item?.yearlyAmt : item?.montlyAmt}
//             </Text>
//             {typePlan == 12 ? (
//               <Text style={styles.perMonthText}>per year</Text>
//             ) : (
//               <Text style={styles.perMonthText}>per month</Text>
//             )}
//           </View> */}
//         </View>
//         <View style={styles.offerView}>
//           <HTMLRender source={{ html: htmlString }} tagsStyles={tagsStyles} />
//         </View>

//         <View style={{ alignItems: "center", alignSelf: "center" }}>
//           {props.common.update_current_subscription_plan == item.planId &&
//           props.common.update_plan_expire >=
//             JSON.stringify(moment(new Date()).format("M/D/YYYY")) ? (
//             props.common.update_current_subscription_plan !== 1 ? (
//               <>
//                 <AppButton
//                   label="Cancel subscription"
//                   labelStyle={styles.btnlableText}
//                   containerStyle={styles.btnancle}
//                   onPress={() => {
//                     if (Platform.OS === "ios") {
//                       Linking.openURL(
//                         "https://buy.itunes.apple.com/WebObjects/MZFinance.woa/wa/manageSubscriptions"
//                       );
//                     } else {
//                       Linking.openURL(
//                         https://play.google.com/store/account/subscriptions?package=com.fundooapp&sku=${owned?.productId}
//                       );
//                     }
//                   }}
//                 />
//               </>
//             ) : null
//           ) : index !== 0 ? (
//             <>
//               {
//                 <AppButton
//                   label={
//                     subscriptions?.length
//                       ? getLabel(
//                           getPlanDetails(
//                             standard,
//                             monthlyStandard,
//                             monthlyPremium
//                           ),
//                           "Month"
//                         )
//                       : "Loading..."
//                   }
//                   labelStyle={styles.btnlableText}
//                   containerStyle={styles.btn}
//                   onPress={() =>
//                     handlePress(
//                       standard ? monthlyStandard : monthlyPremium,
//                       "Month"
//                     )
//                   }
//                   disable={
//                     getPlanDetails(standard, monthlyStandard, monthlyPremium)
//                       .isPurchased || false
//                   }
//                 />
//               }
//               <AppButton
//                 label={
//                   subscriptions?.length
//                     ? getLabel(
//                         getPlanDetails(standard, yearlyStandard, yearlyPremium),
//                         "Year"
//                       )
//                     : "Loading..."
//                 }
//                 labelStyle={styles.btnlableText}
//                 containerStyle={styles.btn}
//                 onPress={() =>
//                   handlePress(standard ? yearlyStandard : yearlyPremium, "Year")
//                 }
//                 disable={
//                   getPlanDetails(standard, monthlyStandard, monthlyPremium)
//                     .isPurchased || false
//                 }
//               />
//             </>
//           ) : null}
//         </View>
//         {/* {index !== 0 ? <View style={{ alignItems: "center", alignSelf: "center" }}>
//           <AppButton
//             label="Refer Code"
//             labelStyle={styles.btnlableText}
//             containerStyle={styles.referbtn}
//             onPress={() => {
//               handleOpen({ index });
//             }}
//           />
//         </View> : null} */}
//         {isOpen && (
//           <View
//             style={{
//               marginLeft: Responsive.widthPx(5),
//               marginBottom: Responsive.heightPx(1),
//             }}
//           >
//             <Text
//               style={{
//                 fontSize: Responsive.font(4.5),
//                 fontFamily: Fonts.Inter_SemiBold,
//               }}
//             >
//               Do you have an Referral Code?
//             </Text>
//             <View style={{ flexDirection: "row", alignItems: "center" }}>
//               <TextInput
//                 style={styles.inputField}
//                 onChangeText={(text) => {
//                   setReferCode(text);
//                 }}
//                 value={referCode}
//                 placeholder="Enter Refer Code"
//               />
//               <AppButton
//                 label="Apply"
//                 labelStyle={styles.btnlableText}
//                 containerStyle={styles.btn1}
//                 onPress={() => {
//                   // handleOpen({ index });
//                   referralValitation({ index });
//                 }}
//               />
//               <AppButton
//                 label="Cancel"
//                 labelStyle={styles.btnlableText}
//                 containerStyle={styles.cancelbtn}
//                 onPress={() => {
//                   handleOpen({ index });
//                 }}
//               />
//             </View>
//           </View>
//         )}
//       </View>
//     );
//   };

//   // const SubFunctionCall = ({ item }) => {
//   //   if (item?.planTitle === "Free" && item?.planId == 1) {
//   //     purchaseBasicPlane(); // Call the Free function
//   //   }
//   //   if (item.planTitle === "Standard") {
//   //     if (item.montlyAmt === "3.49" && typePlan == "1") {
//   //       monthlyStandardFunction(
//   //         { item }
//   //       ); // Call the monthly function
//   //     }
//   //     if (item.yearlyAmt === "34.99" && typePlan == "12") {
//   //       monthlyStandardFunction(
//   //         { item }
//   //       ); // Call the yearly function
//   //     }
//   //   }
//   //   if (item?.planTitle === "Premium") {
//   //     if (item.montlyAmt === "6.99" && typePlan == "1") {
//   //       monthlyStandardFunction(
//   //         { item }
//   //       ); // Call the monthly function
//   //     }
//   //     if (item.yearlyAmt === "69.99" && typePlan == "12") {
//   //       monthlyStandardFunction(
//   //         { item }
//   //       ); // Call the yearly function
//   //     }
//   //   }
//   // };

//   const monthlyStandardFunction = ({ item }) => {
//     payload = JSON.stringify({
//       userId: loc_global?.userData?.userData?.userId,
//       platformBy: Platform.OS === "ios" ? "1" : "0",
//       conditionId: conditionId,
//       categoryId: "0",
//       forMonth: typePlan,
//       planId: item.planId,
//       usedReferralCode: referCode == "" ? " " : referCode,
//       referralAppliedSts: eferralAppliedSts,
//     });
//     Loader.isLoading(true);
//     ApiServices("post", payload, ApiEndPoints.payPal_token)
//       .then((response: any) => {
//         let res_pass = response.data;
//         setTokenStore(res_pass);
//       })
//       .finally(() => {
//         Loader.isLoading(false);
//       });
//   };

//   const purchaseBasicPlane = () => {
//     payload = {
//       userId: loc_global?.userData?.userData?.userId,
//     };
//     Loader.isLoading(true);
//     ApiServices("post", payload, ApiEndPoints.basicPlan)
//       .then((response: any) => {
//         Loader.isLoading(false);
//         if (response.data.status == "success") {
//           Utility.showSuccessToast(response.data.message);
//           Loader.isLoading(false);
//           navigation.navigate(Screen.LaunchingScreen);
//         } else {
//           Loader.isLoading(false);
//           Utility.showDangerToast(response.data.message);
//         }
//       })
//       .finally(() => {
//         Loader.isLoading(false);
//       });
//   };

//   const CancleSubPlane = () => {
//     payload = {
//       userId: loc_global?.userData?.userData?.userId,
//     };
//     Loader.isLoading(true);
//     ApiServices("post", payload, ApiEndPoints.plan_cancle)
//       .then((response: any) => {
//         Utility.showSuccessToast(response.data.message);
//         navigation.push(Screen.LaunchingScreen);
//       })
//       .finally(() => {
//         Loader.isLoading(false);
//       });
//   };

//   return (
//     <AppContainer>
//       <View style={styles.container}>
//         <>
//           {tokenStore == "" ? (
//             <>
//               <AppHeader
//                 {...props}
//                 title="Fundoo Plan"
//                 isRightImage1={true}
//                 drawermenu={true}
//                 isBackBtn={false}
//               />

//               {/* <View style={styles.planbuttonTwo}>
//                 <TouchableOpacity onPress={() => setTypePlan("1")}>
//                   <View
//                     style={
//                       typePlan == "1"
//                         ? [
//                           styles.mothView,
//                           { backgroundColor: Color.pinkshade54, borderRadius: 30 },
//                         ]
//                         : styles.mothView
//                     }
//                   >
//                     <Text
//                       style={
//                         typePlan == "1"
//                           ? [styles.yearPlanText, { color: "white" }]
//                           : styles.yearPlanText
//                       }
//                     >
//                       Monthly
//                     </Text>
//                   </View>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   onPress={() => {
//                     setTypePlan("12");
//                   }}
//                 >
//                   <View
//                     style={
//                       typePlan == "12"
//                         ? [
//                           styles.yearbtnView,
//                           { backgroundColor: Color.pinkshade54, borderRadius: 30 },
//                         ]
//                         : styles.yearbtnView
//                     }
//                   >
//                     <Text
//                       style={
//                         typePlan == "12"
//                           ? [styles.yearPlanText, { color: "white" }]
//                           : styles.yearPlanText
//                       }
//                     >
//                       Yearly
//                     </Text>
//                   </View>
//                 </TouchableOpacity>
//               </View> */}
//               <ScrollView
//                 showsHorizontalScrollIndicator={false}
//                 showsVerticalScrollIndicator={false}
//               >
//                 {/* <View style={styles.cardView}> */}
//                 <>
//                   <FlatList
//                     data={Plan}
//                     renderItem={renderFree}
//                     keyExtractor={(item, index) => index.toString()}
//                     ListFooterComponent={
//                       <View style={styles.footer}>
//                         <Text
//                           style={styles.footerText}
//                           onPress={() =>
//                             Linking.openURL(
//                               "https://fundooapp.com/app/privacy-policy"
//                             )
//                           }
//                         >
//                           Privacy Policy
//                         </Text>
//                         <Text
//                           style={styles.footerText}
//                           onPress={() =>
//                             Linking.openURL(
//                               "https://fundooapp.com/app/terms-conditions"
//                             )
//                           }
//                         >
//                           Terms and Conditions
//                         </Text>
//                       </View>
//                     }
//                   />
//                 </>
//                 {/* </View> */}
//                 <View style={styles.space} />
//               </ScrollView>
//             </>
//           ) : (
//             <Payment
//               value={tokenStore}
//               loader={false}
//               navigation={navigation}
//               commonActions={commonActions}
//             />
//           )}
//         </>
//       </View>
//     </AppContainer>
//   );
// };
// function mapDispatchToProps(dispatch: any) {
//   return {
//     commonActions: bindActionCreators(Const.actions.CommonActions, dispatch),
//   };
// }
// function mapStateToProps(state: any) {
//   return {
//     common: state.common,
//   };
// }
// export default connect(mapStateToProps, mapDispatchToProps)(PlanScreen);

// // import {
// //     endConnection,
// //     flushFailedPurchasesCachedAsPendingAndroid,
// //     initConnection,
// //     withIAPContext,
// //   } from "react-native-iap";

// //   React.useEffect(() => {
// //       const initialize = async () => {
// //         await initConnection();
// //         if (Platform.OS === "android") {
// //           flushFailedPurchasesCachedAsPendingAndroid();
// //         }
// //       };
// //       initialize();
// //       return () => {
// //         endConnection();
// //       };
// //     }, []);

// //   export default withIAPContext(App);
