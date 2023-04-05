import React from 'react';
import Diary from '@/screens/BottomTab/Diary';
import Home from '@/screens/BottomTab/Home';
import Setting from '@/screens/BottomTab/Setting';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const BottomTab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name="Home" component={Home} />
      <BottomTab.Screen name="Diary" component={Diary} />
      <BottomTab.Screen name="Setting" component={Setting} />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigation;
