import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {theme} from '@/styles/theme';
import {StyleSheet, Text, View, Keyboard, TouchableWithoutFeedback} from 'react-native';
import CoreInput from '@/components/core/CoreInput';
import CoreButton from '@/components/core/CoreButton';
import {AuthParamListProps} from '@/navigation/types/types';
import {useUsersApiSpecPostUsersSignup, usersApiSpecGetUsersCheck} from '@/orval/api/users/users';
import {UsersApiSpecPostUsersSignupBody} from '@/orval/model';
import {useGlobalSnackbarStore} from '@/utils/state/snackbar.zustand';
import {Controller, useForm} from 'react-hook-form';

interface SignUpForm {
  email: string;
  nickname: string;
  password: string;
  passwordMatch: string;
}

const SignUp = () => {
  const navigation = useNavigation<AuthParamListProps>();
  const {setGlobalSnackbar} = useGlobalSnackbarStore();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<SignUpForm>({
    defaultValues: {
      email: '',
      nickname: '',
      password: '',
      passwordMatch: '',
    },
  });

  const handleCloseKeyboard = () => {
    Keyboard.dismiss();
  };

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
  const useUsersApiSpecPostUsers = useUsersApiSpecPostUsersSignup();

  const usersApiSpecPostUsers = (signUpForm: UsersApiSpecPostUsersSignupBody) => {
    useUsersApiSpecPostUsers.mutate(
      {
        data: signUpForm,
      },
      {
        onSuccess: () => {
          navigation.replace('SignIn');
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

  const onSubmit = (data: SignUpForm) => {
    const requestForm: UsersApiSpecPostUsersSignupBody = {
      email: data.email,
      nickname: data.nickname,
      password: data.password,
    };

    usersApiSpecPostUsers(requestForm);
  };

  return (
    <TouchableWithoutFeedback onPress={handleCloseKeyboard}>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>PenPle</Text>
          <Text style={styles.subTitle}>
            <Text style={styles.pointColor}>펜플</Text>
            {'을 통해 새로운 일상을 담아 \n일기처럼 기록해보세요.'}
          </Text>
          <View style={styles.formContainer}>
            <View style={styles.rowFlexBox}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <CoreInput
                    placeholder="email"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    sx={{
                      flex: 1,
                    }}
                  />
                )}
                name="email"
              />
              <CoreButton
                mode="contained"
                // onPress={handleEmailDuplicate}
                sx={{
                  fontSize: 14,
                }}>
                중복확인
              </CoreButton>
            </View>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <CoreInput
                  placeholder="First name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="nickname"
            />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <CoreInput
                  placeholder="First name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="password"
            />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <CoreInput
                  placeholder="First name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="passwordMatch"
            />
            <View style={styles.registeredUserContainer}>
              <Text style={styles.registeredUserText}>이미 회원이신가요 ?</Text>
              <Text style={styles.loginLink} onPress={() => navigation.push('SignIn')}>
                로그인
              </Text>
            </View>
          </View>
        </View>
        <View>
          <CoreButton mode="contained" onPress={handleSubmit(onSubmit)}>
            회원가입
          </CoreButton>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    padding: 28,
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  title: {
    fontSize: theme.typography.size.H3,
    color: theme.colors.gray[900],
  },
  subTitle: {
    fontSize: theme.typography.size.H6,
    color: theme.colors.gray[600],
    fontFamily: theme.typography.family.medium,
  },
  pointColor: {
    color: theme.colors.point.sageGreen,
  },
  bottomContainer: {
    gap: 5,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: theme.typography.size.H6,
    color: theme.colors.point.sageGreen,
    fontFamily: theme.typography.family.medium,
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: theme.colors.gray[100],
    flex: 1,
  },
  rowFlexBox: {
    flexDirection: 'row',
    gap: 5,
  },
  formContainer: {
    gap: 10,
    marginTop: 30,
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
  errorMessage: {
    textAlign: 'center',
    color: theme.colors.point.error,
  },
});
