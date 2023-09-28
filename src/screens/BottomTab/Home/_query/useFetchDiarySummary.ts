/* eslint-disable react-hooks/exhaustive-deps */
import {useDiaryApiSpecGetDiarySummary} from '@/orval/api/diary/diary';
import {useEffect, useState} from 'react';
import {HomeSearchDate} from '../Home';
import {DIARY_MARK_OPTION} from '../_constant/contant';
import {useShowSnackbarMessage} from '@/hooks/useShowSnacbarMessage';

type DiaryCalendarMap = Record<
  string,
  {
    marked: boolean;
    selected: boolean;
    selectedColor: string;
  }
>;

interface FetchDiarySummary {
  searchDate: HomeSearchDate;
}

const useFetchDiarySummary = ({searchDate}: FetchDiarySummary) => {
  const {showSnackbarMessage} = useShowSnackbarMessage();
  const [userDiaryDateList, setUserDiaryDateList] = useState<DiaryCalendarMap>({});

  const diarySummaryStatus = useDiaryApiSpecGetDiarySummary(
    {
      year: searchDate.year,
      month: Number(searchDate.month),
    },
    {
      query: {
        select: ({data}) => data,
      },
    },
  );

  useEffect(() => {
    if (diarySummaryStatus.status === 'success') {
      const diaryMap: DiaryCalendarMap = {};

      diarySummaryStatus.data.userDiaryDateList.forEach(date => {
        diaryMap[date] = DIARY_MARK_OPTION;
      });

      setUserDiaryDateList(diaryMap);
    }

    if (diarySummaryStatus.status === 'error') {
      showSnackbarMessage('일기 요약 조회에 실패했습니다.', 'error');
    }
  }, [diarySummaryStatus.status, diarySummaryStatus.isRefetching]);

  const totalDays = diarySummaryStatus.data?.totalDayCount ?? 0;
  const writeDays = diarySummaryStatus.data?.monthDiariesCount ?? 0;
  const writePercent = diarySummaryStatus.data?.diaryWritePercentage ?? 0;
  const moodMap = diarySummaryStatus.data?.moodCountMap ?? {};
  const weatherMap = diarySummaryStatus.data?.weatherCountMap ?? {};

  return {
    diarySummaryStatus,
    userDiaryDateList,
    totalDays,
    writeDays,
    writePercent,
    moodMap,
    weatherMap,
  };
};

export {useFetchDiarySummary};
