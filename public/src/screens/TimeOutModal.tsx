import React, {memo} from 'react';
import {Image, Text} from 'react-native';
import {
  GestureResponderEvent,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Modal from 'react-native-modal';
import {CURRENT_WIDTH} from './LoginScreen';
import CustomButton from '../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
type props = {
  showModal: boolean;
  setShowModal: (a: boolean) => void;
  mainContainer?: StyleProp<ViewStyle> | undefined;
  bodyContainer?: StyleProp<ViewStyle> | undefined;
  onBackGroundPress: ((event: GestureResponderEvent) => void) | undefined;
  onUpgradePress?: ((event: GestureResponderEvent) => void) | undefined;
};
const TimeOutModal = ({
  showModal,
  setShowModal,
  mainContainer,
  onBackGroundPress,
  bodyContainer,
  onUpgradePress,
}: props) => {
  return (
    <Modal
      backdropTransitionOutTiming={500}
      isVisible={showModal}
      backdropOpacity={0.5}
      style={{margin: 0, paddingHorizontal: 30}}>
      <TouchableOpacity
        activeOpacity={1}
        style={[
          {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          },
          mainContainer,
        ]}
        onPress={onBackGroundPress}>
        <TouchableOpacity activeOpacity={1}>
          <View
            style={[
              {
                width: CURRENT_WIDTH * 0.9,
                backgroundColor: '#fff',
                borderRadius: 15,
                padding: 20,
              },
              bodyContainer,
            ]}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 15,
              }}>
              <Image
                source={require('../assests/timeover.png')}
                style={{height: 100, width: 100}}
              />
            </View>
            <Text
              style={{
                color: '#000',
                fontWeight: '500',
                fontSize: 16,
                textAlign: 'center',
                paddingBottom: 10,
              }}>
              {`Your Current Plan has been expired.\nPlease Renew`}
            </Text>
            <CustomButton title="Upgrade" onButtonPress={onUpgradePress} />
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default memo(TimeOutModal);
