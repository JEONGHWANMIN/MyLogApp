import {create} from 'zustand';

interface PhoneNumber {
  phoneNumber: string;
  resetPhoneNumber: () => void;
  setPhoneNumber: (phoneNumber: string) => void;
}

const usePhoneNumberStore = create<PhoneNumber>(set => ({
  phoneNumber: '',
  resetPhoneNumber: () => set({phoneNumber: ''}),
  setPhoneNumber: phoneNumber => set({phoneNumber}),
}));

export {usePhoneNumberStore};
