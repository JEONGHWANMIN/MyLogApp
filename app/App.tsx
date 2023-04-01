import React from 'react';
import RootNavigation from '@/navigation/RootNavigation';
import {NavigationContainer} from '@react-navigation/native';

function App(): JSX.Element {
  return (
    <>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </>
  );
}

export default App;
