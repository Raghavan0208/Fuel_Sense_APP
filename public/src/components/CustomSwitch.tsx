/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable quotes */
import React, { useEffect, useRef, useState } from "react";
import { Pressable, Animated, StyleSheet, View, Text } from "react-native";

type CustomSwitchProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
  onText: string;
  offText: string;
  isDisabled?: boolean;
};

const CustomSwitch = ({ value, onValueChange, onText, offText, isDisabled = false }: CustomSwitchProps) => {
  const translateX = useRef(new Animated.Value(value ? 24 : 0)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: value ? 24 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [value]);

  const toggleSwitch = () => {
    if (!isDisabled) {
      onValueChange(!value);
    }
  };

  return (
    <Pressable onPress={toggleSwitch}
      style={[styles.container, value ? styles.trackOn : styles.trackOff, isDisabled && styles.trackDisabled]}
      disabled={isDisabled}>
      <View style={styles.textContainer}>
        <Text style={[styles.text, value ? styles.textOn : styles.textOff]}>{onText}</Text>
        <Text style={[styles.text, !value ? styles.textOff : styles.textOn]}>{offText}</Text>
      </View>
      <Animated.View
        style={[
          styles.thumb,
          { transform: [{ translateX }] },
          isDisabled && styles.thumbDisabled,
        ]}
      />
    </Pressable>
  );
};

export default CustomSwitch;

const styles = StyleSheet.create({
  container: {
    width: 55, // Total width of the switch
    height: 30, // Height of the switch track
    borderRadius: 20, // Rounded edges for the track
    justifyContent: "center",
    padding: 2,
  },
  trackOn: {
    backgroundColor: "black", // Pink track when enabled
  },
  trackOff: {
    backgroundColor: "#e4e7eb", // Gray track when disabled
  },
  thumb: {
    width: 25, // Thumb width
    height: 25, // Thumb height
    // marginLeft: 5,
    borderRadius: 12, // Rounded edges for the thumb
    backgroundColor: "#ffffff", // White thumb
    shadowColor: "#ffffff", // iOS-like shadow
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.5,
    elevation: 3, // Shadow for Android
  },
  textContainer: {
    position: "absolute",
    width: '100%',
    height: '100%',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 4, // Padding for text
  },
  text: {
    fontSize: 10, // Text size
    fontWeight: "600",
  },
  textOn: {
    color: "#ffe1a5", // White text for active state
  },
  textOff: {
    color: "#9da6ae", // Gray text for inactive state
  },
  thumbDisabled: {
    backgroundColor: "#fefefe", // Disabled thumb color
  },
  trackDisabled: {
    backgroundColor: "#f1f4f7", // Disabled track color
  },

});
