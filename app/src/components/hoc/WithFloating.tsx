import React, {ReactElement} from 'react';
import {CoreDialog} from '../core/CoreDialog';
import {CoreSnackbar} from '../core/CoreSnackbar';
import {View} from 'react-native';

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
      </View>
    </>
  );
};

export default WithFloating;
