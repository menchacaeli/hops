import React, {useState, useEffect} from 'react';
import Tabs from './src/tabs/index.js';
import Landing from './src/landing/Landing.js';

const App: () => React$Node = () => {
  const [hasAccess, setHasAccess] = useState(false);
  useEffect(() => {
    // axios user auth from api
    // then -> setAccess(true);
    // then -> setAccess(false);
  });
  return <>{hasAccess ? <Tabs /> : <Landing />}</>;
};

export default App;
