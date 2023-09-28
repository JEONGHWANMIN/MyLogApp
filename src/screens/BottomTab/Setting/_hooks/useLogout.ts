import {RootListParamsListProps} from '@/navigation/types/types';
import {LocalStorage} from '@/utils/localStorage/localStorage';
import {useNavigation} from '@react-navigation/native';

const useLogout = () => {
  const navigate = useNavigation<RootListParamsListProps>();

  const handleLogout = async () => {
    const localStorage = await LocalStorage.getInstance();
    localStorage.removeData('accessToken');
    navigate.replace('AuthNavigation');
  };

  return {handleLogout};
};

export {useLogout};
