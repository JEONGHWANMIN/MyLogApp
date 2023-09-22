import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNavigation from './BottomTabNavigation';
import AuthNavigation from './AuthNavigation';
import SplashScreen from '@/screens/SplashScreen/SplashScreen';
import Write from '@/screens/Write/Write';
import DiaryDetail from '@/screens/BottomTab/Diary/DiaryDetail/DiaryDetail';

const RootStack = createNativeStackNavigator();

const RootNavigation = () => {
  return (
    <RootStack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <RootStack.Screen name="SplashScreen" component={SplashScreen} />
      <RootStack.Screen name="AuthNavigation" component={AuthNavigation} />
      <RootStack.Screen name="BottomTabNavigation" component={BottomTabNavigation} />
      <RootStack.Screen
        name="Write"
        component={Write}
        options={{
          animation: 'slide_from_left',
        }}
      />
      <RootStack.Screen
        name="DiaryDetail"
        component={DiaryDetail}
        options={{
          animation: 'slide_from_right',
        }}
      />
    </RootStack.Navigator>
  );
};

export default RootNavigation;
