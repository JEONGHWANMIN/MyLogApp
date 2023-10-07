import {theme} from '@/styles/theme';
import {useGlobalDialogStore} from '@/utils/state/dialog.zustand';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ActivityIndicator, IconButton} from 'react-native-paper';

interface DiaryDetailHeaderProps {
  isEditMode: boolean;
  diaryCreateDate: string;
  isPatching: boolean;
  handleSubmit: () => void;
}

const DiaryDetailHeader = ({
  diaryCreateDate,
  handleSubmit,
  isEditMode,
  isPatching,
}: DiaryDetailHeaderProps) => {
  const {setGlobalDialogConfig} = useGlobalDialogStore();
  const navigation = useNavigation();

  const handleGoBack = () => {
    if (isEditMode) {
      setGlobalDialogConfig({
        title: '일기수정을 취소하시겠어요?',
        leftButtonText: '수정 유지',
        rightButtonText: '수정 취소',
        rightButtonEvent: () => navigation.goBack(),
      });
      return;
    }

    navigation.goBack();
  };

  return (
    <View style={styles.header}>
      <IconButton icon="keyboard-backspace" onPress={handleGoBack} />
      <Text style={styles.headerTitle}>{diaryCreateDate ?? ''}</Text>
      <View style={styles.headerIcons}>
        {isEditMode ? (
          <>
            {isPatching ? (
              <ActivityIndicator
                size={18}
                style={styles.loading}
                color={theme.colors.point.mintGreen}
              />
            ) : (
              <IconButton icon="check" iconColor="skyblue" size={24} onPress={handleSubmit} />
            )}
          </>
        ) : (
          <View style={styles.headerEmptyIcon} />
        )}
      </View>
    </View>
  );
};

export {DiaryDetailHeader};

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
  headerIcons: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loading: {
    paddingRight: 20,
  },
  headerEmptyIcon: {
    width: 52,
  },
});
