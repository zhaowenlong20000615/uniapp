import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";


export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,vue}"],
  },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "prefer-const": "off",
      "vue/multi-word-component-names": "off",
    },
    // 全局变量忽略检测
    globals: {
      uni: "writable"
    },
  },
];