module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin'],
    plugins: ['@babel/plugin-syntax-import-assertions', 'react-native-reanimated/plugin'],
  };
};

