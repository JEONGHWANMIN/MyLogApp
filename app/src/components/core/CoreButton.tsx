import React from 'react';
import {StyleProp, StyleSheet, Text, TextStyle} from 'react-native';
import {theme} from '@/styles/theme';
import {Button} from 'react-native-paper';
import {Props} from 'react-native-paper/lib/typescript/src/components/Button/Button';

interface ButtonProps extends Props {
  sx?: StyleProp<TextStyle>;
}

const CoreButton = ({children, mode, sx, ...props}: ButtonProps) => {
  return (
    <Button
      style={[
        mode === 'contained' ? styles.fill : styles.outlined,
        styles.container,
      ]}
      {...props}>
      <Text
        style={[
          mode === 'contained' ? styles.fillText : styles.outlineText,
          sx,
        ]}>
        {children}
      </Text>
    </Button>
  );
};

export default CoreButton;

const styles = StyleSheet.create({
  container: {justifyContent: 'center', height: 50, borderRadius: 10},
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
    color: theme.colors.point.sageGreen,
    fontFamily: theme.typography.family.medium,
  },
});
