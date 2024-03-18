module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["prettier", "@typescript-eslint"],
  extends: [
    "airbnb",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  rules: {
    "prettier/prettier": [
      "error",
      {
        arrowParens: "always",
        bracketSpacing: true,
        jsxBracketSameLine: false,
        printWidth: 100,
        proseWrap: "preserve",
        requirePragma: false,
        semi: true,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: "none",
        useTabs: false,
      },
      {
        usePrettierrc: false,
      },
    ],
    quotes: [
      1,
      "single",
      {
        allowTemplateLiterals: true,
        avoidEscape: true,
      },
    ],
    "@typescript-eslint/no-explicit-any": "off",
    // Disable the rule eslint-disable-next-line
    "react-hooks/exhaustive-deps": "off",
  },
};
