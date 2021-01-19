import React from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'react-native';

const MapMarker = () => {
  return <View styles={styles.marker} />;
};

const styles = StyleSheet.create({
  marker: {
    borderRadius: 50,
  },
});

export default MapMarker;
