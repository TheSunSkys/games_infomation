module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.ts',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
          '.svg',
          '.jpg',
          '.png',
        ],
        alias: {
          '@screens': './src/screens',
          '@components': './src/components',
          '@navigation': './src/navigation',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
