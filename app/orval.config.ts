import {defineConfig} from 'orval';

export default defineConfig({
  penple: {
    input: 'http://localhost:8080/api-docs',
    output: {
      mode: 'tags-split',
      target: 'src/orval/api',
      schemas: 'src/orval/model',
      client: 'react-query',
      override: {
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
