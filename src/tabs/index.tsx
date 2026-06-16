import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import HomeStack from './home/index';
import Beers from './beers/Beers';
import Breweries from './breweries/Breweries';
import MapScreen from './map/Map';
import Profile from './profile/Profile';
import { HeaderMenuButton } from '../components/ui';
import { theme } from '../styles/theme';

type Props = {
  signout: () => void;
};

type TabParamList = {
  Discover: undefined;
  Beers: undefined;
  Breweries: undefined;
  Map: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const HeaderSideSpacer = () => <View style={{ width: 28 }} />;

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

export default function TabNavigator({ signout }: Props) {
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ color, size }) => {
          const icons: Record<string, string> = {
            Discover: 'search',
            Beers: 'list',
            Breweries: 'list',
            Map: 'map',
            Profile: 'user',
          };
          return <FontAwesome5 name={icons[route.name] ?? 'circle'} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.color.success,
        tabBarInactiveTintColor: theme.color.textMuted,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginBottom: Platform.OS === 'ios' ? 0 : 2,
        },
        tabBarIconStyle: {
          marginTop: Platform.OS === 'ios' ? 2 : 4,
        },
        tabBarItemStyle: {
          paddingTop: Platform.OS === 'ios' ? 4 : 2,
        },
        tabBarStyle: {
          position: 'absolute',
          borderTopWidth: 0,
          backgroundColor: 'transparent',
          height: Platform.OS === 'ios' ? 84 : 66,
          paddingBottom: Platform.OS === 'ios' ? 22 : 8,
          paddingTop: 6,
        },
        tabBarBackground: () => <GlassLayer />,
        headerShown: true,
        headerStyle: { backgroundColor: 'transparent' },
        headerBackground: () => <GlassLayer />,
        headerShadowVisible: false,
        headerTintColor: theme.color.text,
        headerTitleAlign: 'center',
        headerTitleStyle: { color: theme.color.text, fontWeight: '600' },
        headerLeft:
          route.name === 'Discover' || route.name === 'Beers' || route.name === 'Breweries' || route.name === 'Map'
            ? () => <HeaderSideSpacer />
            : undefined,
        headerRightContainerStyle: { paddingRight: 12 },
        headerRight:
          route.name === 'Discover' || route.name === 'Beers' || route.name === 'Breweries' || route.name === 'Map'
            ? () => (
                <HeaderMenuButton
                  onProfile={() => navigation.navigate('Profile')}
                  onSignOut={signout}
                />
              )
            : undefined,
      })}>
      <Tab.Screen
        name="Discover"
        options={({ route }) => {
          const childRoute = getFocusedRouteNameFromRoute(route);
          const showRootHeader = !childRoute || childRoute === 'Discover';
          return {
            headerShown: showRootHeader,
            title: 'Discover',
          };
        }}>
        {() => <HomeStack />}
      </Tab.Screen>
      <Tab.Screen name="Beers" component={Beers} />
      <Tab.Screen name="Breweries" component={Breweries} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarButton: () => null,
          tabBarItemStyle: { display: 'none' },
          title: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
}
