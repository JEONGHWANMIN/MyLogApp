import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {theme} from '@/styles/theme';
import {StyleSheet, Text, View, TouchableWithoutFeedback} from 'react-native';
import CoreInput from '@/components/core/CoreInput';
import CoreButton from '@/components/core/CoreButton';
import {AuthParamListProps} from '@/navigation/types/types';
import {UsersApiSpecPostUsersSignupBody} from '@/orval/model';
import {useKeyBoardClose} from '@/hooks/useKeyBoardClose';
import {usePhoneNumberStore} from './_state/phoneNumber.zustand';
import {useSignUp} from './_query/useSignUp';
import {useShowSnackbarMessage} from '@/hooks/useShowSnacbarMessage';
import {useEmailDuplicateCheck} from './_query/useEmailDuplicateCheck';

const initSignUpForm = {
  email: '',
  nickname: '',
  password: '',
  confirmPassword: '',
};

const SignUpAccount = () => {
  const navigation = useNavigation<AuthParamListProps>();
  const [form, setForm] = useState(initSignUpForm);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isEmailDuplicate, setIsEmailDuplicate] = useState(true);
  const {handleCloseKeyboard} = useKeyBoardClose();
  const {showSnackbarMessage} = useShowSnackbarMessage();
  const phoneNumber = usePhoneNumberStore(state => state.phoneNumber);

  const isEmptyField = !form.email || !form.nickname || !form.password || !form.confirmPassword;

  const handleSetEmailDuplicate = (isDuplicate: boolean) => {
    setIsEmailDuplicate(isDuplicate);
  };

  const {handleEmailDuplicate, isEmailDuplicateLoading} = useEmailDuplicateCheck({
    handleSetEmailDuplicate,
  });
  const {usersApiSpecPostUsers, isSignUpLoading} = useSignUp();

  const handleConfirmPasswordCheck = () => {
    if (form.password) {
      setPasswordMatch(form.password === form.confirmPassword);
    }
    if (!form.password) {
      setPasswordMatch(true);
    }
  };

  const onChange = (text: string, name: string) => {
    if (name === 'confirmPassword') {
      setPasswordMatch(form.password === text);
    }

    setForm(prevForm => ({
      ...prevForm,
      [name]: text,
    }));
  };

  const handleSubmit = async () => {
    if (isSignUpLoading) {
      return;
    }

    if (!passwordMatch) {
      showSnackbarMessage('비밀번호가 일치하지 않습니다.', 'error');
      return;
    }

    const requestForm: UsersApiSpecPostUsersSignupBody = {
      email: form.email,
      nickname: form.nickname,
      password: form.password,
      phoneNumber,
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
              <CoreInput
                value={form.email}
                placeholder="이메일"
                onChangeText={text => onChange(text, 'email')}
                sx={{
                  flex: 1,
                }}
              />
              <CoreButton
                mode="contained"
                onPress={() => handleEmailDuplicate(form.email)}
                loading={isEmailDuplicateLoading}
                labelStyle={{
                  color: theme.colors.point.mintGreen,
                }}
                sx={{
                  fontSize: 14,
                }}>
                중복확인
              </CoreButton>
            </View>
            <CoreInput
              placeholder="닉네임"
              value={form.nickname}
              onChangeText={text => onChange(text, 'nickname')}
            />
            <CoreInput
              placeholder="패스워드"
              value={form.password}
              onChangeText={text => onChange(text, 'password')}
              secureTextEntry
            />
            <CoreInput
              placeholder="패스워드 확인"
              value={form.confirmPassword}
              onChangeText={text => onChange(text, 'confirmPassword')}
              secureTextEntry
              error={!passwordMatch}
              onBlurEvent={handleConfirmPasswordCheck}
            />
            <View style={styles.registeredUserContainer}>
              <Text style={styles.registeredUserText}>이미 회원이신가요 ?</Text>
              <Text style={styles.loginLink} onPress={() => navigation.push('SignIn')}>
                로그인
              </Text>
            </View>
            {!passwordMatch && (
              <Text style={styles.errorMessage}>비밀번호가 일치하지 않습니다.</Text>
            )}
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <CoreButton
            mode="contained"
            onPress={handleSubmit}
            loading={isSignUpLoading}
            labelStyle={{
              color: theme.colors.point.mintGreen,
            }}
            disabled={isEmailDuplicate || isEmptyField}>
            회원가입
          </CoreButton>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignUpAccount;

const styles = StyleSheet.create({
  container: {
    padding: 28,
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  title: {
    fontFamily: theme.typography.family.semiBold,
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
