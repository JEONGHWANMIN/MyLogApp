import {ParamListBase} from '@react-navigation/native';

interface RootListParams extends ParamListBase {
  BottomTabNavigation: undefined;
  AuthNavigation: undefined;
}

interface AuthListParams extends ParamListBase {
  Auth: undefined;
  SignUp: undefined;
  SignIn: undefined;
}

interface BottomTabParams extends ParamListBase {
  Home: undefined;
  Diary: undefined;
  Setting: undefined;
}

export type {RootListParams, AuthListParams, BottomTabParams};
