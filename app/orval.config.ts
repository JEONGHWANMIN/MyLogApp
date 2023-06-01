import {defineConfig} from 'orval';

export default defineConfig({
  penple: {
    input: '../server/openapi.json',
    output: {
      mode: 'tags-split',
      target: 'src/orval/target',
      schemas: 'src/orval/model',
      client: 'react-query',
    },
    hooks: {
      afterAllFilesWrite: 'prettier --write',
    },
  },
});
