import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';

import dns from 'dns';
dns.setDefaultResultOrder('verbatim');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {
      ANILIST_BASE_URL: 'https://api.consumet.org/meta/anilist',
      CONNECTION_STRING:
        'mongodb+srv://admin:MgqocGEnA5i7tExu@cluster0.ejlgslk.mongodb.net/?retryWrites=true&w=majority',
      GOGO_ANIME_BASE_URL: 'https://api.consumet.org/anime/gogoanime/',
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
});
