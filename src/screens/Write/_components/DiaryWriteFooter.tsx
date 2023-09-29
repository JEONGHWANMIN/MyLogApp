import React from 'react';
import {theme} from '@/styles/theme';
import {StyleSheet, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import {TAB_NAME} from './ModalContent';

interface DiaryWriteFooterProps {
  handleOptionModal: (tab: TAB_NAME) => void;
}

const DiaryWriteFooter = ({handleOptionModal}: DiaryWriteFooterProps) => {
  return (
    <View style={styles.optionContainer}>
      <IconButton
        icon="emoticon"
        size={25}
        iconColor={theme.colors.gray[500]}
        onPress={() => handleOptionModal('기분')}
      />
      <IconButton
        icon="weather-night"
        size={25}
        iconColor={theme.colors.gray[500]}
        onPress={() => handleOptionModal('날씨')}
      />
    </View>
  );
};

export {DiaryWriteFooter};

const styles = StyleSheet.create({
  optionContainer: {
    borderTopColor: theme.colors.gray[100],
    borderTopWidth: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
