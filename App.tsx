import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigation from '@/navigation/RootNavigation';
import {theme} from '@/styles/theme';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import WithFloating from '@/components/hoc/WithFloating';
import {LocaleConfig} from 'react-native-calendars';

export const queryClient = new QueryClient();

const KOR_MONTHS = [
  '1월',
  '2월',
  '3월',
  '4월',
  '5월',
  '6월',
  '7월',
  '8월',
  '9월',
  '10월',
  '11월',
  '12월',
];

const KOR_DAYS = ['일', '월', '화', '수', '목', '금', '토'];

LocaleConfig.locales['kr'] = {
  monthNames: KOR_MONTHS,
  monthNamesShort: KOR_MONTHS,
  dayNames: KOR_DAYS,
  dayNamesShort: KOR_DAYS,
  today: "Aujourd'hui",
};

LocaleConfig.defaultLocale = 'kr';

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
