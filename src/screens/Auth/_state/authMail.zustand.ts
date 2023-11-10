import {create} from 'zustand';

interface EmailAuth {
  email: string;
  resetEmail: () => void;
  setEmail: (email: string) => void;
}

const useAuthEmailStore = create<EmailAuth>(set => ({
  email: '',
  resetEmail: () => set({email: ''}),
  setEmail: email => set({email}),
}));

export {useAuthEmailStore};
