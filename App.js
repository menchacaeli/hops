import './global.css';
// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import TabNavigator from './src/tabs';
import Landing from './src/landing/Landing';
import useAuth from './src/hooks/useAuth';

export default function App() {
  const { user, loading, login, createAccount, logout } = useAuth();

  if (loading) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        {user ? (
          <TabNavigator signout={logout} />
        ) : (
          <Landing login={login} createAccount={createAccount} />
        )}
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
