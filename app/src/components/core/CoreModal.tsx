import React from 'react';
import {Modal, Portal} from 'react-native-paper';
import {useGlobalModalStore} from '@/utils/state/modal.zustand';
import {StyleSheet} from 'react-native';

const CoreModal = () => {
  const {children, ...props} = useGlobalModalStore();
  return (
    <Portal>
      <Modal {...props} contentContainerStyle={styles.containerStyle}>
        {children}
      </Modal>
    </Portal>
  );
};

export {CoreModal};

const styles = StyleSheet.create({
  containerStyle: {backgroundColor: 'white', padding: 20, marginHorizontal: 20},
});
