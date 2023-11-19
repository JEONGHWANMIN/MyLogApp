import React, {useState} from 'react';
import CoreButton from '@/components/core/CoreButton';
import CoreInput from '@/components/core/CoreInput';
import {useKeyBoardClose} from '@/hooks/useKeyBoardClose';
import {theme} from '@/styles/theme';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import Icon from 'react-native-paper/src/components/Icon';
import {useAuthMessage} from './_query/useAuthMessage';

const SignUpAuth = () => {
  const {handleCloseKeyboard} = useKeyBoardClose();
  const [auth, setAuth] = useState({
    email: '',
    authNumber: '',
  });

  const {isSend, isVerifyLoading, isSendLoading, sendAuthMessage, verifyAuthMessage} =
    useAuthMessage();

  const handleGoSignUpAccount = () => {
    if (isVerifyLoading) return;
    verifyAuthMessage(auth.email, Number(auth.authNumber));
  };

  const handleChange = (name: string, text: string) => {
    setAuth(prevAuth => ({
      ...prevAuth,
      [name]: text,
    }));
  };

  const sendEmailAuthMessage = () => {
    sendAuthMessage(auth.email);
  };

  return (
    <TouchableWithoutFeedback onPress={handleCloseKeyboard}>
      <View style={styles.container}>
        <Text style={styles.title}>PenPle</Text>
        <Text style={styles.phoneNumberText}>이메일을 입력해주세요 : )</Text>
        <View style={styles.inputContainer}>
          <View style={styles.rowFlexBox}>
            <CoreInput
              isResponsible
              placeholder="이메일을 입력해주세요."
              onChangeText={text => handleChange('email', text)}
              value={auth.email}
            />
            <CoreButton
              onPress={sendEmailAuthMessage}
              loading={isSendLoading}
              labelStyle={{
                color: theme.colors.point.mintGreen,
              }}>
              전송
            </CoreButton>
          </View>
          {isSend && (
            <CoreInput
              placeholder="인증번호 입력"
              onChangeText={text => handleChange('authNumber', text)}
              value={auth.authNumber}
              keyboardType="numeric"
            />
          )}
          <View style={styles.helperTextContainer}>
            <Icon source="information" size={18} color="gray" />
            <Text style={styles.helperInfoText}>이메일는 나중에 비밀번호를 찾는데 사용됩니다.</Text>
          </View>
        </View>
        <View>
          <CoreButton
            mode="contained"
            onPress={handleGoSignUpAccount}
            loading={isVerifyLoading}
            labelStyle={{
              color: theme.colors.point.mintGreen,
            }}>
            다음
          </CoreButton>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignUpAuth;

const styles = StyleSheet.create({
  container: {padding: 28, flex: 1, backgroundColor: 'white', gap: 10},
  inputContainer: {
    flex: 1,
    gap: 8,
  },
  helperTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 10,
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
  phoneNumberText: {
    marginTop: 10,
    color: theme.colors.gray[800],
    fontSize: theme.typography.size.body1,
    fontFamily: theme.typography.family.semiBold,
  },
  helperInfoText: {
    color: theme.colors.gray[600],
    fontSize: theme.typography.size.body3,
  },
  rowFlexBox: {
    flexDirection: 'row',
    gap: 5,
  },
});
