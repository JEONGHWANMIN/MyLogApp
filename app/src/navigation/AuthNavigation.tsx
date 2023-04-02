import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '@/screens/Auth/SignIn';
import SignUp from '@/screens/Auth/SignUp';
import Auth from '@/screens/Auth/Auth';

const AuthStack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
      }}>
      <AuthStack.Screen
        name="Auth"
        component={Auth}
        options={{
          headerTitle: 'PenPle',
        }}
      />
      <AuthStack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          headerTitle: '로그인',
        }}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerTitle: '회원가입',
        }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigation;
