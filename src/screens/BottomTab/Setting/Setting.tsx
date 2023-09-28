import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {SettingSubTitle} from './_components/SettingSubTitle';
import {SettingSubItem} from './_components/SettingSubItem';
import {useDeleteUser} from './_query/useDeleteUser';
import {useLogout} from './_hooks/useLogout';

const Setting = () => {
  const {handleLogout} = useLogout();
  const {showConfirmDeleteUser} = useDeleteUser();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <SettingSubTitle title="계정" />
        <SettingSubItem icon="logout" text="로그아웃" onPress={handleLogout} />
        <SettingSubItem icon="account-minus" text="회원탈퇴" onPress={showConfirmDeleteUser} />
      </View>
    </SafeAreaView>
  );
};

export default Setting;

const styles = StyleSheet.create({
  safeArea: {flex: 1},
  container: {flex: 1},
});
