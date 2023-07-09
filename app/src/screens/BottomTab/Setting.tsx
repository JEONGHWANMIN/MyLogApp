import {RootListParamsListProps} from '@/navigation/types/types';
import {LocalStorage} from '@/utils/localStorage/localStorage';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, View} from 'react-native';
import {Button} from 'react-native-paper';

const Setting = () => {
  const navigate = useNavigation<RootListParamsListProps>();
  const handleGoLogOut = async () => {
    const token = await LocalStorage.getInstance();
    token.removeData('accessToken');
    navigate.replace('AuthNavigation');
  };
  return (
    <View>
      <Text>세팅</Text>
      <Button onPress={handleGoLogOut}>로그아웃</Button>
    </View>
  );
};

export default Setting;
