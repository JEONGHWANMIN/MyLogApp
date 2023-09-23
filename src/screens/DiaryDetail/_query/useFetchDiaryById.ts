/* eslint-disable react-hooks/exhaustive-deps */
import {useDiaryApiSpecGetDiaryId} from '@/orval/api/diary/diary';
import {
  MOODS_MAP,
  MoodsMapKey,
  WEATHER_MAP,
  WeatherMapKey,
} from '@/screens/BottomTab/Diary/_constant/_constant';
import {useEffect} from 'react';
import {Option} from '../DiaryDetail';
import {DateUtils} from '@/utils/util/DateUtils';

interface FetchDiaryById {
  diaryId: number;
  setTextForm: (
    value: React.SetStateAction<{
      title: string;
      content: string;
    }>,
  ) => void;
  setOriginOptions: (value: React.SetStateAction<Record<'mood' | 'weather', Option>>) => void;
}

const useFetchDiaryById = ({diaryId, setOriginOptions, setTextForm}: FetchDiaryById) => {
  const diaryStatus = useDiaryApiSpecGetDiaryId(diaryId, {
    query: {
      enabled: !!diaryId,
      select: ({data}) => data,
    },
  });

  useEffect(() => {
    if (diaryStatus.status === 'success') {
      const {title, content, mood, weather} = diaryStatus.data;

      const moodObj = MOODS_MAP[mood as MoodsMapKey];
      const weatherObj = WEATHER_MAP[weather as WeatherMapKey];

      setTextForm({title, content});
      setOriginOptions(prev => ({
        mood: mood ? moodObj : prev.mood,
        weather: weather ? weatherObj : prev.weather,
      }));
    }
  }, [diaryStatus.status, diaryStatus.data]);

  const createDate = new Date(diaryStatus?.data?.createdAt ?? new Date());

  const diaryCreateDate = DateUtils.getYearMonthDayDayOfWeek(createDate);

  const originDiaryTitle = diaryStatus.data?.title;
  const originDiaryContent = diaryStatus.data?.content;

  const originForm = {
    title: originDiaryTitle,
    content: originDiaryContent,
  };

  const refetchDiaryById = () => {
    diaryStatus.refetch();
  };

  return {diaryCreateDate, originForm, refetchDiaryById};
};

export {useFetchDiaryById};
