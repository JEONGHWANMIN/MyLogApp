import {useKeyBoardClose} from '@/hooks/useKeyBoardClose';
import {theme} from '@/styles/theme';
import {DateUtils} from '@/utils/util/DateUtils';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {IconButton} from 'react-native-paper';
import {useDiaryApiSpecGetDiaryId} from '@/orval/api/diary/diary';
import {useGlobalDialogStore} from '@/utils/state/dialog.zustand';
import {useShowSnackbarMessage} from '@/hooks/useShowSnacbarMessage';
import {INITIAL_OPTIONS_FORM, INITIAL_TEXT_FORM} from '@/screens/Write/_constants/_constants';
import {DiaryStackProps} from '@/navigation/types/types';
import {MOODS_MAP, MoodsMapKey, WEATHER_MAP, WeatherMapKey} from '../_constant/_constant';

export interface Option {
  key: string;
  value: string;
  description: string;
  color: string;
}

const Detail = () => {
  const navigate = useNavigation();
  const {setGlobalDialogConfig} = useGlobalDialogStore();
  const {showSnackbarMessage} = useShowSnackbarMessage();
  const {handleCloseKeyboard} = useKeyBoardClose();
  const [textForm, setTextForm] = useState(INITIAL_TEXT_FORM);
  const [options, setOptions] = useState<Record<'mood' | 'weather', Option>>(INITIAL_OPTIONS_FORM);
  const route = useRoute<DiaryStackProps>();

  const {id} = route.params;

  const diaryStatus = useDiaryApiSpecGetDiaryId(id, {
    query: {
      enabled: !!id,
      select: ({data}) => data,
    },
  });

  useEffect(() => {
    if (diaryStatus.status === 'success') {
      const {title, content, mood, weather, createdAt} = diaryStatus.data;

      console.log(createdAt);

      const moodObj = MOODS_MAP[mood as MoodsMapKey];
      const weatherObj = WEATHER_MAP[weather as WeatherMapKey];

      setTextForm({title, content});
      setOptions(prev => ({
        mood: mood ? moodObj : prev.mood,
        weather: weather ? weatherObj : prev.weather,
      }));
    }
  }, [diaryStatus.status, diaryStatus.data]);

  const handleGoBack = () => {
    navigate.goBack();
  };

  const handleChangeOptions = (name: string, option: Option) => {
    setOptions(prev => ({
      ...prev,
      [name]: option,
    }));
  };

  const handleChangeText = (name: string, text: string) => {
    setTextForm({
      ...textForm,
      [name]: text,
    });
  };

  const createDate = new Date(diaryStatus?.data?.createdAt ?? new Date());

  const diaryCreateDate = DateUtils.getYearMonthDayDayOfWeek(createDate);

  return (
    <TouchableWithoutFeedback onPress={handleCloseKeyboard} style={styles.container}>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.header}>
          <IconButton icon="keyboard-backspace" onPress={handleGoBack} />
          <Text style={styles.headerTitle}>{diaryCreateDate ?? ''}</Text>
          <View
            style={{
              width: 50,
            }}
          />
        </View>
        <View style={styles.iconContainer}>
          {options.mood.key && (
            <View style={styles.iconPreviewContainer}>
              <IconButton icon={options.mood.key} size={30} iconColor={options.mood.color} />
            </View>
          )}
          {options.weather.key && (
            <View style={styles.iconPreviewContainer}>
              <IconButton icon={options.weather.key} size={30} iconColor={options.weather.color} />
            </View>
          )}
        </View>
        <View style={styles.textContainer}>
          <TextInput
            style={[styles.textTitleInput]}
            value={textForm.title}
            onChangeText={text => handleChangeText('title', text)}
            textAlignVertical="top"
            placeholder="주제를 입력해주세요 : )"
            editable={false}
          />
          <TextInput
            style={[styles.textContentInput]}
            value={textForm.content}
            onChangeText={text => handleChangeText('content', text)}
            textAlignVertical="top"
            multiline={true}
            placeholder="오늘의 일기를 작성해주세요 !"
            editable={false}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Detail;

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
  iconContainer: {
    height: 40,
    marginTop: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loading: {
    paddingRight: 20,
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  textTitleInput: {
    fontSize: 18,
    fontFamily: theme.typography.family.bold,
    color: theme.colors.gray[800],
    // textAlign: 'center',
  },
  textContentInput: {
    flex: 1,
    marginTop: 10,
    fontSize: 16,
    lineHeight: 25,
    fontFamily: theme.typography.family.medium,
    color: theme.colors.gray[800],
  },
  iconPreviewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconPreviewText: {
    fontWeight: theme.typography.weight.bold,
  },
});
