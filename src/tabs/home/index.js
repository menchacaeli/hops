import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './Home.js';
import UpcomingEventsReleases from './stack/UpcomingEventsReleases.js';
import TopRatedBeers from './stack/TopRatedBeers.js';
import TopRatedBreweries from './stack/TopRatedBreweries.js';

import { Text } from 'react-native';
import { Button, Icon } from 'native-base';
const HomeStack = createStackNavigator();

const AppStack = ({signout}) => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Discover" component={Home} options={{
        headerRight: () => logout(signout)
      }} />
      <HomeStack.Screen
        name="Upcoming Events & Releases"
        component={UpcomingEventsReleases}
      />
      <HomeStack.Screen name="Top Rated Beers" component={TopRatedBeers} />
      <HomeStack.Screen
        name="Top Rated Breweries"
        component={TopRatedBreweries}
      />
    </HomeStack.Navigator>
  );
};

const logout = (signout) => {
  return (
    <Icon
      type="FontAwesome"
      style={{marginRight: 8, color: '#71bc78'}}
      onPress={() =>  signout()}
      name={'sign-out'}
    />
  )
}
export default AppStack;
