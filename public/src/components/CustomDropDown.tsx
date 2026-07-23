import {
  View,
  Text,
  StyleSheet,
  Image,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React, {memo, useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';

type props = {
  data?: any;
  value?: string;
  setValue?: (a: string) => void;
  placeholder?: string;
  imageSrc?: string;
  setCarId?: (a: number) => void;
  customStyle?: StyleProp<ViewStyle>;
};
const CustomDropDown = ({
  data,
  value,
  setValue,
  placeholder = '',
  imageSrc,
  setCarId,
  customStyle,
}: props) => {
  const displayNames = data?.map(
    (item: {displayName: any}) => item.displayName,
  );

  const vehicleType = displayNames?.map((item: any) => ({
    label: item,
    value: item,
  }));
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const onChange = (items: any) => {
    const singleData = data?.find(
      (item: any) => item?.displayName == items?.value,
    );
    setCarId && setCarId(singleData?.id);
    setValue && setValue(items?.value);
  };
  const renderItem = (item: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.label}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View>
        {imageSrc && (
          <View style={{position: 'absolute', top: 20, left: 20}}>
            <Image
              source={imageSrc || require('../assests/cars.png')}
              style={{height: 20, width: 20}}
            />
          </View>
        )}
        <Dropdown
          style={[
            styles.dropdown,
            isFocus && {borderColor: 'blue'},
            customStyle,
          ]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={vehicleType}
          search
          maxHeight={300}
          renderItem={renderItem}
          labelField="label"
          valueField="value"
          searchPlaceholder="Search..."
          placeholder={placeholder}
          value={value}
          // onFocus={() => setIsFocus(true)}
          // onBlur={() => setIsFocus(false)}
          onChange={onChange}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'none',
  },
  dropdown: {
    height: 46,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#aaa',
    marginTop: 8,
    paddingHorizontal: 8,
    paddingLeft: 50,
    marginBottom: 8,
    color: '#000',
  },
  icon: {
    marginRight: 8,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: -8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    color: '#000',
  },
  placeholderStyle: {
    fontSize: 14,
    color: 'gray',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: '#000',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: '#000',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  item: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 16,
    color: '#000', // Change this to your desired color
  },
});

export default memo(CustomDropDown);
