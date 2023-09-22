/* eslint-disable react-hooks/exhaustive-deps */
import {diaryApiSpecGetDiary} from '@/orval/api/diary/diary';
import {useDateStore} from '@/utils/state/date.zustand';
import {useInfiniteQuery} from '@tanstack/react-query';
import {useEffect} from 'react';
import {NativeScrollEvent, NativeSyntheticEvent} from 'react-native';

const useFetchDiaryList = () => {
  const {date} = useDateStore();

  const diaryListStatus = useInfiniteQuery(['diaryList', date], {
    queryFn: ({pageParam = 1}) =>
      diaryApiSpecGetDiary({
        page: pageParam,
        size: 10,
        year: String(date.getFullYear()),
        month: String(date.getMonth() + 1),
      }),

    getNextPageParam: lastPage => {
      return lastPage.data.hasNextPage ? lastPage.data.page + 1 : false;
    },
  });

  useEffect(() => {
    if (diaryListStatus.status === 'success') {
      // console.log(diaryListStatus.data.pages[0]);
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
  };
};

export {useFetchDiaryList};
