import {useShowSnackbarMessage} from '@/hooks/useShowSnacbarMessage';
import {useDiaryApiSpecDeleteDiaryId} from '@/orval/api/diary/diary';
import {useGlobalDialogStore} from '@/utils/state/dialog.zustand';
import {useNavigation} from '@react-navigation/native';
import {useRefetchDiaryList} from './useRefetchDiaryList';
import {useRefetchDiarySummary} from '@/screens/Write/_hooks/useRefetchDiarySummary';

const useDeleteDiaryById = () => {
  const navigation = useNavigation();
  const {setGlobalDialogConfig} = useGlobalDialogStore();
  const {showSnackbarMessage} = useShowSnackbarMessage();

  const {refetchDiaryList} = useRefetchDiaryList();
  const {refetchDiarySummary} = useRefetchDiarySummary();

  const diaryDeleteMutate = useDiaryApiSpecDeleteDiaryId();

  const deleteDiaryById = (diaryId: number) => {
    diaryDeleteMutate.mutate(
      {
        id: diaryId,
      },
      {
        onSuccess: () => {
          refetchDiaryList();
          refetchDiarySummary();
          navigation.goBack();
          showSnackbarMessage('일기 삭제가 완료되었습니다.', 'info');
        },
        onError: () => {
          showSnackbarMessage('일기 삭제가 실패했습니다.', 'error');
        },
      },
    );
  };

  const showConfirmDeleteDiary = (diaryId: number) => {
    setGlobalDialogConfig({
      title: '삭제하시겠습니까?',
      leftButtonText: '취소',
      rightButtonText: '삭제',
      rightButtonEvent: () => deleteDiaryById(diaryId),
    });
  };

  return {showConfirmDeleteDiary, diaryDeleteMutate};
};

export {useDeleteDiaryById};
