import React, {useRef} from 'react';
import {FlatList, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View} from 'react-native';
import {DiaryItem} from './DiaryItem';
import {theme} from '@/styles/theme';
import {EmptyDiary} from './EmptyDiary';
import {DiaryApiSpecGetDiary200DataItemsItem} from '@/orval/model';
import {ActivityIndicator} from 'react-native-paper';

const ItemSeparator = () => <View style={styles.itemSeparator} />;

interface DiaryListProps {
  isLoading: boolean;
  isFetchingNextPage: boolean;
  diaryList: DiaryApiSpecGetDiary200DataItemsItem[];
  handleScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  handleLoadMore: () => void;
}

const DiaryList = ({
  diaryList,
  handleLoadMore,
  handleScroll,
  isFetchingNextPage,
  isLoading,
}: DiaryListProps) => {
  const flatListRef = useRef(null);

  const isDiaryList = diaryList.length > 0;
  return (
    <View style={styles.diaryListView}>
      {isLoading ? (
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
                isFetchingNextPage ? (
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
  );
};

export {DiaryList};

const styles = StyleSheet.create({
  diaryListView: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 10,
    justifyContent: 'center',
  },
  itemSeparator: {
    height: 10,
  },
});
