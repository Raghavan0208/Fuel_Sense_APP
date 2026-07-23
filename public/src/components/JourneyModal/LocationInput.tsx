import React, {useEffect, useState, forwardRef, memo} from 'react';
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from 'react-native-google-places-autocomplete';
import {Appearance} from 'react-native';

const GOOGLE_MAPS_APIKEY = 'AIzaSyClEJhfMqEtTy6dcofhkDL1RvfhVTO2wss';

type Props = {
  placeholder: string;
  onPress: (data: any, details: any) => void;
  location?: string;
};

const LocationInput = forwardRef<GooglePlacesAutocompleteRef, Props>(
  ({placeholder, onPress, location}, ref) => {
    const [inputValue, setInputValue] = useState(location || '');

    // Update input value based on location prop on initial mount or when it changes
    useEffect(() => {
      setInputValue(location || '');
    }, []);

    const handleInputChange = (text: string) => {
      setInputValue(text); // Update input value
    };

    return (
      <GooglePlacesAutocomplete
        ref={ref}
        fetchDetails={true}
        placeholder={placeholder}
        onPress={onPress}
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: 'en',
        }}
        textInputProps={{
          value: inputValue,
          onChangeText: handleInputChange,
          clearButtonMode: 'while-editing', // Show clear button on iOS
          // onFocus: () => {
          //   // This ensures that when the input is focused, any existing value is preserved.
          //   setInputValue(inputValue);
          // },
        }}
        styles={{
          textInput: {
            height: 46,
            borderRadius: 10,
            borderWidth: 1,
            flexDirection: 'row',
            alignItems: 'center',
            borderColor: '#aaa',
            marginTop: 8,
          },
          powered: {
            display: 'none',
            height: 1,
          },
          row: {
            padding: 13,
            height: 44,
            flexDirection: 'row',
            backgroundColor:
              Appearance.getColorScheme() === 'dark' ? 'black' : 'white',
          },
        }}
      />
    );
  },
);

export default memo(LocationInput);
