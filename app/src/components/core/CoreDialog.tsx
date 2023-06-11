import {theme} from '@/styles/theme';
import {useGlobalDialogStore} from '@/utils/state/dialog.zustand';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dialog, Portal} from 'react-native-paper';
import CoreButton from './CoreButton';

const CoreDialog = () => {
  const {
    title,
    content,
    visible,
    hideDialog,
    leftButtonText,
    rightButtonText,
    leftButtonEvent,
    rightButtonEvent,
  } = useGlobalDialogStore();
  return (
    <View>
      <Portal>
        <Dialog
          theme={{
            isV3: false,
          }}
          visible={visible}
          onDismiss={hideDialog}
          style={styles.container}>
          {title && <Dialog.Title style={styles.title}>{title}</Dialog.Title>}
          {content && (
            <Dialog.Content>
              {typeof content === 'string' ? <Text>{content}</Text> : content}
            </Dialog.Content>
          )}
          <Dialog.Actions style={styles.actionContainer}>
            {leftButtonText && (
              <CoreButton
                onPress={() => {
                  if (leftButtonEvent) {
                    leftButtonEvent();
                  }
                  hideDialog();
                }}
                sx={{
                  backgroundColor: 'red',
                }}>
                {leftButtonText}
              </CoreButton>
            )}
            {rightButtonText && (
              <CoreButton
                mode="contained"
                onPress={() => {
                  if (rightButtonEvent) {
                    rightButtonEvent();
                  }
                  hideDialog();
                }}>
                {rightButtonText}
              </CoreButton>
            )}
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export {CoreDialog};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  actionContainer: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  title: {
    fontSize: theme.typography.size.body1,
  },
});
