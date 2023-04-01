import {theme} from '@/styles/theme';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Auth = () => {
  return (
    <View>
      <Text style={styles.text}>초기 인증 화면</Text>
    </View>
  );
};

export default Auth;

const styles = StyleSheet.create({
  text: {
    fontFamily: theme.typography.family.medium,
    fontWeight: theme.typography.weight.extraBold,
  },
});
