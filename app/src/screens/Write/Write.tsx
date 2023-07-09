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

  const handleOptionModal = () => {
    console.log('모달 오픈');
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
        <View style={styles.optionContainer}>
          <IconButton
            icon="plus-circle-outline"
            size={45}
            iconColor={theme.colors.gray[500]}
            onPress={handleOptionModal}
          />
        </View>
        <View style={styles.textContainer}>
          <TextInput
            style={styles.textTitleInput}
            value={title}
            onChangeText={text => setTitle(text)}
            textAlignVertical="top"
            placeholder="주제를 입력해주세요."
          />
          <TextInput
            style={styles.textContentInput}
            value={text}
            onChangeText={text => setText(text)}
            textAlignVertical="top"
            multiline={true}
            placeholder="오늘의 일기를 작성해주세요."
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
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 15,
    color: 'black',
    fontWeight: theme.typography.weight.bold,
  },
  optionContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',

    // backgroundColor: 'red',
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  textTitleInput: {
    fontSize: 18,
    fontFamily: theme.typography.family.bold,
  },
  textContentInput: {
    flex: 1,
    marginTop: 2,
    fontSize: 16,
    lineHeight: 20,
    fontFamily: theme.typography.family.medium,
  },
});
