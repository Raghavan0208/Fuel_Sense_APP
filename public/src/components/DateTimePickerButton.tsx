import React, { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

interface DateTimePickerButtonProps {
  label: string;
  value: Date | null;
  onConfirm: (date: Date) => void;
}

const DateTimePickerButton: React.FC<DateTimePickerButtonProps> = ({ label, value, onConfirm }) => {
  const [isPickerVisible, setPickerVisible] = useState(false);

  console.log('value', value);

  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setPickerVisible(true)}
      >
        <Text
          style={[
            styles.text,
            !value && { color: '#00000080' } // Apply red color when value is null
          ]}
        >
          {value ? moment(value).format('DD-MM-YYYY hh:mm A') : label}
        </Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isPickerVisible}
        mode="datetime"
        
        onConfirm={(date) => {
          onConfirm(date);
          setPickerVisible(false);
        }}
        onCancel={() => setPickerVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#aaa',
    marginTop: 8,
    paddingVertical: 13,
    marginBottom: 10
  },
  text: {
    flex: 1,
    paddingHorizontal: 12,
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default DateTimePickerButton;
