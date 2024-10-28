// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxtjs/tailwindcss", "@pinia/nuxt"],
  ssr: false,
  css: [
    "vfonts/FiraSans.css",
    "vfonts/FiraCode.css",
    "cn-fontsource-source-han-sans-sc-vf/font.css",
  ],
});
