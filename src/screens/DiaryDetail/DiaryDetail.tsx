import {useKeyBoardClose} from '@/hooks/useKeyBoardClose';
import {theme} from '@/styles/theme';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {ActivityIndicator, IconButton} from 'react-native-paper';
import {INITIAL_TEXT_FORM} from '@/screens/Write/_constants/_constants';
import {DiaryDetailProps} from '@/navigation/types/types';
import Icon from 'react-native-paper/src/components/Icon';
import {useFetchDiaryById} from './_query/useFetchDiaryById';
import {useOptionModalState} from './_hooks/useOptionModalState';
import {useDeleteDiaryById} from './_query/useDeleteDiaryById';
import {usePatchDiaryById} from './_query/usePatchDiaryById';
import {useGlobalDialogStore} from '@/utils/state/dialog.zustand';

export interface Option {
  key: string;
  value: string;
  description: string;
  color: string;
}

const DiaryDetail = () => {
  const route = useRoute<DiaryDetailProps>();
  const {id} = route.params;
  const navigation = useNavigation();
  const [textForm, setTextForm] = useState(INITIAL_TEXT_FORM);
  const [isEditMode, setIdEditMode] = useState(false);
  const {handleCloseKeyboard} = useKeyBoardClose();
  const {setGlobalDialogConfig} = useGlobalDialogStore();

  const handleEditMode = () => {
    setIdEditMode(prevEditMode => !prevEditMode);
  };

  const showConfirmEditModeCancel = () => {
    setGlobalDialogConfig({
      title: '수정을 취소하시겠습니까?',
      leftButtonText: '아니요',
      rightButtonText: '취소',
      rightButtonEvent: handleEditMode,
    });
  };

  const handleChangeText = (name: string, text: string) => {
    setTextForm({
      ...textForm,
      [name]: text,
    });
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const {showConfirmDeleteDiary, diaryDeleteMutate} = useDeleteDiaryById();

  const {options, setOptions, handleOptionModal} = useOptionModalState();

  const {originForm, diaryCreateDate, refetchDiaryById, moodObj, weatherObj} = useFetchDiaryById({
    diaryId: id,
    setOptions,
    setTextForm,
  });

  const {showConfirmPatchDiary, patchDiaryMutate} = usePatchDiaryById({
    handleEditMode,
    refetchDiaryById,
  });

  const handleSubmit = () => {
    const requestForm = {
      title: textForm.title,
      content: textForm.content,
      mood: options.mood.value,
      weather: options.weather.value,
      tags: [],
    };

    showConfirmPatchDiary(id, requestForm);
  };

  return (
    <TouchableWithoutFeedback onPress={handleCloseKeyboard} style={styles.container}>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.header}>
          <IconButton icon="keyboard-backspace" onPress={handleGoBack} />
          <Text style={styles.headerTitle}>{diaryCreateDate ?? ''}</Text>
          <View style={styles.headerIcons}>
            {isEditMode ? (
              <>
                {patchDiaryMutate.isLoading ? (
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
        {isEditMode ? (
          <View style={styles.iconContainer}>
            {options.mood.key && (
              <View style={styles.iconPreviewContainer}>
                <Icon source={options.mood.key} size={26} color={options.mood.color} />
                <Text style={[{color: options.mood.color}]}>{options.mood.description}</Text>
              </View>
            )}
            {options.weather.key && (
              <View style={styles.iconPreviewContainer}>
                <Icon source={options.weather.key} size={26} color={options.weather.color} />
                <Text style={[{color: options.weather.color}]}>{options.weather.description}</Text>
              </View>
            )}
          </View>
        ) : (
          <View style={styles.iconContainer}>
            {moodObj && (
              <View style={styles.iconPreviewContainer}>
                <Icon source={moodObj.key} size={26} color={moodObj.color} />
                <Text style={[{color: moodObj.color}]}>{moodObj.description}</Text>
              </View>
            )}
            {weatherObj && (
              <View style={styles.iconPreviewContainer}>
                <Icon source={weatherObj.key} size={26} color={weatherObj.color} />
                <Text style={[{color: weatherObj.color}]}>{weatherObj.description}</Text>
              </View>
            )}
          </View>
        )}
        <View style={styles.textContainer}>
          <TextInput
            style={[styles.textTitleInput]}
            value={isEditMode ? textForm.title : originForm.title}
            onChangeText={text => handleChangeText('title', text)}
            textAlignVertical="top"
            placeholder="주제를 입력해주세요 : )"
            editable={isEditMode}
          />
          <TextInput
            style={[styles.textContentInput]}
            value={isEditMode ? textForm.content : originForm.content}
            onChangeText={text => handleChangeText('content', text)}
            textAlignVertical="top"
            multiline={true}
            placeholder="오늘의 일기를 작성해주세요 !"
            editable={isEditMode}
          />
        </View>
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
            {diaryDeleteMutate.isLoading ? (
              <ActivityIndicator
                size={18}
                style={styles.loading}
                color={theme.colors.point.error}
              />
            ) : (
              <IconButton
                icon="delete"
                size={25}
                iconColor={theme.colors.point.error}
                onPress={() => showConfirmDeleteDiary(id)}
              />
            )}
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default DiaryDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: theme.colors.gray[100],
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 15,
    color: 'black',
    fontWeight: theme.typography.weight.bold,
  },
  headerIcons: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconContainer: {
    height: 40,
    marginTop: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  loading: {
    paddingRight: 20,
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  headerEmptyIcon: {
    width: 52,
  },
  textTitleInput: {
    fontSize: 18,
    fontFamily: theme.typography.family.bold,
    color: theme.colors.gray[800],
  },
  textContentInput: {
    flex: 1,
    marginTop: 10,
    fontSize: 16,
    lineHeight: 25,
    fontFamily: theme.typography.family.medium,
    color: theme.colors.gray[800],
  },
  iconPreviewContainer: {
    gap: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconPreviewText: {
    fontWeight: theme.typography.weight.bold,
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
