import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    port: 3001,
  },
  resolve: {
    alias: [
      { find: '@assets', replacement: resolve(__dirname, '/src/assets') },
      {
        find: '@components',
        replacement: resolve(__dirname, '/src/components'),
      },
      { find: '@styles', replacement: resolve(__dirname, '/src/styles') },
    ],
  },
});
