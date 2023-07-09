import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNavigation from './BottomTabNavigation';
import AuthNavigation from './AuthNavigation';

import SplashScreen from '@/screens/SplashScreen/SplashScreen';
import Write from '@/screens/BottomTab/Write';

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
      <RootStack.Screen name="BottomTabNavigation" component={BottomTabNavigation} />
      {/* <RootStack.Group screenOptions={{presentation: 'modal', animation: 'simple_push'}}> */}
      <RootStack.Screen
        name="Write"
        component={Write}
        options={{
          animation: 'fade_from_bottom',
        }}
      />
      {/* </RootStack.Group> */}
    </RootStack.Navigator>
  );
};

export default RootNavigation;
