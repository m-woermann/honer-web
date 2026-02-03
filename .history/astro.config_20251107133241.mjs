import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  // Enable client-side scripts
  output: 'hybrid',
  vite: {
    // Configure Vite for handling Three.js imports
    ssr: {
      noExternal: ['three']
    }
  }
});