import {theme} from '@/styles/theme';
import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import Icon from 'react-native-paper/src/components/Icon';
import {Option} from '../DiaryDetail';
import {OptionType} from '../_query/useFetchDiaryById';

interface DiaryDetailBodyProps {
  isEditMode: boolean;
  isLoading: boolean;
  handleChangeText: (name: string, text: string) => void;
  mood: Option;
  weather: Option;
  moodObj: OptionType;
  weatherObj: OptionType;
  originTitle: string;
  title: string;
  originContent: string;
  content: string;
}

const DiaryDetailBody = ({
  mood,
  weather,
  isEditMode,
  isLoading,
  handleChangeText,
  moodObj,
  weatherObj,
  content,
  originContent,
  originTitle,
  title,
}: DiaryDetailBodyProps) => {
  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={theme.colors.point.mintGreen} size={28} />
        </View>
      ) : (
        <>
          {isEditMode ? (
            <View style={styles.iconContainer}>
              {mood.key && (
                <View style={styles.iconPreviewContainer}>
                  <Icon source={mood.key} size={26} color={mood.color} />
                  <Text style={[{color: mood.color}]}>{mood.description}</Text>
                </View>
              )}
              {weather.key && (
                <View style={styles.iconPreviewContainer}>
                  <Icon source={weather.key} size={26} color={weather.color} />
                  <Text style={[{color: weather.color}]}>{weather.description}</Text>
                </View>
              )}
            </View>
          ) : (
            <>
              {moodObj && weatherObj && (
                <View style={styles.iconContainer}>
                  {moodObj && (
                    <View style={styles.iconPreviewContainer}>
                      <Icon source={moodObj.key} size={26} color={moodObj.color} />
                      <Text style={[{color: moodObj.color}]}>{moodObj.description}</Text>
                    </View>
                  )}
                  {weatherObj && (
                    <View style={styles.iconPreviewContainer}>
                      <Icon source={weatherObj.key} size={26} color={weatherObj.color} />
                      <Text style={[{color: weatherObj.color}]}>{weatherObj.description}</Text>
                    </View>
                  )}
                </View>
              )}
            </>
          )}
          <View style={styles.textContainer}>
            <TextInput
              style={[styles.textTitleInput]}
              value={isEditMode ? title : originTitle}
              onChangeText={text => handleChangeText('title', text)}
              textAlignVertical="top"
              placeholder="주제를 입력해주세요 : )"
              editable={isEditMode}
            />
            <TextInput
              style={[styles.textContentInput]}
              value={isEditMode ? content : originContent}
              onChangeText={text => handleChangeText('content', text)}
              textAlignVertical="top"
              multiline={true}
              placeholder="오늘의 일기를 작성해주세요 !"
              editable={isEditMode}
            />
          </View>
        </>
      )}
    </View>
  );
};

export {DiaryDetailBody};

const styles = StyleSheet.create({
  container: {flex: 1},
  iconContainer: {
    height: 40,
    marginTop: 30,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 30,
  },
  textTitleInput: {
    fontSize: theme.typography.size.H6,
    fontFamily: theme.typography.family.bold,
    color: theme.colors.gray[800],
    padding: 0,
  },
  textContentInput: {
    flex: 1,
    marginTop: 10,
    fontSize: theme.typography.size.body1,
    lineHeight: 25,
    fontFamily: theme.typography.family.medium,
    color: theme.colors.gray[800],
    padding: 0,
  },
  iconPreviewContainer: {
    gap: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {justifyContent: 'center', flex: 1},
});
