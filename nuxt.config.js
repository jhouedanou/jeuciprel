// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled:false },

  typescript: {
    strict: false
  },

  // modules: [
  //   '@nuxtjs/pwa',
  //   // ... other modules
  // ],
  buildModules: [
    '@nuxtjs/pwa',
  ],

  pwa: {
    manifest: {
      name: 'CiprelPuzzle',
      short_name: 'CiprelPuzzle',
      lang: 'fr',
      display: 'standalone',
      theme_color: '#ec2f19',
      background_color: '#ffffff',
    },
    workbox: {
      importScripts: ['/custom-service-worker.js'],
    },
    icon: {
      fileName: 'app-icon.png',
    },
  },

  css: [
    '@/assets/styles/styles.scss',
    'bulma/css/bulma.min.css',
    'bootstrap/dist/css/bootstrap.min.css'
  ],
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },
  head: {
    title:"DINOR APP - Calculateur de calories",  meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Material+Icons&display=swap'
      },
      {
        rel: 'stylesheet',
         href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css'

      },
      { rel: 'apple-touch-icon', sizes: '57x57', href: '/images/apple-icon-57x57.png' },
      { rel: 'apple-touch-icon', sizes: '60x60', href: '/images/apple-icon-60x60.png' },
      { rel: 'apple-touch-icon', sizes: '72x72', href: '/images/apple-icon-72x72.png' },
      { rel: 'apple-touch-icon', sizes: '76x76', href: '/images/apple-icon-76x76.png' },
      { rel: 'apple-touch-icon', sizes: '114x114', href: '/images/apple-icon-114x114.png' },
      { rel: 'apple-touch-icon', sizes: '120x120', href: '/images/apple-icon-120x120.png' },
      { rel: 'apple-touch-icon', sizes: '144x144', href: '/images/apple-icon-144x144.png' },
      { rel: 'apple-touch-icon', sizes: '152x152', href: '/images/apple-icon-152x152.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/images/apple-icon-180x180.png' },
      { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/images/android-icon-192x192.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/images/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/images/favicon-96x96.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/images/favicon-16x16.png' },
      { rel: 'manifest', href: '/images/manifest.json' },
    ],
    meta: [
      { name: 'msapplication-TileColor', content: '#ffffff' },
      { name: 'msapplication-TileImage', content: '/images/ms-icon-144x144.png' },
      { name: 'theme-color', content: '#ffffff' },
    ],
    plugins: [
      { src: '~/plugins/swiper.js', mode: 'client' }
    ]
  },

  modules: ['@nuxt/image']
})