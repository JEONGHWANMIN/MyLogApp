import {theme} from '@/styles/theme';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const DiaryItem = () => {
  return (
    <View style={styles.container}>
      <Text>DiaryItem</Text>
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
