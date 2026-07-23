import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";

import {
  PurchaseError,
  requestSubscription,
  useIAP,
} from "react-native-iap";
import { theme } from "../core/theme";

const errorLog = ({ message, error }: any) => {
  console.error("An error happened", message, error);
};

const isIos = Platform.OS === "ios";

//product id from appstoreconnect app->subscriptions
// const subscriptionSkus: any = Platform.select({
//   ios: ["breezebasicIN", "windyessential", "aerosupremeIN"],
// });

const subscriptionSkus:any = Platform.select({
  ios: ['fuelsense.start', 'fuelsense.smart', 'fuelsense.intelli'],
  android: ['fuelsense.start', 'fuelsense.smart', 'fuelsense.intelli'],
  default: ['fuelsense.start', 'fuelsense.smart', 'fuelsense.intelli'],
});


export const Subscriptions = ({ navigation }: any) => {

  const {
    connected,
    subscriptions,
    getSubscriptions,
  } = useIAP();

  const [loading, setLoading] = useState(false);

  const handleGetSubscriptions = async () => {
    try {
      await getSubscriptions({ skus: subscriptionSkus });
    } catch (error) {
      errorLog({ message: "handleGetSubscriptions", error });
    }
  };

  useEffect(() => {
    if (connected) {
      handleGetSubscriptions();
    }
  }, [connected]);

  const handleBuySubscription = async (productId: string) => {
    try {
      await requestSubscription({
        sku: productId,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error instanceof PurchaseError) {
        errorLog({ message: `[${error.code}]: ${error.message}`, error });
      } else {
        errorLog({ message: "handleBuySubscription", error });
      }
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ padding: 10 }}>
          <Text
            style={{
              fontSize: 28,
              textAlign: "center",
              paddingBottom: 15,
              color: "black",
              fontWeight: "bold",
            }}
          >
            Subscribe
          </Text>
          <Text
            style={
              (styles.listItem,
              {
                fontWeight: "500",
                textAlign: "center",
                marginTop: 10,
                fontSize: 18,
              })
            }
          >
            Choose your membership plan.
          </Text>
          <View style={{ marginTop: 10 }}>
            {subscriptions.map((subscription: any, index) => {
              return (
                <View style={styles.box} key={index}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 10,
                    }}
                  >
                    <Text
                      style={{
                        paddingBottom: 10,
                        fontWeight: "bold",
                        fontSize: 18,
                        textTransform: "uppercase",
                      }}
                    >
                      {subscription?.title}
                    </Text>
                    <Text
                      style={{
                        paddingBottom: 20,
                        fontWeight: "bold",
                        fontSize: 18,
                      }}
                    >
                      {subscription?.localizedPrice}
                    </Text>
                  </View>
                  <Text style={{ paddingBottom: 20 }}>
                    {subscription?.description}
                  </Text>
                  {loading && <ActivityIndicator size="large" />}
                  {!loading && isIos && (
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        setLoading(true);
                        handleBuySubscription(subscription.productId);
                      }}
                    >
                      <Text style={styles.buttonText}>Subscribe</Text>
                    </TouchableOpacity>
                  )}
                </View>
              );
            })}
          </View>
          <View style={styles.listItem}>
            <TouchableOpacity onPress={() => { navigation.navigate('Dashboard') }}>
              <Text style={styles.link}>Back to Sign in?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
    textAlign: "center"
  },
  listItem: {
    fontSize: 16,
    paddingLeft: 8,
    paddingBottom: 3,
    textAlign: "center",
    color: "black",
  },
  box: {
    margin: 10,
    marginBottom: 5,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 7,
    shadowColor: "rgba(0, 0, 0, 0.45)",
    shadowOffset: { height: 16, width: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  button: {
    alignItems: "center",
    backgroundColor: "mediumseagreen",
    borderRadius: 8,
    padding: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    textTransform: "uppercase",
  },
  specialTag: {
    color: "white",
    backgroundColor: "crimson",
    width: 125,
    padding: 4,
    fontWeight: "bold",
    fontSize: 12,
    borderRadius: 7,
    marginBottom: 2,
  },
});
