import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigation from '@/navigation/RootNavigation';
import {theme} from '@/styles/theme';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const App = () => {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <RootNavigation />
          </NavigationContainer>
        </PaperProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
