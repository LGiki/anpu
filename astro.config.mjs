import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import icon from "astro-icon";
import AstroPWA from '@vite-pwa/astro';
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://anpu.vercel.app',
  integrations: [
    tailwind(),
    icon(),
    sitemap(),
    AstroPWA({
      base: '/',
      scope: '/',
      includeAssets: [
        'favicon.svg',
        'icon-192x192.png',
        'icon-512x512.png',
        'icon-180x180.png',
        'icon-64x64.png',
        'maskable-icon-512x512.png'
      ],
      registerType: 'autoUpdate',
      manifest: {
        name: 'Anpu',
        short_name: 'Anpu',
        scope: '/',
        display: "standalone",
        description: 'Anpu lyrics, albums, concerts and talkings',
        theme_color: '#ffffff',
        icons: [
          {
            "src": "/icon-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "/icon-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "/icon-180x180.png",
            "sizes": "180x180",
            "type": "image/png"
          },
          {
            "src": "/icon-64x64.png",
            "sizes": "64x64",
            "type": "image/png"
          },
          {
            "src": "/maskable-icon-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{css,html,js,woff2}', 'index.html'],
        globIgnores: [
          '404.html',
          'concert/**',
          'statistics/**',
          'talking/**',
          'about/**',
          'zh-hant/concert/**',
          'zh-hant/statistics/**',
          'zh-hant/talking/**',
          'zh-hant/about/**',
          '*.xml',
          '*.png',
          '*.svg',
          '*.webmanifest',
        ],
        navigateFallbackDenylist: [
          /^\/404\/?$/,
          /^\/(zh-hant\/)?concert\/?/,
          /^\/(zh-hant\/)?statistics\/?/,
          /^\/(zh-hant\/)?talking\/?/,
          /^\/(zh-hant\/)?about\/?/,
          /\.xml\/?$/,
          /\.png\/?$/,
          /\.svg\/?$/,
          /\.webmanifest\/?$/,
        ],
      }
    }),
  ],
  devToolbar: {
    enabled: false
  },
  i18n: {
    defaultLocale: "zh-hans",
    locales: ["zh-hans", "zh-hant"],
  }
});