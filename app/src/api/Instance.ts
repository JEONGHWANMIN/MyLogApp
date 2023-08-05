import axios, {AxiosError, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse} from 'axios';
import {API_URL} from '@env';
import {Platform} from 'react-native';
import {LocalStorage} from '../utils/localStorage/localStorage';
import {usersApiSpecGetUsersRenew} from '@/orval/api/users/users';
export type ErrorType<Error> = AxiosError<Error>;

// Local Test
// const _ANDROID_AVD_API_HOST = 'http://10.0.2.2:8080';
// const _IOS_API_HOST = 'http://localhost:8080';

// Local WIFI Test
// const _ANDROID_AVD_API_HOST = 'http://192.168.1.7:8080';
// const _IOS_API_HOST = 'http://192.168.1.7:8080';

const customConfig: AxiosRequestConfig = {
  baseURL: Platform.OS === 'android' ? API_URL : API_URL,
};

export const customAxiosInstance = axios.create(customConfig);

export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  const source = axios.CancelToken.source();
  const promise = customAxiosInstance({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then(({data}) => data);

  // @ts-ignore
  promise.cancel = () => {
    source.cancel('Query was cancelled');
  };

  return promise;
};

customAxiosInstance.interceptors.request.use(
  async config => {
    const copyConfig = {...config};
    const localStorage = LocalStorage.getInstance();

    const accessToken = await localStorage.getData('accessToken');

    if (accessToken) {
      copyConfig.headers = {
        ...copyConfig.headers,
        Authorization: `Bearer ${accessToken}`,
      } as AxiosRequestHeaders;
    }

    if (config.url?.includes('renew')) {
      const refreshToken = await localStorage.getData('refreshToken');

      if (refreshToken) {
        copyConfig.headers = {
          ...copyConfig.headers,
          Authorization: `Bearer ${refreshToken}`,
        } as AxiosRequestHeaders;
      }
    }

    return copyConfig;
  },
  error => {
    // console.log(error);
    return Promise.reject(error);
  },
);

customAxiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async error => {
    if (error.response?.status === 401) {
      const localStorage = LocalStorage.getInstance();

      const {accessToken, refreshToken} = await usersApiSpecGetUsersRenew();

      localStorage.storeData('accessToken', accessToken);
      localStorage.storeData('refreshToken', refreshToken);

      error.config.headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await axios.request(error.config);
      return response;
    }
    return Promise.reject(error);
  },
);
