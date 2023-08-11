import {useKeyBoardClose} from '@/hooks/useKeyBoardClose';
import {theme} from '@/styles/theme';
import {useGlobalModalStore} from '@/utils/state/modal.zustand';
import {DateUtils} from '@/utils/util/DateUtils';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {ActivityIndicator, IconButton} from 'react-native-paper';
import {ModalContent, TAB_NAME} from './_components/ModalContent';
import {useDiaryApiSpecPostDiary} from '@/orval/api/diary/diary';
import {DiaryApiSpecPostDiaryBody} from '@/orval/model';
import {useGlobalDialogStore} from '@/utils/state/dialog.zustand';
import {INITIAL_OPTIONS_FORM, INITIAL_TEXT_FORM} from './_constants/_constants';
import {useShowSnackbarMessage} from '@/hooks/useShowSnacbarMessage';
import axios from 'axios';
import {useDateStore} from '@/utils/state/date.zustand';

export interface Option {
  key: string;
  value: string;
  description: string;
  color: string;
}

const Write = () => {
  const navigate = useNavigation();
  const {setGlobalModalConfig} = useGlobalModalStore();
  const {setGlobalDialogConfig} = useGlobalDialogStore();
  const {showSnackbarMessage} = useShowSnackbarMessage();
  const {handleCloseKeyboard} = useKeyBoardClose();
  const [textAlineFormat, setTextAlineFormat] = useState<'left' | 'center'>('left');
  const [textForm, setTextForm] = useState(INITIAL_TEXT_FORM);
  const [options, setOptions] = useState<Record<'mood' | 'weather', Option>>(INITIAL_OPTIONS_FORM);
  // const {refetchDiaryList} = useRefetchDiaryList();
  const resetDate = useDateStore(state => state.resetDate);

  const handleChangeTextAlign = () => {
    setTextAlineFormat(textAlineFormat === 'left' ? 'center' : 'left');
  };

  const handleGoBack = () => {
    setGlobalDialogConfig({
      title: '일기작성을 취소하시겠어요?',
      leftButtonText: '작성 유지',
      rightButtonText: '작성 취소',
      rightButtonEvent: () => navigate.goBack(),
    });
  };

  const handleChangeOptions = (name: string, option: Option) => {
    setOptions(prev => ({
      ...prev,
      [name]: option,
    }));
  };

  const handleChangeText = (name: string, text: string) => {
    setTextForm({
      ...textForm,
      [name]: text,
    });
  };

  useEffect(() => {
    setGlobalModalConfig({
      visible: true,
      children: <ModalContent handleChangeOptions={handleChangeOptions} defaultTab={'기분'} />,
    });
  }, [setGlobalModalConfig]);

  const handleOptionModal = (tab: TAB_NAME) => {
    setGlobalModalConfig({
      visible: true,
      children: <ModalContent handleChangeOptions={handleChangeOptions} defaultTab={tab} />,
    });
  };

  const diaryWriteMutate = useDiaryApiSpecPostDiary();

  const saveDiary = (requestData: DiaryApiSpecPostDiaryBody) => {
    diaryWriteMutate.mutate(
      {
        data: requestData,
      },
      {
        onSuccess: () => {
          resetDate();
          navigate.goBack();
          showSnackbarMessage('일기 작성이 완료되었습니다 : )', 'info');
        },
        onError: error => {
          if (axios.isAxiosError(error)) {
            showSnackbarMessage('일기 작성이 실패했습니다 : (', 'error');
          }
        },
      },
    );
  };

  const handleDiarySubmit = () => {
    const requestForm: DiaryApiSpecPostDiaryBody = {
      title: textForm.title,
      content: textForm.content,
      mood: options.mood.value,
      weather: options.weather.value,
      tags: [],
    };

    setGlobalDialogConfig({
      title: '일기를 등록하시겠어요?',
      leftButtonText: '취소',
      rightButtonText: '등록',
      rightButtonEvent: () => saveDiary(requestForm),
    });
  };

  return (
    <TouchableWithoutFeedback onPress={handleCloseKeyboard} style={styles.container}>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.header}>
          <IconButton icon="keyboard-backspace" onPress={handleGoBack} />
          <Text style={styles.headerTitle}>{DateUtils.getYearMonthDayDayOfWeek()}</Text>
          {diaryWriteMutate.isLoading ? (
            <ActivityIndicator
              size={18}
              style={styles.loading}
              color={theme.colors.point.mintGreen}
            />
          ) : (
            <IconButton icon="check" iconColor="green" size={24} onPress={handleDiarySubmit} />
          )}
        </View>
        <View style={styles.iconContainer}>
          {options.mood.key && (
            <View style={styles.iconPreviewContainer}>
              <IconButton icon={options.mood.key} size={30} iconColor={options.mood.color} />
            </View>
          )}
          {options.weather.key && (
            <View style={styles.iconPreviewContainer}>
              <IconButton icon={options.weather.key} size={30} iconColor={options.weather.color} />
            </View>
          )}
        </View>
        <View style={styles.textContainer}>
          <TextInput
            style={[styles.textTitleInput, {textAlign: textAlineFormat}]}
            value={textForm.title}
            onChangeText={text => handleChangeText('title', text)}
            textAlignVertical="top"
            placeholder="주제를 입력해주세요 : )"
          />
          <TextInput
            style={[styles.textContentInput, {textAlign: textAlineFormat}]}
            value={textForm.content}
            onChangeText={text => handleChangeText('content', text)}
            textAlignVertical="top"
            multiline={true}
            placeholder="오늘의 일기를 작성해주세요 !"
          />
        </View>
        <View style={styles.optionContainer}>
          <IconButton
            icon={`format-align-${textAlineFormat}`}
            size={25}
            iconColor={theme.colors.gray[500]}
            onPress={handleChangeTextAlign}
          />
          <IconButton
            icon="emoticon"
            size={25}
            iconColor={theme.colors.gray[500]}
            onPress={() => handleOptionModal('기분')}
          />
          <IconButton
            icon="weather-night"
            size={25}
            iconColor={theme.colors.gray[500]}
            onPress={() => handleOptionModal('날씨')}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Write;

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
  iconContainer: {
    height: 40,
    marginTop: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loading: {
    paddingRight: 20,
  },
  optionContainer: {
    borderTopColor: theme.colors.gray[100],
    borderTopWidth: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  textTitleInput: {
    fontSize: 18,
    fontFamily: theme.typography.family.bold,
    color: theme.colors.gray[800],
    textAlign: 'center',
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconPreviewText: {
    fontWeight: theme.typography.weight.bold,
  },
});
