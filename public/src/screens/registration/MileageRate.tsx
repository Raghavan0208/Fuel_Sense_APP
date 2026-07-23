/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  GestureResponderEvent,
  BackHandler,
} from 'react-native';
import React, { memo, useEffect, useState } from 'react';
import CustomTextInput from '../../components/CustomTextInput';
import { mileageRateData } from './Registration';
type props = {
  onCancelPress?: ((event: GestureResponderEvent) => void) | undefined;
  onSubmitRatePress?: ((event: GestureResponderEvent) => void) | undefined;
  data?: any;
  isUk?: boolean;
  setRoundIndex: (a: number) => void | undefined;
  roudIndex?: number | undefined;
  setCustomRate: (a: string) => void | undefined;
  customRate?: string | undefined;
  setIsCarFind: (a: boolean) => void;
  setIsRegistred: (a: boolean) => void;
  setIsMieageScreen: (a: boolean) => void;
};
const MileageRate = ({
  onCancelPress,
  onSubmitRatePress,
  data,
  setRoundIndex,
  roudIndex,
  customRate,
  setCustomRate,
  isUk,
  setIsCarFind,
  setIsRegistred,
  setIsMieageScreen,
}: props) => {
  const onRoundPress = (no: number) => {
    setRoundIndex(no);
  };

  useEffect(() => {
    const onHardwareBackPress = () => {
      setIsCarFind(true);
      setIsRegistred(false);
      setIsMieageScreen(false);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onHardwareBackPress,
    );

    return () => {
      backHandler.remove(); // Cleanup the event listener on component unmount
    };
  }, []);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: 10, paddingBottom: 10, flexGrow: 1 }}>
      {/* {data && (
        <View style={{marginTop: 30}}>
          <View
            style={{
              flexDirection: 'row',
              paddingRight: 8,
              backgroundColor: '#dadada',
              paddingHorizontal: 10,
              paddingVertical: 15,
              borderRadius: 5,
            }}>
            <View style={{marginTop: 3, marginRight: 8}}>
              <Image
                source={require('../../assests/information-button.png')}
                style={{height: 14, width: 14, tintColor: '#000'}}
              />
            </View>
            <Text style={{color: '#000', flex: 1}}>
              The Standard rates are pr-populated based on the latest tax
              guidelines.
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => onRoundPress(0)}
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
            <Image
              source={
                roudIndex == 0
                  ? require('../../assests/RoundSelected.png')
                  : require('../../assests/RoundUnSelected.png')
              }
              style={{
                height: 18,
                width: 18,
                tintColor: roudIndex == 0 ? '#e3a129' : '#888888',
                marginRight: 10,
              }}
            />
            <Text
              style={{
                color: roudIndex == 0 ? '#235889' : '#8c8c8c',
                fontWeight: '500',
                fontSize: 16,
              }}>
              Standard rates
            </Text>
          </TouchableOpacity>
          {roudIndex == 0 && (
            <View
              style={{
                borderWidth: 1,
                borderColor: '#d5dfe8',
                padding: 20,
                borderRadius: 10,
                marginTop: 25,
              }}>
              {data?.rateLimit?.map((item, index) => {
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom:
                        index == data?.rateLimit?.length - 1 ? 10 : 30,
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View>
                        <Image
                          source={item?.icon}
                          style={{height: 24, width: 24, borderRadius: 4}}
                        />
                      </View>
                      <View>
                        <Text
                          style={{
                            color: '#000',
                            fontWeight: '500',
                            marginLeft: 10,
                          }}>
                          {item?.message1}
                        </Text>
                        {item?.message2?.length > 0 && (
                          <Text
                            style={{
                              color: '#000',
                              fontWeight: '500',
                              marginLeft: 10,
                            }}>
                            {isUk ? "10000Miles" : "10000kms"}
                          </Text>
                        )}
                      </View>
                    </View>
                    <View>
                      <Text style={{color: '#235889', fontWeight: '700'}}>
                        {item?.limit}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          )}
        </View>
      )} */}

      <View style={{ marginTop: 30 }}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#f1f1f1',
            paddingHorizontal: 10,
            paddingVertical: 15,
            paddingRight: 8,
            borderRadius: 5,
          }}>
          <View style={{ marginTop: 3, marginRight: 8 }}>
            <Image
              source={require('../../assests/information-button.png')}
              style={{ height: 14, width: 14, tintColor: '#969191' }}
            />
          </View>
          <Text style={{ color: '#000', flex: 1, fontSize: 13, fontWeight: '400', lineHeight: 20 }}>
            You can enter your own custom rate in this below field.
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => onRoundPress(1)}
          style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
          <Image
            source={
              roudIndex == 1
                ? require('../../assests/RoundSelected.png')
                : require('../../assests/RoundUnSelected.png')
            }
            style={{
              height: 15,
              width: 15,
              tintColor: roudIndex == 1 ? '#000' : '#000',
              marginRight: 10,
            }}
          />
          <Text
            style={{
              color: roudIndex == 1 ? '#000' : '#8c8c8c',
              fontWeight: '500',
              fontSize: 16,
            }}>
            Custom rates
          </Text>
        </TouchableOpacity>
        {roudIndex == 1 && (
          <View>
            <CustomTextInput
              placeHolder={isUk ? '£/km' : '$/km'}
              value={customRate}
              defaultValue={customRate}
              onValueChange={setCustomRate}
              containerStyle={{ marginTop: 10 }}
              keyboardType="number-pad"
            />
          </View>
        )}
      </View>
      <View style={{ marginTop: 30 }}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#f1f1f1',
            paddingHorizontal: 10,
            paddingVertical: 15,
            paddingRight: 8,
            borderRadius: 5,
          }}>
          <View style={{ marginTop: 3, marginRight: 8 }}>
            <Image
              source={require('../../assests/information-button.png')}
              style={{ height: 14, width: 14, tintColor: '#969191' }}
            />
          </View>
          <Text style={{ color: '#000', flex: 1, fontSize: 13, fontWeight: '400', lineHeight: 20 }}>
            No reimbursement rate set. Mileage tracking will be recorded without
            any reimbursement calculations for the tax year.
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => onRoundPress(2)}
          style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
          <Image
            source={
              roudIndex == 2
                ? require('../../assests/RoundSelected.png')
                : require('../../assests/RoundUnSelected.png')
            }
            style={{
              height: 15,
              width: 15,
              tintColor: roudIndex == 2 ? '#000' : '#000',
              marginRight: 10,
            }}
          />
          <Text
            style={{
              color: roudIndex == 2 ? '#000' : '#8c8c8c',
              fontWeight: '500',
              fontSize: 16,
            }}>
            No rates
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          flexDirection: 'row',
        }}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={onCancelPress}
            style={{
              borderWidth: 1,
              borderColor: '#000',
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
            }}>
            <Text style={{ color: '#000', padding: 5, paddingHorizontal: 15 }}>
              CANCEL
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity
            onPress={onSubmitRatePress}
            activeOpacity={1}
            style={{
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
              backgroundColor: roudIndex != -1 ? '#000' : '#e2e2e2',
              marginLeft: 15,
            }}>
            <Text
              style={{
                color: '#fff',
                padding: 5,
                paddingHorizontal: 15,
                fontWeight: '700',
              }}>
              SUBMIT RATES
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default memo(MileageRate);
