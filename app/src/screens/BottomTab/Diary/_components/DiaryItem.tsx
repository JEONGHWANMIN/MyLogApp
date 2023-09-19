import React from 'react';
import {DiaryApiSpecGetDiary200DataItemsItem} from '@/orval/model';
import {theme} from '@/styles/theme';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {List} from 'react-native-paper';
import {MOODS_MAP, MoodsMapKey, WEATHER_MAP, WeatherMapKey} from '../_constant/_constant';
import {DateUtils} from '@/utils/util/DateUtils';
import {useNavigation} from '@react-navigation/native';
import {RootListParamsListProps} from '@/navigation/types/types';

interface DiaryItemProps {
  diaryItem: DiaryApiSpecGetDiary200DataItemsItem;
}

const DiaryItem = ({diaryItem}: DiaryItemProps) => {
  const navigation = useNavigation<RootListParamsListProps>();

  const handleGoDiaryDetail = () => {
    navigation.push('DiaryDetail', {id});
  };

  const {title, content, weather, mood, createdAt, id} = diaryItem;

  const moodKey = mood && MOODS_MAP[mood as MoodsMapKey]?.key;
  const moodColor = mood && MOODS_MAP[mood as MoodsMapKey]?.color;

  const weatherKey = weather && WEATHER_MAP[weather as WeatherMapKey]?.key;
  const weatherColor = weather && WEATHER_MAP[weather as WeatherMapKey]?.color;

  const formattedDate = DateUtils.getYearMonthDayDayOfWeek(new Date(createdAt));

  return (
    <TouchableOpacity onPress={handleGoDiaryDetail} activeOpacity={0.5}>
      <View style={styles.container}>
        <View style={styles.timeIconContainer}>
          <View>
            <Text style={styles.timeStyle}>{formattedDate}</Text>
          </View>
          <View style={styles.iconContainer}>
            {mood && <List.Icon icon={moodKey} color={moodColor} />}
            {weather && <List.Icon icon={weatherKey} color={weatherColor} />}
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.titleStyle}>
            {title}
          </Text>
          <Text numberOfLines={4} ellipsizeMode="tail" style={styles.contentStyle}>
            {content}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export {DiaryItem};

const styles = StyleSheet.create({
  container: {
    borderColor: theme.colors.gray[100],
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
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
    gap: 15,
  },
  textContainer: {
    display: 'flex',
  },
  timeStyle: {
    fontSize: theme.typography.size.body3,
    fontFamily: theme.typography.family.regular,
  },
  titleStyle: {
    color: theme.colors.gray[800],
    fontSize: theme.typography.size.body1,
    fontFamily: theme.typography.family.semiBold,
    marginVertical: 5,
  },
  contentStyle: {
    color: theme.colors.gray[600],
    fontSize: theme.typography.size.body3,
    fontFamily: theme.typography.family.regular,
  },
});
