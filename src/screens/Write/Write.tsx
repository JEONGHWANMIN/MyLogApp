import React, {useEffect, useState} from 'react';
import {useKeyBoardClose} from '@/hooks/useKeyBoardClose';
import {useGlobalModalStore} from '@/utils/state/modal.zustand';
import {SafeAreaView, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {ModalContent, TAB_NAME} from './_components/ModalContent';
import {DiaryApiSpecPostDiaryBody} from '@/orval/model';
import {useGlobalDialogStore} from '@/utils/state/dialog.zustand';
import {INITIAL_OPTIONS_FORM, INITIAL_TEXT_FORM} from './_constants/_constants';
import {DiaryWriteHeader} from './_components/DiaryWriteHeader';
import {DiaryWriteBody} from './_components/DiaryWriteBody';
import {DiaryWriteFooter} from './_components/DiaryWriteFooter';
import {usePostDiary} from './_query/usePostDiary';

export interface Option {
  key: string;
  value: string;
  description: string;
  color: string;
}

const Write = () => {
  const {setGlobalModalConfig} = useGlobalModalStore();
  const {setGlobalDialogConfig} = useGlobalDialogStore();
  const {handleCloseKeyboard} = useKeyBoardClose();
  const [textForm, setTextForm] = useState(INITIAL_TEXT_FORM);
  const [options, setOptions] = useState<Record<'mood' | 'weather', Option>>(INITIAL_OPTIONS_FORM);

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

  const {saveDiary, diaryWriteMutate} = usePostDiary();

  const handleDiarySubmit = () => {
    if (diaryWriteMutate.isLoading) {
      return;
    }

    const requestForm: DiaryApiSpecPostDiaryBody = {
      title: textForm.title,
      content: textForm.content,
      mood: options.mood.value,
      weather: options.weather.value,
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
        <DiaryWriteHeader
          handleDiarySubmit={handleDiarySubmit}
          isRegistering={diaryWriteMutate.isLoading}
        />
        <DiaryWriteBody
          title={textForm.title}
          content={textForm.content}
          weather={options.weather}
          mood={options.mood}
          handleChangeText={handleChangeText}
        />
        <DiaryWriteFooter handleOptionModal={handleOptionModal} />
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
});
