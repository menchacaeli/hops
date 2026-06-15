import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { FontAwesome5 } from '@expo/vector-icons';

const MARKERS = [
  {
    latlng: { latitude: 35.1463168, longitude: -106.6905535 },
    title: 'La Cumbre Westside Taproom',
    description: '5600 Coors Blvd NW c1, Albuquerque, NM 87120',
  },
];

const Map = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        followUserLocation={false}
        zoomEnabled={true}
        initialRegion={{
          latitude: 35.146154,
          longitude: -106.688349,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {MARKERS.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}>
            <FontAwesome5 name="beer" size={20} color="#71bc78" />
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6fbf7',
  },
  map: {
    flex: 1,
  },
});

export default Map;
