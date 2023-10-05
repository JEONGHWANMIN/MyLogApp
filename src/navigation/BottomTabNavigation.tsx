/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import Setting from '@/screens/BottomTab/Setting/Setting';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {theme} from '@/styles/theme';
import Home from '@/screens/BottomTab/Home/Home';
import Diary from '@/screens/BottomTab/Diary/Diary';
import Icon from 'react-native-paper/src/components/Icon';

const BottomTab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: theme.colors.point.sageGreen,
        headerShadowVisible: false,
        headerBackgroundContainerStyle: {backgroundColor: 'white'},
      }}>
      <BottomTab.Screen
        name="Diary"
        component={Diary}
        options={{
          headerShown: false,
          tabBarLabel: '일기',
          tabBarIcon: ({color}) => <Icon source="book-account" size={27} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: '홈',
          tabBarIcon: ({color}) => <Icon source="home-variant" size={27} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Setting"
        component={Setting}
        options={{
          headerShown: false,
          tabBarLabel: '내정보',
          tabBarIcon: ({color}) => <Icon source="account-circle" size={27} color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigation;
