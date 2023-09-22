import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {theme} from '@/styles/theme';
import {StyleSheet, Text, View, TouchableWithoutFeedback} from 'react-native';
import CoreInput from '@/components/core/CoreInput';
import CoreButton from '@/components/core/CoreButton';
import {AuthParamListProps} from '@/navigation/types/types';
import {useUsersApiSpecPostUsersSignup, usersApiSpecGetUsersCheck} from '@/orval/api/users/users';
import {UsersApiSpecPostUsersSignupBody} from '@/orval/model';
import {Controller, useForm} from 'react-hook-form';
import {useKeyBoardClose} from '@/hooks/useKeyBoardClose';
import {useShowSnackbarMessage} from '@/hooks/useShowSnacbarMessage';

interface SignUpForm {
  email: string;
  nickname: string;
  password: string;
  passwordMatch: string;
}

const SignUp = () => {
  const navigation = useNavigation<AuthParamListProps>();
  const [isEmailDuplicate, setIsEmailDuplicate] = useState(false);
  const {handleCloseKeyboard} = useKeyBoardClose();
  const {showSnackbarMessage} = useShowSnackbarMessage();
  const {control, handleSubmit, getValues} = useForm<SignUpForm>({
    defaultValues: {
      email: '',
      nickname: '',
      password: '',
      passwordMatch: '',
    },
  });

  const useUsersApiSpecPostUsers = useUsersApiSpecPostUsersSignup();

  const handleEmailDuplicate = async () => {
    const {isDuplicate} = await usersApiSpecGetUsersCheck({
      email: getValues().email,
    });

    if (isDuplicate) {
      showSnackbarMessage('중복된 이메일 입니다.', 'warning');
    }

    if (!isDuplicate) {
      showSnackbarMessage('사용 가능한 이메일 입니다.', 'info');
    }

    setIsEmailDuplicate(isDuplicate);
  };

  const usersApiSpecPostUsers = (requestForm: UsersApiSpecPostUsersSignupBody) => {
    useUsersApiSpecPostUsers.mutate(
      {
        data: requestForm,
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

    if (isEmailDuplicate) {
      showSnackbarMessage('이메일 중복확인을 해주세요.', 'error');
      return;
    }

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
                    placeholder="이메일"
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
                onPress={handleEmailDuplicate}
                sx={{
                  width: 100,
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
                  placeholder="닉네임"
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
                  secureTextEntry
                  placeholder="비밀번호"
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
                  secureTextEntry
                  placeholder="비밀번호 확인"
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
