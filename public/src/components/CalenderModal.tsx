import moment from 'moment';
import React, {memo, useMemo, useState} from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {Calendar, DateData} from 'react-native-calendars';
import Modal from 'react-native-modal';
import {CURRENT_WIDTH} from '../screens/LoginScreen';
type props = {
  showModal: boolean;
  setShowModal: (a: boolean) => void;
  mainContainer?: StyleProp<ViewStyle> | undefined;
  bodyContainer?: StyleProp<ViewStyle> | undefined;
  onBackGroundPress: ((event: GestureResponderEvent) => void) | undefined;
  listOfDate?: string[];
  setListOfDate?: (a: string[]) => void;
};
const CalenderModal = ({
  showModal,
  setShowModal,
  mainContainer,
  onBackGroundPress,
  bodyContainer,
  listOfDate,
  setListOfDate,
}: props) => {
  const [dates, setDates] = useState<string[]>([]);
  const [resetDate, setResetDate] = useState<string[]>([]);

  const onCancelPress = () => {
    setShowModal(false);
    if (resetDate?.length > 0) {
      setDates(resetDate);
    }
  };
  const onResetPress = () => {
    setResetDate(dates);
    setDates([]);
  };
  const onConfirmPress = () => {
    setShowModal(false);
    setListOfDate && setListOfDate(dates);
  };

  const handleDayPress = (day: string) => {
    console.log('day pressed', day);

    if (dates.length === 0) {
      // If no date is selected, select the first date
      setDates([day]);
    } else if (dates.length === 1) {
      // If one date is already selected, calculate the range
      const firstDate = dates[0];
      const secondDate = day;

      // Compare the two dates and ensure the first date is before the second date
      const startDate = moment(firstDate).isBefore(secondDate)
        ? firstDate
        : secondDate;
      const endDate = moment(firstDate).isBefore(secondDate)
        ? secondDate
        : firstDate;

      // Generate the list of dates between the two dates (inclusive)
      const dateRange = [];
      let currentDate = moment(startDate);

      while (currentDate.isSameOrBefore(endDate)) {
        dateRange.push(currentDate.format('YYYY-MM-DD'));
        currentDate = currentDate.add(1, 'day');
      }

      // Update the state with the selected range of dates
      setDates(dateRange);
    } else {
      // Reset if more than two dates are selected (optional behavior)
      setDates([day]);
    }
  };
  const markedDates = useMemo(() => {
    return dates.reduce((acc, date, index) => {
      if (index === 0) {
        acc[date] = {
          startingDay: true,
          color: '#70d7c7',
          textColor: 'white',
          ...(dates.length === 1 && {endingDay: true}),
        };
      } else if (index === dates.length - 1) {
        // Last date
        acc[date] = {
          endingDay: true,
          color: '#70d7c7',
          textColor: 'white',
        };
      } else {
        // Middle dates
        acc[date] = {
          color: '#70d7c7',
          textColor: 'white',
        };
      }
      return acc;
    }, {});
  }, [dates]);

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
            <Calendar
              onDayPress={(day: DateData) => handleDayPress(day?.dateString)}
              markingType={'period'}
              markedDates={markedDates}
              theme={{
                'stylesheet.calendar.header': {
                  week: {
                    marginTop: 10,
                    marginBottom: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  },
                },
              }}
            />
            <View
              style={{
                height: 1,
                backgroundColor: '#cdcdcd',
                width: '100%',
                marginTop: 10,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 10,
                alignItems: 'center',
              }}>
              <TouchableOpacity
                hitSlop={{top: 10, right: 10, left: 10, bottom: 10}}
                onPress={onCancelPress}>
                <Text style={{color: '#D74C4C', fontSize: 18}}>Cancel</Text>
              </TouchableOpacity>
              <View
                style={{
                  backgroundColor: '#cdcdcd',
                  width: 1,
                  height: 50,
                }}
              />
              <TouchableOpacity
                hitSlop={{top: 10, right: 10, left: 10, bottom: 10}}
                onPress={onResetPress}>
                <Text style={{color: '#2e2f2c', fontSize: 18}}>Reset</Text>
              </TouchableOpacity>
              <View
                style={{
                  backgroundColor: '#cdcdcd',
                  width: 1,
                  height: 50,
                }}
              />
              <TouchableOpacity
                hitSlop={{top: 10, right: 10, left: 10, bottom: 10}}
                onPress={onConfirmPress}>
                <Text style={{color: '#277ab8', fontSize: 18}}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default memo(CalenderModal);
