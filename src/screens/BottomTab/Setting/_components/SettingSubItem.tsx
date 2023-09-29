import {theme} from '@/styles/theme';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-paper';
import {IconSource} from 'react-native-paper/src/components/Icon';

interface SettingSubItemProps {
  onPress: () => void;
  text: string;
  icon?: IconSource;
}

const SettingSubItem = ({onPress, text, icon}: SettingSubItemProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.5}>
      <Button icon={icon} style={styles.button}>
        <Text style={styles.buttonText}>{text}</Text>
      </Button>
    </TouchableOpacity>
  );
};

export {SettingSubItem};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  button: {
    borderRadius: 0,
    alignItems: 'flex-start',
    borderBottomWidth: 0.5,
    borderBottomColor: theme.colors.gray[200],
    paddingVertical: 6,
  },
  buttonText: {
    color: theme.colors.gray[800],
    fontSize: theme.typography.size.body1,
  },
});
