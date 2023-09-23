import {DiaryWriteButton} from '@/components/core/DiaryWriteButton';
import React, {useRef} from 'react';
import {FlatList, Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {DiaryItem} from './_components/DiaryItem';
import {ActivityIndicator, IconButton} from 'react-native-paper';
import {theme} from '@/styles/theme';
import RNMonthPicker from 'react-native-month-year-picker';
import {DateUtils} from '@/utils/util/DateUtils';
import Icon from 'react-native-paper/src/components/Icon';
import useDatePicker from './_hooks/useDatePicker';
import {useFetchDiaryList} from './_hooks/useFetchDiaryList';

const ItemSeparator = () => <View style={styles.itemSeparator} />;

const Diary = () => {
  // const navigation = useNavigation<DiaryStackParamListProps>();
  const flatListRef = useRef(null);
  const {date, onValueChange, show, handlePickerShow} = useDatePicker();
  const {diaryList, diaryListStatus, handleLoadMore, handleScroll} = useFetchDiaryList();

  if (diaryListStatus.isLoading) {
    return <ActivityIndicator color={theme.colors.point.mintGreen} />;
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Pressable onPress={handlePickerShow} style={styles.headerPress}>
          <View style={styles.monthIcon}>
            <Text style={styles.dateText}>{DateUtils.getYearMonthToKorea(date)}</Text>
            <Icon source="menu-down" size={27} />
          </View>
          <IconButton icon="magnify" />
        </Pressable>
        <View style={styles.diaryListView}>
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
    // backgroundColor: 'white',
  },
  headerPress: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  monthIcon: {
    flexDirection: 'row',
    alignItems: 'center',
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
  },
  itemSeparator: {
    height: 10,
  },
});
