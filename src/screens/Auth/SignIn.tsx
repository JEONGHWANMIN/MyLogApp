import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAvoidingView, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import CoreButton from '@/components/core/CoreButton';
import CoreInput from '@/components/core/CoreInput';
import {theme} from '@/styles/theme';
import {AuthParamListProps, RootListParamsListProps} from '@/navigation/types/types';
import {useKeyBoardClose} from '@/hooks/useKeyBoardClose';
import {useShowSnackbarMessage} from '@/hooks/useShowSnacbarMessage';
import {useSignIn} from './_query/useSignIn';
import {UsersApiSpecPostUsersSigninBody} from '@/orval/model';
import {useAuthEmailStore} from './_state/authMail.zustand';

const SignIn = () => {
  const navigation = useNavigation<AuthParamListProps & RootListParamsListProps>();
  const signupEmail = useAuthEmailStore(state => state.email);
  const [form, setForm] = useState({
    email: signupEmail ?? '',
    password: '',
  });

  const {handleCloseKeyboard} = useKeyBoardClose();
  const {showSnackbarMessage} = useShowSnackbarMessage();

  useEffect(() => {
    setForm(prev => ({
      ...prev,
      email: signupEmail,
    }));
  }, [signupEmail]);

  const handleChange = (text: string, name: string) => {
    setForm(prev => ({
      ...prev,
      [name]: text,
    }));
  };

  const {userSignIn, isSignInLoading} = useSignIn();

  const handleSubmit = () => {
    if (isSignInLoading) {
      return;
    }

    if (!form.email || !form.password) {
      showSnackbarMessage('이메일, 비밀번호를 입력해주세요.', 'error');
      return;
    }

    const signInForm: UsersApiSpecPostUsersSigninBody = {
      email: form.email.trim(),
      password: form.password,
    };

    userSignIn(signInForm);
  };

  return (
    <TouchableWithoutFeedback onPress={handleCloseKeyboard}>
      <KeyboardAvoidingView style={styles.container}>
        <View>
          <Text style={styles.title}>PenPle</Text>
          <View style={styles.inputContainer}>
            <CoreInput
              placeholder="이메일"
              value={form.email}
              onChangeText={text => handleChange(text, 'email')}
            />
            <CoreInput
              value={form.password}
              placeholder="패스워드"
              onChangeText={text => handleChange(text, 'password')}
              secureTextEntry
            />
            <View style={styles.registeredUserContainer}>
              <Text style={styles.registeredUserText}>회원이 아니신가요 ?</Text>
              <Text style={styles.loginLink} onPress={() => navigation.push('SignUpPhone')}>
                회원가입
              </Text>
            </View>
          </View>
        </View>
        <CoreButton
          mode="contained"
          onPress={handleSubmit}
          loading={isSignInLoading}
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
    fontFamily: theme.typography.family.semiBold,
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
    color: theme.colors.gray[600],
    fontSize: theme.typography.size.body3,
  },
  loginLink: {
    color: theme.colors.gray[800],
    fontSize: theme.typography.size.body3,
    fontWeight: theme.typography.weight.bold,
  },
});
