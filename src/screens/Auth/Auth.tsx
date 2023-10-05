import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {theme} from '@/styles/theme';
import CoreButton from '@/components/core/CoreButton';
import {AuthParamListProps} from '@/navigation/types/types';

const Auth = () => {
  const navigation = useNavigation<AuthParamListProps>();
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>PenPle</Text>
        <Text style={styles.subTitle}>
          <Text style={styles.pointColor}>펜플</Text>을 통해서 당신의 하루를
          {'\n'}
          기록하여, 의미있는 하루를 보내는 {'\n'}
          방법을 찾아보세요.
        </Text>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.buttonText}>{'먼저 로그인이 필요해요 : )'}</Text>
        <CoreButton mode="outlined" onPress={() => navigation.navigate('SignIn')}>
          로그인
        </CoreButton>
        <CoreButton mode="contained" onPress={() => navigation.navigate('SignUpPhone')}>
          회원가입
        </CoreButton>
      </View>
    </View>
  );
};

export default Auth;

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
    marginBottom: 20,
  },
  buttonText: {
    fontSize: theme.typography.size.H6,
    color: theme.colors.point.sageGreen,
    fontFamily: theme.typography.family.medium,
  },
});
