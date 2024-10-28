// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";
import prettierRecommend from "eslint-plugin-prettier/recommended";

export default withNuxt(
  // Your custom configs here
  [prettierRecommend]
);
