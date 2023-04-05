import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNavigation from './BottomTabNavigation';
import AuthNavigation from './AuthNavigation';

const RootStack = createNativeStackNavigator();

const RootNavigation = () => {
  const [isLogin] = useState(false);

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {isLogin ? (
        <RootStack.Screen
          name="BottomTabNavigation"
          component={BottomTabNavigation}
        />
      ) : (
        <RootStack.Screen name="AuthNavigation" component={AuthNavigation} />
      )}
    </RootStack.Navigator>
  );
};

export default RootNavigation;
