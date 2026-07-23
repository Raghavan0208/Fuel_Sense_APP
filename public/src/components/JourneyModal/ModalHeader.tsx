import React, {memo} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

type Props = {
  title: string;
  onClose?: () => void;
};

const ModalHeader = ({title, onClose}: Props) => {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <Text
        style={{
          fontWeight: '700',
          color: '#000',
          fontSize: 20,
          padding: 5,
          paddingBottom: 10,
        }}>
        {title}
      </Text>
      {onClose && (
        <TouchableOpacity
          onPress={onClose}
          hitSlop={{top: 10, right: 10, left: 10, bottom: 10}}>
          <Image
            source={require('../../assests/plus1.png')}
            style={{
              height: 18,
              width: 18,
              tintColor: '#aaa',
              transform: [{rotate: '45deg'}],
            }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default memo(ModalHeader);
