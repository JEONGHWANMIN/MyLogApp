import {theme} from '@/styles/theme';
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import {FlatGrid} from 'react-native-super-grid';

const MOODS = [
  {
    key: 'emoticon-cry-outline',
    value: 'cry',
  },
  {
    key: 'emoticon-confused-outline',
    value: 'confused',
  },
  {
    key: 'emoticon-cool-outline',
    value: 'cool',
  },
  {
    key: 'emoticon-cry-outline',
    value: 'cry',
  },
  {
    key: 'emoticon-dead-outline',
    value: 'dead',
  },
  {
    key: 'emoticon-devil-outline',
    value: 'devil',
  },
  {
    key: 'emoticon-excited-outline',
    value: 'excited',
  },
];

const WeatherSetting = () => {
  return (
    <View>
      <FlatGrid
        itemDimension={50}
        data={[
          'emoticon-angry',
          'emoticon-confused',
          'emoticon-cool',
          'emoticon-cry',
          'emoticon-dead',
          'emoticon-devil',
          'emoticon-excited',
        ]}
        maxItemsPerRow={3}
        renderItem={icon => (
          <View style={styles.iconContainer}>
            <IconButton
              icon={icon.item}
              size={40}
              iconColor={theme.colors.gray[500]}
              onPress={() => console.log('asd')}
            />
          </View>
        )}
      />
    </View>
  );
};

const MoodSetting = () => {
  return (
    <View style={{alignItems: 'center'}}>
      <FlatGrid
        itemDimension={50}
        maxItemsPerRow={3}
        data={MOODS}
        renderItem={({item}) => (
          <View style={styles.iconContainer}>
            <IconButton
              icon={item.key}
              size={40}
              iconColor={theme.colors.gray[500]}
              onPress={() => console.log('asd')}
            />
          </View>
        )}
      />
    </View>
  );
};

const ModalContent = () => {
  const [tab, setTab] = useState('날씨');

  const handleChangeTab = (tabName: string) => {
    setTab(tabName);
  };

  return (
    <View>
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
  container: {},
  tabContainer: {
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    // backgroundColor: 'red',
  },
  tabText: {
    zIndex: 2,
    color: theme.colors.gray[500],
    fontWeight: theme.typography.weight.bold,
    fontSize: 14,
  },
  borderTob: {
    borderTopWidth: 1,
    borderTopColor: 'red',
  },
  iconContainer: {justifyContent: 'center', alignItems: 'center'},
});
