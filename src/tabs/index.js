import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon, View} from 'native-base';
import HomeStack from './home/index.js';
import Map from './map/Map.js';
import Beers from './beers/Beers.js';
import Breweries from './breweries/Breweries.js';

const Tab = createBottomTabNavigator();

const AppTab = ({handleSignOut}) => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === 'Discover') {
              iconName = 'search';
            } else if (route.name === 'Map') {
              iconName = 'map';
            } else if (route.name === 'Beers') {
              iconName = 'list';
            } else if (route.name === 'Breweries') {
              iconName = 'list';
            }

            return (
              <Icon
                type="FontAwesome"
                style={{fontSize: size, color: color}}
                name={iconName}
              />
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: '#71bc78', //fern
          inactiveTintColor: '#919c92', //fern gray tone
        }}>
        <Tab.Screen name="Discover">
          {props => <HomeStack {...props} signout={handleSignOut} />}
        </Tab.Screen>
        <Tab.Screen name="Beers" component={Beers} />
        <Tab.Screen name="Breweries" component={Breweries} />
        <Tab.Screen name="Map" component={Map} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppTab;
