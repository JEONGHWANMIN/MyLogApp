import {ReactElement} from 'react';
import {create} from 'zustand';

interface GlobalDialog {
  title?: string;
  content?: string | ReactElement;
  visible: boolean;
  leftButtonText?: string;
  rightButtonText?: string;
  leftButtonEvent?: () => void;
  rightButtonEvent?: () => void;
  showDialog: () => void;
  hideDialog: () => void;
  setGlobalDialogConfig: (config: GlobalDialogConfig) => void;
}

interface GlobalDialogConfig {
  title?: string;
  content?: string | ReactElement;
  visible?: boolean;
  leftButtonText?: string;
  rightButtonText?: string;
  leftButtonEvent?: () => void;
  rightButtonEvent?: () => void;
}

const useGlobalDialogStore = create<GlobalDialog>(set => ({
  title: '',
  content: '',
  leftButtonText: '',
  rightButtonText: '',
  visible: false,
  showDialog: () => set({visible: true}),
  hideDialog: () => set({visible: false}),
  setGlobalDialogConfig: ({
    title,
    content,
    leftButtonText = '',
    rightButtonText = '',
    visible = true,
    leftButtonEvent,
    rightButtonEvent,
  }: GlobalDialogConfig) => {
    set({
      title,
      content,
      visible,
      leftButtonText,
      rightButtonText,
      leftButtonEvent,
      rightButtonEvent,
    });
  },
}));

export {useGlobalDialogStore};
