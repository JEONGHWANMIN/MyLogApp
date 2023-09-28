import {theme} from '@/styles/theme';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface SettingSubTitleProps {
  title: string;
}

const SettingSubTitle = ({title}: SettingSubTitleProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export {SettingSubTitle};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    color: theme.colors.gray[800],
    fontSize: theme.typography.size.H6,
    fontFamily: theme.typography.family.regular,
    fontWeight: theme.typography.weight.medium,
  },
});
