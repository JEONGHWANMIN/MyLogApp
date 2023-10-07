import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useShowSnackbarMessage} from '@/hooks/useShowSnacbarMessage';
import {AuthParamListProps} from '@/navigation/types/types';
import {useUsersApiSpecPostUsersSignin} from '@/orval/api/users/users';
import {UsersApiSpecPostUsersSigninBody} from '@/orval/model';
import {LocalStorage} from '@/utils/localStorage/localStorage';
import {useUserEmailStore} from '../_state/email.zustand';

const useSignIn = () => {
  const navigation = useNavigation<AuthParamListProps>();
  const {showSnackbarMessage} = useShowSnackbarMessage();
  const resetEmail = useUserEmailStore(state => state.resetEmail);

  const useUserSignInMutate = useUsersApiSpecPostUsersSignin();

  const userSignIn = (form: UsersApiSpecPostUsersSigninBody) => {
    useUserSignInMutate.mutate(
      {
        data: form,
      },
      {
        onSuccess: async response => {
          resetEmail();

          const {accessToken, refreshToken} = response;
          const localStorage = LocalStorage.getInstance();

          await localStorage.storeData('accessToken', accessToken);
          await localStorage.storeData('refreshToken', refreshToken);

          navigation.replace('BottomTabNavigation');
          showSnackbarMessage('로그인이 완료되었습니다', 'info');
        },
        onError: error => {
          if (axios.isAxiosError(error)) {
            showSnackbarMessage('이메일, 비밀번호를 다시 확인해주세요.', 'error');
          }
        },
      },
    );
  };

  const isSignInLoading = useUserSignInMutate.isLoading;

  return {userSignIn, isSignInLoading};
};

export {useSignIn};
