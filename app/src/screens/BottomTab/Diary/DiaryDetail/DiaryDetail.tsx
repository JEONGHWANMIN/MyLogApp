import {DiaryStackParamsList} from '@/navigation/types/types';
import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {Text, View} from 'react-native';

const DiaryDetail = () => {
  const route = useRoute<RouteProp<DiaryStackParamsList, 'DiaryDetail'>>();
  const {id} = route.params;
  console.log(id);
  return (
    <View>
      <Text>일기 상세</Text>
    </View>
  );
};

export default DiaryDetail;
