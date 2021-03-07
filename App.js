import React, {useState, useEffect} from 'react';
import Tabs from './src/tabs/index.js';
import Landing from './src/landing/Landing.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {get} from './helpers/fetchRequests';
const getToken = () => {
  return AsyncStorage.getItem('user_token')
    .then((token) => {
      return token;
    })
    .catch((error) => {
      console.log({asyncTokenError: error});
      return null;
    });
};

const App: () => React$Node = () => {
  const [token, setToken] = useState(false);
  useEffect(() => {
    getToken().then((token) => {
      if (token) {
        setToken(token);
      }
    });
  });
  const signout = () => {
    get('auth/signout').then((status) => {
      AsyncStorage.removeItem('user_token').catch((err) =>
        console.log({error: err}),
      );
      setToken(null);
    });
  };
  return (
    <>
      {token ? (
        <Tabs handleSignOut={signout} />
      ) : (
        <Landing setToken={setToken} />
      )}
    </>
  );
};

export default App;
