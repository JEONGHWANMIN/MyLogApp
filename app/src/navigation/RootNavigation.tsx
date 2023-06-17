import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNavigation from './BottomTabNavigation';
import AuthNavigation from './AuthNavigation';
import {LocalStorage} from '@/utils/localStorage/localStorage';

const RootStack = createNativeStackNavigator();

const RootNavigation = () => {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    const checkLogin = async () => {
      const localStorage = LocalStorage.getInstance();

      const accessToken = await localStorage.getData('accessToken');

      if (accessToken) {
        setIsLogin(true);
      }
    };
  }, []);
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <RootStack.Screen name="AuthNavigation" component={AuthNavigation} />
      <RootStack.Screen
        name="BottomTabNavigation"
        component={BottomTabNavigation}
      />
    </RootStack.Navigator>
  );
};

export default RootNavigation;
