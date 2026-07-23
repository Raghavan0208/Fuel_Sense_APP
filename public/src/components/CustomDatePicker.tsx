import {View, Text} from 'react-native';
import React, {memo, useState} from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CustomTextInput from './CustomTextInput';

type props = {
  regiDate?: string;
  setRegiDate?: (a: string) => void;
  isDatePicker?: boolean;
  setIsDatePicker?: (a: boolean) => void;
};
const CustomDatePicker = ({
  regiDate,
  setRegiDate,
  isDatePicker,
  setIsDatePicker,
}: props) => {
  const showDatePicker = () => {
    setIsDatePicker && setIsDatePicker(true);
  };

  const hideDatePicker = () => {
    setIsDatePicker && setIsDatePicker(false);
  };

  const handleConfirm = (date: Date) => {
    setRegiDate && setRegiDate(date.toISOString());
    hideDatePicker();
  };
  return (
    <View>
      <DateTimePickerModal
        isVisible={isDatePicker}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default memo(CustomDatePicker);
