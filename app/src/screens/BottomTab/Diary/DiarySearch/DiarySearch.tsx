/* eslint-disable react/no-unstable-nested-components */
import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {Searchbar, IconButton, Surface} from 'react-native-paper';

const DiarySearch = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = (query: string) => setSearchQuery(query);

  const handleSearch = () => {
    // 검색을 수행하는 로직을 구현할 수 있습니다.
    console.log('Searching for:', searchQuery);
    // 여기에 실제 검색 로직을 추가할 수 있습니다.
  };

  return (
    <SafeAreaView>
      <Surface style={styles.surface}>
        <Searchbar
          placeholder="검색어를 입력하세요"
          onChangeText={onChangeSearch}
          value={searchQuery}
          icon={() => <IconButton icon="magnify" onPress={handleSearch} />}
          clearIcon={'close-circle'}
          style={styles.searchbox}
          elevation={undefined}
          theme={{
            isV3: false,
          }}
        />
      </Surface>
      <Text>검색 결과 표시 영역</Text>
    </SafeAreaView>
  );
};

export {DiarySearch};

const styles = StyleSheet.create({
  surface: {
    backgroundColor: 'white',
  },
  searchbox: {
    backgroundColor: 'white',
  },
});
