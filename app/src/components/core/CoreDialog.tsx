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
              <View style={styles.flexOne}>
                <CoreButton
                  onPress={() => {
                    if (leftButtonEvent) {
                      leftButtonEvent();
                    }
                    hideDialog();
                  }}
                  sx={{}}>
                  {leftButtonText}
                </CoreButton>
              </View>
            )}
            {rightButtonText && (
              <View style={styles.flexOne}>
                <CoreButton
                  mode="contained"
                  sx={{}}
                  onPress={() => {
                    if (rightButtonEvent) {
                      rightButtonEvent();
                    }
                    hideDialog();
                  }}>
                  {rightButtonText}
                </CoreButton>
              </View>
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
  title: {
    textAlign: 'center',
    fontWeight: theme.typography.weight.extraBold,
    fontSize: 18,
    color: theme.colors.gray[500],
  },
  flexOne: {
    flex: 1,
  },
  actionContainer: {
    marginTop: 5,
    flexDirection: 'row',
  },
});
