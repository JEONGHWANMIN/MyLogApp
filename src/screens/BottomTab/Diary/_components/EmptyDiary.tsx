import {theme} from '@/styles/theme';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-paper/src/components/Icon';

const EmptyDiary = () => {
  return (
    <View style={styles.container}>
      <Icon source="information" size={56} color={theme.colors.gray[200]} />
      <Text style={styles.emptyText}>작성된 일기가 없습니다.</Text>
    </View>
  );
};

export {EmptyDiary};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 10,
  },
  emptyText: {
    color: theme.colors.gray[600],
    fontSize: theme.typography.size.body1,
  },
});
