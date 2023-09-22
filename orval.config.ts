import {defineConfig} from 'orval';

export default defineConfig({
  penple: {
    // input: 'https://port-0-penple-kvmh2mljx068bu.sel4.cloudtype.app/api-docs',
    input: 'http://localhost:8080/api-docs',
    output: {
      mode: 'tags-split',
      target: 'src/orval/api',
      schemas: 'src/orval/model',
      client: 'react-query',
      override: {
        operations: {
          diaryApiSpecGetDiary: {
            query: {
              useQuery: true,
              useInfinite: true,
              useInfiniteQueryParam: 'page',
            },
          },
        },
        mutator: {
          path: './src/api/Instance.ts',
          name: 'customInstance',
        },
      },
    },
    hooks: {
      afterAllFilesWrite: 'prettier --write',
    },
  },
});
