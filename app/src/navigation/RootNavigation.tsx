import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Auth from '@/screen/Auth';
import Home from '@/screen/Home';

const RootStack = createNativeStackNavigator();

const RootNavigation = () => {
  const [auth] = useState(false);
  return (
    <RootStack.Navigator>
      {auth ? (
        <RootStack.Screen name="bottomTab" component={Home} />
      ) : (
        <RootStack.Screen name="인증" component={Auth} />
      )}
    </RootStack.Navigator>
  );
};

export default RootNavigation;
