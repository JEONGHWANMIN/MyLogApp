import React, {useState} from 'react';
import {DiaryWriteButton} from '@/components/core/DiaryWriteButton';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {IconButton, TextInput} from 'react-native-paper';
import {theme} from '@/styles/theme';
import RNMonthPicker from 'react-native-month-year-picker';
import {DateUtils} from '@/utils/util/DateUtils';
import {useDatePicker} from './_hooks/useDatePicker';
import {useFetchDiaryList} from './_hooks/useFetchDiaryList';
import {DiaryList} from './_components/DiaryList';
import {useShowSnackbarMessage} from '@/hooks/useShowSnacbarMessage';

const Diary = () => {
  const {showSnackbarMessage} = useShowSnackbarMessage();
  const [searchText, setSearchText] = useState('');
  const [isSearchBar, setIsSearchBar] = useState(false);
  const {date, onValueChange, show, handlePickerShow, handleMonth} = useDatePicker();
  const {diaryList, diaryListStatus, handleLoadMore, handleScroll, handleSearchContent} =
    useFetchDiaryList();

  const handleSearchTextChange = (text: string) => {
    setSearchText(text);
  };

  const clearText = () => {
    handleSearchContent('');
    setSearchText('');
  };

  const handleDiaryContentSearch = () => {
    if (searchText && searchText.length <= 2) {
      showSnackbarMessage('좀 더 정확한 검색어를 입력해주세요 : )', 'warning');
      return;
    }

    if (searchText) {
      handleSearchContent(searchText);
      return;
    }
    setIsSearchBar(prev => !prev);
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <View style={styles.headerActions}>
          {!isSearchBar && (
            <View style={styles.flexDirectionRow}>
              <IconButton icon="chevron-left" onPress={handleMonth.previous} size={24} />
              <Pressable onPress={handlePickerShow} style={styles.headerPress}>
                <Text style={styles.dateText}>{DateUtils.getYearMonthToKorea(date)}</Text>
              </Pressable>
              <IconButton icon="chevron-right" onPress={handleMonth.next} size={24} />
            </View>
          )}
          <View style={styles.searchContainer}>
            {isSearchBar ? (
              <TextInput
                onChangeText={handleSearchTextChange}
                placeholder="전체 내용 검색"
                value={searchText}
                style={styles.searchInput}
                placeholderTextColor={theme.colors.gray[400]}
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
              <View style={styles.emptyInput} />
            )}
            <IconButton icon="magnify" onPress={handleDiaryContentSearch} />
          </View>
        </View>
        <DiaryList
          diaryList={diaryList}
          handleLoadMore={handleLoadMore}
          handleScroll={handleScroll}
          isFetchingNextPage={diaryListStatus.isFetchingNextPage}
          isLoading={diaryListStatus.isLoading}
        />
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
    // backgroundColor: 'white',
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
    backgroundColor: 'white',
    borderBottomColor: theme.colors.gray[100],
    borderBottomWidth: 1,
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
  searchContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  searchInput: {
    flex: 1,
    padding: 0,
    margin: 0,
  },
  emptyInput: {
    flex: 1,
  },
});
