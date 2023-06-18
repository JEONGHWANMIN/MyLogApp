/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import Diary from '@/screens/BottomTab/Diary';
import Home from '@/screens/BottomTab/Home';
import Setting from '@/screens/BottomTab/Setting';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {IconButton} from 'react-native-paper';
import {theme} from '@/styles/theme';

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
          headerTitle: '일기',
          tabBarLabel: '일기',
          tabBarIcon: ({color}) => (
            <IconButton icon="book-account" size={27} iconColor={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: '홈',
          tabBarLabel: '홈',
          tabBarIcon: ({color}) => (
            <IconButton icon="home-variant" size={27} iconColor={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Setting"
        component={Setting}
        options={{
          headerTitle: '내정보',
          tabBarLabel: '내정보',
          tabBarIcon: ({color}) => (
            <IconButton icon="account-circle" size={27} iconColor={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigation;
