import React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import RootNavigation from '@/navigation/RootNavigation';
import {theme} from '@/styles/theme';
import WithFloating from '@/components/hoc/WithFloating';
import {LocaleConfig} from 'react-native-calendars';
import {useSplashScreenClose} from '@/hooks/useSplashScreenClose';
import {KOR_DAYS, KOR_MONTHS} from '@/constants/constant';

LocaleConfig.locales['kr'] = {
  monthNames: KOR_MONTHS,
  monthNamesShort: KOR_MONTHS,
  dayNames: KOR_DAYS,
  dayNamesShort: KOR_DAYS,
  today: "Aujourd'hui",
};

LocaleConfig.defaultLocale = 'kr';

export const queryClient = new QueryClient();

const App = () => {
  useSplashScreenClose();
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
