import {create} from 'zustand';
import {Props} from 'react-native-paper/lib/typescript/src/components/Modal';

export interface CoreModalProps extends Props {
  children: React.ReactNode;
  setGlobalModalConfig: (config: GlobalModalConfig) => void;
}

interface GlobalModalConfig extends Props {}

const useGlobalModalStore = create<CoreModalProps>(set => ({
  visible: false,
  children: '',
  setGlobalModalConfig: (config: GlobalModalConfig) => {
    set(config);
  },
  onDismiss: () =>
    set({
      visible: false,
      children: '',
    }),
}));

export {useGlobalModalStore};
