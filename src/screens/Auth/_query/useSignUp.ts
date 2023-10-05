import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {AuthParamListProps} from '@/navigation/types/types';
import {useUsersApiSpecPostUsersSignup} from '@/orval/api/users/users';
import {UsersApiSpecPostUsersSignupBody} from '@/orval/model';
import {usePhoneNumberStore} from '../_state/phoneNumber.zustand';
import {useShowSnackbarMessage} from '@/hooks/useShowSnacbarMessage';

const useSignUp = () => {
  const navigation = useNavigation<AuthParamListProps>();
  const {showSnackbarMessage} = useShowSnackbarMessage();
  const resetPhoneNumber = usePhoneNumberStore(state => state.resetPhoneNumber);
  const useUsersApiSpecPostUsersMutate = useUsersApiSpecPostUsersSignup();

  const handleGoSignIn = () => {
    navigation.replace('SignIn');
  };

  const usersApiSpecPostUsers = (signUpForm: UsersApiSpecPostUsersSignupBody) => {
    useUsersApiSpecPostUsersMutate.mutate(
      {
        data: signUpForm,
      },
      {
        onSuccess: () => {
          handleGoSignIn();
          resetPhoneNumber();
          showSnackbarMessage('회원가입에 성공했습니다.', 'info');
        },
        onError: error => {
          if (axios.isAxiosError(error)) {
            showSnackbarMessage('회원가입에 실패했습니다.', 'error');
          }
        },
      },
    );
  };

  const isSignUpLoading = useUsersApiSpecPostUsersMutate.isLoading;
  return {usersApiSpecPostUsers, isSignUpLoading};
};

export {useSignUp};
