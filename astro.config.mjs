import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  // REPLACE WITH YOUR SITE URL:
  site: 'https://example.github.io',
  // REPLACE WITH YOUR REPO NAME (e.g. '/my-repo') or remove if using custom domain:
  base: '/repo-name',
  
  integrations: [tailwind()],
  vite: {
    // Configure Vite for handling Three.js imports
    ssr: {
      noExternal: ['three']
    }
  }
});