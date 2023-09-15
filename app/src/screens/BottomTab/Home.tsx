/* eslint-disable react-hooks/exhaustive-deps */
import {useDiaryApiSpecGetDiarySummary} from '@/orval/api/diary/diary';
import {theme} from '@/styles/theme';
import {DateUtils} from '@/utils/util/DateUtils';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Calendar} from 'react-native-calendars';

type DiaryCalendarMap = Record<
  string,
  {
    marked: boolean;
    selected: boolean;
    selectedColor: string;
  }
>;

const DIARY_MARK_OPTION = {
  selected: true,
  marked: true,
  selectedColor: theme.colors.point.mintGreen,
};

const Home = () => {
  const [selected, setSelected] = useState('');
  const [searchDate, setSearchDate] = useState<{
    year: number;
    month: string;
  }>(DateUtils.getYearMonthToHyphen());
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
      console.log(diarySummaryStatus.error);
    }
  }, [searchDate.year, searchDate.month, diarySummaryStatus.status]);

  console.log(userDiaryDateList);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Calendar
          style={{borderRadius: 10}}
          onDayPress={day => {
            setSelected(day.dateString);
          }}
          onMonthChange={date =>
            setSearchDate({
              year: date.year,
              month: String(date.month),
            })
          }
          monthFormat="yyyy년 MM월"
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedColor: theme.colors.point.sageGreen,
            },
            ...userDiaryDateList,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  calendar: {},
});
