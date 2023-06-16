import {NativeStackNavigationProp} from '@react-navigation/native-stack';

interface RootListParamsList {
  BottomTabNavigation: undefined;
  AuthNavigation: undefined;
}

interface AuthListParamsList {
  Auth: undefined;
  SignUp: undefined;
  SignIn: undefined;
}

interface BottomTabParamsList {
  Home: undefined;
  Diary: undefined;
  Setting: undefined;
}

type RootListParamsListProps = NativeStackNavigationProp<{
  BottomTabNavigation: undefined;
  AuthNavigation: undefined;
}>;

type BottomTabParamListProps = NativeStackNavigationProp<{
  Home: undefined;
  Diary: undefined;
  Setting: undefined;
}>;

type AuthParamListProps = NativeStackNavigationProp<{
  Auth: undefined;
  SignUp: undefined;
  SignIn: undefined;
}>;

export type {
  RootListParamsList,
  AuthListParamsList,
  BottomTabParamsList,
  RootListParamsListProps,
  BottomTabParamListProps,
  AuthParamListProps,
};
