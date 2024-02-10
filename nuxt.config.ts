// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "vue3-swatches/nuxt", "@nuxtjs/seo"],

  site: {
    url: "https://cssgradienttext.com",
    name: "CSS gradient text | free online gradient text generator",
    description:
      "Enhance your web projects with our CSS Gradient Text Generator. Easily create stunning gradient texts, adjust colors and angles, and now with a single click, copy either CSS or HTML styled code directly into your project.",
    defaultLocale: "en",
  },

  app: {
    head: {
      link: [
        { rel: "icon", type: "image/x-icon", href: "favicon.ico?v=2" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com" },
        {
          rel: "preload",
          href: "https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap",
          as: "style",
          onload: "this.onload=null;this.rel='stylesheet'",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap",
        },
      ],
      meta: [
        { name: "theme-color", content: "#42D392" },
        {
          name: "google-site-verification",
          content: "WO17M4SyaKL3Lh5F5EMqGM8lznTmezZJ4txfWnmIeTE",
        },
        {
          property: "og:image",
          content: "https://cssgradienttext.com/meta-image.png",
        },
        { property: "twitter:card", content: "summary_large_image" },
        {
          property: "twitter:url",
          content: "https://cssgradienttext.com",
        },
        {
          property: "twitter:title",
          content: "CSS gradient text | free online gradient text generator",
        },
        {
          property: "twitter:description",
          content:
            "Enhance your web projects with our CSS Gradient Text Generator. Easily create stunning gradient texts, adjust colors and angles, and now with a single click, copy either CSS or HTML styled code directly into your project.",
        },
        {
          property: "twitter:image",
          content: "https://cssgradienttext.com/meta-image.png",
        },
      ],
    },
  },
});
