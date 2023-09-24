/* eslint-disable react-hooks/exhaustive-deps */
import {useDateStore} from '@/utils/state/date.zustand';
import {useCallback, useState} from 'react';
import {EventTypes} from 'react-native-month-year-picker';

const useDatePicker = () => {
  const {date, setDate} = useDateStore();
  const [show, setShow] = useState(false);

  const showPicker = (value: boolean) => setShow(value);

  const onValueChange = useCallback(
    async (_: EventTypes, newDate: Date) => {
      const selectedDate = newDate || date;
      const convertedDateFormat = new Date(selectedDate);

      showPicker(false);
      setDate(convertedDateFormat);
    },
    [date, showPicker],
  );

  const setMonth = (num: number) => {
    const copyMonthDate = new Date(date);
    copyMonthDate.setMonth(copyMonthDate.getMonth() + num);

    setDate(copyMonthDate);
  };

  const handleMonth = {
    next: () => setMonth(1),
    previous: () => setMonth(-1),
  };

  const handlePickerShow = () => {
    setShow(prev => !prev);
  };

  return {show, date, onValueChange, handlePickerShow, handleMonth};
};

export {useDatePicker};
