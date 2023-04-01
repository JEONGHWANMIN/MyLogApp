import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '@/screens/Auth/SignIn';
import SignUp from '@/screens/Auth/SignUp';
import Auth from '@/screens/Auth/Auth';
import {AuthListParams} from './types/types';

const AuthStack = createNativeStackNavigator<AuthListParams>();

const AuthNavigation = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="MyLog" component={Auth} />
      <AuthStack.Screen name="로그인" component={SignIn} />
      <AuthStack.Screen name="회원가입" component={SignUp} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigation;
