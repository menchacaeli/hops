import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import HomeStack from './home/index';
import Beers from './beers/Beers';
import Breweries from './breweries/Breweries';
import MapScreen from './map/Map';

type Props = {
  signout: () => void;
};

const Tab = createBottomTabNavigator();

export default function TabNavigator({ signout }: Props) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const icons: Record<string, string> = {
            Discover: 'search',
            Beers: 'list',
            Breweries: 'list',
            Map: 'map',
          };
          return <FontAwesome5 name={icons[route.name] ?? 'circle'} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#71bc78',
        tabBarInactiveTintColor: '#919c92',
        headerShown: false,
      })}>
      <Tab.Screen name="Discover">
        {props => <HomeStack {...props} signout={signout} />}
      </Tab.Screen>
      <Tab.Screen name="Beers" component={Beers} />
      <Tab.Screen name="Breweries" component={Breweries} />
      <Tab.Screen name="Map" component={MapScreen} />
    </Tab.Navigator>
  );
}
