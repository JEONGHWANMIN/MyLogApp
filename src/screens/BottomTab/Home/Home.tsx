import React, {useState} from 'react';
import {theme} from '@/styles/theme';
import {DateUtils} from '@/utils/util/DateUtils';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {Calendar, DateData} from 'react-native-calendars';
import {useFetchDiarySummary} from './_query/useFetchDiarySummary';
import {ProgressCard} from './_components/ProgressCard';
import {MoodAndWeatherSection} from './_components/MoodAndWeatherSection';
import {ActivityIndicator, IconButton} from 'react-native-paper';
import {CALENDER_DIRECTION_ICON} from './_constant/contant';

export interface HomeSearchDate {
  year: number;
  month: string;
}

const Home = () => {
  const [selected, setSelected] = useState('');
  const [searchDate, setSearchDate] = useState<HomeSearchDate>(DateUtils.getCurrentYearMonth());

  const handleMonthChange = (date: DateData) => {
    setSearchDate({
      year: date.year,
      month: String(date.month),
    });
  };
  const handleDayChange = (day: DateData) => {
    setSelected(day.dateString);
  };

  const {
    diarySummaryStatus,
    moodMap,
    totalDays,
    userDiaryDateList,
    weatherMap,
    writeDays,
    writePercent,
  } = useFetchDiarySummary({searchDate});

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Calendar
          style={styles.calendar}
          onDayPress={handleDayChange}
          onMonthChange={handleMonthChange}
          monthFormat="yyyy년 MM월"
          renderArrow={direction => {
            return <IconButton icon={CALENDER_DIRECTION_ICON[direction]} size={22} />;
          }}
          markedDates={{
            ...userDiaryDateList,
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedColor: theme.colors.point.sageGreen,
            },
          }}
        />
        <View>
          {diarySummaryStatus.isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator color={theme.colors.point.mintGreen} size={28} />
            </View>
          ) : (
            <View>
              <ProgressCard
                totalDays={totalDays}
                writeDays={writeDays}
                writePercent={writePercent}
              />
              <MoodAndWeatherSection moodMap={moodMap} weatherMap={weatherMap} />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    padding: 10,
    flex: 1,
  },
  calendar: {
    borderRadius: 10,
  },
  loadingContainer: {
    marginTop: 40,
  },
});
