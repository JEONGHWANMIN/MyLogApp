import {theme} from '@/styles/theme';
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';

const WeatherSetting = () => {
  return (
    <View>
      <FlatGrid
        itemDimension={80}
        data={[1, 2, 3, 4, 5, 6]}
        renderItem={({item}) => <Text>{item}</Text>}
      />
    </View>
  );
};

const MoodSetting = () => {
  return (
    <View>
      <Text>기분</Text>
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
    paddingVertical: 20,
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
});
