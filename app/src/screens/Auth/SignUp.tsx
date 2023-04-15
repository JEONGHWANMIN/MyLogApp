import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {theme} from '@/styles/theme';
import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import CoreInput from '@/components/core/CoreInput';
import CoreButton from '@/components/core/CoreButton';
import {AuthParamListProps} from '@/navigation/types/types';

const SignUp = () => {
  const navigation = useNavigation<AuthParamListProps>();
  const handleCloseKeyboard = () => {
    Keyboard.dismiss();
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
                placeholder="이메일"
                sx={{
                  flex: 1,
                }}
              />
              <CoreButton
                mode="contained"
                sx={{
                  fontSize: 14,
                }}>
                중복확인
              </CoreButton>
            </View>
            <CoreInput placeholder="닉네임" />
            <CoreInput placeholder="패스워드" secureTextEntry />
            <CoreInput placeholder="패스워드 확인" secureTextEntry />
            <View style={styles.registeredUserContainer}>
              <Text style={styles.registeredUserText}>이미 회원이신가요 ?</Text>
              <Text
                style={styles.loginLink}
                onPress={() => navigation.push('SignIn')}>
                로그인
              </Text>
            </View>
          </View>
        </View>
        <View>
          <CoreButton mode="contained">회원가입</CoreButton>
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
});
