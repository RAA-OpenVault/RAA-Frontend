/** @type {import('prettier').Config} */
const config = {
  tabWidth: 2,
  singleQuote: false,
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
};

export default config;
