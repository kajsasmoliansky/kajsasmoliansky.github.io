import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://dbrockman.github.io',
  build: {
    assets: '_assets'
  },
  vite: {
    server: {
      allowedHosts: ['archer.kitty-theropod.ts.net']
    }
  }
});
