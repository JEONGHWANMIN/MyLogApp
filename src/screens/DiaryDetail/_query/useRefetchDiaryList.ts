import {useDateStore} from '@/utils/state/date.zustand';
import {useQueryClient} from '@tanstack/react-query';

const useRefetchDiaryList = () => {
  const {date} = useDateStore();
  const queryClient = useQueryClient();

  const refetchDiaryList = () => {
    queryClient.invalidateQueries({
      queryKey: ['diaryList', date],
    });
  };

  return {refetchDiaryList};
};

export {useRefetchDiaryList};
