import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAvoidingView, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import CoreButton from '@/components/core/CoreButton';
import CoreInput from '@/components/core/CoreInput';
import {theme} from '@/styles/theme';
import {AuthParamListProps, RootListParamsListProps} from '@/navigation/types/types';
import {useUsersApiSpecPostUsersSignin} from '@/orval/api/users/users';
import {UsersApiSpecPostUsersSigninBody} from '@/orval/model';
import {LocalStorage} from '@/utils/localStorage/localStorage';
import {useGlobalSnackbarStore} from '@/utils/state/snackbar.zustand';
import axios from 'axios';
import {useKeyBoardClose} from '@/hooks/useKeyBoardClose';

const SignIn = () => {
  const navigation = useNavigation<AuthParamListProps & RootListParamsListProps>();
  const {handleCloseKeyboard} = useKeyBoardClose();
  const {setGlobalSnackbar} = useGlobalSnackbarStore();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const showSnackbarMessage = (message: string, mode: 'error' | 'info') => {
    setGlobalSnackbar({
      message,
      actionLabel: '확인',
      mode,
      options: {
        duration: 1500,
      },
    });
  };

  const handleChange = (text: string, name: string) => {
    setForm(prev => ({
      ...prev,
      [name]: text,
    }));
  };

  const useUserSignInAPI = useUsersApiSpecPostUsersSignin();

  const userSignInAPI = (form: UsersApiSpecPostUsersSigninBody) => {
    useUserSignInAPI.mutate(
      {
        data: form,
      },
      {
        onSuccess: async response => {
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

  const handleSubmit = () => {
    if (!form.email || !form.password) {
      showSnackbarMessage('이메일, 비밀번호를 입력해주세요.', 'error');
      return;
    }

    userSignInAPI(form);
  };

  return (
    <TouchableWithoutFeedback onPress={handleCloseKeyboard}>
      <KeyboardAvoidingView style={styles.container}>
        <View>
          <Text style={styles.title}>PenPle</Text>
          <View style={styles.inputContainer}>
            <CoreInput
              placeholder="이메일"
              onChangeText={text => handleChange(text, 'email')}
              // right={<TextInput.Icon icon="eye" />}
            />
            <CoreInput
              placeholder="패스워드"
              onChangeText={text => handleChange(text, 'password')}
              secureTextEntry
            />
            <View style={styles.registeredUserContainer}>
              <Text style={styles.registeredUserText}>회원이 아니신가요 ?</Text>
              <Text style={styles.loginLink} onPress={() => navigation.push('SignUp')}>
                회원가입
              </Text>
            </View>
          </View>
        </View>
        <CoreButton
          mode="contained"
          onPress={handleSubmit}
          loading={useUserSignInAPI.isLoading}
          labelStyle={{
            color: theme.colors.point.mintGreen,
          }}>
          <Text>로그인</Text>
        </CoreButton>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    padding: 28,
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  title: {
    marginTop: 100,
    fontSize: theme.typography.size.H3,
    color: theme.colors.point.sageGreen,
    textAlign: 'center',
  },
  inputContainer: {
    marginTop: 20,
    gap: 10,
  },
  registeredUserContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  registeredUserText: {
    fontSize: theme.typography.size.body3,
  },
  loginLink: {
    fontSize: theme.typography.size.body3,
    fontWeight: theme.typography.weight.bold,
  },
});
