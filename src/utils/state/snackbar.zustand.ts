import {create} from 'zustand';
import {Props} from 'react-native-paper/lib/typescript/src/components/Snackbar';

type SnackbarProps = Partial<Props>;

interface SnackbarState {
  message: string;
  visible: boolean;
  actionLabel: string;
  mode?: 'info' | 'error' | 'warning';
  options?: SnackbarProps;
  onDismissSnackBar: () => void;
  setGlobalSnackbar: (config: GlobalSnackbarConfig) => void;
}

interface GlobalSnackbarConfig {
  message?: string;
  visible?: boolean;
  options?: SnackbarProps;
  actionLabel?: string;
  mode?: 'info' | 'error' | 'warning';
}

const useGlobalSnackbarStore = create<SnackbarState>(set => ({
  message: '',
  actionLabel: '',
  visible: false,
  onDismissSnackBar: () => set({message: '', visible: false}),
  setGlobalSnackbar: ({
    message,
    visible = true,
    mode = 'info',
    options,
    actionLabel,
  }: GlobalSnackbarConfig) => {
    set({
      message,
      visible,
      options,
      actionLabel,
      mode,
    });
  },
}));

export {useGlobalSnackbarStore};
