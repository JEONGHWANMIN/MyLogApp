import {defineConfig} from 'orval';

export default defineConfig({
  penple: {
    input: '../server/openapi.json',
    output: {
      mode: 'tags-split',
      target: 'src/petstore.ts',
      schemas: 'src/model',
      client: 'react-query',
    },
    hooks: {
      afterAllFilesWrite: 'prettier --write',
    },
  },
});
