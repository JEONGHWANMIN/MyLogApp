import {create} from 'zustand';

interface UserSignUpEmail {
  signupEmail: string;
  resetEmail: () => void;
  setEmail: (signupEmail: string) => void;
}

const useUserEmailStore = create<UserSignUpEmail>(set => ({
  signupEmail: '',
  resetEmail: () => set({signupEmail: ''}),
  setEmail: signupEmail => set({signupEmail}),
}));

export {useUserEmailStore};
