import {theme} from '@/styles/theme';
import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import {MOODS, WEATHERS} from '../_constants/_constants';

const WeatherSetting = () => {
  return (
    <FlatList
      data={WEATHERS}
      renderItem={({item}) => (
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconContainer} onPress={() => console.log('asd')}>
            <IconButton icon={item.key} size={40} iconColor={item.color} />
            <Text>{item.description}</Text>
          </TouchableOpacity>
        </View>
      )}
      numColumns={3}
      keyExtractor={item => item.key}
    />
  );
};

const MoodSetting = () => {
  return (
    <FlatList
      data={MOODS}
      renderItem={({item}) => (
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconContainer} onPress={() => console.log('asd')}>
            <IconButton icon={item.key} size={40} iconColor={item.color} />
            <Text>{item.description}</Text>
          </TouchableOpacity>
        </View>
      )}
      numColumns={3}
      keyExtractor={item => item.key}
    />
  );
};

const ModalContent = () => {
  const [tab, setTab] = useState('날씨');

  const handleChangeTab = (tabName: string) => {
    setTab(tabName);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>오늘의 하루를 아이콘으로 표현해보세요!</Text>
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => handleChangeTab('날씨')} style={styles.tab}>
          <Text style={styles.tabText}>날씨</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChangeTab('기분')} style={styles.tab}>
          <Text style={styles.tabText}>기분</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.borderTob}>{tab === '날씨' ? <WeatherSetting /> : <MoodSetting />}</View>
    </View>
  );
};

export {ModalContent};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: theme.typography.size.body1,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.gray[600],
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    gap: 10,
    paddingVertical: 15,
  },
  tabText: {
    zIndex: 2,
    color: theme.colors.gray[500],
    fontWeight: theme.typography.weight.bold,
    fontSize: 14,
  },
  borderTob: {
    // borderTopWidth: 1,
    // borderTopColor: 'red',
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {},
});
