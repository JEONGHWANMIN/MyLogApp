import { Tspec } from 'tspec';

/** 도서 정보 */
interface Book {
  /** 도서 ID */
  id: number;
  /**
   * 도서명
   * @example 상수리 나무 아래
   */
  title: string;
  tags: Tag[];
}

/** 태그 정보 */
type Tag = '로맨스' | '판타지';

export type BookApiSpec = Tspec.DefineApiSpec<{
  tags: ['도서'];
  paths: {
    '/books/{id}': {
      get: {
        summary: '단일 도서 조회';
        path: { id: number };
        responses: { 200: Book };
      };
    };
  };
}>;

export type SignUpApiSpec = Tspec.DefineApiSpec<{
  tags: ['유저'];
  paths: {
    '/users/signup': {
      post: {
        summary: '유저 회원 가입';
        body: {
          email: string;
          nickname: string;
          password: string;
        };
        responses: {
          200: {
            message: '사용자 생성에 성공했습니다.';
          };
        };
      };
    };
  };
}>;
