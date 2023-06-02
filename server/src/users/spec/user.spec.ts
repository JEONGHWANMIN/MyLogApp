import { Tspec } from 'tspec';

export type UsersApiSpec = Tspec.DefineApiSpec<{
  basePath: 'users';
  tags: ['users'];
  paths: {
    '/signup': {
      post: {
        summary: '유저 회원가입';
        body: {
          email: string;
          nickname: string;
          password: string;
        };
        responses: {
          200: {
            message: string;
          };
        };
      };
    };
    '/login': {
      post: {
        summary: '유저 로그인';
        body: {
          email: string;
          password: string;
        };
        responses: {
          200: {
            message: string;
            accessToken: string;
            refreshToken: string;
          };
        };
      };
    };
  };
}>;
