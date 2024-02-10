// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "vue3-swatches/nuxt"],

  app: {
    head: {
      title: "CSS gradient text | free online gradient text generator",
      link: [
        { rel: "icon", type: "image/x-icon", href: "favicon.ico?v=2" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&display=swap",
        },
      ],
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "theme-color", content: "#42D392" },
        {
          name: "title",
          content: "CSS gradient text | free online gradient text generator",
        },
        {
          name: "description",
          content:
            "Using CSS gradient text, you can generate beautiful gradient text using CSS, modify it (change colors - angle), then simply copy-paste it into your code",
        },
        {
          name: "google-site-verification",
          content: "WO17M4SyaKL3Lh5F5EMqGM8lznTmezZJ4txfWnmIeTE",
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://text-gradient.vercel.app" },
        {
          property: "og:title",
          content: "CSS gradient text | free online gradient text generator",
        },
        {
          property: "og:description",
          content:
            "Using CSS gradient text, you can generate beautiful gradient text using CSS, modify it (change colors - angle), then simply copy-paste it into your code",
        },
        {
          property: "og:image",
          content: "https://text-gradient.vercel.app/meta-image.png",
        },
        { property: "twitter:card", content: "summary_large_image" },
        {
          property: "twitter:url",
          content: "https://text-gradient.vercel.app",
        },
        {
          property: "twitter:title",
          content: "CSS gradient text | free online gradient text generator",
        },
        {
          property: "twitter:description",
          content:
            "Using CSS gradient text, you can generate beautiful gradient text using CSS, modify it (change colors - angle), then simply copy-paste it into your code",
        },
        {
          property: "twitter:image",
          content: "https://text-gradient.vercel.app/meta-image.png",
        },
      ],
      script: [
        {
          src: "https://www.googletagmanager.com/gtag/js?id=G-8Q697XB3VD",
          async: true,
        },
        { src: "/js/analytics.js" },
      ],
    },
  },
});
