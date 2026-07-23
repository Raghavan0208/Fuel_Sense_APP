/* eslint-disable prettier/prettier */
import React, { memo, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  GestureResponderEvent,
  Animated,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

type Props = {
  title: string;
  isLoading?: boolean | undefined;
  onButtonPress?: ((event: GestureResponderEvent) => void) | undefined;
  containerStyle?: StyleProp<ViewStyle> | undefined;
  textStyle?: StyleProp<TextStyle> | undefined;
};

const CustomButton = ({
  title,
  isLoading,
  onButtonPress,
  containerStyle,
  textStyle,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onButtonPress}
      style={[
        // eslint-disable-next-line react-native/no-inline-styles
        {
          backgroundColor: 'black',
          height: 45,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10,
          paddingHorizontal: 20,
          width: '100%',
        },
        containerStyle,
      ]}>
      {!isLoading ? (
        <TouchableOpacity onPress={onButtonPress} activeOpacity={1}>
          <Text
            style={[
              { color: '#fff', fontWeight: '900', fontSize: 15, fontFamily: 'fraunces' },
              textStyle,
            ]}>
            {title}
          </Text>
        </TouchableOpacity>
      ) : (
        <ActivityIndicator color={'#fff'} />
      )}
    </TouchableOpacity>
  );
};

export default memo(CustomButton);
