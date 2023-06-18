import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNavigation from './BottomTabNavigation';
import AuthNavigation from './AuthNavigation';

import SplashScreen from '@/screens/SplashScreen/SplashScreen';

const RootStack = createNativeStackNavigator();

const RootNavigation = () => {
  return (
    <RootStack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <RootStack.Screen name="SplashScreen" component={SplashScreen} />
      <RootStack.Screen name="AuthNavigation" component={AuthNavigation} />
      <RootStack.Screen
        name="BottomTabNavigation"
        component={BottomTabNavigation}
      />
    </RootStack.Navigator>
  );
};

export default RootNavigation;
