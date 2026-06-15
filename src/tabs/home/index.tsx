import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesome5 } from '@expo/vector-icons';
import Home from './Home';
import UpcomingEventsReleases from './stack/UpcomingEventsReleases';
import TopRatedBeers from './stack/TopRatedBeers';
import TopRatedBreweries from './stack/TopRatedBreweries';

type Props = {
  signout: () => void;
};

const Stack = createNativeStackNavigator();

const HomeStack = ({ signout }: Props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Discover"
        component={Home}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={signout} style={{ marginRight: 4 }}>
              <FontAwesome5 name="sign-out-alt" size={20} color="#71bc78" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="Upcoming Events & Releases" component={UpcomingEventsReleases} />
      <Stack.Screen name="Top Rated Beers" component={TopRatedBeers} />
      <Stack.Screen name="Top Rated Breweries" component={TopRatedBreweries} />
    </Stack.Navigator>
  );
};

export default HomeStack;
