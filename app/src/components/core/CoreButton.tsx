import React from 'react';
import {StyleProp, StyleSheet, Text, TextStyle} from 'react-native';
import {theme} from '@/styles/theme';
import {Button} from 'react-native-paper';
import {Props} from 'react-native-paper/lib/typescript/src/components/Button/Button';

interface ButtonProps extends Props {
  sx?: StyleProp<TextStyle>;
}

const CoreButton = ({children, mode, sx, disabled, ...props}: ButtonProps) => {
  return (
    <Button
      disabled={disabled}
      style={[
        mode === 'contained' ? styles.fill : styles.outlined,
        styles.container,
        disabled && styles.disabled,
      ]}
      contentStyle={styles.container}
      mode={mode}
      {...props}>
      <Text style={[mode === 'contained' ? styles.fillText : styles.outlineText, sx]}>
        {children}
      </Text>
    </Button>
  );
};

export default CoreButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    height: 50,
    borderRadius: 10,
  },
  fill: {
    backgroundColor: theme.colors.point.sageGreen,
  },
  outlined: {
    borderColor: theme.colors.point.sageGreen,
    borderWidth: 1,
  },
  fillText: {
    color: 'white',
    fontFamily: theme.typography.family.medium,
  },
  outlineText: {
    flex: 1,
    color: theme.colors.point.sageGreen,
    fontFamily: theme.typography.family.medium,
  },
  disabled: {
    backgroundColor: theme.colors.gray[200],
    borderColor: theme.colors.gray[200],
  },
});
