import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './home/Home';
import Beers from './beers/Beers';
import Breweries from './breweries/Breweries';
import MapScreen from './map/Map';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Discover" component={Home} />
      <Tab.Screen name="Beers" component={Beers} />
      <Tab.Screen name="Breweries" component={Breweries} />
      <Tab.Screen name="Map" component={MapScreen} />
    </Tab.Navigator>
  );
}
