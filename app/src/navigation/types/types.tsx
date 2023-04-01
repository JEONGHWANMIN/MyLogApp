import {ParamListBase} from '@react-navigation/native';

interface RootListParams extends ParamListBase {
  BottomTabNavigation: undefined;
  AuthNavigation: undefined;
}

interface AuthListParams {
  Auth: undefined;
  SignUp: undefined;
  SignIn: undefined;
}

export type {RootListParams, AuthListParams};
