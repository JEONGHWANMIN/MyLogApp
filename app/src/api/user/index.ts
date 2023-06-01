import {customAxiosInstance} from '../index';
import {SignUpForm} from './type/users.type';

export const signupApi = async (signUpForm: SignUpForm) => {
  const response = await customAxiosInstance.post('/users/signup', signUpForm);
  return response.data;
};
