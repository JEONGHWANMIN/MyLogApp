import {TAB_NAME} from '@/screens/Write/_components/ModalContent';
import {theme} from '@/styles/theme';
import {useGlobalDialogStore} from '@/utils/state/dialog.zustand';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator, IconButton} from 'react-native-paper';

interface DiaryDetailFooterProps {
  diaryId: number;
  isEditMode: boolean;
  isDeleting: boolean;
  handleEditMode: () => void;
  handleOptionModal: (tab: TAB_NAME) => void;
  showConfirmDeleteDiary: (diaryId: number) => void;
}

const DiaryDetailFooter = ({
  diaryId,
  isDeleting,
  isEditMode,
  handleEditMode,
  handleOptionModal,
  showConfirmDeleteDiary,
}: DiaryDetailFooterProps) => {
  const {setGlobalDialogConfig} = useGlobalDialogStore();

  const showConfirmEditModeCancel = () => {
    setGlobalDialogConfig({
      title: '수정을 취소하시겠습니까?',
      leftButtonText: '아니요',
      rightButtonText: '취소',
      rightButtonEvent: handleEditMode,
    });
  };

  return (
    <View style={styles.optionContainer}>
      <View style={styles.optionIcons}>
        {isEditMode ? (
          <>
            <IconButton
              icon="emoticon"
              size={25}
              iconColor={theme.colors.gray[500]}
              onPress={() => handleOptionModal('기분')}
              disabled={!isEditMode}
            />
            <IconButton
              icon="weather-night"
              size={25}
              iconColor={theme.colors.gray[500]}
              onPress={() => handleOptionModal('날씨')}
              disabled={!isEditMode}
            />
          </>
        ) : (
          <View />
        )}
      </View>
      <View style={styles.actionIcons}>
        <IconButton
          icon={isEditMode ? 'pencil-minus' : 'pencil-plus'}
          size={25}
          iconColor={theme.colors.point.olive}
          onPress={isEditMode ? showConfirmEditModeCancel : handleEditMode}
        />
        {isDeleting ? (
          <ActivityIndicator size={18} style={styles.loading} color={theme.colors.point.error} />
        ) : (
          <IconButton
            icon="delete"
            size={25}
            iconColor={theme.colors.point.error}
            onPress={() => showConfirmDeleteDiary(diaryId)}
          />
        )}
      </View>
    </View>
  );
};

export {DiaryDetailFooter};

const styles = StyleSheet.create({
  loading: {
    paddingRight: 20,
  },
  headerEmptyIcon: {
    width: 52,
  },
  optionContainer: {
    borderTopColor: theme.colors.gray[100],
    borderTopWidth: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionIcons: {
    display: 'flex',
    flexDirection: 'row',
  },
  actionIcons: {
    display: 'flex',
    flexDirection: 'row',
  },
});
