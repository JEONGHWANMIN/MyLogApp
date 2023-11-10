import {useShowSnackbarMessage} from '@/hooks/useShowSnacbarMessage';
import {
  useUsersApiSpecPostUsersSendAuth,
  useUsersApiSpecPostUsersVerifyAuth,
} from '@/orval/api/users/users';
import axios from 'axios';
import {useState} from 'react';
import {useAuthEmailStore} from '../_state/authMail.zustand';
import {useNavigation} from '@react-navigation/native';
import {AuthParamListProps} from '@/navigation/types/types';

const useAuthMessage = () => {
  const navigation = useNavigation<AuthParamListProps>();

  const [isSend, setIsSend] = useState(false);
  const {setEmail} = useAuthEmailStore();
  const {showSnackbarMessage} = useShowSnackbarMessage();

  const sendAuthMessageMutate = useUsersApiSpecPostUsersSendAuth();
  const verifyAuthMessageMutate = useUsersApiSpecPostUsersVerifyAuth();

  const sendAuthMessage = (email: string) => {
    sendAuthMessageMutate.mutate(
      {
        data: {
          email,
        },
      },
      {
        onSuccess: () => {
          setIsSend(true);
          showSnackbarMessage('인증메일이 전송되었습니다.', 'info');
        },
        onError: e => {
          if (axios.isAxiosError(e)) {
            setIsSend(false);
            showSnackbarMessage('인증메일 전송이 실패했습니다.', 'error');
          }
        },
      },
    );
  };

  const verifyAuthMessage = (email: string, authNumber: number) => {
    verifyAuthMessageMutate.mutate(
      {
        data: {
          email,
          authNumber,
        },
      },
      {
        onSuccess: () => {
          navigation.push('SignUpAccount');
          setEmail(email);
        },
        onError: e => {
          if (axios.isAxiosError(e)) {
            showSnackbarMessage('인증번호가 유효하지 않습니다.', 'error');
          }
        },
      },
    );
  };

  return {
    isSend,
    isVerifyLoading: verifyAuthMessageMutate.isLoading,
    isSendLoading: sendAuthMessageMutate.isLoading,
    sendAuthMessage,
    verifyAuthMessage,
  };
};

export {useAuthMessage};
