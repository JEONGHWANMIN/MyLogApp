import { Tspec } from 'tspec';
import { LoginUserDto } from '../dto';
import { CreateUserDto } from '../dto';

export type UsersApiSpec = Tspec.DefineApiSpec<{
  tags: ['users'];
  paths: {
    '/users/signup': {
      post: {
        summary: '유저 회원가입';
        body: CreateUserDto;
        responses: {
          201: {
            message: string;
          };
        };
      };
    };
    '/users/signin': {
      post: {
        summary: '유저 로그인';
        body: LoginUserDto;
        responses: {
          201: {
            message: string;
            accessToken: string;
            refreshToken: string;
          };
        };
      };
    };
    '/users/check': {
      get: {
        summary: '이메일 중복체크';
        query: {
          email: string;
        };
        responses: {
          200: {
            message: string;
            isDuplicate: boolean;
          };
        };
      };
    };
    '/users': {
      get: {
        security: 'bearerAuth';
        summary: '유저 로그아웃';
        responses: {
          200: {
            message: string;
            isDuplicate: boolean;
          };
        };
      };
      delete: {
        summary: '유저 회원탈퇴';
        responses: {
          204: {
            message: string;
          };
        };
      };
    };
    '/users/renew': {
      get: {
        summary: '토큰 갱신';

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
