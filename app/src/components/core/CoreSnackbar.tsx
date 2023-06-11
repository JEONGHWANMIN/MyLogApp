import React from 'react';
import {useGlobalSnackbarStore} from '@/utils/state/snackbar.zustand';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Snackbar} from 'react-native-paper';
import {theme} from '@/styles/theme';

const CoreSnackbar = () => {
  const {onDismissSnackBar, visible, message, options, actionLabel, mode} =
    useGlobalSnackbarStore();
  return (
    <View style={styles.container}>
      <Snackbar
        theme={{
          isV3: false,
        }}
        style={mode === 'error' ? styles.error : styles.info}
        visible={visible}
        onDismiss={onDismissSnackBar}
        {...options}>
        <View style={styles.content}>
          <Text style={styles.message}>{message}</Text>
          <Button
            onPress={() => {
              onDismissSnackBar();
            }}>
            <Text
              style={[
                styles.button,
                mode === 'error'
                  ? styles.errorActionText
                  : styles.infoActionText,
              ]}>
              {actionLabel}
            </Text>
          </Button>
        </View>
      </Snackbar>
    </View>
  );
};

export {CoreSnackbar};

const styles = StyleSheet.create({
  container: {},
  info: {
    backgroundColor: theme.colors.point.mintGreen,
  },
  error: {
    backgroundColor: theme.colors.point.error,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  message: {
    fontWeight: theme.typography.weight.bold,
    color: 'white',
  },
  button: {
    fontWeight: theme.typography.weight.bold,
  },
  infoActionText: {
    color: 'white',
  },
  errorActionText: {
    color: 'white',
  },
});
