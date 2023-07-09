import React, {ReactElement} from 'react';
import {CoreDialog} from '../core/CoreDialog';
import {CoreSnackbar} from '../core/CoreSnackbar';
import {View} from 'react-native';
import {CoreModal} from '../core/CoreModal';

interface FloatingHOCProps {
  children: ReactElement;
}

const WithFloating = ({children}: FloatingHOCProps) => {
  return (
    <>
      {children}
      <View>
        <CoreSnackbar />
        <CoreDialog />
        <CoreModal />
      </View>
    </>
  );
};

export default WithFloating;
