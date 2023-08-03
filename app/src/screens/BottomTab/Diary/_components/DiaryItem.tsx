import React from 'react';
import {DiaryApiSpecGetDiary200DataItemsItem} from '@/orval/model';
import {theme} from '@/styles/theme';
import {StyleSheet, Text, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import {MOODS_MAP, MoodsMapKey, WEATHER_MAP, WeatherMapKey} from '../_constant/_constant';
import {DateUtils} from '@/utils/util/DateUtils';

interface DiaryItemProps {
  diaryItem: DiaryApiSpecGetDiary200DataItemsItem;
}

const DiaryItem = ({diaryItem}: DiaryItemProps) => {
  const {title, content, weather, mood, createdAt} = diaryItem;

  const moodKey = mood && MOODS_MAP[mood as MoodsMapKey]?.key;
  const moodColor = mood && MOODS_MAP[mood as MoodsMapKey]?.color;

  const weatherKey = weather && WEATHER_MAP[weather as WeatherMapKey]?.key;
  const weatherColor = weather && WEATHER_MAP[weather as WeatherMapKey]?.color;

  const formattedDate = DateUtils.getYearMonthDayDayOfWeek(new Date(createdAt));

  return (
    <View style={styles.container}>
      <View style={styles.timeIconContainer}>
        <View>
          <Text style={styles.timeStyle}>{formattedDate}</Text>
        </View>
        <View style={styles.iconContainer}>
          {mood && <IconButton icon={moodKey} size={24} iconColor={moodColor} />}
          {weather && <IconButton icon={weatherKey} size={24} iconColor={weatherColor} />}
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.titleStyle}>
          {title}
        </Text>
        <Text numberOfLines={3} ellipsizeMode="tail" style={styles.contentStyle}>
          {content}
        </Text>
      </View>
    </View>
  );
};

export {DiaryItem};

const styles = StyleSheet.create({
  container: {
    borderColor: theme.colors.gray[400],
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    backgroundColor: 'white',
  },
  timeIconContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  textContainer: {
    display: 'flex',
  },
  timeStyle: {
    fontSize: theme.typography.size.body3,
    fontFamily: theme.typography.family.regular,
  },
  titleStyle: {
    color: theme.colors.gray[600],
    fontSize: theme.typography.size.H6,
    fontFamily: theme.typography.family.semiBold,
    marginVertical: 5,
  },
  contentStyle: {
    color: theme.colors.gray[600],
    fontSize: theme.typography.size.body3,
    fontFamily: theme.typography.family.regular,
  },
});
