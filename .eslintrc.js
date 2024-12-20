module.exports = {
  root: true,
  plugins: [
    '@tanstack/query',
  ],
  extends: [
    '@react-native',
    'plugin:@tanstack/eslint-plugin-query/recommended',
  ],
};
