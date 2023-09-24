import {DiaryWriteButton} from '@/components/core/DiaryWriteButton';
import React, {useRef} from 'react';
import {FlatList, Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {DiaryItem} from './_components/DiaryItem';
import {ActivityIndicator, IconButton} from 'react-native-paper';
import {theme} from '@/styles/theme';
import RNMonthPicker from 'react-native-month-year-picker';
import {DateUtils} from '@/utils/util/DateUtils';
import {useDatePicker} from './_hooks/useDatePicker';
import {useFetchDiaryList} from './_hooks/useFetchDiaryList';
import {EmptyDiary} from './_components/EmptyDiary';

const ItemSeparator = () => <View style={styles.itemSeparator} />;

const Diary = () => {
  const flatListRef = useRef(null);
  const {date, onValueChange, show, handlePickerShow, handleMonth} = useDatePicker();
  const {diaryList, diaryListStatus, handleLoadMore, handleScroll} = useFetchDiaryList();

  const isDiaryList = diaryList.length > 0;

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <View style={styles.headerActions}>
          <View style={styles.flexDirectionRow}>
            <IconButton icon="chevron-left" onPress={handleMonth.previous} size={24} />
            <Pressable onPress={handlePickerShow} style={styles.headerPress}>
              <Text style={styles.dateText}>{DateUtils.getYearMonthToKorea(date)}</Text>
            </Pressable>
            <IconButton icon="chevron-right" onPress={handleMonth.next} size={24} />
          </View>
          <IconButton icon="magnify" />
        </View>
        <View style={styles.diaryListView}>
          {diaryListStatus.isLoading ? (
            <ActivityIndicator color={theme.colors.point.mintGreen} />
          ) : (
            <>
              {isDiaryList ? (
                <FlatList
                  ref={flatListRef}
                  data={diaryList}
                  renderItem={({item}) => <DiaryItem diaryItem={item} />}
                  ItemSeparatorComponent={ItemSeparator}
                  onEndReached={handleLoadMore}
                  onEndReachedThreshold={0.1}
                  ListFooterComponent={
                    diaryListStatus.isFetchingNextPage ? (
                      <ActivityIndicator color={theme.colors.point.mintGreen} />
                    ) : null
                  }
                  onScroll={handleScroll}
                  scrollEventThrottle={400}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                />
              ) : (
                <EmptyDiary />
              )}
            </>
          )}
        </View>
        <DiaryWriteButton />
        {show && (
          <RNMonthPicker
            autoTheme={false}
            onChange={onValueChange}
            value={date}
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
    justifyContent: 'center',
  },
  headerPress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateText: {
    color: theme.colors.gray[800],
    fontFamily: theme.typography.family.semiBold,
    fontSize: theme.typography.size.body1,
    paddingVertical: 10,
  },
  diaryListView: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 10,
    justifyContent: 'center',
  },
  itemSeparator: {
    height: 10,
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
});
