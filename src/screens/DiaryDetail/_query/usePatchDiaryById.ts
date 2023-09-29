import {useShowSnackbarMessage} from '@/hooks/useShowSnacbarMessage';
import {useDiaryApiSpecPatchDiaryId} from '@/orval/api/diary/diary';
import {DiaryApiSpecPatchDiaryIdBody} from '@/orval/model';
import {useGlobalDialogStore} from '@/utils/state/dialog.zustand';
import {useRefetchDiaryList} from './useRefetchDiaryList';
import {useRefetchDiarySummary} from '@/screens/Write/_query/useRefetchDiarySummary';

interface PatchDiaryById {
  refetchDiaryById: () => void;
  handleEditMode: () => void;
}

const usePatchDiaryById = ({refetchDiaryById, handleEditMode}: PatchDiaryById) => {
  const {setGlobalDialogConfig} = useGlobalDialogStore();
  const {showSnackbarMessage} = useShowSnackbarMessage();
  const {refetchDiaryList} = useRefetchDiaryList();
  const {refetchDiarySummary} = useRefetchDiarySummary();

  const patchDiaryMutate = useDiaryApiSpecPatchDiaryId();

  const patchDiaryById = (diaryId: number, requestForm: DiaryApiSpecPatchDiaryIdBody) => {
    patchDiaryMutate.mutate(
      {
        id: diaryId,
        data: requestForm,
      },
      {
        onSuccess: () => {
          refetchDiaryById();
          refetchDiaryList();
          refetchDiarySummary();
          handleEditMode();
          showSnackbarMessage('일기 수정이 완료되었습니다.', 'info');
        },
        onError: () => {
          showSnackbarMessage('일기 수정이 실패했습니다.', 'error');
        },
      },
    );
  };

  const showConfirmPatchDiary = (diaryId: number, requestForm: DiaryApiSpecPatchDiaryIdBody) => {
    setGlobalDialogConfig({
      title: '수정하시겠습니까?',
      leftButtonText: '취소',
      rightButtonText: '수정',
      rightButtonEvent: () => patchDiaryById(diaryId, requestForm),
    });
  };

  return {showConfirmPatchDiary, patchDiaryMutate};
};

export {usePatchDiaryById};
