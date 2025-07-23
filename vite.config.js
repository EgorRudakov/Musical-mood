import { defineConfig } from 'vite';

export default defineConfig({
  base: '/Musical-mood/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
  },
});
