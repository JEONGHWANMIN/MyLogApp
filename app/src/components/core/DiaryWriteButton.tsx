import {BottomTabParamListProps} from '@/navigation/types/types';
import {theme} from '@/styles/theme';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {IconButton} from 'react-native-paper';

const DiaryWriteButton = () => {
  const navigation = useNavigation<BottomTabParamListProps>();

  const handleGoDiaryWrite = () => {
    navigation.navigate('Write');
  };

  return (
    <View style={styles.writeDiaryButton}>
      <IconButton icon="lead-pencil" onPress={handleGoDiaryWrite} />
    </View>
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
