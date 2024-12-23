import globals from "globals"
import pluginJs from "@eslint/js"
import tseslint from "typescript-eslint"
import pluginReact from "eslint-plugin-react"
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended"

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: { globals: globals.browser }
  },
  pluginJs.configs.recommended,
  eslintPluginPrettierRecommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    settings: {
      react: {
        version: "detect" // Automatically detects React version from your dependencies
      }
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/jsx-filename-extension": ["warn", { "extensions": [".jsx", ".tsx"] }],
      "import/extensions": "off",
      "@typescript-eslint/no-unused-vars": ["error"],
      "react/prop-types": "off",
      "react/function-component-definition": "off",
      "linebreak-style": 0,
      "semi": ["error", "never"],
      "quotes": ["error", "double"]
    }
  },
  {ignores: ["node_modules", "build", "dist", ".vscode", ".git", ".eslintrc.*", "*.config.js"]},
]