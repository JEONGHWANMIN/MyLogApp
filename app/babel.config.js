module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@': './src',
          '@components': './src/components',
          '@assets': './src/assets',
          '@hooks': './src/hooks',
          '@screen': './src/scenes',
          '@utils': './src/utils',
          '@navigation': './src/navigation',
        },
      },
    ],
  ],
};
