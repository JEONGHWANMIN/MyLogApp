import React, {useState} from 'react';
import {theme} from '@/styles/theme';
import {StyleProp, StyleSheet, TextStyle} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Props} from 'react-native-paper/lib/typescript/src/components/TextInput/TextInput';

interface CoreInputProps extends Props {
  error?: boolean;
  sx?: StyleProp<TextStyle>;
  onFocusEvent?: () => void;
  onBlurEvent?: () => void;
}

const CoreInput = ({error = false, sx, onFocusEvent, onBlurEvent, ...props}: CoreInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <TextInput
      {...props}
      placeholderTextColor={theme.colors.gray[400]}
      style={[styles.container, isFocused && styles.focus, error && styles.error, sx]}
      onFocus={() => {
        setIsFocused(true);
        if (onFocusEvent) {
          onFocusEvent();
        }
      }}
      onBlur={() => {
        setIsFocused(false);
        if (onBlurEvent) {
          onBlurEvent();
        }
      }}
    />
  );
};

export default CoreInput;

const styles = StyleSheet.create({
  container: {
    borderColor: theme.colors.gray[200],
    borderWidth: 1,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    height: 50,
  },
  focus: {
    borderColor: theme.colors.point.sageGreen,
  },
  error: {
    borderColor: theme.colors.point.error,
    '&:placeholder': {
      color: 'red',
    },
  },
});
