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

interface AuthListParamsList extends ParamListBase {
  Auth: undefined;
  SignUpPhone: undefined;
  SignUpAccount: undefined;
  SignIn: undefined;
}

interface BottomTabParamsList extends ParamListBase {
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

type RootListParamsListProps = NativeStackNavigationProp<RootListParamsList>;

type BottomTabParamListProps = NativeStackNavigationProp<BottomTabParamsList>;

type AuthParamListProps = NativeStackNavigationProp<AuthListParamsList>;

export type {
  RootListParamsList,
  AuthListParamsList,
  BottomTabParamsList,
  RootListParamsListProps,
  BottomTabParamListProps,
  AuthParamListProps,
};
