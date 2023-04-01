import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '@/screen/Auth/SignIn';
import SignUp from '@/screen/Auth/SignUp';
import Auth from '@/screen/Auth/Auth';

const AuthStack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="초기렌더링" component={Auth} />
      <AuthStack.Screen name="로그인" component={SignIn} />
      <AuthStack.Screen name="회원가입" component={SignUp} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigation;
