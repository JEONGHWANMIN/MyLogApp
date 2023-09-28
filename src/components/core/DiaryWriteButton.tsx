import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {IconButton} from 'react-native-paper';
import {theme} from '@/styles/theme';
import {RootListParamsListProps} from '@/navigation/types/types';

const DiaryWriteButton = () => {
  const navigation = useNavigation<RootListParamsListProps>();

  const handleGoDiaryWrite = () => {
    navigation.navigate('Write');
  };

  return (
    <TouchableOpacity
      style={styles.writeDiaryButton}
      onPress={handleGoDiaryWrite}
      activeOpacity={0.75}>
      <IconButton icon="lead-pencil" />
    </TouchableOpacity>
  );
};

export {DiaryWriteButton};

const styles = StyleSheet.create({
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
