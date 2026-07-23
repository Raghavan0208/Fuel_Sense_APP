/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  GestureResponderEvent,
  BackHandler,
  ScrollView,
} from 'react-native';
import React, { memo, useEffect, useState } from 'react';
const countryImages: { [key: string]: any } = {
  IN: require('../assests/india.png'),
  UK: require('../assests/uk.png'),
  USA: require('../assests/us.png'),
  Australia: require('../assests/aus.png'),
  Canada: require('../assests/canada.png'),
  International: require('../assests/earth.png'),
  Europe: require('../assests/Europe.png'),
};

type props = {
  data: any;
  setCsPress?: (a: boolean) => void | undefined;
  setCountry?: (a: string) => void | undefined;
  arrowNotRequired?: boolean | undefined;
  setIsCarFind?: (a: boolean) => void;
  setIsRegistred?: (a: boolean) => void;
  setIsMieageScreen?: (a: boolean) => void;
};
const Country = ({
  data,
  setCsPress,
  setCountry,
  arrowNotRequired,
  setIsCarFind,
  setIsMieageScreen,
  setIsRegistred,
}: props) => {
  const [showData, setShowData] = useState<boolean>(true);
  const onLeftArrowPress = () => {
    setCsPress && setCsPress(false);
  };
  useEffect(() => {
    const onHardwareBackPress = () => {
      if (setCsPress) {
        setCsPress(false);
        return true; // Prevent default back navigation
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onHardwareBackPress,
    );

    return () => {
      backHandler.remove(); // Cleanup the event listener on component unmount
    };
  }, [setCsPress]);
  const onCountryPress = () => {
    setShowData(!showData);
  };
  const onSCountryPress = (code: string) => {
    setCountry && setCountry(code);
    setCsPress && setCsPress(false);
    if (code == 'IN') {
      setIsCarFind && setIsCarFind(true);
      setIsRegistred && setIsRegistred(true);
      setIsMieageScreen && setIsMieageScreen(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        // backgroundColor: '#fff',
        marginHorizontal: 20,
        marginTop: 5,
      }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text
            style={{
              fontSize: 18,
              color: '#000',
              fontWeight: '600',
              letterSpacing: 0.2,
            }}>
            Country list
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 10,
          paddingBottom: 30,
          // borderWidth: 1,
          marginTop: 20,
          borderRadius: 10,
          // borderColor: '#ddd',
        }}>
        {data?.map((item: any, index: any) => {
          const image =
            countryImages[item?.countryCode] || countryImages['International'];
          return (
            <TouchableOpacity
              key={index}
              onPress={() => onSCountryPress(item?.countryCode)}
              style={{ marginBottom: 10 }}>
              <View
                style={{
                  flexDirection: 'row',
                  // borderBottomWidth: 1,
                  // borderColor: '#ddd',
                  paddingHorizontal: 15,
                  height: 40,
                  borderRadius: 10,
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={image}
                    style={{
                      height: item?.countryCode == 'International' ? 30 : 20,
                      width: 30,
                    }}
                  />
                </View>
                <Text style={{ marginLeft: 25, color: '#000', width: '100%', fontSize: 15, fontWeight: '500' }}>
                  {item?.displayName}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default memo(Country);
