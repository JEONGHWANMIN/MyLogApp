import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigation from '@/navigation/RootNavigation';
import {theme} from '@/styles/theme';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import WithFloating from '@/components/hoc/WithFloating';

export const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <WithFloating>
              <RootNavigation />
            </WithFloating>
          </NavigationContainer>
        </PaperProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
