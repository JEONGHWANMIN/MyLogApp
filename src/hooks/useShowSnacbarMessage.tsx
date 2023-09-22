import {useGlobalSnackbarStore} from '@/utils/state/snackbar.zustand';

const useShowSnackbarMessage = () => {
  const {setGlobalSnackbar} = useGlobalSnackbarStore();

  const showSnackbarMessage = (message: string, mode: 'error' | 'info' | 'warning') => {
    setGlobalSnackbar({
      message,
      actionLabel: '확인',
      mode,
      options: {
        duration: 1500,
      },
    });
  };

  return {showSnackbarMessage};
};

export {useShowSnackbarMessage};
