import {useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {useKeyBoardClose} from '@/hooks/useKeyBoardClose';
import {SafeAreaView, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {INITIAL_TEXT_FORM} from '@/screens/Write/_constants/_constants';
import {DiaryDetailProps} from '@/navigation/types/types';
import {useFetchDiaryById} from './_query/useFetchDiaryById';
import {useOptionModalState} from './_hooks/useOptionModalState';
import {useDeleteDiaryById} from './_query/useDeleteDiaryById';
import {usePatchDiaryById} from './_query/usePatchDiaryById';
import {DiaryDetailBody} from './_components/DiaryDetailBody';
import {DiaryDetailHeader} from './_components/DiaryDetailHeader';
import {DiaryDetailFooter} from './_components/DiaryDetailFooter';
import {DiaryApiSpecPatchDiaryIdBody} from '@/orval/model';

export interface Option {
  key: string;
  value: string;
  description: string;
  color: string;
}

const DiaryDetail = () => {
  const route = useRoute<DiaryDetailProps>();
  const {id} = route.params;
  const [textForm, setTextForm] = useState(INITIAL_TEXT_FORM);
  const [isEditMode, setIdEditMode] = useState(false);
  const {handleCloseKeyboard} = useKeyBoardClose();

  const handleEditMode = () => {
    setIdEditMode(prevEditMode => !prevEditMode);
  };

  const handleChangeText = (name: string, text: string) => {
    setTextForm({
      ...textForm,
      [name]: text,
    });
  };

  const {showConfirmDeleteDiary, diaryDeleteMutate} = useDeleteDiaryById();

  const {options, setOptions, handleOptionModal} = useOptionModalState();

  const {diaryStatus, originForm, diaryCreateDate, refetchDiaryById, moodObj, weatherObj} =
    useFetchDiaryById({
      diaryId: id,
      setOptions,
      setTextForm,
    });

  const {showConfirmPatchDiary, patchDiaryMutate} = usePatchDiaryById({
    handleEditMode,
    refetchDiaryById,
  });

  const handleSubmit = () => {
    const requestForm: DiaryApiSpecPatchDiaryIdBody = {
      title: textForm.title,
      content: textForm.content,
      mood: options.mood.value,
      weather: options.weather.value,
    };

    showConfirmPatchDiary(id, requestForm);
  };

  return (
    <TouchableWithoutFeedback onPress={handleCloseKeyboard} style={styles.container}>
      <SafeAreaView style={styles.safeAreaView}>
        <DiaryDetailHeader
          diaryCreateDate={diaryCreateDate}
          handleSubmit={handleSubmit}
          isEditMode={isEditMode}
          isPatching={patchDiaryMutate.isLoading}
        />
        <DiaryDetailBody
          handleChangeText={handleChangeText}
          title={textForm.title}
          originTitle={originForm.title}
          content={textForm.content}
          originContent={originForm.content}
          isEditMode={isEditMode}
          isLoading={diaryStatus.isLoading}
          moodObj={moodObj}
          weatherObj={weatherObj}
          weather={options.weather}
          mood={options.mood}
        />
        <DiaryDetailFooter
          diaryId={id}
          handleEditMode={handleEditMode}
          handleOptionModal={handleOptionModal}
          isDeleting={diaryDeleteMutate.isLoading}
          isEditMode={isEditMode}
          showConfirmDeleteDiary={showConfirmDeleteDiary}
        />
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
});
