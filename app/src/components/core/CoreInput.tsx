import React, {useState} from 'react';
import {theme} from '@/styles/theme';
import {StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Props} from 'react-native-paper/lib/typescript/src/components/TextInput/TextInput';

const CoreInput = ({...props}: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <TextInput
      {...props}
      style={[styles.container, isFocused && styles.focus]}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
  );
};

export default CoreInput;

const styles = StyleSheet.create({
  container: {
    borderColor: theme.colors.gray[200],
    borderWidth: 1,
    flex: 1,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    height: 50,
  },
  focus: {
    borderColor: theme.colors.point.sageGreen,
  },
});
