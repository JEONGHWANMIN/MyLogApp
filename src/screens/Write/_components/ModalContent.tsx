import {theme} from '@/styles/theme';
import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import {MOODS, WEATHERS} from '../_constants/_constants';
import {Option} from '../Write';

export type TAB_NAME = '기분' | '날씨';

interface ModalContentProps {
  defaultTab?: TAB_NAME;
  handleChangeOptions: (name: string, option: Option) => void;
}

const ModalContent = ({handleChangeOptions, defaultTab = '날씨'}: ModalContentProps) => {
  const [tab, setTab] = useState<TAB_NAME>(defaultTab);

  const handleChangeTab = (tabName: TAB_NAME) => {
    setTab(tabName);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>오늘의 하루를 아이콘으로 표현해보세요!</Text>
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => handleChangeTab('기분')} style={styles.tab}>
          <Text style={[styles.tabText, tab === '기분' && styles.activeTabText]}>기분</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChangeTab('날씨')} style={styles.tab}>
          <Text style={[styles.tabText, tab === '날씨' && styles.activeTabText]}>날씨</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.borderTob}>
        {tab === '기분' && <MoodSetting handleChangeOptions={handleChangeOptions} />}
        {tab === '날씨' && <WeatherSetting handleChangeOptions={handleChangeOptions} />}
      </View>
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
  activeTabText: {
    color: theme.colors.gray[800],
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
});

interface WeatherSettingProps extends ModalContentProps {}

const WeatherSetting = ({handleChangeOptions}: WeatherSettingProps) => {
  return (
    <FlatList
      data={WEATHERS}
      renderItem={({item}) => (
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => handleChangeOptions('weather', item)}>
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

interface MoodSettingProps extends ModalContentProps {}

const MoodSetting = ({handleChangeOptions}: MoodSettingProps) => {
  return (
    <FlatList
      data={MOODS}
      renderItem={({item}) => (
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => handleChangeOptions('mood', item)}>
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
