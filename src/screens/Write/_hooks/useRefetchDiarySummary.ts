import {getDiaryApiSpecGetDiarySummaryQueryKey} from '@/orval/api/diary/diary';
import {DateUtils} from '@/utils/util/DateUtils';
import {useQueryClient} from '@tanstack/react-query';

const useRefetchDiarySummary = () => {
  const queryClient = useQueryClient();

  const refetchDiarySummary = () => {
    const {year, month} = DateUtils.getCurrentYearMonth();

    queryClient.invalidateQueries({
      queryKey: getDiaryApiSpecGetDiarySummaryQueryKey({
        year,
        month: Number(month),
      }),
    });
  };

  return {refetchDiarySummary};
};

export {useRefetchDiarySummary};
