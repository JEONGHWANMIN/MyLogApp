import { Diary } from '@prisma/client';
import { Tspec } from 'tspec';
import { CreateDiaryDto } from '../dto/diary.dto';

export type DiaryApiSpec = Tspec.DefineApiSpec<{
  tags: ['diary'];
  paths: {
    '/diary': {
      get: {
        summary: '일기 리스트 조회';
        query: {
          size: number;
          page: number;
        };
        responses: {
          200: {
            message: string;
            data: {
              page: number;
              size: number;
              totalCount: number;
              totalPage: number;
              hasNextPage: boolean;
              hasPreviousPage: boolean;
              items: Diary[];
            };
          };
        };
      };
      post: {
        summary: '일기 쓰기';
        body: CreateDiaryDto;
        responses: {
          201: {
            message: string;
          };
        };
      };
    };
    '/diary/{id}': {
      get: {
        summary: '일기 조회';
        path: { id: number };
        responses: {
          200: {
            message: string;
            data: {
              id: number;
              title: string;
              content: string;
              createdAt: Date;
              weather: string;
              mood: string;
              userId: number;
              tags: string[];
            };
          };
        };
      };
      patch: {
        summary: '일기 수정';
        path: { id: number };
        body: CreateDiaryDto;
        responses: {
          200: {
            message: string;
          };
        };
      };
      delete: {
        summary: '일기 삭제';
        path: { id: number };
        responses: {
          200: {
            message: string;
          };
        };
      };
    };
  };
}>;
