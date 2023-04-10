/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '@/screens/Auth/SignIn';
import SignUp from '@/screens/Auth/SignUp';
import Auth from '@/screens/Auth/Auth';
import {IconButton} from 'react-native-paper';
import {AuthParamListProps} from './types/types';

const AuthStack = createNativeStackNavigator();

const AuthNavigation = () => {
  const navigation = useNavigation<AuthParamListProps>();
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
          headerLeft: () => (
            <IconButton
              icon="chevron-left"
              size={27}
              onPress={() => navigation.goBack()}
            />
          ),
        }}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerTitle: '회원가입',
          headerLeft: () => (
            <IconButton
              icon="chevron-left"
              size={27}
              onPress={() => navigation.goBack()}
            />
          ),
        }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigation;
