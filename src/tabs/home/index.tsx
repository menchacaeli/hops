import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BlurView } from 'expo-blur';
import Home from './Home';
import UpcomingEventsReleases from './stack/UpcomingEventsReleases';
import TopRatedBeers from './stack/TopRatedBeers';
import TopRatedBreweries from './stack/TopRatedBreweries';
import { theme } from '../../styles/theme';

type HomeStackParamList = {
  Discover: undefined;
  'Upcoming Events & Releases': undefined;
  'Top Rated Beers': undefined;
  'Top Rated Breweries': undefined;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

const GlassLayer = () => {
  if (Platform.OS === 'ios') {
    return (
      <View style={StyleSheet.absoluteFill}>
        <BlurView tint="default" intensity={74} style={StyleSheet.absoluteFill} />
        <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(246,241,232,0.28)' }]} />
      </View>
    );
  }
  return <View style={[StyleSheet.absoluteFill, { backgroundColor: theme.color.glassLight }]} />;
};

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: false,
        headerBackground: () => <GlassLayer />,
        headerShadowVisible: false,
        headerTintColor: theme.color.text,
        headerTitleAlign: 'center',
        headerTitleStyle: { color: theme.color.text, fontWeight: '600' },
        headerStyle: { backgroundColor: 'transparent' },
      }}>
      <Stack.Screen
        name="Discover"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Upcoming Events & Releases" component={UpcomingEventsReleases} />
      <Stack.Screen name="Top Rated Beers" component={TopRatedBeers} />
      <Stack.Screen name="Top Rated Breweries" component={TopRatedBreweries} />
    </Stack.Navigator>
  );
};

export default HomeStack;
