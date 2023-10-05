/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '@/screens/Auth/SignIn';
import SignUpAccount from '@/screens/Auth/SignUpAccount';
import Auth from '@/screens/Auth/Auth';
import {IconButton} from 'react-native-paper';
import {AuthParamListProps} from './types/types';
import {View} from 'react-native';
import SignUpPhone from '@/screens/Auth/SignUpPhone';

const AuthStack = createNativeStackNavigator();

const AuthNavigation = () => {
  const navigation = useNavigation<AuthParamListProps>();
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        animation: 'slide_from_right',
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
          headerTitle: '',
          headerLeft: () => (
            <View>
              <IconButton icon="chevron-left" size={22} onPress={() => navigation.goBack()} />
            </View>
          ),
        }}
      />
      <AuthStack.Screen
        name="SignUpPhone"
        component={SignUpPhone}
        options={{
          headerTitle: '',
          headerLeft: () => (
            <IconButton icon="chevron-left" size={22} onPress={() => navigation.goBack()} />
          ),
        }}
      />
      <AuthStack.Screen
        name="SignUpAccount"
        component={SignUpAccount}
        options={{
          headerTitle: '',
          headerLeft: () => (
            <IconButton icon="chevron-left" size={22} onPress={() => navigation.goBack()} />
          ),
        }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigation;
