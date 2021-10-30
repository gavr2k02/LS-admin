import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: 'http://localhost:3001/',
  plugins: [preact()],
});
