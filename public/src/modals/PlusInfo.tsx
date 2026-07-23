import {Image} from 'native-base';
import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import {
  Dimensions,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export type PlusModalRef = {
  show: (num: number) => void;
  hide: () => void;
};

type Props = {
  onPress?: () => void;
};

const PlusInfo = forwardRef<PlusModalRef, Props>(({onPress}, ref) => {
  const {top} = useSafeAreaInsets();
  const [visible, setVisible] = useState<{visible: boolean; height: number}>({
    visible: false,
    height: 0,
  });

  const hideModal = useCallback(() => {
    setVisible({height: 0, visible: false});
  }, []);

  const showModal = useCallback((num: number) => {
    setVisible({visible: true, height: num});
  }, []);

  useImperativeHandle(
    ref,
    () => {
      return {
        hide: hideModal,
        show: showModal,
      };
    },
    [],
  );

  const onPlusPress = useCallback(() => {
    hideModal();
    setTimeout(() => {
      onPress?.call(null);
    }, 500);
  }, [onPress]);

  return (
    <Modal
      visible={visible?.visible}
      onDismiss={hideModal}
      onRequestClose={hideModal}
      transparent>
      <Pressable onPress={hideModal} style={styles.overlay}>
        <View
          style={{
            position: 'absolute',
            top: visible?.height + 40,
            width: '90%',
            paddingVertical: 24,
            backgroundColor: 'white',
            alignSelf: 'center',
            borderRadius: 12,
            paddingHorizontal: 12,
            borderWidth: 2,
            borderColor: '#2f75b5',
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: '#2f75b5',
              fontSize: 15,
            }}>
            To download the report and preview the summary on the app, simply
            tap the button below:
          </Text>
          <Text
            style={{
              textAlign: 'center',
              color: '#2f75b5',
              fontSize: 16,
              marginTop: 12,
              fontWeight: '700',
            }}>
            Download Report and Preview Summary
          </Text>
        </View>
        <Pressable
          onPress={onPlusPress}
          style={{
            top: visible?.height - 13,
            end: 2,
            height: 50,
            width: 50,
            borderRadius: 100,
            position: 'absolute',
            backgroundColor: 'white',
          }}
        />
        <View
          style={{
            top: visible?.height,
            height: 28,
            width: 28,
            end: 10,
            position: 'absolute',
          }}>
          <Pressable
            onPress={onPlusPress}
            style={{
              borderWidth: 2,
              borderColor: 'black',
              borderRadius: 100,
              padding: 2,
              aspectRatio: 1,
              height: 24,
              width: 24,
            }}>
            <Image
              source={require('../assests/plus1.png')}
              style={{
                height: '100%',
                width: '100%',
              }}
              resizeMode="contain"
            />
          </Pressable>
          <View
            style={{
              position: 'absolute',
              end: -2,
              top: -6,
              borderRadius: 100,
              backgroundColor: '#2f75b5',
              height: 16,
              width: 16,
              paddingLeft: 7,
            }}>
            <Text
              style={{
                fontSize: 10,
                height: 14,
                color: 'white',
                marginTop: Platform.OS === 'android' ? 1 : 2,
              }}>
              i
            </Text>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
});

export default memo(PlusInfo);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
