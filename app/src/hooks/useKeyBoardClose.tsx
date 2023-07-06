import {Keyboard} from 'react-native';

const useKeyBoardClose = () => {
  const handleCloseKeyboard = () => {
    Keyboard.dismiss();
  };

  return {handleCloseKeyboard};
};

export {useKeyBoardClose};
