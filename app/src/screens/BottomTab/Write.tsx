import {useKeyBoardClose} from '@/hooks/useKeyBoardClose';
import {theme} from '@/styles/theme';
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

const Write = () => {
  const navigate = useNavigation();
  const {handleCloseKeyboard} = useKeyBoardClose();
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const handleGoBack = () => {
    navigate.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={handleCloseKeyboard} style={styles.container}>
      <SafeAreaView
        style={{
          flex: 1,
        }}>
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
            style={styles.textTitleInput}
            value={title}
            onChangeText={text => setTitle(text)}
            textAlignVertical="top"
            placeholder="주제를 입력해주세요."
            autoFocus
          />
          <TextInput
            style={styles.textContentInput}
            value={text}
            onChangeText={text => setText(text)}
            textAlignVertical="top"
            multiline={true}
            placeholder="오늘의 일기를 작성해주세요."
            autoFocus
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
  header: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 15,
    color: 'black',
    fontWeight: theme.typography.weight.bold,
  },
  optionContainer: {
    height: 75,
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 10,
    // backgroundColor: 'blue',
  },
  textTitleInput: {
    fontSize: 18,
    fontFamily: theme.typography.family.bold,
  },
  textContentInput: {
    marginTop: 8,
    fontSize: 16,
    flex: 1,
    fontFamily: theme.typography.family.medium,
    lineHeight: 0,
    // letterSpacing: 3,
    // backgroundColor: 'red',
  },
});
