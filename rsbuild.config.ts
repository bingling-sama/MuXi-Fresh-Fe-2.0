import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginLess } from '@rsbuild/plugin-less';

export default defineConfig({
  plugins: [pluginReact(), pluginLess()],
  server: {
    port: 3000,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'https://fresh.muxixyz.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  source: {
    entry: {
      index: './src/main.tsx',
    },
  },
  html: {
    template: './index.html',
  },
});