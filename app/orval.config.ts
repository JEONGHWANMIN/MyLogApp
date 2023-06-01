module.exports = {
  'penple-file': {
    input: '../server/openapi.json',
    output: {
      mode: 'tags-split',
      target: 'src/petstore.ts',
      schemas: 'src/model',
      client: 'react-query',
    },
  },
};
