/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import Diary from '@/screens/BottomTab/Diary';
import Home from '@/screens/BottomTab/Home';
import Setting from '@/screens/BottomTab/Setting';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {IconButton} from 'react-native-paper';
import {theme} from '@/styles/theme';
import Write from '@/screens/BottomTab/Write';

const BottomTab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: theme.colors.point.sageGreen,
      }}>
      <BottomTab.Screen
        name="Diary"
        component={Diary}
        options={{
          headerShown: false,
          tabBarLabel: '일기',
          tabBarIcon: ({color}) => <IconButton icon="book-account" size={27} iconColor={color} />,
        }}
      />
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: '홈',
          tabBarIcon: ({color}) => <IconButton icon="home-variant" size={27} iconColor={color} />,
        }}
      />
      <BottomTab.Screen
        name="Setting"
        component={Setting}
        options={{
          headerShown: false,
          tabBarLabel: '내정보',
          tabBarIcon: ({color}) => <IconButton icon="account-circle" size={27} iconColor={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigation;
