import {DiaryWriteButton} from '@/components/core/DiaryWriteButton';
import {useDiaryApiSpecGetDiary} from '@/orval/api/diary/diary';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {DiaryItem} from './_components/DiaryItem';

const Diary = () => {
  // const diaryListStatus = useDiaryApiSpecGetDiary({
  //   page: 1,
  //   size: 10,
  // });

  // const diaryList = diaryListStatus.data?.data.items;

  return (
    <View style={styles.container}>
      <View style={styles.diaryListView}>
        <DiaryItem />
      </View>
      <DiaryWriteButton />
    </View>
  );
};

export default Diary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  diaryListView: {
    paddingHorizontal: 12,
  },
});
