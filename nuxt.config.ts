// https://nuxt.com/docs/api/configuration/nuxt-config
import Material from '@primeuix/themes/material';

export default defineNuxtConfig({
  runtimeConfig: {
    // Make environment variables accessible here
    public: {
      BILLING_MICROSERVICE_API: process.env.BILLING_MICROSERVICE_API,
      // Add more environment variables as needed
    },
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxtjs/tailwindcss',
    '@primevue/nuxt-module',

  ],
  primevue: {
    components: {
      include: '*'
    },
    options: {
      theme: {
        preset: Material,
        name: 'saga-blue',
        ripple: true,
        inputStyle: 'filled',
        darkModeSelector: 'system',

      }
    }
  },
  css: [
    'primeicons/primeicons.css', // Añade los PrimeIcons
  ],
})