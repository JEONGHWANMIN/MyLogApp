import {Platform} from 'react-native';
import axios, {AxiosRequestConfig} from 'axios';

const _ANDROID_AVD_API_HOST = 'http://10.0.2.2:8080';
const _IOS_API_HOST = 'http://localhost:8080';

const config: AxiosRequestConfig = {
  baseURL: Platform.OS === 'android' ? _ANDROID_AVD_API_HOST : _IOS_API_HOST,
};

const customAxiosInstance = axios.create(config);

export {customAxiosInstance};
