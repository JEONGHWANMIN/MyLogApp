import {DiaryWriteButton} from '@/components/core/DiaryWriteButton';
import {diaryApiSpecGetDiary} from '@/orval/api/diary/diary';
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {DiaryItem} from './_components/DiaryItem';
import {useInfiniteQuery} from '@tanstack/react-query';
import {ActivityIndicator} from 'react-native-paper';

const ItemSeparator = () => <View style={styles.itemSeparator} />;

const Diary = () => {
  const diaryListStatus = useInfiniteQuery(['diaryList'], {
    queryFn: ({pageParam = 1}) => diaryApiSpecGetDiary({page: pageParam, size: 6}),
    getNextPageParam: lastPage => {
      return lastPage.data.hasNextPage ? lastPage.data.page + 1 : false;
    },
  });

  const handleLoadMore = () => {
    if (diaryListStatus.hasNextPage) {
      diaryListStatus.fetchNextPage();
    }
  };

  const diaryList = diaryListStatus.data?.pages.flatMap(page => page.data.items) || [];

  return (
    <View style={styles.container}>
      <View style={styles.diaryListView}>
        <FlatList
          data={diaryList}
          renderItem={({item}) => <DiaryItem diaryItem={item} />}
          ItemSeparatorComponent={ItemSeparator}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={diaryListStatus.isFetchingNextPage ? <ActivityIndicator /> : null}
        />
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
    // flex: 1,
    paddingHorizontal: 12,
  },
  itemSeparator: {
    height: 10, // Set the desired spacing between items here
  },
});
