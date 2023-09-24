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
import {useShowSnackbarMessage} from '@/hooks/useShowSnacbarMessage';

interface FetchDiaryById {
  diaryId: number;
  setTextForm: (
    value: React.SetStateAction<{
      title: string;
      content: string;
    }>,
  ) => void;
  setOptions: (value: React.SetStateAction<Record<'mood' | 'weather', Option>>) => void;
}

const useFetchDiaryById = ({diaryId, setOptions, setTextForm}: FetchDiaryById) => {
  const {showSnackbarMessage} = useShowSnackbarMessage();

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
      setOptions(prev => ({
        mood: mood ? moodObj : prev.mood,
        weather: weather ? weatherObj : prev.weather,
      }));
    }

    if (diaryStatus.status === 'error') {
      showSnackbarMessage('일기 데이터 조회에 실패했습니다.', 'error');
    }
  }, [diaryStatus.status]);

  const createDate = new Date(diaryStatus?.data?.createdAt ?? new Date());

  const diaryCreateDate = DateUtils.getYearMonthDayDayOfWeek(createDate);

  const originDiaryTitle = diaryStatus.data?.title;
  const originDiaryContent = diaryStatus.data?.content;
  const originMood = diaryStatus.data?.mood;
  const originWeather = diaryStatus.data?.weather;

  const moodObj = MOODS_MAP[originMood as MoodsMapKey];
  const weatherObj = WEATHER_MAP[originWeather as WeatherMapKey];

  const originForm = {
    title: originDiaryTitle,
    content: originDiaryContent,
  };

  const refetchDiaryById = () => {
    diaryStatus.refetch();
  };

  return {diaryCreateDate, originForm, refetchDiaryById, moodObj, weatherObj};
};

export {useFetchDiaryById};
