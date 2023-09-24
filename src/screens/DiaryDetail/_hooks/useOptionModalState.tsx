import {useGlobalModalStore} from '@/utils/state/modal.zustand';
import React, {useEffect, useState} from 'react';
import {Option} from '../DiaryDetail';
import {INITIAL_OPTIONS_FORM} from '@/screens/Write/_constants/_constants';
import {ModalContent, TAB_NAME} from '@/screens/Write/_components/ModalContent';

const useOptionModalState = () => {
  const {setGlobalModalConfig} = useGlobalModalStore();
  const [options, setOptions] = useState<Record<'mood' | 'weather', Option>>(INITIAL_OPTIONS_FORM);

  useEffect(() => {
    setGlobalModalConfig({
      visible: false,
      children: <ModalContent handleChangeOptions={handleChangeOptions} defaultTab={'기분'} />,
    });
  }, [setGlobalModalConfig]);

  const handleChangeOptions = (name: string, option: Option) => {
    setOptions(prev => ({
      ...prev,
      [name]: option,
    }));
  };

  const handleOptionModal = (tab: TAB_NAME) => {
    setGlobalModalConfig({
      visible: true,
      children: <ModalContent handleChangeOptions={handleChangeOptions} defaultTab={tab} />,
    });
  };

  return {options, setOptions, handleOptionModal};
};

export {useOptionModalState};
