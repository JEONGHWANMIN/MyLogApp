/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Diary from '@/screens/BottomTab/Diary/Diary';
import DiaryDetail from '@/screens/BottomTab/Diary/DiaryDetail/DiaryDetail';
import {IconButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const DiaryStack = createNativeStackNavigator();

const DiaryStackNavigation = () => {
  const navigation = useNavigation();
  return (
    <DiaryStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        animation: 'slide_from_right',
      }}>
      <DiaryStack.Screen
        name="Diary"
        component={Diary}
        options={{
          headerShown: false,
        }}
      />
      <DiaryStack.Screen
        name="DiaryDetail"
        component={DiaryDetail}
        options={{
          headerTitle: '일기 상세',
          headerLeft: () => (
            <IconButton icon="keyboard-backspace" size={27} onPress={() => navigation.goBack()} />
          ),
        }}
      />
    </DiaryStack.Navigator>
  );
};

export default DiaryStackNavigation;
