// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules:["@nuxtjs/tailwindcss"],
  components:[
    {
      path: "~/components",
      pathPrefix:false
    }
  ],
  runtimeConfig:{
    app_secret: process.env.app_secret,
    db_host: process.env.db_host,
    db_password: process.env.db_password,
    db_port: process.env.db_port,
    db: process.env.db,
    db_user: process.env.db_user
  }
})
