import { defineConfig } from 'vite';
import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [reactRouter(), tailwindcss()],
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      { find: '@assets', replacement: '/src/assets' },
      { find: '@components', replacement: '/src/components' },
      { find: '@hooks', replacement: '/src/hooks' },
      { find: '@pages', replacement: '/src/pages' },
      { find: '@routes', replacement: '/src/routes' },
      { find: '@store', replacement: '/src/store' },
      { find: '@styles', replacement: '/src/styles' },
      { find: '@utils', replacement: '/src/utils' },
      { find: '@libs', replacement: '/src/libs' },
    ],
  },
});
