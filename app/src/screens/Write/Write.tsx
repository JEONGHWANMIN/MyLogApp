import {useKeyBoardClose} from '@/hooks/useKeyBoardClose';
import {theme} from '@/styles/theme';
import {useGlobalModalStore} from '@/utils/state/modal.zustand';
import {DateUtils} from '@/utils/util/DateUtils';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {IconButton} from 'react-native-paper';
import {ModalContent} from './_components/ModalContent';

const Write = () => {
  const navigate = useNavigation();
  const {setGlobalModalConfig} = useGlobalModalStore();
  const {handleCloseKeyboard} = useKeyBoardClose();
  const [textAlineFormat, setTextAlineFormat] = useState<'left' | 'center'>('left');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const handleGoBack = () => {
    navigate.goBack();
  };

  const handleChangeTextAlign = () => {
    setTextAlineFormat(textAlineFormat === 'left' ? 'center' : 'left');
  };

  const handleOptionModal = () => {
    setGlobalModalConfig({
      visible: true,
      children: <ModalContent />,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={handleCloseKeyboard} style={styles.container}>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.header}>
          <IconButton icon="keyboard-backspace" onPress={handleGoBack} />
          <Text style={styles.headerTitle}>{DateUtils.getYearMonthDayDayOfWeek()}</Text>
          <IconButton
            icon="check"
            iconColor="green"
            size={24}
            onPress={() => console.log('전송')}
          />
        </View>
        <View style={styles.textContainer}>
          <TextInput
            style={[styles.textTitleInput, {textAlign: textAlineFormat}]}
            value={title}
            onChangeText={text => setTitle(text)}
            textAlignVertical="top"
            placeholder="주제를 입력해주세요 : )"
          />
          <TextInput
            style={[styles.textContentInput, {textAlign: textAlineFormat}]}
            value={text}
            onChangeText={text => setText(text)}
            textAlignVertical="top"
            multiline={true}
            placeholder="오늘의 감정은 어떠셨나요?"
          />
        </View>
        <View style={styles.optionContainer}>
          <IconButton
            icon={`format-align-${textAlineFormat}`}
            size={25}
            iconColor={theme.colors.gray[500]}
            onPress={handleChangeTextAlign}
          />
          <IconButton
            icon="emoticon"
            size={25}
            iconColor={theme.colors.gray[500]}
            onPress={handleOptionModal}
          />
          <IconButton
            icon="weather-night"
            size={25}
            iconColor={theme.colors.gray[500]}
            onPress={handleOptionModal}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Write;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: theme.colors.gray[100],
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 15,
    color: 'black',
    fontWeight: theme.typography.weight.bold,
  },
  optionContainer: {
    borderTopColor: theme.colors.gray[100],
    borderTopWidth: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  textTitleInput: {
    fontSize: 18,
    fontFamily: theme.typography.family.bold,
    color: theme.colors.gray[800],
    textAlign: 'center',
  },
  textContentInput: {
    flex: 1,
    marginTop: 10,
    fontSize: 16,
    lineHeight: 25,
    fontFamily: theme.typography.family.medium,
    color: theme.colors.gray[800],
  },
});
