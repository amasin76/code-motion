import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import prismjs from 'vite-plugin-prismjs';

export default defineConfig({
  plugins: [
    react(),
    prismjs({
      languages: 'all',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
