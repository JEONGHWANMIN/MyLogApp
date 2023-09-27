/* eslint-disable react-hooks/exhaustive-deps */
import {useShowSnackbarMessage} from '@/hooks/useShowSnacbarMessage';
import {diaryApiSpecGetDiary} from '@/orval/api/diary/diary';
import {useDateStore} from '@/utils/state/date.zustand';
import {useInfiniteQuery} from '@tanstack/react-query';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {NativeScrollEvent, NativeSyntheticEvent} from 'react-native';

const useFetchDiaryList = () => {
  const {date} = useDateStore();
  const {showSnackbarMessage} = useShowSnackbarMessage();
  const [searchContent, setSearchContent] = useState('');

  const handleSearchContent = (text: string) => {
    setSearchContent(text);
  };

  const diaryListStatus = useInfiniteQuery(['diaryList', date, searchContent], {
    queryFn: ({pageParam = 1}) =>
      diaryApiSpecGetDiary({
        page: pageParam,
        size: 10,
        year: String(date.getFullYear()),
        month: String(date.getMonth() + 1),
        content: searchContent,
      }),

    getNextPageParam: lastPage => {
      return lastPage.data.hasNextPage ? lastPage.data.page + 1 : false;
    },
  });

  useEffect(() => {
    if (diaryListStatus.status === 'error') {
      if (axios.isAxiosError(diaryListStatus.error)) {
        showSnackbarMessage('일기 리스트 조회가 실패했습니다.', 'error');
      }
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
      diaryListStatus.fetchNextPage({pageParam: nextPage});
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {contentOffset, layoutMeasurement, contentSize} = event.nativeEvent;
    const paddingToBottom = 150;
    if (contentOffset.y + layoutMeasurement.height >= contentSize.height - paddingToBottom) {
      prefetchNextPage();
    }
  };

  return {
    diaryListStatus,
    diaryList,
    handleLoadMore,
    handleScroll,
    handleSearchContent,
  };
};

export {useFetchDiaryList};
