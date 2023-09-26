import {DiaryWriteButton} from '@/components/core/DiaryWriteButton';
import React, {useRef, useState} from 'react';
import {FlatList, Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {DiaryItem} from './_components/DiaryItem';
import {ActivityIndicator, IconButton, TextInput} from 'react-native-paper';
import {theme} from '@/styles/theme';
import RNMonthPicker from 'react-native-month-year-picker';
import {DateUtils} from '@/utils/util/DateUtils';
import {useDatePicker} from './_hooks/useDatePicker';
import {useFetchDiaryList} from './_hooks/useFetchDiaryList';
import {EmptyDiary} from './_components/EmptyDiary';

const ItemSeparator = () => <View style={styles.itemSeparator} />;

const Diary = () => {
  const flatListRef = useRef(null);
  const [searchText, setSearchText] = useState('');
  const [isSearchBar, setIsSearchBar] = useState(false);
  const {date, onValueChange, show, handlePickerShow, handleMonth} = useDatePicker();
  const {diaryList, diaryListStatus, handleLoadMore, handleScroll} = useFetchDiaryList();

  const handleSearchTextChange = (text: string) => {
    setSearchText(text);
  };

  const clearText = () => {
    setSearchText('');
  };

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
          <View style={{flexDirection: 'row', flex: 1}}>
            {isSearchBar ? (
              <TextInput
                onChangeText={handleSearchTextChange}
                placeholder="전체 일기를 검색"
                value={searchText}
                style={{
                  flex: 1,
                }}
                right={
                  <TextInput.Icon
                    icon="close-circle"
                    size={16}
                    onPress={() => {
                      clearText();
                      setIsSearchBar(prev => !prev);
                    }}
                  />
                }
              />
            ) : (
              <View
                style={{
                  flex: 1,
                }}></View>
            )}
            <IconButton
              icon="magnify"
              onPress={() => {
                if (searchText) {
                  console.log('123');
                  return;
                }
                // clearText();
                setIsSearchBar(prev => !prev);
              }}
            />
          </View>
        </View>
        <View style={styles.diaryListView}>
          {diaryListStatus.isLoading ? (
            <ActivityIndicator color={theme.colors.point.mintGreen} size={28} />
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
