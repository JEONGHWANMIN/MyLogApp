import {theme} from '@/styles/theme';
import React from 'react';
import {Platform, StyleSheet, Text, TextInput, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import {Option} from '../Write';

interface DiaryWriteBodyProps {
  handleChangeText: (name: string, text: string) => void;
  mood: Option;
  weather: Option;
  title: string;
  content: string;
}

const DiaryWriteBody = ({handleChangeText, mood, weather, title, content}: DiaryWriteBodyProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {mood.key && (
          <View style={styles.iconPreviewContainer}>
            <IconButton icon={mood.key} size={30} iconColor={mood.color} />
            <Text style={[{color: mood.color}]}>{mood.description}</Text>
          </View>
        )}
        {weather.key && (
          <View style={styles.iconPreviewContainer}>
            <IconButton icon={weather.key} size={30} iconColor={weather.color} />
            <Text style={[{color: weather.color}]}>{weather.description}</Text>
          </View>
        )}
      </View>
      <View style={styles.textContainer}>
        <TextInput
          style={styles.textTitleInput}
          value={title}
          onChangeText={text => handleChangeText('title', text)}
          textAlignVertical="top"
          placeholder="주제를 입력해주세요 : )"
          placeholderTextColor={theme.colors.gray[400]}
        />
        <TextInput
          style={styles.textContentInput}
          value={content}
          onChangeText={text => handleChangeText('content', text)}
          textAlignVertical="top"
          multiline={true}
          placeholder="오늘의 일기를 작성해주세요 !"
          placeholderTextColor={theme.colors.gray[400]}
        />
      </View>
    </View>
  );
};

export {DiaryWriteBody};

const styles = StyleSheet.create({
  container: {flex: 1},
  iconContainer: {
    height: 40,
    marginTop: 30,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  textTitleInput: {
    fontSize: theme.typography.size.H6,
    fontFamily: theme.typography.family.bold,
    color: Platform.OS === 'android' ? theme.colors.gray[600] : theme.colors.gray[900],
    height: 30,
  },
  textContentInput: {
    flex: 1,
    fontSize: theme.typography.size.body1,
    lineHeight: 25,
    fontFamily: theme.typography.family.medium,
    color: theme.colors.gray[800],
    padding: 0,
  },
  iconPreviewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
