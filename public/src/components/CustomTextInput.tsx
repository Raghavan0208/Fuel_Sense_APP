import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardTypeOptions,
  StyleProp,
  ViewStyle,
  TextStyle,
  Image,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  TouchableOpacity,
  GestureResponderEvent,
  ImageSourcePropType,
} from 'react-native';
import React, { RefObject, memo } from 'react';
type props = {
  placeHolder: string;
  defaultValue?: string | undefined;
  keyboardType?: KeyboardTypeOptions | undefined;
  onValueChange?: ((text: string) => void) | undefined;
  value?: string | undefined;
  secureTextEntry?: boolean | undefined;
  setRef?: RefObject<TextInput> | any;
  maxLength?: number | undefined;
  containerStyle?: StyleProp<ViewStyle> | undefined;
  textInputContainer?: StyleProp<ViewStyle> | undefined;
  textInputStyle?: StyleProp<TextStyle> | undefined;
  passwordVisible?: boolean | undefined;
  onSubmitEditing?:
  | ((e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void)
  | undefined;
  onImagePress?: ((event: GestureResponderEvent) => void) | undefined;
  isSubmited?: boolean | undefined;
  icon?: ImageSourcePropType;
  errorMessage?: string | undefined;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  editable?: boolean;
  multiline?: boolean;
};
const CustomTextInput = ({
  placeHolder,
  defaultValue,
  keyboardType,
  value,
  onValueChange,
  secureTextEntry,
  setRef,
  maxLength,
  containerStyle,
  textInputContainer,
  textInputStyle,
  passwordVisible,
  onSubmitEditing,
  onImagePress,
  isSubmited,
  icon,
  errorMessage,
  onPress,
  editable = true,
  multiline,
}: props) => {
  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress}>
      <View style={[styles.container, containerStyle]}>
        <View
          style={[
            styles.textInputContainer,
            { borderColor: isSubmited && value?.length == 0 ? 'red' : '#aaa' },
            textInputContainer,
          ]}>
          {icon && (
            <View style={{ alignItems: 'center', marginLeft: 15 }}>
              <Image source={icon} style={{ height: 20, width: 20 }} />
            </View>
          )}
          <TextInput
            editable={editable}
            onPressIn={onPress ? onPress : undefined}
            cursorColor="#000"
            ref={setRef}
            placeholder={placeHolder}
            autoCapitalize="none"
            placeholderTextColor={'#00000080'}
            defaultValue={defaultValue}
            keyboardType={keyboardType}
            value={value}
            multiline={multiline}
            numberOfLines={multiline ? 3 : undefined}
            onChangeText={onValueChange}
            secureTextEntry={secureTextEntry}
            maxLength={maxLength}
            style={[
              styles.textInputStyle,
              {
                fontWeight: value && value?.length > 0 ? '500' : '400',
                color: value && value?.length > 0 ? '#000' : '#aaa',
                height: multiline ? 80 : 45,
                textAlignVertical: multiline ? 'top' : undefined,
                paddingTop: multiline ? 5 : 0,
              },
              textInputStyle,
            ]}
            onSubmitEditing={onSubmitEditing}
          />
          {onImagePress && (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={onImagePress}
              style={styles.imageContainer}>
              <Image
                source={
                  passwordVisible
                    ? require('../assests/showpass.png')
                    : require('../assests/hidepass.png')
                }
                style={styles.imageStyle}
              />
            </TouchableOpacity>
          )}
        </View>
        {isSubmited && value?.length == 0 && (
          <Text style={{ color: 'red', marginTop: 2 }}>
            {errorMessage ? errorMessage : placeHolder + ' Cannot be empty'}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default memo(CustomTextInput);
export const styles = StyleSheet.create({
  headerText: {
    color: '#000',
    fontWeight: '500',
  },
  container: { marginBottom: 10 },
  textInputContainer: {
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#aaa',
    marginTop: 8,
  },
  textInputStyle: {
    flex: 1,
    paddingHorizontal: 12,
    color: '#000',
    paddingVertical: 0,
    fontSize: 14,
    fontWeight: '500',
  },
  imageStyle: {
    height: 20,
    width: 20,
  },
  imageContainer: {
    paddingHorizontal: 10,
    paddingRight: 15,
  },
});
