module.exports = {
  root: true,
  plugins: [
    '@tanstack/query',
  ],
  extends: [
    '@react-native',
    'plugin:@tanstack/eslint-plugin-query/recommended'
  ],
  rules: {
    "@tanstack/query/exhaustive-deps": "error",
    "@tanstack/query/no-deprecated-options": "error",
    "@tanstack/query/prefer-query-object-syntax": "error",
    "@tanstack/query/stable-query-client": "error"
  }
};
