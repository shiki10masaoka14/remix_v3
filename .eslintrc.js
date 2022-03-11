module.exports = {
  extends: [
    "eslint:recommended",
    "@remix-run/eslint-config",
    "prettier",
  ],
  rules: {
    "react/jsx-key": "error",
  },
  ignorePatterns: [".eslintrc.js"],
};
