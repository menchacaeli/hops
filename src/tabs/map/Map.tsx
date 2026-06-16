import React, { useCallback } from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { FontAwesome5 } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import useBreweries from '../../hooks/useBreweries';
import type { Brewery } from '../../data';

const Map = () => {
  const { breweries, load } = useBreweries();

  useFocusEffect(useCallback(() => { load(); }, [load]));

  return (
    <View className="flex-1 bg-amber-50 dark:bg-[#0C0A06]">
      <MapView
        style={{ flex: 1 }}
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
            <View className="bg-amber-500 dark:bg-amber-400 rounded-full p-2">
              <FontAwesome5 name="beer" size={20} color="#ffffff" />
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

export default Map;
