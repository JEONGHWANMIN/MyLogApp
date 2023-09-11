import {theme} from '@/styles/theme';
import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {Text} from 'react-native-paper';

const Home = () => {
  const [selected, setSelected] = useState('');
  const [currentDate, setCurrentDate] = useState({});
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Calendar
          onDayPress={day => {
            setSelected(day.dateString);
          }}
          onMonthChange={month => console.log(month)}
          monthFormat="yyyy년 MM월"
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedColor: theme.colors.point.sageGreen,
            },
            '2023-09-01': {selected: true, marked: true, selectedColor: 'blue'},
            '2023-09-02': {marked: true},
            '2023-09-03': {
              selected: true,
              marked: true,
              selectedColor: theme.colors.point.mintGreen,
            },
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  calendar: {},
});
