import React, {useState, useEffect} from 'react';
import Landing from './src/landing/Landing.js';
import store from './src/redux/store.js';
import {Provider} from 'react-redux';

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <Landing />
    </Provider>
  );
};

export default App;
