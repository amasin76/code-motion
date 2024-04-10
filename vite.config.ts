import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, type PluginOption } from 'vite';
import prismjs from 'vite-plugin-prismjs';

export default defineConfig({
  plugins: [
    react(),
    prismjs({ languages: 'all' }),
    visualizer() as PluginOption,
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
