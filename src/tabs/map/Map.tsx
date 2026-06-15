import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { FontAwesome5 } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import useBreweries from '../../hooks/useBreweries';
import type { Brewery } from '../../data';

const Map = () => {
  const { breweries, load } = useBreweries();

  useFocusEffect(useCallback(() => { load(); }, [load]));

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
          latitudeDelta: 0.15,
          longitudeDelta: 0.15,
        }}>
        {breweries.map((brewery: Brewery) => (
          <Marker
            key={brewery.id}
            coordinate={brewery.location}
            title={brewery.name}
            description={brewery.address}>
            <FontAwesome5 name="beer" size={20} color="#71bc78" />
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6fbf7' },
  map: { flex: 1 },
});

export default Map;
