import CoreButton from '@/components/core/CoreButton';
import {theme} from '@/styles/theme';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const SignUp = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>PenPle</Text>
      </View>
      <View>
        <CoreButton mode="contained">회원가입</CoreButton>
      </View>
    </View>
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
});
