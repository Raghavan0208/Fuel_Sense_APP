import React, {memo} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

type Props = {
  onCancelPress: () => void;
  onConfirmPress: () => void;
};

const ModalFooter = ({onCancelPress, onConfirmPress}: Props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
      }}>
      <TouchableOpacity
        onPress={onCancelPress}
        hitSlop={{top: 10, right: 10, left: 10, bottom: 10}}>
        <Text style={{color: '#D74C4C', fontSize: 18, paddingTop: 10}}>
          Cancel
        </Text>
      </TouchableOpacity>
      <View style={{backgroundColor: '#cdcdcd', width: 1, height: 50}} />
      <TouchableOpacity
        onPress={onConfirmPress}
        hitSlop={{top: 10, right: 10, left: 10, bottom: 10}}>
        <Text style={{color: '#277ab8', fontSize: 18, paddingTop: 10}}>
          Submit
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default memo(ModalFooter);
