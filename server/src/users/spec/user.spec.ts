import { Tspec } from 'tspec';
import { LoginUserDto } from '../dto';
import { CreateUserDto } from '../dto';

export type UsersApiSpec = Tspec.DefineApiSpec<{
  basePath: 'users';
  tags: ['users'];
  paths: {
    '/signup': {
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
    '/signin': {
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
    '/check': {
      post: {
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
    '/': {
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
    };
  };
}>;
