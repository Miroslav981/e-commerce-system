module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json", // Adjust the path to your tsconfig.json file
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  plugins: ["@typescript-eslint"],
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "single"],
    indent: ["error", 2],
    "no-console": "error",
    "no-unused-vars": "error",
    "no-undef": "error",
    "max-len": ["error", { code: 80 }],
    camelcase: "error",
    "no-magic-numbers": "off",
    "arrow-parens": ["error", "always"],
    "no-var": "error",
    "prefer-const": "error",
    "@typescript-eslint/explicit-function-return-type": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unsafe-assignment": "error",
    "@typescript-eslint/no-unsafe-member-access": "error",
  },
};
