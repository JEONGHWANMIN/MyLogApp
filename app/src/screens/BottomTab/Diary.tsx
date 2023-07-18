import {DiaryWriteButton} from '@/components/core/DiaryWriteButton';
import {useDiaryApiSpecGetDiary} from '@/orval/api/diary/diary';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

const Diary = () => {
  const diaryListStatus = useDiaryApiSpecGetDiary({
    page: 1,
    size: 10,
  });

  console.log(diaryListStatus.data?.data.items);

  const diaryList = diaryListStatus.data?.data.items;
  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(diaryList)}</Text>
      <DiaryWriteButton />
    </View>
  );
};

export default Diary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // writeDiaryButton: {
  //   position: 'absolute',
  //   bottom: 30,
  //   right: 30,
  //   backgroundColor: theme.colors.point.mintGreen,
  //   borderRadius: 50,
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
});
