import {theme} from '@/styles/theme';
import {useGlobalDialogStore} from '@/utils/state/dialog.zustand';
import {DateUtils} from '@/utils/util/DateUtils';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ActivityIndicator, IconButton} from 'react-native-paper';

interface DiaryWriteHeaderProps {
  isRegistering: boolean;
  handleDiarySubmit: () => void;
}

const DiaryWriteHeader = ({handleDiarySubmit, isRegistering}: DiaryWriteHeaderProps) => {
  const navigate = useNavigation();
  const {setGlobalDialogConfig} = useGlobalDialogStore();

  const handleGoBack = () => {
    setGlobalDialogConfig({
      title: '일기작성을 취소하시겠어요?',
      leftButtonText: '작성 유지',
      rightButtonText: '작성 취소',
      rightButtonEvent: () => navigate.goBack(),
    });
  };

  return (
    <View style={styles.header}>
      <IconButton icon="keyboard-backspace" onPress={handleGoBack} />
      <Text style={styles.headerTitle}>{DateUtils.getYearMonthDayDayOfWeek()}</Text>
      {isRegistering ? (
        <ActivityIndicator size={18} style={styles.loading} color={theme.colors.point.mintGreen} />
      ) : (
        <IconButton icon="check" iconColor="green" size={24} onPress={handleDiarySubmit} />
      )}
    </View>
  );
};

export {DiaryWriteHeader};

const styles = StyleSheet.create({
  header: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: theme.colors.gray[100],
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: theme.typography.size.body2,
    color: 'black',
    fontWeight: theme.typography.weight.bold,
  },
  loading: {
    paddingRight: 20,
  },
});
