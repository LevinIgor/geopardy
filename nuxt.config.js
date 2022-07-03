export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  target: 'static',
  router: {
    base: '/geopardy'
  },
  head: {
    title: "geopardy",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [],
  },


  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["../geopardy/static/css/main.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [

  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    [
      "@nuxtjs/firebase",
      {
        config: {
          apiKey: "AIzaSyABryU9P4DoJc-CYII6xHHy1Z3Re7uDpSg",
          authDomain: "jeopardy-8fe27.firebaseapp.com",
          projectId: "jeopardy-8fe27",
          storageBucket: "jeopardy-8fe27.appspot.com",
          messagingSenderId: "182355373009",
          appId: "1:182355373009:web:32cf20c53dd7fb69774ef0",
        },
        services: {
          firestore: true,
          storage: true,
        },
      },
    ],
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
