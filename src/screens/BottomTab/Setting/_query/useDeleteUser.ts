import {useShowSnackbarMessage} from '@/hooks/useShowSnacbarMessage';
import {useUsersApiSpecDeleteUsers} from '@/orval/api/users/users';
import {useGlobalDialogStore} from '@/utils/state/dialog.zustand';
import {useLogout} from '../_hooks/useLogout';

const useDeleteUser = () => {
  const {setGlobalDialogConfig} = useGlobalDialogStore();
  const {showSnackbarMessage} = useShowSnackbarMessage();

  const {handleLogout} = useLogout();

  const deleteUserMutate = useUsersApiSpecDeleteUsers();

  const deleteUser = () => {
    deleteUserMutate.mutate(undefined, {
      onSuccess: () => {
        handleLogout();
        showSnackbarMessage('회원 탈퇴에 성공했습니다.', 'info');
      },
      onError: () => {
        showSnackbarMessage('회원 탈퇴에 실패했습니다.', 'error');
      },
    });
  };

  const showConfirmDeleteUser = () => {
    setGlobalDialogConfig({
      title: '탈퇴하시겠습니까?',
      leftButtonText: '취소',
      rightButtonText: '탈퇴',
      rightButtonEvent: deleteUser,
    });
  };

  return {showConfirmDeleteUser};
};

export {useDeleteUser};
