import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import TabNavigator from './src/tabs';
import Landing from './src/landing/Landing';

export default function App() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('token')
      .then(stored => setToken(stored))
      .finally(() => setLoading(false));
  }, []);

  const handleSignOut = () => {
    AsyncStorage.removeItem('token').then(() => setToken(null));
  };

  if (loading) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        {token ? (
          <TabNavigator signout={handleSignOut} />
        ) : (
          <Landing setToken={setToken} />
        )}
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
