import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {Container, Content} from 'native-base';
import {Icon} from 'native-base';

const Map = () => {
  const [markers] = useState([
    {
      latlng: {
        latitude: 35.1463168,
        longitude: -106.6905535,
      },
      title: 'La Cumbre Westside Taproom',
      description: '5600 Coors Blvd NW c1, Albuquerque, NM 87120',
    },
  ]);
  return (
    <Container style={styles.container}>
      <Content contentContainerStyle={styles.content}>
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
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}>
              <Icon active type="FontAwesome5" name="beer" />
            </Marker>
          ))}
        </MapView>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f6fbf7',
  },
  content: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default Map;
