import {DiaryApiSpecGetDiary200DataItemsItem} from '@/orval/model';
import {theme} from '@/styles/theme';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface DiaryItemProps {
  diaryItem: DiaryApiSpecGetDiary200DataItemsItem;
}

const DiaryItem = ({diaryItem}: DiaryItemProps) => {
  const {title, content, weather, mood, createdAt} = diaryItem;
  return (
    <View style={styles.container}>
      <View>
        <Text>{weather}</Text>
        <Text>{mood}</Text>
      </View>
      <View>
        <Text>{title}</Text>
        <Text>{content}</Text>
      </View>
      <Text>{createdAt}</Text>
    </View>
  );
};

export {DiaryItem};

const styles = StyleSheet.create({
  container: {
    borderColor: theme.colors.gray[400],
    borderWidth: 1,
  },
});
