import {create} from 'zustand';

interface DateStore {
  date: Date;
  setDate: (newDate: Date) => void;
  resetDate: () => void;
}

const useDateStore = create<DateStore>(set => ({
  date: new Date(),
  setDate: newDate => set({date: newDate}),
  resetDate: () => set({date: new Date()}),
}));

export {useDateStore};
