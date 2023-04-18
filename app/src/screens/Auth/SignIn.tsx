import React from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import CoreButton from '@/components/core/CoreButton';
import CoreInput from '@/components/core/CoreInput';
import {theme} from '@/styles/theme';
import {useNavigation} from '@react-navigation/native';
import {AuthParamListProps} from '@/navigation/types/types';

const SignIn = () => {
  const navigation = useNavigation<AuthParamListProps>();
  const handleCloseKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback onPress={handleCloseKeyboard}>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>PenPle</Text>
          <View style={styles.inputContainer}>
            <CoreInput placeholder="이메일" />
            <CoreInput placeholder="패스워드" secureTextEntry />
            <View style={styles.registeredUserContainer}>
              <Text style={styles.registeredUserText}>회원이 아니신가요 ?</Text>
              <Text
                style={styles.loginLink}
                onPress={() => navigation.push('SignUp')}>
                회원가입
              </Text>
            </View>
          </View>
        </View>
        <View>
          <CoreButton mode="contained">로그인</CoreButton>
        </View>
      </View>
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
