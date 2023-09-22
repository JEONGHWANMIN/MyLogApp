import {theme} from '@/styles/theme';
import {DateUtils} from '@/utils/util/DateUtils';
import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Calendar, DateData} from 'react-native-calendars';
import {ProgressBar} from 'react-native-paper';
import {MOODS_MAP, MoodsMapKey, WEATHER_MAP, WeatherMapKey} from '../Diary/_constant/_constant';
import {List} from 'react-native-paper';
import {useFetchDiarySummary} from './_hooks/useFetchDiarySummary';

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

  const {moodMap, totalDays, userDiaryDateList, weatherMap, writeDays, writePercent} =
    useFetchDiarySummary({searchDate});

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Calendar
          style={styles.calendar}
          onDayPress={handleDayChange}
          onMonthChange={handleMonthChange}
          monthFormat="yyyy년 MM월"
          markedDates={{
            ...userDiaryDateList,
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedColor: theme.colors.point.sageGreen,
            },
          }}
        />
        <View style={styles.monthCard}>
          <Text style={styles.monthCardTitle}>이번달 작성한 일기</Text>
          <View style={styles.monthSubTitle}>
            <Text>{writePercent}%</Text>
            <Text>{`${writeDays}일 / ${totalDays}일`}</Text>
          </View>
          <ProgressBar
            progress={writePercent / 100}
            color={theme.colors.point.mintGreen}
            style={styles.progressBar}
          />
        </View>
        <View style={styles.weatherAndMoodContainer}>
          <View style={[styles.weatherAndMoodCard]}>
            {Object.entries(weatherMap).map(([weatherKey, value]) => {
              const {description, color, key} = WEATHER_MAP[weatherKey as WeatherMapKey];
              return (
                <View style={styles.weatherAndMoodTextView}>
                  <View style={[styles.iconTag, {backgroundColor: color}]}>
                    <Text style={[styles.weatherAndMoodText, styles.tagText]}>{description}</Text>
                  </View>
                  <List.Icon icon={key} color={color} />
                  <Text style={[styles.weatherAndMoodText, {color}]}>{value}</Text>
                </View>
              );
            })}
          </View>
          <View style={[styles.weatherAndMoodCard]}>
            {Object.entries(moodMap).map(([moodKey, value]) => {
              const {description, color, key} = MOODS_MAP[moodKey as MoodsMapKey];
              return (
                <View style={styles.weatherAndMoodTextView}>
                  <View style={[styles.iconTag, {backgroundColor: color}]}>
                    <Text style={[styles.weatherAndMoodText, styles.tagText]}>{description}</Text>
                  </View>
                  <List.Icon icon={key} color={color} />
                  <Text style={[styles.weatherAndMoodText, {color}]}>{value}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  scrollView: {
    padding: 10,
    flex: 1,
  },
  calendar: {
    borderRadius: 10,
  },
  monthCard: {
    marginTop: 12,
    borderColor: theme.colors.gray[100],
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    padding: 20,
  },
  monthCardTitle: {
    fontSize: theme.typography.size.body1,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.gray[600],
  },
  monthSubTitle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  progressBar: {
    height: 16,
    borderRadius: 10,
    borderColor: theme.colors.point.mintGreen,
    borderWidth: 1,
  },
  weatherAndMoodContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
  },
  weatherAndMoodCard: {
    flex: 1,
    marginTop: 12,
    borderColor: theme.colors.gray[100],
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    padding: 20,
    minHeight: 60,
  },
  weatherAndMoodTextView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
    padding: 2,
  },
  iconTag: {padding: 4, borderRadius: 10},
  tagText: {color: 'white', fontWeight: theme.typography.weight.bold},
  weatherAndMoodText: {
    fontSize: theme.typography.size.body4,
    fontWeight: theme.typography.weight.bold,
  },
});
