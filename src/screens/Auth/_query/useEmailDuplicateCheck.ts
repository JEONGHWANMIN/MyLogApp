import {useShowSnackbarMessage} from '@/hooks/useShowSnacbarMessage';
import {useUsersApiSpecPostUsersCheck} from '@/orval/api/users/users';

interface EmailDuplicateCheck {
  handleSetEmailDuplicate: (isDuplicate: boolean) => void;
}

const useEmailDuplicateCheck = ({handleSetEmailDuplicate}: EmailDuplicateCheck) => {
  const {showSnackbarMessage} = useShowSnackbarMessage();

  const userEmailDuplicateCheckMutate = useUsersApiSpecPostUsersCheck();

  const handleEmailDuplicate = async (email: string) => {
    userEmailDuplicateCheckMutate.mutate(
      {
        data: {
          email,
        },
      },
      {
        onSuccess: () => {
          showSnackbarMessage('사용가능한 이메일 입니다.', 'info');
          handleSetEmailDuplicate(false);
        },
        onError: () => {
          showSnackbarMessage('중복된 이메일 입니다.', 'error');
          handleSetEmailDuplicate(true);
        },
      },
    );
  };

  const isEmailDuplicateLoading = userEmailDuplicateCheckMutate.isLoading;

  return {handleEmailDuplicate, isEmailDuplicateLoading};
};

export {useEmailDuplicateCheck};
