// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules:["@nuxt/ui", '@nuxtjs/color-mode', '@nuxthub/core'],
  hub: {
    blob: {
      driver: 'fs',
      dir: '.data/file' // Defaults to `.data/blob`
    }
  },
  components:[
    {
      path: "~/components",
      pathPrefix:false
    }
  ],css: ['~/assets/css/main.css'],
  runtimeConfig:{
    app_secret: process.env.app_secret,
    db_host: process.env.db_host,
    db_password: process.env.db_password,
    db_port: process.env.db_port,
    db: process.env.db,
    db_user: process.env.db_user
  }
})