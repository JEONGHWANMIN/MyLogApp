import React from 'react';
import {theme} from '@/styles/theme';
import {StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Props} from 'react-native-paper/lib/typescript/src/components/TextInput/TextInput';

const CoreInput = ({...props}: Props) => {
  return <TextInput {...props} style={styles.container} />;
};

export default CoreInput;

const styles = StyleSheet.create({
  container: {
    borderColor: theme.colors.point.sageGreen,
    borderWidth: 1,
    flex: 1,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    height: 50,
  },
});
