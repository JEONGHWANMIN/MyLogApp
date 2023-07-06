import {DiaryWriteButton} from '@/components/core/DiaryWriteButton';
import {theme} from '@/styles/theme';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const Diary = () => {
  return (
    <View style={styles.container}>
      <DiaryWriteButton />
    </View>
  );
};

export default Diary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  writeDiaryButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: theme.colors.point.mintGreen,
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
