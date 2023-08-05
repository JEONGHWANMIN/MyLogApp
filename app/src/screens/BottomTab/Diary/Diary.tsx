/* eslint-disable react-hooks/exhaustive-deps */
import {DiaryWriteButton} from '@/components/core/DiaryWriteButton';
import {diaryApiSpecGetDiary} from '@/orval/api/diary/diary';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {DiaryItem} from './_components/DiaryItem';
import {useInfiniteQuery} from '@tanstack/react-query';
import {ActivityIndicator} from 'react-native-paper';
import {theme} from '@/styles/theme';
import MonthPicker from 'react-native-month-year-picker';

const ItemSeparator = () => <View style={styles.itemSeparator} />;

// https://www.npmjs.com/package/react-native-month-year-picker
const Diary = () => {
  const flatListRef = useRef(null);

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  // const showPicker = useCallback(value => setShow(value), []);

  // const onValueChange = useCallback(
  //   (event, newDate) => {
  //     const selectedDate = newDate || date;

  //     showPicker(false);
  //     setDate(selectedDate);
  //   },
  //   [date, showPicker],
  // );

  const diaryListStatus = useInfiniteQuery(['diaryList'], {
    queryFn: ({pageParam = 1}) => diaryApiSpecGetDiary({page: pageParam, size: 6}),
    getNextPageParam: lastPage => {
      return lastPage.data.hasNextPage ? lastPage.data.page + 1 : false;
    },
  });

  useEffect(() => {
    if (diaryListStatus.status === 'success') {
      console.log(diaryListStatus.data.pages[0]);
    }

    if (diaryListStatus.status === 'error') {
      console.log(diaryListStatus.error);
    }
  }, [diaryListStatus.status]);

  const diaryList = diaryListStatus.data?.pages.flatMap(page => page.data.items) || [];

  const handleLoadMore = () => {
    if (diaryListStatus.hasNextPage) {
      diaryListStatus.fetchNextPage();
    }
  };

  const prefetchNextPage = () => {
    if (diaryListStatus.hasNextPage && !diaryListStatus.isFetchingNextPage) {
      const nextPage = (diaryListStatus.data?.pages.at(-1)?.data.page ?? 0) + 1;
      diaryListStatus.fetchNextPage({pageParam: nextPage + 1});
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {contentOffset, layoutMeasurement, contentSize} = event.nativeEvent;
    const paddingToBottom = 60;
    if (contentOffset.y + layoutMeasurement.height >= contentSize.height - paddingToBottom) {
      prefetchNextPage();
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Pressable onPress={() => setShow(prev => !prev)}>
          <Text style={styles.dateText}>2023년 8월</Text>
        </Pressable>
        <View style={styles.diaryListView}>
          <FlatList
            ref={flatListRef}
            data={diaryList}
            renderItem={({item}) => <DiaryItem diaryItem={item} />}
            ItemSeparatorComponent={ItemSeparator}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.1}
            ListFooterComponent={diaryListStatus.isFetchingNextPage ? <ActivityIndicator /> : null}
            onScroll={handleScroll}
            scrollEventThrottle={400}
          />
        </View>
        <DiaryWriteButton />
        {show && (
          <MonthPicker
            autoTheme={false}
            // onChange={onValueChange}
            value={date}
            minimumDate={new Date()}
            maximumDate={new Date(2025, 5)}
            locale="ko"
            okButton="선택"
            cancelButton="취소"
            mode="short"
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Diary;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 12,
    backgroundColor: 'white',
  },
  diaryListView: {
    flex: 1,
    marginBottom: 20,
  },
  dateText: {
    marginVertical: 12,
    color: theme.colors.gray[800],
    fontFamily: theme.typography.family.semiBold,
    fontSize: theme.typography.size.H5,
  },
  itemSeparator: {
    height: 10, // Set the desired spacing between items here
  },
});
