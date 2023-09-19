import {ParamListBase, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

/**
 * 실제 파라미터 받을 때 넣어주는 부분
 */

interface RootListParamsList extends ParamListBase {
  BottomTabNavigation: undefined;
  AuthNavigation: undefined;
  SplashScreen: undefined;
  Write: undefined;
  DiaryDetail: {
    id: number;
  };
}

interface AuthListParamsList {
  Auth: undefined;
  SignUp: undefined;
  SignIn: undefined;
}

interface BottomTabParamsList {
  Home: undefined;
  DiaryStack: undefined;
  Setting: undefined;
}

/**
 * RouteProps
 */

export type DiaryDetailProps = RouteProp<RootListParamsList, 'DiaryDetail'>;

/**
 * useNavigate 부분에 넣는 부분
 */

type RootListParamsListProps = NativeStackNavigationProp<{
  BottomTabNavigation: undefined;
  AuthNavigation: undefined;
  SplashScreen: undefined;
  Write: undefined;
  DiaryDetail: {
    id: number;
  };
}>;

type BottomTabParamListProps = NativeStackNavigationProp<{
  Diary: undefined;
  Home: undefined;
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
