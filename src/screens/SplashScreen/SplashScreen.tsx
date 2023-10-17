import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import {LocalStorage} from '@/utils/localStorage/localStorage';
import {AuthParamListProps, RootListParamsListProps} from '@/navigation/types/types';
import {theme} from '@/styles/theme';

const SplashScreen = () => {
  const navigation = useNavigation<AuthParamListProps & RootListParamsListProps>();

  useEffect(() => {
    const checkLogin = async () => {
      const localStorage = LocalStorage.getInstance();

      const accessToken = await localStorage.getData('accessToken');

      if (accessToken) {
        return navigation.replace('BottomTabNavigation');
      }

      navigation.replace('AuthNavigation');
    };

    const timer = setTimeout(() => {
      checkLogin();
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.splashText}>PenPle</Text>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.point.mintGreen,
  },
  splashText: {
    color: 'white',
    fontSize: theme.typography.size.H3,
    fontWeight: theme.typography.weight.extraBold,
    letterSpacing: 2.5,
  },
});
