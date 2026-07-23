/* eslint-disable prettier/prettier */
import React, {memo, useEffect, useMemo, useState} from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import CalenderModal from './CalenderModal'; // Adjust the path as needed
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';

interface CalendarFilterProps {
  setListData2: any;
  setListData: any;
  journeyReading: any;
}

const CalendarFilter: React.FC<CalendarFilterProps> = ({
  setListData2,
  setListData,
  journeyReading,
}) => {
  const onFilterPress = () => {
    setDatePicker(true);
  };
  const [datePicker, setDatePicker] = useState(false);
  const [listOfDate, setListOfDate] = useState<string[]>([]);

  const navigation = useNavigation();
  const filteredData = useMemo(() => {
    return listOfDate.length === 0
      ? journeyReading
      : journeyReading.filter((item: {entryDate: moment.MomentInput}) =>
          listOfDate.includes(moment(item.entryDate).format('YYYY-MM-DD')),
        );
  }, [listOfDate]);

  useEffect(() => {
    const data = filteredData;
    setListData(data);
    setListData2(data);
  }, [filteredData]);
  return (
    <>
      <CalenderModal
        showModal={datePicker}
        onBackGroundPress={() => setDatePicker(false)}
        setShowModal={setDatePicker}
        listOfDate={listOfDate}
        setListOfDate={setListOfDate}
      />
      <View
        hitSlop={{top: 50, right: 10, bottom: 10, left: 10}}
        style={styles.filterButton}>
        <TouchableOpacity
          style={{marginEnd: 10}}
          onPress={() => navigation.navigate('SmartDriveTrip')}>
          {/* <Image
            alt="drive"
            source={require('../assests/smartDriveIcon.png')} // Adjust the path as needed
            style={styles.carIcon}
          /> */}
        </TouchableOpacity>
        <TouchableOpacity onPress={onFilterPress}>
          <Image
            alt="filter"
            source={require('../assests/filter.png')} // Adjust the path as needed
            style={styles.filterIcon}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  filterButton: {
    position: 'absolute',
    top: -40,
    right: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },

  filterIcon: {
    height: 20,
    width: 20,
  },
  carIcon: {
    height: 27,
    width: 27,
    marginBottom: 1,
  },
});

export default memo(CalendarFilter);
