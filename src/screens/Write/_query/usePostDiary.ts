import {useShowSnackbarMessage} from '@/hooks/useShowSnacbarMessage';
import {useDiaryApiSpecPostDiary} from '@/orval/api/diary/diary';
import {DiaryApiSpecPostDiaryBody} from '@/orval/model';
import {useRefetchDiarySummary} from './useRefetchDiarySummary';
import {useDateStore} from '@/utils/state/date.zustand';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const usePostDiary = () => {
  const navigate = useNavigation();
  const {showSnackbarMessage} = useShowSnackbarMessage();
  const resetDate = useDateStore(state => state.resetDate);
  const {refetchDiarySummary} = useRefetchDiarySummary();

  const diaryWriteMutate = useDiaryApiSpecPostDiary();

  const saveDiary = (requestData: DiaryApiSpecPostDiaryBody) => {
    diaryWriteMutate.mutate(
      {
        data: requestData,
      },
      {
        onSuccess: () => {
          showSnackbarMessage('일기 작성이 완료되었습니다 : )', 'info');
          navigate.goBack();
          resetDate();
          refetchDiarySummary();
        },
        onError: error => {
          if (axios.isAxiosError(error)) {
            showSnackbarMessage('일기 작성이 실패했습니다 : (', 'error');
          }
        },
      },
    );
  };

  return {saveDiary, diaryWriteMutate};
};

export {usePostDiary};
