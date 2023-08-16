import {ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

/**
 * 실제 파라미터 받을 때 넣어주는 부분
 */

interface RootListParamsList {
  BottomTabNavigation: undefined;
  AuthNavigation: undefined;
  SplashScreen: undefined;
}

interface AuthListParamsList {
  Auth: undefined;
  SignUp: undefined;
  SignIn: undefined;
}

interface BottomTabParamsList {
  Home: undefined;
  DiaryStack: DiaryStackParamsList;
  Setting: undefined;
  Write: undefined;
}

interface DiaryStackParamsList extends ParamListBase {
  Diary: undefined;
  DiaryDetail: {
    id: number;
  };
}

/**
 * useNavigate 부분에 넣는 부분
 */

type RootListParamsListProps = NativeStackNavigationProp<{
  BottomTabNavigation: undefined;
  AuthNavigation: undefined;
  SplashScreen: undefined;
}>;

type BottomTabParamListProps = NativeStackNavigationProp<{
  Home: undefined;
  DiaryStack: DiaryStackParamsList;
  Setting: undefined;
  Write: undefined;
}>;

type AuthParamListProps = NativeStackNavigationProp<{
  Auth: undefined;
  SignUp: undefined;
  SignIn: undefined;
}>;

type DiaryStackParamListProps = NativeStackNavigationProp<{
  Diary: undefined;
  DiaryDetail: {
    id: number;
  };
}>;

export type {
  RootListParamsList,
  AuthListParamsList,
  BottomTabParamsList,
  DiaryStackParamsList,
  RootListParamsListProps,
  BottomTabParamListProps,
  AuthParamListProps,
  DiaryStackParamListProps,
};
