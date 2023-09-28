import {theme} from '@/styles/theme';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {MOODS_MAP, MoodsMapKey, WEATHER_MAP, WeatherMapKey} from '../../Diary/_constant/_constant';
import {KeyStringValueString} from '@/orval/model';
import Icon from 'react-native-paper/src/components/Icon';

interface MoodAndWeatherSectionProps {
  weatherMap: KeyStringValueString;
  moodMap: KeyStringValueString;
}

const MoodAndWeatherSection = ({moodMap, weatherMap}: MoodAndWeatherSectionProps) => {
  const weatherList = Object.entries(weatherMap);
  const moodList = Object.entries(moodMap);

  const isWeatherList = weatherList.length > 0;
  const isMoodList = moodList.length > 0;
  return (
    <View style={styles.weatherAndMoodContainer}>
      <View style={[styles.weatherAndMoodCard]}>
        <Text style={styles.cardTitle}>날씨</Text>
        {isWeatherList ? (
          weatherList.map(([weatherKey, value]) => {
            const {description, color, key} = WEATHER_MAP[weatherKey as WeatherMapKey];
            return (
              <View key={key} style={styles.weatherAndMoodTextView}>
                <View style={[styles.iconTag, {backgroundColor: color}]}>
                  <Text style={[styles.weatherAndMoodText, styles.tagText]}>{description}</Text>
                </View>
                <Icon source={key} color={color} size={22} />
                <Text style={[styles.weatherAndMoodText, {color}]}>{value}</Text>
              </View>
            );
          })
        ) : (
          <Text style={styles.dataNone}>날씨 데이터가 없습니다.</Text>
        )}
      </View>
      <View style={[styles.weatherAndMoodCard]}>
        <Text style={styles.cardTitle}>기분</Text>
        {isMoodList ? (
          moodList.map(([moodKey, value]) => {
            const {description, color, key} = MOODS_MAP[moodKey as MoodsMapKey];
            return (
              <View key={key} style={styles.weatherAndMoodTextView}>
                <View style={[styles.iconTag, {backgroundColor: color}]}>
                  <Text style={[styles.weatherAndMoodText, styles.tagText]}>{description}</Text>
                </View>
                <Icon source={key} color={color} size={22} />
                <Text style={[styles.weatherAndMoodText, {color}]}>{value}</Text>
              </View>
            );
          })
        ) : (
          <Text style={styles.dataNone}>기분 데이터가 없습니다.</Text>
        )}
      </View>
    </View>
  );
};

export {MoodAndWeatherSection};

const styles = StyleSheet.create({
  weatherAndMoodContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
  },

  weatherAndMoodCard: {
    flex: 0.5,
    marginTop: 12,
    borderColor: theme.colors.gray[100],
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    padding: 15,
    minHeight: 60,
  },
  cardTitle: {
    textAlign: 'center',
    fontSize: theme.typography.size.body3,
    fontWeight: theme.typography.weight.medium,
    color: theme.colors.gray[600],
    marginBottom: 10,
  },
  weatherAndMoodTextView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
    padding: 2,
  },
  weatherAndMoodText: {
    fontSize: theme.typography.size.body4,
    fontWeight: theme.typography.weight.bold,
  },
  iconTag: {padding: 4, borderRadius: 10},
  tagText: {color: 'white', fontWeight: theme.typography.weight.bold},
  dataNone: {
    marginTop: 10,
    textAlign: 'center',
    color: theme.colors.gray[200],
  },
});
