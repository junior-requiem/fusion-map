import { defineConfig } from 'vite';

export default defineConfig({
  base: '/fusion-map/',
  esbuild: {
    jsx: 'automatic',
  },
});
