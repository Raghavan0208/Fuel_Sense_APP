import {
  View,
  Text,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  ViewProps,
} from 'react-native';
import React, {memo, ReactNode} from 'react';
import Modal from 'react-native-modal';

type Props = {
  showModal: boolean;
  setShowModal: (a: boolean) => void;
  mainContainer?: StyleProp<ViewStyle>;
  onBackGroundPress: ((event: GestureResponderEvent) => void) | undefined;
  children?: ReactNode;
  bodyContainer?: StyleProp<ViewStyle> | undefined;
};

const CustomModal = ({
  showModal,
  setShowModal,
  mainContainer,
  onBackGroundPress,
  children,
  bodyContainer,
}: Props) => {
  return (
    <Modal
      backdropTransitionOutTiming={500}
      isVisible={showModal}
      useNativeDriver
      useNativeDriverForBackdrop
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
        <TouchableOpacity
          style={[bodyContainer]}
          activeOpacity={1}
          onPress={() => {}}>
          {children}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default memo(CustomModal);
