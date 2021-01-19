import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './Home.js';
import UpcomingEventsReleases from './stack/UpcomingEventsReleases.js';
import TopRatedBeers from './stack/TopRatedBeers.js';
import TopRatedBreweries from './stack/TopRatedBreweries.js';

const HomeStack = createStackNavigator();

const AppStack = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Discover" component={Home} />
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

export default AppStack;
