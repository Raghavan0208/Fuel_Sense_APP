import React, {memo} from 'react';
import {Dimensions, View} from 'react-native';
import {StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const GOOGLE_MAPS_APIKEY = 'AIzaSyClEJhfMqEtTy6dcofhkDL1RvfhVTO2wss';

const route1 = [
  {latitude: 23.0225, longitude: 72.5714}, // Ahmedabad
  {latitude: 22.9868, longitude: 72.5086}, // Sanand
  {latitude: 22.7662, longitude: 72.2457}, // Limbdi
  {latitude: 22.4715, longitude: 71.9911}, // Chotila
  {latitude: 22.3081, longitude: 71.9438}, // Wankaner
  {latitude: 22.3039, longitude: 70.8022}, // Rajkot
];

const route2 = [
  {latitude: 23.0225, longitude: 72.5714}, // Ahmedabad
  {latitude: 22.9916, longitude: 72.4538}, // Sarkhej
  {latitude: 22.7558, longitude: 71.9029}, // Limbdi
  {latitude: 22.602, longitude: 71.8212}, // Paddhari
  {latitude: 22.3039, longitude: 70.8022}, // Rajkot
];

const route3 = [
  {latitude: 23.0225, longitude: 72.5714}, // Ahmedabad
  {latitude: 22.976, longitude: 72.4748}, // Changodar
  {latitude: 22.672, longitude: 71.9708}, // Dasada
  {latitude: 22.36, longitude: 71.7991}, // Maliya
  {latitude: 22.3039, longitude: 70.8022}, // Rajkot
];

const Demo: React.FC = () => {
  return (
    <View style={styles.root}>
      <MapView
        provider="google"
        initialRegion={{
          latitude: 23.0225,
          longitude: 72.5714,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.map}>
        <Marker coordinate={route1[0]} />
        <Marker coordinate={route1[route1?.length - 1]} />
        <MapViewDirections
          mode={'DRIVING'}
          origin={route1[0]}
          waypoints={route1}
          destination={route1[route1?.length - 1]}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={4}
          strokeColor="#11386b"
          optimizeWaypoints={true}
        />
        <Marker coordinate={route2[0]} />
        <Marker coordinate={route2[route2?.length - 1]} />
        <MapViewDirections
          mode={'DRIVING'}
          origin={route2[0]}
          waypoints={route2}
          destination={route2[route2?.length - 1]}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={4}
          strokeColor="#68075d"
          optimizeWaypoints={true}
        />
        <Marker coordinate={route3[0]} />
        <Marker coordinate={route3[route3?.length - 1]} />
        <MapViewDirections
          mode={'DRIVING'}
          origin={route3[0]}
          waypoints={route3}
          destination={route3[route3?.length - 1]}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={4}
          strokeColor="#e340fc"
          optimizeWaypoints={true}
        />
      </MapView>
    </View>
  );
};

export default memo(Demo);

const styles = StyleSheet.create({
  root: {
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
