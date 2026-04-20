// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.jesseoliveira.com.br',
  build: {
    format: 'directory',
  },
  compressHTML: true,
});
