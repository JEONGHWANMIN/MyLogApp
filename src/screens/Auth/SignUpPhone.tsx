import {useNavigation} from '@react-navigation/native';
import React from 'react';
import CoreButton from '@/components/core/CoreButton';
import CoreInput from '@/components/core/CoreInput';
import {useKeyBoardClose} from '@/hooks/useKeyBoardClose';
import {AuthParamListProps} from '@/navigation/types/types';
import {theme} from '@/styles/theme';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import Icon from 'react-native-paper/src/components/Icon';
import {usePhoneNumberStore} from './_state/phoneNumber.zustand';
import {useShowSnackbarMessage} from '@/hooks/useShowSnacbarMessage';

const SignUpPhone = () => {
  const navigation = useNavigation<AuthParamListProps>();
  const {phoneNumber, setPhoneNumber} = usePhoneNumberStore();
  const {showSnackbarMessage} = useShowSnackbarMessage();
  const {handleCloseKeyboard} = useKeyBoardClose();

  const handleGoSignUpAccount = () => {
    if (phoneNumber.length < 10) {
      showSnackbarMessage('번호를 확인해주세요 : (', 'warning');
      return;
    }

    navigation.push('SignUpAccount');
  };

  const handleChangePhoneNumber = (text: string) => {
    const isResetValue = text === '';
    if (isResetValue) {
      setPhoneNumber(text);
      return;
    }

    const isInputText = !/^\d+$/.test(text);
    if (isInputText) {
      showSnackbarMessage('숫자를 입력해주세요 : (', 'warning');
      return;
    }

    const isLongNumber = text.length > 11;
    if (isLongNumber) {
      showSnackbarMessage('번호가 너무 길어요 : (', 'warning');
      return;
    }

    setPhoneNumber(text);
  };

  return (
    <TouchableWithoutFeedback onPress={handleCloseKeyboard}>
      <View style={styles.container}>
        <Text style={styles.title}>PenPle</Text>
        <Text style={styles.phoneNumberText}>휴대폰 번호를 입력해주세요 : )</Text>
        <View style={styles.inputContainer}>
          <CoreInput
            placeholder="ex) 01012345678"
            onChangeText={handleChangePhoneNumber}
            value={phoneNumber}
            keyboardType="numeric"
          />
          <View style={styles.helperTextContainer}>
            <Icon source="information" size={18} color="gray" />
            <Text style={styles.helperInfoText}>
              휴대폰 번호는 나중에 비밀번호를 찾는데 사용됩니다.
            </Text>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <CoreButton mode="contained" onPress={handleGoSignUpAccount}>
            다음
          </CoreButton>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignUpPhone;

const styles = StyleSheet.create({
  container: {padding: 28, flex: 1, backgroundColor: 'white', gap: 10},
  inputContainer: {
    flex: 1,
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
  bottomContainer: {},
});
