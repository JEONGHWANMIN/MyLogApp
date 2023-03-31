import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import TestButton from '@/components/TestButton';
import styled from 'styled-components/native';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <TestButton />
      <StyledBox>
        <StyledText>Hello</StyledText>
      </StyledBox>
    </SafeAreaView>
  );
}

export default App;

const StyledBox = styled.View``;

const StyledText = styled.Text`
  color: 'red';
`;
